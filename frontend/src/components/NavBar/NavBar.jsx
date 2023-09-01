import React, { useContext, useEffect, useState } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import "./navBar.scss";
import "../images/1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import axios from "axios";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Dropdown } from "react-bootstrap";

const NavBar = () => {
  const {
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    currntUser,
    setCurrntUser,
    userInfo,
    toggle,
    darkMode,
  } = useContext(LoginContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);
  const logOut=()=>{
      setIsLoggedIn(false);
      setToken(localStorage.removeItem('token')) ;
      setToken(localStorage.removeItem('userInfo')) ;
      setToken(localStorage.removeItem('darkMode')) ;

      navigate("/login")
  }
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
          console.error(error);
        });
    } else {
      setMatchingUsers([]);
    }
  }, [searchQuery]);

  return (
    <div className="topBar">
      <div className="left">
        <Link to="/">
          <span className="logo">Bow Social</span>
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
              <Link to={`/profile/${user._id}`}>
             
                <li key={user._id}>
                 
                  <img
                    src={user.profilePicture}
                    alt=""
                    className="userProfilePicture"
                  />
                  {user.firstName} {user.lastName}
                </li>
              </Link>
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
          {darkMode ? (
            <WbSunnyOutlinedIcon onClick={toggle} />
          ) : (
            <DarkModeOutlinedIcon onClick={toggle} />
          )}
        </div>
        {/* <Link to={`/profile/${currntUser.userId}`}>
          <img
            src={currntUser.profilePicture}
            alt="images"
            className="topBarProfilePic"
          />
        </Link>
        <Link to={`/profile/${currntUser.userId}`}>
          <span>{currntUser.firstName}</span>
        </Link> */}
                <Dropdown>
          <Dropdown.Toggle id="profile-dropdown">
            <img
              src={currntUser.profilePicture}
              alt="Profile"
              className="topBarProfilePic"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu align="right">
              <Dropdown.Item as={Link} to={`/profile/${currntUser._id}`}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={logOut} >
               Log Out...
              </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

      </div>
    </div>
  );
};

export default NavBar;
