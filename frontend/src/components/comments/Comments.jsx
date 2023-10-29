import { useContext, useState } from "react";
import "./comments.scss";
import axios from "axios";
import { LoginContext } from "../../App";
import moment from "moment";

const Comments = ({ Comments, postId, getPostId }) => {
  const [comment, setComment] = useState();
  const [message, setMessage] = useState();
  const { token, getPost, setGetPost, currntUser } = useContext(LoginContext);
  const handleCreateComment = (idPost) => {
    axios
      .post(`https://bow-social.onrender.com/post/comment/${idPost}`, {comment}, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        const b = getPost.map((e) => {
          if (e._id === idPost) {
            e.comments.push({ comment: comment, commenter: currntUser });
          }
          return e;
        });
        setGetPost(b);


      })
      .catch((err) => {
        console.log(err);
      });
  };  const handleClereInput = () => {
    setMessage("");
  };

  // console.log(Comments);
  return (
    <div className="comments">
      <div className="write">
        <img src={currntUser.profilePicture} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={message}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        {getPostId === postId && (
          <button  onClick={() => {handleCreateComment(postId);
            handleClereInput()
          }}>Send</button>
        )}
      </div>
      {Comments.map((comment, i) => (
        <div className="comment" key={i}>
          <img src={comment.commenter.profilePicture} alt="" />
          <div className="info">
            <span>{comment.commenter.firstName}</span>
            <p>{comment.comment}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
