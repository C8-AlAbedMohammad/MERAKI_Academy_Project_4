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
  const [getPost, setGetPost] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [ currntUser, setCurrntUser ] = useState(localStorage.getItem("userInfo") || "");
  const storedUserInfo = localStorage.getItem("currntUser");
  const [currntUser, setCurrntUser] = useState(
    storedUserInfo ? JSON.parse(storedUserInfo) : {});
  const [userInfo,setUserInfo]=useState([])
  const [userInfoLogin,setUserInfoLoging]=useState([])
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  // if (!isLoggedIn) {
  //   navigate("/register");
  // }

  return (
    <LoginContext.Provider
      value={{ token, setToken, isLoggedIn, setIsLoggedIn,getPost, setGetPost , currntUser, setCurrntUser,userInfo,setUserInfo,userInfoLogin,setUserInfoLoging,toggle}}
    >
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path={`/profile/:userId`} element={<Profile />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
