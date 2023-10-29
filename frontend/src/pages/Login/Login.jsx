import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../App";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
const Login = () => {
  const { token, setToken, isLoggedIn, setIsLoggedIn, currntUser, setCurrntUser ,userInfoLogin,setUserInfoLoging} =
    useContext(LoginContext);
    const navigate = useNavigate();


  const [login, setLogin] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault()

    axios
      .post("https://bow-social.onrender.com/users/login", login)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          console.log(res.data.token);
          setToken(res.data.token);
          setCurrntUser(res.data.currntUser);
          setUserInfoLoging(res.data.currntUser.firstName);
  
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          console.log(res.data.message); 
          setErrorMessage(res.data.message);
        }
      })
  
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
      localStorage.setItem("currntUser",JSON.stringify(currntUser))
      setTimeout(() => {
        navigate("/")
     }, 1500);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("currntUser",currntUser)
      navigate("/login")
    }
  }, [token]);

  return (
    <div className="login">
      <div className="card">
        <div className="liftSide">
          <h1>Welcome To Our Website</h1>
          <p className="title">
            This is the first big web site using react js and node js for me{" "}
          </p>
          <p>Don't have an account: </p>
          <Link to="/register">
            <button>Register Now</button>
          </Link>
        </div>
        <div className="rightSide">
          <form>
            <h1>Login</h1>
            <label>UserName Or Email</label>
            <input
              type="text"
              placeholder="UserName Or Email"
              required
              onChange={(e) => {
                setLogin({ ...login, email: e.target.value });
              }}
            />
            <label>password</label>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setLogin({ ...login, password: e.target.value });
              }}
            />

            <button onClick={(e)=>handleLogin(e)}>Login</button>
           < p className="errorMessage">{errorMessage}</p>
          </form>
        </div>
      </div>
    </div>
  
  );
};

export default Login;
