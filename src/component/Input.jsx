import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuid } from "uuid";
import "./style.css";

import { LuImagePlus } from "react-icons/lu";
import { IoSend } from "react-icons/io5";

//context
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

//fichier firebase
import { db, storage } from '../firebase';
//firebase
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

export default function Input() {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  ///time
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  //date 
  const currentdate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const handleSend = async () => {

    if (img) {

      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {

        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          dateh: currentTime,
          dateM: currentdate,
        }),
      })
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        dateh: currentTime,
        dateM: currentdate,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        dateh: currentTime,
        dateM: currentdate,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }
  return (
    <div className='footer-chat  chat-container'>
        <input type="file" style={{ display: 'none' }} id='file' onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor='file' className='imglog'><LuImagePlus /></label>

        <input className="Input" type="text" placeholder="write ..." aria-label="Full name" onChange={(e) => setText(e.target.value)} value={text} />
        <button className="btnSend" onClick={handleSend}>
          Send <span className='ml-5'><IoSend /></span>
        </button>
      </div>
  )
}
