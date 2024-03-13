import React, { useContext } from 'react'
//component
import Input from './Input'
import Messages from './Messages';

//from folder context
import { ChatContext } from '../context/ChatContext';

import "./style.css";
export default function Chat() {
    const { data } = useContext(ChatContext);
    return (
        <div className="chat">
            <div className="header-chat chat-container">
                <img src={data.user?.photoURL} className='profile'/>
                <p className="name">{data.user?.displayName}</p>
                <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
            </div>
            <Messages/>
            <Input />
        </div >
    )

}
