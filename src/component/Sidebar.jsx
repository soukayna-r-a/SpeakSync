import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';
import "./style.css";

export default function Sidebar() {
    return (
        <div className="discussions" >
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}