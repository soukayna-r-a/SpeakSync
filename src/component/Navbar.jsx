import React, { useContext } from 'react';

import { FcCollaboration } from "react-icons/fc";
//from firebase
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

//from folder contex t
import { AuthContext } from './../context/AuthContext';

import "./style.css";


export default function Navbar() {
    const { currentUser } = useContext(AuthContext)

    return (
        <div className="navbar">
            <div className="lognavber">
                <FcCollaboration />
                <div className="col-md-12 text-center">
                    <h3 className="animate-charcter-lognavbar"> SpeakSync</h3>
                </div>
            </div>
            <div className="navbar-side">
                <div className='user'>
                <img src={currentUser.photoURL} alt=""  className='profile'/>
                <span className='text-gray-800 font-bold text-base'>{currentUser.displayName}</span>
                </div>
                <button className="btnlogout" onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    );
}
