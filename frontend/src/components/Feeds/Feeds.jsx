import React, { useContext, useEffect, useState } from "react";
import "./feeds.scss";
import axios from "axios";
import { LoginContext } from "../../App";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import moment from "moment/moment";
const Feeds = () => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    handleGetPost();
  }, []);
  const { token, getPost, setGetPost } = useContext(LoginContext);

  const [getPostId, setGetPostId] = useState("");

  const [userId, setuserId] = useState("");
  const handleGetPost = () => {
    axios
      .get("http://localhost:5000/post/timeline/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const sortedPosts = res.data.posts.sort((a, b) =>
          b.dateOfPublish.localeCompare(a.dateOfPublish)
        );
        setGetPost(sortedPosts);
        setuserId(res.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLike = (postId) => {
    axios
      .post(`http://localhost:5000/post/like/${postId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setLiked(!liked);
      })

      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="feeds">
      {getPost &&
        getPost.map((post, i) => {
          return (
            <div className="post" key={i}>
              <div className="container">
                <div className="user">
                  <div className="userInfo">
                    <img src={post.username.profilePicture} alt="" />
                    <div className="details">
                      <Link
                        to={`/profile/${post.username._id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <span className="name">{post.username.firstName}</span>
                      </Link>
                      <span className="date">
                        {moment(post.dateOfPublish).fromNow()}
                      </span>
                    </div>
                  </div>
                  <MoreHorizIcon />
                </div>
                <div className="content">
                  <p>{post.description}</p>
                  <img src={post.image} alt="" />
                </div>
                <div className="info">
                  <div className="item" onClick={() => {handleLike(post._id); 
                    setGetPostId(post._id)}}>
                    {liked &&getPostId===post._id? (
                      <FavoriteOutlinedIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                    {post.likes.length}
                  </div>
                  <div
                    className="item"
                    onClick={() => {
                      setCommentOpen(!commentOpen);
                      setGetPostId(post._id);
                    }}
                  >
                    <TextsmsOutlinedIcon />
                    {post.comments.length}
                  </div>
                  <div className="item">
                    <ShareOutlinedIcon />
                    Share
                  </div>
                </div>
                {commentOpen && getPostId === post._id && (
                  <Comments
                    Comments={post.comments}
                    postId={post._id}
                    getPostId={getPostId}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Feeds;
