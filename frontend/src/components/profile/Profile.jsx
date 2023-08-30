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
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comments from "../comments/Comments";

const Profile = () => {
  const { token, currntUser, setCurrntUser, userInfo, setUserInfo } =
    useContext(LoginContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const { userId } = useParams();
  const [test, setTest] = useState("");
  const [getPostId, setGetPostId] = useState("");
  console.log(currntUser._id);
  const [post, setPost] = useState([]);
  useEffect(() => {
    
    handleGetCurrntUser();
    getUserPost();
  }, []);
  const handleGetCurrntUser = () => {
    axios
      .get(`http://localhost:5000/users/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.result._id);
        setUserInfo(res.data.result);
        // console.log(currntUser.friends);
        const result = currntUser.friends.map((obj) => obj._id);
        setTest(result);
        const isFriend = currntUser.friends.some(
          (friend) => friend._id === res.data.result._id
        );
        setIsFriend(isFriend);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(currntUser);
  };
  const getUserPost = () => {
    axios
      .get(`http://localhost:5000/post/timeline/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.posts);
        setPost(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLike = (postId) => {
    axios
      .post(
        `http://localhost:5000/post/like/${postId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getUserPost();
      })

      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="profile">
      <NavBar />
      <div className="images">
        {userInfo.coverPicture ? (
          <img src={userInfo.coverPicture} alt="" className="cover" />
        ) : (
          <img
            src="https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg"
            className="cover"
          />
        )}
        {userInfo.profilePicture ? (
          <img src={userInfo.profilePicture} alt="" className="profilePic" />
        ) : (
          <img
            src="https://pngtree.com/freepng/user-vector-avatar_4830521.html"
            className="profilePic"
          />
        )}
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
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
          </div>
          <div className="center">
            <span>
              {userInfo.firstName} {userInfo.lastName}
            </span>
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
            {/* {test && test.includes(userInfo._id) ? (
              <button>remove</button>
            ) : (
              <button>add</button>
            )} */}
            {userId !== currntUser._id ? (
              isFriend ? (
                <button>Remove Friend</button>
              ) : (
                <button>Add Friend</button>
              )
            ) : (
              <button>Edit Profile</button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        {post &&
          post.map((post, i) => {
            return (
              <div className="post" key={post._id}>
                <div className="container">
                  <div className="user">
                    <div className="userInfo">
                      <img src={post.username.profilePicture} alt="" />
                      <div className="details">
                        <Link
                          to={`/profile/${post.username._id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <span className="name">
                            {post.username.firstName}
                          </span>
                        </Link>
                        <span className="date">
                          {moment(post.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                    {post.username._id === currntUser.userId && (
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>Edit Post</Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              handleDeletePost(post._id);
                            }}
                          >
                            Delete Post
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                  <div className="content">
                    <p>{post.description}</p>
                    <img src={post.image} alt="" />
                  </div>
                  <div className="info">
                    <div
                      className="item"
                      onClick={() => {
                        handleLike(post._id);
                        setGetPostId(post._id);
                      }}
                    >
                      {post.likes.includes(currntUser.userId) ? (
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
    </div>
  );
};

export default Profile;
