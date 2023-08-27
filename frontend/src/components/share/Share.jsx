import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { LoginContext } from "../../App";
import axios from "axios";


const Share = () => {
  const [post, setPost] = useState({});
  const [message, setMessage] = useState("");

  const {token} = useContext(LoginContext)
  const handleCreatPost = () => {
    axios
      .post("http://localhost:5000/post/", post, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={"currentUser.profilePicture"}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ...?`} onChange={(e) => {
          setPost({ ...post, description: e.target.value });
        }} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleCreatPost}>Share</button>
          <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
