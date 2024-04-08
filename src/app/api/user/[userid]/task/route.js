import { getresponsemessage } from "@/helper/responsemessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

import { ConnectDb } from "@/helper/db";

ConnectDb();




export async function GET(request , {params}){
    const {userid}=params;

    try{

        const tasks=await Task.find({
            userId:userid,
        })

        return NextResponse.json(tasks);

    }catch(error){
        console.log(error);
        return getresponsemessage("Failed to get tasks" , 404 , false);
    }
}