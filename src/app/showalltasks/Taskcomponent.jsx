import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/usercontext';
import { commentadd, getcomment } from '@/services/commentservice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FcLike } from "react-icons/fc";
import { addlike, getlike } from '@/services/likeservices';
import { deletelike } from '@/services/likeservices';
import { updatetasklike } from '@/services/taskservice';

const Takscomponent = ({ task, deletetaskparent }) => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [data, setData] = useState({
        content: "",
        userId: user?._id,
        taskId: task._id,
    });
    const [cmt, setCmt] = useState(null);
    const [id, setId] = useState("");
    const [likeCount, setLikeCount] = useState(task.likecount); // State to hold the like count

    async function addcomment() {
        if (data.content == "") {
            toast.warning("Comment cant be empty", { position: "top-center" });
            return;
        }
        try {
            const result = await commentadd(data);
            console.log(result);
            toast.success("Comment is added", { position: "top-center" });
            setData({ ...data, content: "" });
        } catch (error) {
            console.log(error);
            toast.error("comment adding error", { position: "top-center" });
        }
    }

    async function getallcomments() {
        try {
            const result = await getcomment(task._id);
            console.log(result);
            setCmt(result);
            setId(task._id);
            toast.success("Comment is fetched", { position: "top-center" });
        } catch (error) {
            console.log(error);
            toast.error("Failed to get comment", { position: "top-center" });
        }
    }

    async function checkLike() {
        console.log(user._id, task._id);
        try {
            const result = await getlike(user._id, task._id);
            console.log(result);
            if (result.length === 0) {
                console.log(result.length);
                try {
                    const result = await addlike({
                        userId: user._id,
                        taskId: task._id,
                    });
                    console.log(result);
                    toast.success("Like added successfully", { position: "top-center" });
                    updatetasklike(task._id, {
                        title: task.title,
                        content: task.content,
                        likecount: task.likecount + 1,
                    });
                    setLikeCount(prevCount => prevCount + 1); // Update like count state
                } catch (error) {
                    console.log(error);
                    toast.error("Error occurred", { position: "top-center" });
                }
            } else {
                try {
                    const result = await deletelike(user._id, task._id);
                    console.log(result);
                    toast.success("Like removed successfully", { position: "top-center" });
                    updatetasklike(task._id, {
                        title: task.title,
                        content: task.content,
                        likecount: task.likecount - 1,
                    });
                    setLikeCount(prevCount => prevCount - 1); // Update like count state
                } catch (error) {
                    console.log(error);
                    toast.error("Error occurred", { position: "top-center" });
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Error occurred", { position: "top-center" });
        }
    }

    return (
        <div className={` shadow-lg mb-1 rounded `} id={task._id}>
            <div className='p-3  '>
                <div className="flex justify-between">
                    <h1 className='text-2xl font-semibold '>{task.title}</h1>
                    <div className='flex justify-between w-30 h-10'>
                        <span className='bg-gray-950 pr-3 shadow-lg cursor-pointer rounded-full p-3 hover:bg-gray-900 ' onClick={checkLike}><FcLike /></span>
                        <h1 className="h-10 w-10 rounded-full bg-gray-950 flex justify-center text-white text-center pt-2 ">{likeCount}</h1>
                    </div>
                </div>
                <p className='font-normal'>{task.content}</p>
                <div className="flex justify-between mt-3"></div>
                {cmt && <div>{cmt[0].content}</div>}
                <div className="sm:flex">
                    <textarea rows={4} type="text" placeholder='Enter your comment' className='w-full p-3 rounded-3xl bg-gray-800 text-white ps-5 focus:ring-gray-400 border border-gray-600'
                        onChange={(event) => {
                            setData({
                                ...data,
                                content: event.target.value,
                            });
                        }}
                        value={data.content}
                    />
                    <div className="flex flex-col justify-center text-center ps-4 pt-6">
                        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 h-10 focus:outline-none dark:focus:ring-blue-800' onClick={addcomment}> Submit </button>
                        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 h-15 focus:outline-none dark:focus:ring-blue-800' onClick={getallcomments} > Show comments </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Takscomponent;
