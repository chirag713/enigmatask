

"use client";
import { addtaskt } from '@/services/taskservice';
import React, { useState } from 'react'

// import loginsvg from "../Assets/login.svg";
// import Image from 'next/image';

import { toast } from 'react-toastify';

// export const metadata = {
//   title: "AddTask - Work Manager",
// };

const addTask = () => {

    // document.title=metadata.title; 

    // console.log("hello");


    const [task, setTask] = useState({
        title: "",
        content: "",
        // userId: "660fe19e3e4e313bfc8970a2",
    });


    const handleaddTask = async (event) => {
        event.preventDefault();
        console.log("hello");
        console.log(task);
        if (task.status === "none") {
            task.status = "pending";
        }
        task.likecount=0;
        try {
            const result = await addtaskt(task);
            console.log(result);

            toast.success("Your Task is added!!", {
                position: "top-center",
            })



            setTask({
                title: "",
                content: "",
                userId: "660fe19e3e4e313bfc8970a2",
            })
        }
        catch (error) {
            console.log(hello);
            console.log(error);
            toast.error("Task not added", {
                position: "top-center",
            })
        }
    }

    return (
        <div className='grid grid-cols-12 justify-center'>
            <div className=' col-span-10 col-start-2  lg:col-span-4 lg:col-start-5  md:col-span-6 md:col-start-4 sm:col-span-8 sm:col-start-3'>


                {/* <div className='my-5 flex justify-center'>
          <Image src={loginsvg} style={
            {
              width: '50%',
              height: "200px"
            }
          }
            alt='login banner image' />
        </div> */}
                <h1 className='text-3xl text-center '>Add Your Question here </h1>
                <form action="#" className='pb-5' onSubmit={handleaddTask} >
                    <div className="mt-4">
                        <label htmlFor="task_title" className='block mb-2 text-2xl'>Title</label>
                        <input type="text"
                            className='w-full p-3 rounded-full text-white bg-gray-800 focus:ring-gray-400 border border-gray-600'
                            id="task_title"
                            name="task_tiltle"
                            placeholder='Give a Title'
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    title: event.target.value,
                                })
                            }}
                            value={task.title}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="task_content" className='block mb-2 text-2xl'>Description</label>
                        <textarea className='w-full p-3 rounded-2xl text-white bg-gray-800 focus:ring-gray-400 border border-gray-600'
                            id="task_content"
                            rows={5}
                            name="task_content"
                            placeholder='Enter your Question'
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    content: event.target.value,
                                })
                            }}
                            value={task.content}
                        />
                    </div>


                    <div className='mt-4 flex justify-center'>
                        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' >Add Question </button>
                        <button type='button' className='text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                            onClick={(event) => {
                                setTask({
                                    title: "",
                                    content: "",
                                })
                            }}
                            value={task.status}>Clear</button>
                    </div>

                    {/* {JSON.stringify(task)} */}
                </form>
            </div>
        </div>
    )
}

export default addTask
