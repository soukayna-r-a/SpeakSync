
import React, { useContext, useEffect, useState } from "react";
//from folder  context
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
//from fichier firebase
import { db } from "../firebase";
//from firebase
import { doc, onSnapshot } from "firebase/firestore";

import "./style.css";

export default function Chats() {

    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    return (
        <div >
            {chats && Object.entries(chats).sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div
                    className="discussion chat-container"
                    key={chat[0]}
                    onClick={() => handleSelect(chat[1].userInfo)}
                >
                    <img src={chat[1].userInfo.photoURL} alt="" className="profile" />
                    <div className="desc-contact">
                        <p className="name">{chat[1].userInfo.displayName}</p>
                        <p className="  text-gray-500 ml-8 text-sm">{chat[1].lastMessage?.text}</p>
                    </div>
                    <div className="timer">{chat[1].lastMessage?.dateh}</div>
                </div>
            ))}
        </div>



    )
}                   
