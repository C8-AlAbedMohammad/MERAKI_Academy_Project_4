import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [errmessage, setErrMessage] = useState("");
  const [showMessage, setshowMessage] = useState(false);

    const registerNewUser = () => {
    
      const birthDate = new Date(user.dateOfBirth);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
  
      if (age < 18) {
        setErrMessage("You must be at least 18 years old to register.");
        setshowMessage(false);
        setMessage(""); 
      }
  
    console.log(user);
    axios
      .post("http://localhost:5000/users/register", user)
      .then((res) => {
        console.log(res.data.message);
        setMessage(res.data.message);
        setshowMessage(true);
        setErrMessage("");
        navigate("/login");

      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          setErrMessage(err.response.data.message);
        } 
        setshowMessage(false);
        setMessage("");
      });
  };
  return (
    <div className="register">
      <div className="card">
        <div className="liftSide">
          <h1>Welcome To Our Website</h1>
          <p className="title">
            This is the first big web site using react js and node js for me{" "}
          </p>
          <p> Do You have an account: </p>
          <Link to="/login">
            <button>Login Now</button>
          </Link>
        </div>
        <div className="rightSide">
          <form>
            <h1>Register</h1>
            <input
              type="text"
              placeholder="first name"
              required
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="last name"
              required
              onChange={(e) => {
                setUser({ ...user, lasttName: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="UserName"
              required
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
            />
            <input
              type="date"
              placeholder="Date Of Birth"
              required
              onChange={(e) => {
                setUser({ ...user, dateOfBirth: e.target.value });
              }}
            />
      
            {/* <select
              name="Gender"
              onChange={(e) => {
                setUser({ ...user, gender: e.target.value });
                console.log(e.target.value);
              }}
            >
              <option>Chose Youre Gender</option>

              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select> */}
            <input
              type="email"
              placeholder="email"
              required
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />

            <button onClick={registerNewUser}>Login</button>
            {/* <Link to="/login"></Link> */}
            
          </form>
          {showMessage ? (
              <p className="rightMessage">{message}</p>
            ) : (
              <p className="errorMessage">{errmessage}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Register;
