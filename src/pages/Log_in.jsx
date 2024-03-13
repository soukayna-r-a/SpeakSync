import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
//icons
import BgAnimited from './BgAnimited'
import { FcCollaboration } from "react-icons/fc";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
///firebase 
import { signInWithEmailAndPassword } from "firebase/auth";
//from fichier firebase
import { auth } from '../firebase';

import "./logo.css"
export default function Log_in() {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (err) {
            setErr(true)
        }
    }
    return (
        <div className="flex items-center justify-center h-screen ">
            <BgAnimited />
            <div className='login chat-container'>
                <div className="log">
                    <FcCollaboration />
                    <div className="col-md-12 text-center">
                        <h3 className="animate-charcter"> SpeakSync</h3>
                    </div>
                </div>
                <h4 className='wlc'>Welcome Back  :)</h4>
                <p className='us'>To keep connected with us please login with your personal info</p>
                <form onSubmit={handleSubmit}>

                    <div className="inputlabel">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6   flex items-center justify-center space-x-2">
                            <span className="iconlog">
                                <MdAttachEmail />
                            </span>Email address</label>
                    </div>

                    <div className="inputlabel">
                        <input type="password" name="floating_pass" id="floating_pass" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6   flex items-center justify-center space-x-2">
                            <span className="iconlog">
                                <RiLockPasswordFill />
                            </span>your password</label>
                    </div>

                    <div className="m-3">
                        <button className="btnlog">
                            <span className="mr-2">Sign In</span>
                        </button>
                    </div>
                    {err && <div className="flex items-center  mb-4 text-sm text-red-800 rounded-lg   dark:text-red-400" >
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div>
                            <span className="font-medium">Password is incorrect</span> 
                        </div>
                    </div>}
                </form>

                <div>
                    <span className='text-white'>new here <Link to="/register" className='link' >create an acounte</Link></span>
                </div>

            </div>

        </div >
    )
}
