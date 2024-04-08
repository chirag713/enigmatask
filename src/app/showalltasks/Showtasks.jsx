
"use client"

import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/usercontext';
import { toast } from 'react-toastify';
import Takscomponent from './Taskcomponent';
import { deletetaskcall, getalltask } from '@/services/taskservice';

const Showtasks = () => {
    const context = useContext(UserContext);
    const [tasks, setTasks] = useState([]);

    async function loadtask(userId) {
        console.log(userId);
        try {
            const tasks = await getalltask(userId);
            setTasks([...tasks].reverse());
            console.log(tasks);
        } catch (error) {
            toast.error("Error fetching tasks");
            console.log(error);
        }
    }

    console.log(context.user);

    useEffect(() => {
        if (context.user) {
            loadtask(context.user._id);
        }
    }, [context.user]);

    async function deletetaskparent(taskid) {
        try {
            const response = await deletetaskcall(taskid);
            console.log(response);
            toast.success("Task successfully deleted", {
                position: "top-center",
            });
            // Reload tasks after deletion
            loadtask(context.user._id);
        } catch (error) {
            console.log(error);
            toast.error("Error deleting task", {
                position: "top-center",
            });
        }
    }

    return (
        <div className=' sm:grid sm:grid-cols-12  '>
            <div className=" p-4 col-span-10 lg:col-start-2">
                <h1 className='text-3xl mb-3 text-center font-bold'>All Questionss ({tasks.length})</h1>
                {tasks.map((task,t) => (
                    <Takscomponent task={task} key={task._id} deletetaskparent={deletetaskparent} tree={t}/>
                ))}
            </div>
        </div>
    );
};

export default Showtasks;
