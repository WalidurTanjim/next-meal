import Link from "next/link";
import SignInForm from "./components/SignInForm/SignInForm";
import SocialSignIn from "@/components/SocialSignIn/SocialSignIn";

const SignIn = () => {
    return (
        <div className="signIn">
            <div className="container mx-auto w-full px-6 lg:px-8 py-8">
                <h1 className="text-center text-2xl text-slate-700 font-medium">Sign in here</h1>

                <div className="py-8">
                    <SignInForm />
                </div>

                <SocialSignIn />

                <div className="text-center text-sm text-gray-500 pt-8">
                    <h1>Don't Have An Account? <Link href={'/signup'} className="text-blue-500 hover:text-blue-600 active:text-blue-500 font-medium">SIGN UP</Link></h1>
                </div>
            </div>
        </div>
    );
};

export default SignIn;