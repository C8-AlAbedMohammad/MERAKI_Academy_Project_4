import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "./App.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/homePage/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";
import Profile from './components/profile/Profile';
export const LoginContext = createContext();
function App() {
  const navigate = useNavigate();
  const [getPost, setGetPost] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // if (!isLoggedIn) {
  //   navigate("/register");
  // }

  return (
    <LoginContext.Provider
      value={{ token, setToken, isLoggedIn, setIsLoggedIn,getPost, setGetPost }}
    >
      <div className="theme-light">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
