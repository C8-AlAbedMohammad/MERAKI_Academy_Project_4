import React, { useContext, useEffect, useState } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import "./navBar.scss";
import "../images/1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import axios from "axios";
const NavBar = () => {
  const {
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    currntUser,
    setCurrntUser,
    userInfo,
  } = useContext(LoginContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      axios
        .get(
          `http://localhost:5000/users/search?q=${encodeURIComponent(
            searchQuery
          )}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setMatchingUsers(res.data.users);
        })
        .catch((error) => {
          console.error("Error searching for users:", error);
        });
    } else {
      setMatchingUsers([]);
    }
  }, [searchQuery]);

  return (
    <div className="topBar">
      <div className="left">
        <Link to="/">
          <span className="logo">Logo Here</span>
        </Link>
      </div>
      <div className="center">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            type="search"
            placeholder="Search..."
            className="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul>
            {matchingUsers.map((user) => (
              <li key={user._id}>  <img
              src={user.profilePicture}
              alt=""
              className="userProfilePicture"
            /> {user.firstName} {user.lastName}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="right">
        <div className="rightNavBar">
          <Link to="/">
            <span className="home">HomePage</span>
          </Link>
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
        <Link to={`/profile/${currntUser.userId}`}>
          <img
            src={currntUser.profilePicture}
            alt="images"
            className="topBarProfilePic"
          />
        </Link>
        <Link to={`/profile/${currntUser.userId}`}>
          <span>{currntUser.firstName}</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
