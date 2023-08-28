import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../App";
import axios from "axios";

const Login = () => {
  const { token, setToken, isLoggedIn, setIsLoggedIn, currntUser, setCurrntUser ,userInfoLogin,setUserInfoLoging} =
    useContext(LoginContext);
    const navigate = useNavigate();


  const [login, setLogin] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault()

    axios
      .post("http://localhost:5000/users/login", login)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.token);
        setToken(res.data.token);
        setCurrntUser(res.data.userId)
        setUserInfoLoging(res.data.firstName)
       
        setTimeout(() => {
           navigate("/")
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response);
      });
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
      localStorage.setItem("userId",currntUser)
      setTimeout(() => {
        navigate("/")
     }, 2000);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("userId",currntUser)

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
