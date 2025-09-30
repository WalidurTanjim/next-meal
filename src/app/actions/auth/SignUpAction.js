"use server";

import dbConnect, { collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

const SignUpAction = async(payload) => {
    // console.log("Payload from signup action:", payload);
    const { email, password, repeat_password } = payload;

    if(!email || !password || !repeat_password){
        return { success: false, message: "All fields are required" };
    }

    if(password !== repeat_password){
        return { success: false, message: "Both password must be same" };
    }

    try{
        const usersCollection = await dbConnect(collectionsName.USERS);
        const existsUser = await usersCollection.findOne({ email });

        if(existsUser){
            return { success: false, message: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const { repeat_password, ...rest } = payload;
        const newPayload = {
            ...rest,
            password: hashedPassword
        }
        // console.log("New payload from signup action:", newPayload);

        const result = await usersCollection.insertOne(newPayload);
        result.insertedId = result?.insertedId.toString();
        // console.log("Result from signup action:", result);
        return result;
    }catch(err){
        console.error(err);
        return { success: false, message: "Authentication failed. Try again" };
    }
};

export default SignUpAction;