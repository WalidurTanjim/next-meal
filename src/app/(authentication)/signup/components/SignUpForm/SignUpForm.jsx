"use client";

import SignUpAction from "@/app/actions/auth/SignUpAction";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUpForm = () => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const repeat_password = form.repeatPassword.value;
        const payload = { name, email, password, repeat_password };

        if (password !== repeat_password) {
            setLoading(false);
            toast.error("Both password must be same");
            return;
        }

        try {
            const res = await SignUpAction(payload);
            console.log("Response of signup action from signup form:", res);

            if (res?.insertedId) {
                try{
                    const res = await signIn("credentials", { email, password, callbackUrl: '/', redirect: false });
                    // console.log("Response of signIn from signUp form:", res);

                    if(res?.ok){
                        toast.success("Account created successfully");
                        form.reset();
                        setLoading(false);

                        router.push('/');
                    }
                }catch(err){
                    console.error(err);
                }
            }

            if (res?.success == false) {
                toast.error(res?.message);
                form.reset();
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            return;
        }
    }

    return (
        <form className="w-full sm:w-[350px] md:w-[450px] lg:w-[550px] mx-auto" onSubmit={handleSubmit}>
            {/* name */}
            <div className="name mb-3">
                <h1 className="text-sm text-slate-700 font-medium mb-2 ps-3">Full name:</h1>
                <input type="text" name="name" id="name" autoComplete="off" placeholder="Full name" required className="w-full px-3 py-1.5 text-slate-800 border border-gray-300 focus:ring-3 ring-gray-200 rounded outline-none" />
            </div>

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

            {/* password */}
            <div className="password mb-3">
                <h1 className="text-sm text-slate-700 font-medium mb-2 ps-3">Repeat Password:</h1>
                <input type="text" name="repeatPassword" id="repeatPassword" autoComplete="off" placeholder="Repeat Password" required className="w-full px-3 py-1.5 text-slate-800 border border-gray-300 focus:ring-3 ring-gray-200 rounded outline-none" />
            </div>

            <button type="submit" disabled={loading} className={`w-full py-1.5 text-center font-medium text-white border border-blue-300 rounded ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:bg-blue-500"}`}>{loading ? "Submitting..." : "SIGN UP"}</button>
        </form>
    );
};

export default SignUpForm;