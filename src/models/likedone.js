


import mongoose, { Schema } from "mongoose";

const LikedoneSchema = new mongoose.Schema({
    userId:{
        type:mongoose.ObjectId,
        required:true,
    },
    taskId:{
        type:mongoose.ObjectId,
        required:true,
    },
});

export const Likedone= mongoose.models.likedone || mongoose.model("likedone" , LikedoneSchema);