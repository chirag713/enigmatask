// get particular work

import { ConnectDb } from "@/helper/db";
import { getresponsemessage } from "@/helper/responsemessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

ConnectDb(); // Ensure database connection

export async function GET(request, { params }) {

    console.log(params);

    const { taskid } = params;

    try {

        const task = await Task.findById(taskid);
        return NextResponse.json(task);

    } catch (error) {
        console.log(error);

        return getresponsemessage("Error in getting task!! ", 404, false);
    }

}



export async function PUT(request, { params }) {

    try {

        const { taskid } = params;
        const { title, content,likecount } = await request.json();
        console.log(title, content,likecount);

        // Find the task by ID
        let task = await Task.findById(taskid);

        if (!task) {
            return NextResponse.json({
                success: false,
                message: "Task not found",
            }, {
                status: 404, // Not Found
            });
        }

        // Update task properties
        task.title = title;
        task.content = content;
        task.likecount=likecount;

        console.log(title , content);
        // Save the updated task to the database
        const updatedTask = await task.save();

        return NextResponse.json(updatedTask);

    } catch (error) {
        console.log(error);
        return getresponsemessage("Error in updating !!..", 500, false);
    }
}

export async function DELETE(request, { params }) {
    try{
        const { taskid } = params;
        await Task.deleteOne({
            _id: taskid,
        });
        return NextResponse.json({
            message: "Task Deleted successfully!...",
            status: true
        });
    }catch(error){
        console.log(error);

        return getresponsemessage("Request failed.." ,404 , false);
    }
}

