"use server";

import dbConnect, { collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";


const SignInAction = async(payload) => {
    const { email, password } = payload;
    // console.log("Payload from Signin action:", payload);

    if(!email || !password){
        return { success: false, message: "All fields are required" };
    }

    try{
        const usersCollection = await dbConnect(collectionsName.USERS);
        const existsUser = await usersCollection.findOne({ email });

        if(!existsUser){
            return { success: false, message: "Invalid email address" };
        }

        const isPasswordOK = await bcrypt.compare(password, existsUser?.password);
        if(!isPasswordOK){
            return { success: false, message: "Wrong password" };
        }
        // console.log("Exists user & isPasswordOK:", existsUser, isPasswordOK);
        existsUser._id = existsUser?._id.toString();
        return existsUser;
    }catch(err){
        console.error(err);
        return { success: false, message: "Authentication failed! Try again" };
    }
};

export default SignInAction;