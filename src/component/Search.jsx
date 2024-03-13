
import { FaSearch } from "react-icons/fa";
import React, { useContext, useState } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import "./style.css";

export default function Search() {

    const { currentUser } = useContext(AuthContext);

    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;

        const res = await getDoc(doc(db, "chats", combinedId));
        const userChatRefCurrentUser = doc(db, "userChats", currentUser.uid);
        const userChatRefUser = doc(db, "userChats", user.uid);

        const userChatDocCurrentUser = await getDoc(userChatRefCurrentUser);
        const userChatDocUser = await getDoc(userChatRefUser);

        if (!userChatDocCurrentUser.exists()) {
            await setDoc(userChatRefCurrentUser, {});
        }
        if (!userChatDocUser.exists()) {
            await setDoc(userChatRefUser, {});
        }
        if (!res.exists()) {
            await setDoc(doc(db, "chats", combinedId), { messages: [] });
            await updateDoc(userChatRefCurrentUser, {
                [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(userChatRefUser, {
                [combinedId + ".userInfo"]: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,

                },
                [combinedId + ".date"]: serverTimestamp(),
            });
        }
        setUser(null);
        setUsername("")
    };
    return (
        <div>
            <div className="discussion search">
                <div className="searchbar">
                    <i className="fa fa-search"><FaSearch/></i>
                    <input type="text"
                        placeholder="Find a user" 
                        onKeyDown={handleKey}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username} />

                </div>
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="discussion chat-container" onClick={handleSelect}>
                    <img src={user.photoURL} alt=""  className="profile" />
                    <div className="desc-contact">
                        <p className="name">{user.displayName}</p> 
                    </div>
                </div>
                
            )}

        </div>

    )
}
