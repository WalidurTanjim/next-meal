"use client";

import { signIn } from "next-auth/react";

const SocialSignIn = () => {
    // handleSignIn
    const handleSignIn = async(providerName) => {
        const result = await signIn(providerName, { redirect: false })
        // console.log("Social signin provider name & result:", providerName, result);
    }

    return (
        <div className="socialSignIn w-full sm:w-[350px] md:w-[450px] lg:w-[550px] mx-auto">
            <div className="w-full flex gap-5 items-center justify-center">
                <button type="button" className="px-5 py-1.5 border border-gray-300 rounded hover:bg-gray-100 active:bg-transparent text-slate-700 text-sm font-medium" onClick={() => handleSignIn("google")}>Google</button>
                <button type="button" className="px-5 py-1.5 border border-gray-300 rounded hover:bg-gray-100 active:bg-transparent text-slate-700 text-sm font-medium" onClick={() => handleSignIn("github")}>Github</button>
            </div>
        </div>
    );
};

export default SocialSignIn;