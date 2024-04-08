// get particular work

import { ConnectDb } from "@/helper/db";
import { getresponsemessage } from "@/helper/responsemessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import { Comment } from "@/models/comment";

ConnectDb(); // Ensure database connection

export async function GET(request, { params }) {

    console.log(params);

    console.log(params);

    const { commentid } = params;

    try {

        const comment = await Comment.findById(commentid);
        return NextResponse.json(comment);

    } catch (error) {
        console.log(error);
        return getresponsemessage("Error in getting comment!! ", 404, false);
    }
}



export async function PUT(request, { params }) {

    console.log(params);

    try {

        const { commentid } = params;

        const { content } = await request.json();

        // Find the task by ID
        let comment = await Comment.findById(commentid);

        if (!comment) {
            return NextResponse.json({
                success: false,
                message: "Task not found",
            }, {
                status: 404, // Not Found
            });
        }

        // Update task properties
        comment.content = content;
        // Save the updated task to the database
        const updatedcomment = await comment.save();

        return NextResponse.json(updatedcomment);

    } catch (error) {
        console.log(error);
        return getresponsemessage("Error in updating !!..", 500, false);
    }
}

export async function DELETE(request, { params }) {
    try{
        const { commentid } = params;
        await Comment.deleteOne({
            _id: commentid,
        });
        return NextResponse.json({
            message: "Comment Deleted successfully!...",
            status: true
        });
    }catch(error){
        console.log(error);

        return getresponsemessage("Request failed.." ,404 , false);
    }
}

