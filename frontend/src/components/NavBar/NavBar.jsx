import React from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import "./navBar.scss"
import "../images/1.jpg"
const NavBar = () => {
  return (
    <div className="topBar">
      <div className="left">
        <span className="logo">Logo Here</span>
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
            <span className="badge">2</span>
          </div>
          <div className="icons">
            <Chat />
            <span className="badge">3</span>
          </div>{" "}
          <div className="icons">
            <Notifications />
            <span className="badge">4</span>
          </div>
        </div>
        <img src="https://images.pexels.com/photos/17901179/pexels-photo-17901179/free-photo-of-toddler-standing-in-a-tub.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="images" className="topBarProfilePic" />
      </div>
    </div>
  );
};

export default NavBar;
