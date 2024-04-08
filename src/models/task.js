

import mongoose, { Schema } from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    addeddate:{
        type:Date,
        default:Date.now(),
        required:true
    },
    userId:{
        type:mongoose.ObjectId,
        required:true,
    },
    likecount:{
        type:Number,
        default:0,
        required:true,
    }
})


export const Task= mongoose.models.task || mongoose.model("task" , TaskSchema);