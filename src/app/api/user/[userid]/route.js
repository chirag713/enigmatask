import { User } from "@/models/user";
import { NextResponse } from "next/server";



import { ConnectDb } from "@/helper/db";

ConnectDb(); // Ensure database connection


//Get user

export async function GET(request, { params }) {
    const { userid } = params;
    console.log(userid);

    try {
        const user = await User.findById(userid).select("-password");

        return NextResponse.json(user);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to get user",
            status: false
        })
    }
}



//use to delete the user 

export async function DELETE(request, { params }) {

    const { userid } = params;
    console.log(userid);

    try {
        await User.deleteOne({
            _id: userid,
        });
        return NextResponse.json({
            message: "User Deleted successfully!...",
            status: true
        });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to Delete user",
            status: false
        })
    }
}



export async function PUT(request, { params }) {

    const { userid } = params;
    const { name, password } = await request.json();

    // console.log(name , password , about , profileurl);


    try {

        const user = await User.findById(userid);

        user.name = name;
        user.password = password;

        const updateduser = await user.save();

        return NextResponse.json(updateduser);

    } catch (error) {
        // console.log(error);

        return NextResponse.json({
            message: "Failed to get user",
            status: false
        })

    }
}