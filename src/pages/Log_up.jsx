import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
///icons
import BgAnimited from './BgAnimited'
import { IoMdPerson } from "react-icons/io";
import { FcCollaboration } from "react-icons/fc";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuImagePlus } from "react-icons/lu";
//foction firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
////from page firebase
import { auth, db, storage } from "../firebase";

export default function Log_up() {
    const [err, setErr] = useState(false)
    const [Error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        setError("")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email address');
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must contain at least 8 characters, including uppercase, lowercase, and numbers.');
            return;
        }
        if (!file) {
            setError('Please select an image');
            return;
        }
        
        if(!Error){
        try {
            
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);
            

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',

                // (error) => {
                //     setErr(true)
                // },
                () => {


                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "userChat", res.user.uid), {});
                        navigate("/");
                    });
                }
            );
        } catch (err) {
            setErr(true)
        }}
        setError("")
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <BgAnimited />

            <div className='login chat-container'>
                <div className="log">
                    <FcCollaboration />
                    <div className="col-md-12 text-center">
                        <h3 className="animate-charcter"> SpeakSync</h3>
                    </div>
                </div>

                <h4 className='wlc'>Welcome :)</h4>
                <p className='us'>Enter your personal details and start journey with us</p>


                <form onSubmit={handleSubmit}>

                    <div className="inputlabel">
                        <input type="text" name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6   flex items-center justify-center space-x-2">
                            <span className=" iconlog">
                                <IoMdPerson />
                            </span>Your Name</label>
                    </div>

                    <div className="inputlabel">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6   flex items-center justify-center space-x-2">
                            <span className=" iconlog">
                                <MdAttachEmail />
                            </span>Email address</label>
                    </div>


                    <div className="inputlabel">
                        <input type="password" name="floating_pass" id="floating_pass" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6   flex items-center justify-center space-x-2">
                            <span className="iconlog">
                                <RiLockPasswordFill />
                            </span>your password</label>
                    </div>

                    <div className="inputlabel">
                        <input type="file" style={{ display: 'none' }} id='file'  />
                        <label htmlFor='file' className='imglog'><LuImagePlus /><span>add an avatar</span></label>
                    </div>

                    <div className="m-3">
                        <button className="btnlog">
                            <span className="mr-2">Sign Up</span>
                        </button>
                        {err && <div className="flex items-center mt-2 mb-4 text-sm text-red-800 rounded-lg   dark:text-red-400" >
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <div>
                                <span className="font-medium ">User with this email already exists</span>
                            </div>
                        </div>}
                        {Error && <div className="flex items-center mt-2 mb-4 text-sm text-red-800 rounded-lg   dark:text-red-400" >
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <div>
                                <span className="font-medium">{Error}</span>
                            </div>
                        </div>}
                    </div>

                </form>

                <div>
                    <span className='text-white'>do you have an acount?<Link to="/login" className='link'>  Login</Link></span>
                </div>
            </div>

        </div >
    )
}