import Link from "next/link";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SocialSignIn from "@/components/SocialSignIn/SocialSignIn";

const SignUp = () => {
    return (
        <div className="signUp">
            <div className="container mx-auto w-full px-6 lg:px-8 py-8">
                <h1 className="text-center text-2xl text-slate-700 font-medium">Sign up here</h1>

                <div className="py-8">
                    <SignUpForm />
                </div>

                <SocialSignIn />

                <div className="text-center text-sm text-gray-500 pt-8">
                    <h1>Already Have An Account? <Link href={'/signin'} className="text-blue-500 hover:text-blue-600 active:text-blue-500 font-medium">SIGN IN</Link></h1>
                </div>
            </div>
        </div>
    );
};

export default SignUp;