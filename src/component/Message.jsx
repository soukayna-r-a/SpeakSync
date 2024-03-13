import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import "./style.css";

export default function Message({ message }) {
    const { currentUser } = useContext(AuthContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return (
        <div ref={ref} >
            {!(message.senderId === currentUser.uid) &&
                <div className=' you'>
                    <div className="entete ">
                        <span className="status green"></span>
                        <h3>{message.dateh}  {message.dateM} </h3>
                    </div>
                    <div className="triangle"></div>
                    <div className="message" >
                        <p>{message.text}</p>
                        {message.img && <img src={message.img} alt="" />}

                    </div>
                </div>
            }
            
            {(message.senderId === currentUser.uid) &&
                <div className="me">
                    <div className="entete">
                        <h3>{message.dateh}  {message.dateM}  </h3>
                        <span className="status blue"></span>
                    </div>
                    <div className="triangle"></div>
                    <div className="message">
                        <p>{message.text}</p>
                        {message.img && <img src={message.img} alt="" />}
                    </div>
                </div>}
        </div>
    )
}