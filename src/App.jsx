import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import ComplimentsPage from "./pages/ComplimentsPage";
import FoodPage from "./pages/FoodPage";
import LengthOfService from "./pages/LengthOfService";
import AdminPage from "./pages/AdminPage";

function Protected({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div className="center">Loading...</div>;
  if (!user) return <Navigate to="/" />;
  return children;
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Protected><Home/></Protected>} />
        <Route path="/calendar" element={<Protected><CalendarPage/></Protected>} />
        <Route path="/compliments" element={<Protected><ComplimentsPage/></Protected>} />
        <Route path="/food" element={<Protected><FoodPage/></Protected>} />
        <Route path="/length-of-service" element={<Protected><LengthOfService/></Protected>} />
        <Route path="/admin" element={<Protected><AdminPage/></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}