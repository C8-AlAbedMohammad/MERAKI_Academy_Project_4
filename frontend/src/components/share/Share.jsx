import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../App";
import axios from "axios";
import FileBase64 from "react-file-base64";

const Share = () => {
  const [post, setPost] = useState({});
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState();

  const [message, setMessage] = useState();

  const { token, getPost, setGetPost, userInfo, setUserInfo, currntUser } =
    useContext(LoginContext);
  // useEffect(() => {
  //   if (imgUrl) {
  //     handleCreatPost();
  //   }
  // }, [imgUrl]);

  const handleCreatPost = (url) => {
    const newPost = {
      ...post,
      image: url || "",
    };
    console.log("newPost", newPost);
    axios
      .post("http://localhost:5000/post/", newPost, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // setGetPost((pre)=>{return [...pre,...res.data.post]})
        const a = res.data.post;
        setGetPost((pre) => [...pre, a]);
        const sortedPosts = res.data.post.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        setGetPost(sortedPosts);
        handleClereInput()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClereInput = () => {
    setMessage("");
  };
  const uploadImage = async () => {
    try {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "mohammad");
      data.append("cloud_name", "dca6u433p");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dca6u433p/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImgUrl(data.url);
        console.log(data);
        handleCreatPost(data.url);
        handleClereInput()
      } else {
        console.log(" upload failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currntUser.profilePicture} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind  ${currntUser.firstName}...?`}
            value={message}
            onChange={(e) => {
              setPost({ ...post, description: e.target.value });
            }}
          />
          <img className="imgPost" src={imgUrl} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
            />

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
            <button
              onClick={() => {
                if (img) {
                  uploadImage();
                } else {
                  handleCreatPost();
                }
              }}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
