import React, { useState, useEffect, createContext } from 'react';
import Sidebar from '../component/Sidebar';
import Chat from '../component/Chat';
import Chargement from '../component/Chargement';
import "../component/style.css"
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        setTimeout(() => setLoading(false), 4000);
    }, []);

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    }

    if (loading)
        return <Chargement />;
    else
        return (
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <div className='container' id={theme === "dark" ? "dark" : ""}>
                    <Sidebar />
                    <Chat />
                    <div className='switch chat-container'>
                        <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
                        <div className='button-paper'>
                            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
                        </div>
                    </div>
                </div>
            </ThemeContext.Provider>
        );
}
