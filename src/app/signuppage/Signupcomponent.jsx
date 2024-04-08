
"use client";

import React, { useState } from 'react'


// import signupsvg from "../Assets/signup.svg";
// import Image from 'next/image';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import { Signupuser } from '@/services/userservice';




const Signupcomponent = () => {


    const router = useRouter();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const dosignup = async (event) => {
        event.preventDefault();
        console.log(data);

        console.log(data.name);

        if (data.name === "" || data.name === null) {
            toast.warning("Name field is required !!..", {
                position: "top-center"
            });
            return;
        }

        if (data.email === "" || data.email === null) {
            toast.warning("Email field is required !!..", {
                position: "top-center"
            });
            return;
        }

        if (data.password === "" || data.password === null) {
            toast.warning("Password field is required !!..", {
                position: "top-center"
            });
            return;
        }
        
        try {

            const result = await Signupuser(data);

            console.log(result);

            toast.success("User is registered", {
                position: "top-center",
            });


            setData({
                name: "",
                email: "",
                password: "",
            })

            router.push("/signinpage");

        } catch (error) {
            console.log(error);

            toast.error("Signup error", {
                position: "top-center"
            });
        }

    }

    return (
        <div className='container grid grid-cols-12'>
            <div className="col-span-10 col-start-3  lg:col-span-4 lg:col-start-5  md:col-span-6 md:col-start-4 sm:col-span-8 sm:col-start-3">


                {/* <div className='my-5 flex justify-center'>
                    <Image src={signupsvg} style={
                        {
                            width: '50%',
                            height: "200px"
                        }
                    }
                        alt='login banner image' />
                </div> */}



                <div className='py-5' >
                    <h1 className='text-3xl text-center'>Signup Here</h1>

                    <form action="#" className='mt-5' onSubmit={dosignup}>
                        <div className='mt-3'>
                            <label htmlFor="user_name" className='block mb-2 text-2xl font-medium' >Usename</label>
                            <input className=' text-white w-full p-3 rounded-3xl ps-2 bg-gray-800 focus:ring-gray-400 border border-gray-600' type="text" placeholder='Enter your name ' id="user_name"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        name: event.target.value,
                                    })
                                }}
                                value={data.name} />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="user_email" className='block mb-2 text-2xl font-medium'>E-mail</label>
                            <input className=' text-white w-full p-3 rounded-3xl ps-2 bg-gray-800 focus:ring-gray-400 border border-gray-600' type="email" placeholder='Enter your E-mail ' id="user_email"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        email: event.target.value,
                                    })
                                }}
                                value={data.email} />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="user_password" className='block mb-2 text-2xl font-medium'>Password</label>
                            <input className=' text-white w-full p-3 rounded-3xl ps-2 bg-gray-800 focus:ring-gray-400 border border-gray-600' type="password" placeholder='Enter your Password ' id="user_password"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        password: event.target.value,
                                    })
                                }}
                                value={data.password} />
                        </div>

                        <div className='mt-4 flex justify-center'>
                            <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' >Sign Up </button>
                            <button type='button' className='text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                                onClick={(event) => {
                                    setData({
                                        email: "",
                                        password: "",
                                    })
                                }}
                                value={data.status}

                            >Reset</button>
                        </div>


                        {JSON.stringify(data)};
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signupcomponent
