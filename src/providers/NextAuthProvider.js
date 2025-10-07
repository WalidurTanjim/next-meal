import SignInAction from "@/app/actions/auth/SignInAction";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authProvider = {
    providers: [
        // credentials provider
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email " },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await SignInAction(credentials);
                // console.log("Credentials & user from provider:", credentials, user);

                if (user?.success === false) {
                    return null;
                }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),

        // github provider
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),

        // google provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console.log("Callbacks signIn():", user, account, profile, email, credentials);

            if (account?.provider === "google") {
                if (profile?.email && profile?.email_verified === false) {
                    return false;
                }
            }

            if (credentials) {
                if (!user && !user?.email) {
                    return false;
                }
            }
            return true
        },
        async redirect({ url, baseUrl }) {
            // console.log("Callbacks redirect:", url, baseUrl);
            return baseUrl
        },
        async session({ session, user, token }) {
            console.log("Callbacks session:", session, user, token);
            session.user = session.user || {};
            session.user.id = token.id;
            session.user.role = token.role;
            session.accessToken = token.accessToken; // যদি প্রয়োজন হয় (কিন্তু সতর্ক— সেনসিটিভ ডেটা)
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            // console.log("Callbacks jwt:", token, user, account, profile, isNewUser);
            if (user) {
                token.id = user.id ?? user._id ?? null;
                token.role = user.role ?? "user";
                if (account?.access_token) token.accessToken = account.access_token;
                if (account?.provider) token.provider = account.provider;
            }
            // console.log("Token:", token);
            return token;
        }
    },
    pages: {
        signIn: '/signin',
    }
}