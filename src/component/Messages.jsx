
import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import "./style.css";
export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (data.chatId) {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  } else {
    setMessages([]);
    }
  }, [data.chatId]);
  return (
    <div className="chat-care chat-container">
    {messages.map((m) => (
      <Message message={m} key={m.id} />
    ))}
  </div>
  )
}

