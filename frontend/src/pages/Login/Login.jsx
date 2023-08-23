import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../App";
import axios from "axios";

const Login = () => {
  const { token, setToken, isLoggedIn, setIsLoggedIn } =
    useContext(LoginContext);

  const navigate = useNavigate();

  const [login, setLogin] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/users/login", login)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.token);
        setToken(res.data.token);
        navigate("/register");
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
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
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

            <button onClick={handleLogin}>Login</button>
           < p className="errorMessage">{errorMessage}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
