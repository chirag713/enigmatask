"use client";
import React, { useContext, useState,useEffect } from 'react'
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import  axios  from 'axios';

// import signupsvg from "../Assets/signup.svg";
// import Image from 'next/image';
import { toast } from 'react-toastify';

import { GLogin, Loginuser, Signupuser } from '@/services/userservice';
import { useRouter } from 'next/navigation';
import UserContext from '../context/usercontext';

const Signincomponent = () => {
    //
    const [user, setUser] = useState(null);
    const [userData,setUserData]=useState(null);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      saveUserToDatabase(userData);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const saveUserToDatabase = async(userData) => {
    const result = await GLogin(userData);

  };
    //

    const router=useRouter();

    const context =useContext(UserContext)


    const [data, setData] = useState({
        email: "",
        password: "",
    });


    const loginformsubmited = async(event) => {
        event.preventDefault();

        console.log(data);


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


        try{

            const result = await Loginuser(data);

            console.log(result);

            toast.success("Login succesful",{
                position:"top-center",
            })

            context.setUser(result.user);

            // console.log(context.user);

            router.push("/addtask");


        }catch(error){
            console.log(error);
            toast.error("Error in login ",{
                position:"top-center",
            })
        }


    }


    return (
        <div>
            {/* <div onClick={() => {
          login();
        }}
      >
         Login with Google
      </div> */}
            <div className='container grid grid-cols-12 '>
                <div className="  col-span-10 col-start-2  lg:col-span-4 lg:col-start-5  md:col-span-6 md:col-start-4 sm:col-span-8 sm:col-start-3 ">
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
                        <h1 className='text-3xl text-center'>Login Here</h1>

                        <form action="#" className='mt-5' onSubmit={loginformsubmited}  >
                            <div className='mt-3'>
                                <label htmlFor="user_email" className='block mb-2 text-2xl font-medium'>E-mail</label>
                                <input className='w-full p-3 text-white rounded-3xl ps-2 bg-gray-800 focus:ring-gray-400 border border-gray-600' type="email" placeholder='Enter your E-mail ' id="user_email"
                                    onChange={(event) => {
                                        setData({
                                            ...data,
                                            email: event.target.value,
                                        })
                                    }}
                                    value={data.email}
                                />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="user_password" className='block mb-2 text-2xl font-medium'>Password</label>
                                <input className='w-full p-3  text-white rounded-3xl ps-2 bg-gray-800 focus:ring-gray-400 border border-gray-600' type="password" placeholder='Enter your Password ' id="user_password"
                                    onChange={(event) => {
                                        setData({
                                            ...data,
                                            password: event.target.value,
                                        })
                                    }}
                                    value={data.password}
                                />
                            </div>
                            <div className='mt-4 flex justify-center'>
                                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' >Login </button>
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
                            {/* {JSON.stringify(data)}; */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signincomponent