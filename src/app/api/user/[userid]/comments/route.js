import { getresponsemessage } from "@/helper/responsemessage";
// import { Task } from "@/models/task";
import { NextResponse } from "next/server";

import { ConnectDb } from "@/helper/db";
import { Comment } from "@/models/comment";

ConnectDb();

export async function GET(request , {params}){
    const {userid}=params;

    try{

        const comments=await Comment.find({
            userId:userid,
        })

        return NextResponse.json(comments);

    }catch(error){
        console.log(error);
        return getresponsemessage("Failed to get comments" , 404 , false);
    }
}