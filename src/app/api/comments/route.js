

import { NextResponse } from "next/server";

import { getresponsemessage } from "@/helper/responsemessage";
import { ConnectDb } from "@/helper/db";
import { Comment } from "@/models/comment";

// import { ConnectDb } from "@/helper/db";

// import jwt from "jsonwebtoken";
ConnectDb(); // Ensure database connection

export async function POST(request) {
    try {
        const {  content, userId , taskId} = await request.json();
        // let authtoken = request.cookies.get("authToken")?.value;
        // const token = jwt.verify(authtoken, process.env.JWT_KEY);

        // Create a new Task instance
        const comment = new Comment({
            content,
            userId,
            taskId,
        });

        // Save the task to the database
        const createdComment = await comment.save();

        return NextResponse.json(createdComment, {
            status: 201,
            message: "Comment added successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Failed to create comment",
        }, {
            status: 500, // Internal Server Error
        });
    }
}



export async function GET(request) {

    try {
        await ConnectDb();

        const task = await Comment.find();
        return NextResponse.json(task);

    } catch (error) {
        console.log(error);
        return getresponsemessage("Error in getting comment", 404, flase);
    }
}
