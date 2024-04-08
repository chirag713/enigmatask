

import { User } from "@/models/user";
import { NextResponse } from "next/server";



import { ConnectDb } from "@/helper/db";
import { Likedone } from "@/models/likedone";

ConnectDb(); // Ensure database connection


//Get user

export async function GET(request, { params }) {
    const { userid, taskid } = params;
    console.log(userid);

    try {
        const likedone = await Likedone.find({
            userId: userid,
            taskId: taskid,
        })

        return NextResponse.json(likedone);
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

    const { userid, taskid } = params;
    // console.log(userid);

    try {
        await Likedone.deleteOne({
            userId: userid,
            taskId: taskid,
        });
        return NextResponse.json({
            message: "like Deleted successfully!...",
            status: true
        });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to Delete like",
            status: false
        })
    }
}



