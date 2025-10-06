"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignInForm = () => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // handleSubmit
    const handleSubmit = async(e) => {
        e.preventDefault();

        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const payload = { email, password };

        try{
            const res = await signIn("credentials", { email, password, callbackUrl: '/', redirect: false });
            console.log("Response of provider from signin form:", res);

            if(res?.ok){
                setLoading(false);
                form.reset();
                router.push('/');
            }else{
                setLoading(false);
                form.reset();
                toast.error("Authentication failed");
            }
        }catch(err){
            console.error(err);
            return;
        }
    }

    return (
        <form className="w-full sm:w-[350px] md:w-[450px] lg:w-[550px] mx-auto" onSubmit={handleSubmit}>
            {/* email */}
            <div className="email mb-3">
                <h1 className="text-sm text-slate-700 font-medium mb-2 ps-3">Email address:</h1>
                <input type="email" name="email" id="email" autoComplete="off" placeholder="Email address" required className="w-full px-3 py-1.5 text-slate-800 border border-gray-300 focus:ring-3 ring-gray-200 rounded outline-none" />
            </div>

            {/* password */}
            <div className="password mb-3">
                <h1 className="text-sm text-slate-700 font-medium mb-2 ps-3">Password:</h1>
                <input type="text" name="password" id="password" autoComplete="off" placeholder="Password" required className="w-full px-3 py-1.5 text-slate-800 border border-gray-300 focus:ring-3 ring-gray-200 rounded outline-none" />
            </div>

            <button type="submit" disabled={loading} className={`w-full py-1.5 text-center font-medium text-white border border-blue-300 rounded ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:bg-blue-500"}`}>{loading ? "Submitting..." : "SIGN IN"}</button>
        </form>
    );
};

export default SignInForm;