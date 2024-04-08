
import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema({
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
    taskId:{
        type:mongoose.ObjectId,
        required:true,
    },
});


export const Comment= mongoose.models.comment || mongoose.model("comment" , CommentSchema);