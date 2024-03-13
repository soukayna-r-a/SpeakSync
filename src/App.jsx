import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Log_in from './pages/Log_in';
import Log_up from './pages/Log_up';
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
export default function App() {

  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };
  
  return (
      <BrowserRouter>
        <Routes >
          <Route path="/">
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="login" element={<Log_in />} />
            <Route path="register" element={<Log_up />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
