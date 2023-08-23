import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/homePage/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";
export const LoginContext = createContext();
function App() {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // if (!isLoggedIn) {
  //   navigate("/register");
  // }

  return (
    <LoginContext.Provider
      value={{ token, setToken, isLoggedIn, setIsLoggedIn }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
