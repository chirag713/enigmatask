import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";

import { ConnectDb } from "@/helper/db";

ConnectDb();


export async function GET(request) {
    let authtoken = request.cookies.get("authToken")?.value;
    console.log(authtoken);

    try {
        const token = jwt.verify(authtoken, process.env.JWT_KEY);
        console.log(token);
        const user= await User.findById(token._id).select("-password");
        // Token is verified, you can proceed with your logic here
        return NextResponse.json(user,{
            success: true,
            message: "Token verified successfully",
            // decodedToken: token
        });
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        
        // Token verification failed, handle the error
        
        return NextResponse.json({
            success: false,
            error: "JWT verification failed",
            errorMessage: error.message
        });
    }
}
