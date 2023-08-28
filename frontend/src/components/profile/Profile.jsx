import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Feeds from "../Feeds/Feeds";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../App";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { token, currntUser, setCurrntUser ,userInfo,setUserInfo} = useContext(LoginContext);
// const {id}=useParams()
// console.log(id);
  useEffect(() => {
    handleGetCurrntUser();
  }, {currntUser});
  const handleGetCurrntUser = () => {
    axios
      .get(`http://localhost:5000/users/${currntUser}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.result);
        setUserInfo(res.data.result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profile">
      <NavBar/>
      <div className="images">
        <img
          src={userInfo.coverPicture}
          alt=""
          className="cover"
        />
        <img
          src={userInfo.profilePicture}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          {/* <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div> */}
          <div className="center">
            <span>{userInfo.firstName} {userInfo.lastName}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>username</span>
              </div>
            </div>
          {userInfo._id===-1&& <button>follow</button>} 
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
    
        </div>
        <Feeds />
      </div>
    </div>
  );
};

export default Profile;
