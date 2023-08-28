import React, { useContext } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import "./navBar.scss"
import "../images/1.jpg"
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
const NavBar = () => {
  const { token, setToken, isLoggedIn, setIsLoggedIn, currntUser, setCurrntUser ,userInfo} =
  useContext(LoginContext);

  return (
    <div className="topBar">
      <div className="left">
        <span className="logo" >Logo Here</span>
      </div>
      <div className="center">
        <div className="searchBar">
          <Search className="searchIcon"/>
          <input type="search" placeholder="Search..." className="searchInput" />
        </div>
      </div>
      <div className="right">
        <div className="rightNavBar">
          <span className="home">HomePage</span>
        </div>
        <div className="rightBarIcon">
          <div className="icons">
            <Person />
            <span className="badge">4</span>
          </div>
          <div className="icons">
            <Chat />
            <span className="badge">3</span>
          </div>
          <div className="icons">
            <Notifications />
            <span className="badge">4</span>
          </div>
        </div>
        <img src={userInfo.profilePicture} alt="images" className="topBarProfilePic"  />
      </div>
    </div>
  );
};

export default NavBar;
