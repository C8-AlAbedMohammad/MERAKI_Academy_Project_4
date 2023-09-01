import "./leftBar.scss";
import Friends from "../../assets/friends.png";
import Groups from "../../assets/diversity.png";
import Market from "../../assets/store.png";
import Watch from "../../assets/cinema.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/calendar.png";
import Gaming from "../../assets/game-console.png";
import Gallery from "../../assets/gallery.png";
import Videos from "../../assets/video-chat.png";
import Messages from "../../assets/message.png";
import { useContext } from "react";
import { LoginContext } from "../../App";
import { Link } from "react-router-dom";

const LeftBar = () => {
  const { token,userInfo,setUserInfo, userInfoLogin,setUserInfoLoging,currntUser} = useContext(LoginContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            
            <img
            src={currntUser.profilePicture}
              alt=""
            />
            <Link to={`/profile/${currntUser._id}`}className="linkSpan" >
            <span>{currntUser.firstName} {currntUser.lastName} </span>
            </Link>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
         
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events Comming</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming community</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>My Album</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />

      </div>
    </div>
  );
};

export default LeftBar;