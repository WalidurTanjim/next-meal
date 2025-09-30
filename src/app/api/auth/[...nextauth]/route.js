import { authProvider } from "@/providers/NextAuthProvider";
import NextAuth from "next-auth"

const handler = NextAuth(authProvider);

export { handler as GET, handler as POST }