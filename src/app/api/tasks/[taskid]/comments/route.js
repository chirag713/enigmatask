
import { getresponsemessage } from "@/helper/responsemessage";
// import { Task } from "@/models/task";
import { NextResponse } from "next/server";

import { ConnectDb } from "@/helper/db";
import { Comment } from "@/models/comment";

ConnectDb();




export async function GET(request , {params}){

    console.log(params);
    const {taskid}=params;

    try{

        const comment=await Comment.find({
            taskId:taskid,
        })

        return NextResponse.json(comment);

    }catch(error){
        console.log(error);
        return getresponsemessage("Failed to get comments" , 404 , false);
    }
}