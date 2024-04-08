import { Task } from "@/models/task";
import { NextResponse } from "next/server";

import { getresponsemessage } from "@/helper/responsemessage";
import { ConnectDb } from "@/helper/db";

import jwt from "jsonwebtoken";
ConnectDb(); // Ensure database connection




//get all the task
export async function GET(request) {

    try {
        await ConnectDb();

        const task = await Task.find();
        return NextResponse.json(task);

    } catch (error) {
        console.log(error);
        return getresponsemessage("Error in getting data", 404, flase);
    }
}

// Create task
export async function POST(request) {


    try {
        const { title, content, userId} = await request.json();
        let authtoken = request.cookies.get("authToken")?.value;
        const token = jwt.verify(authtoken, process.env.JWT_KEY);

        // Create a new Task instance
        const task = new Task({
            title,
            content,
            userId:token._id,
        });

        // Save the task to the database
        const createdTask = await task.save();

        return NextResponse.json(createdTask, {
            status: 201,
            message: "Task added successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Failed to create task",
        }, {
            status: 500, // Internal Server Error
        });
    }
}
