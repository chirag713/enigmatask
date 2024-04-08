import React, { useContext, useState } from 'react';
import UserContext from '../context/usercontext';
import { commentadd, getcomment } from '@/services/commentservice';
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";

const Takscomponent = ({ task, deletetaskparent }) => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState({
        content:"",
        userId:user._id,
        taskId:task._id,
    });
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false); // State to track whether to show comments for this section

    async function addcomment() {
        if(data.content === "") {
            toast.warning("Comment can't be empty", {
                position: "top-center",
            });
            return;
        }
        try {
            await commentadd(data);
            toast.success("Comment is added", {
                position: "top-center",
            });
            setData({
                ...data,
                content: "",
            });
            // Fetch comments after adding a new one
            // await getallcomments();
        } catch (error) {
            console.log(error);
            toast.error("comment adding error", {
                position: "top-center"
            });
        }
    }

    async function getallcomments() {
        try {
            const result = await getcomment(task._id);
            setComments(result);
            toast.success("Comments are fetched", {
                position: "top-center",
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to get comments", {
                position: "top-center"
            });
        }
    }

    function toggleComments() {
        // Toggle the state to show/hide comments for this section
        setShowComments(!showComments);
        // If showComments is true, fetch comments for this section
        if (!showComments) {
            getallcomments();
        } else {
            // If showComments is false, clear the comments state
            setComments([]);
        }
    }

    function deletetask(taskid) {
        console.log(taskid);
        deletetaskparent(taskid);
    }

    return (
        <div className={`pl-6 pr-4 shadow-lg mb-1 rounded `} id={task._id}>
            <div className='p-3'>
                <div className="flex justify-between">
                    <h1 className='text-2xl font-semibold'>{task.title}</h1>
                    <span className='bg-gray-950 h-10 shadow-lg text-white cursor-pointer rounded-full p-3 hover:bg-gray-900' onClick={() => deletetask(task._id)}><RxCross2 /></span>
                </div>
                <p className='font-normal'>{task.content}</p>
                <div className="flex justify-between mt-3">
                    <p className='text-right font-bold mb-2'>Asked By- : <span>{user?.name}</span></p>
                </div>
                <div className="sm:flex">
                    <textarea rows={4} type="text" placeholder='Enter your comment' className='w-full p-3 rounded-3xl bg-gray-800 text-white ps-5 focus:ring-gray-400 border border-gray-600' onChange={(event) => setData({ ...data, content: event.target.value })} value={data.content} />
                    <div className="flex flex-col justify-center text-center ps-4 pt-6">
                        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 h-10 focus:outline-none dark:focus:ring-blue-800' onClick={addcomment}> Submit </button>
                        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 h-15 focus:outline-none dark:focus:ring-blue-800' onClick={toggleComments}> {showComments ? 'Hide comments' : 'Show comments'} </button>
                    </div>
                </div>
                {/* Render comments if showComments is true */}
                {showComments && comments.map((comment, index) => (
                    <div key={index} className='bg-gray-100 rounded-lg p-3 mb-2'>
                        {/* Render each comment */}
                        <p className='text-black '>{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Takscomponent;
