

import { Task } from "@/models/task";
import { Likedone } from "@/models/likedone";
import { NextResponse } from "next/server";

import { getresponsemessage } from "@/helper/responsemessage";
import { ConnectDb } from "@/helper/db";



// import jwt from "jsonwebtoken";
ConnectDb(); // Ensure database connection


// Create task
export async function POST(request) {

    const { userId, taskId} = await request.json();
    console.log("hello");
    console.log(taskId , userId);

    // console.log(request.json());
    try {
        
        // let authtoken = request.cookies.get("authToken")?.value;
        // const token = jwt.verify(authtoken, process.env.JWT_KEY);

        // Create a new Task instance
        const likedone = new Likedone({
            userId,
            taskId,
        });

        // Save the task to the database
        const createdlike = await likedone.save();

        return NextResponse.json(createdlike, {
            status: 201,
            message: "Like added successfully",
        });
    } catch (error) {
        // console.error(error);

        return NextResponse.json({
            success: false,
            message: "Failed to Add like",
        }, {
            status: 500, // Internal Server Error
        });
    }
}
