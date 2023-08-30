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
  const [img, setImg] = useState({});
  const [imgUrl, setImgUrl] = useState();

  const [message, setMessage] = useState();

  const { token, getPost, setGetPost, userInfo, setUserInfo, currntUser } =
    useContext(LoginContext);
    useEffect(() => {
      if (imgUrl) {
        handleCreatPost();
      }
    }, [imgUrl]);
  
  const handleCreatPost = () => {
    const newPost = {
      ...post,
      image: imgUrl,
    };
    console.log('newPost:', newPost); 
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
        const sortedPosts = res.data.posts.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        setGetPost(sortedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClereInput = () => {
    setMessage("");
  };
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "mohammad");
    data.append("cloud_name", "dca6u433p");
    fetch("  https://api.cloudinary.com/v1_1/dca6u433p/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        console.log(img);
        setImgUrl(data.url);
        console.log('imgUrl:', imgUrl);

        // setTimeout(() => {
        //   handleCreatPost();
        // }, 2000);
        
      })
      .catch((err) => console.log(err));
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
          <img src={imgUrl}/>
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
            
            {/* <FileBase64 multiple={false} onDone={({base64})=>{ setPost({ ...post, image: base64 });}} style={{ display: "none"  }} className="fileInput"/> */}

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
                uploadImage();
                handleClereInput();
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
