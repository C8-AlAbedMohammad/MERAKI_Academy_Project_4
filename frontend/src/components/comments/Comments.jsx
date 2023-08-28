import { useContext, useState } from "react";
import "./comments.scss";
import axios from "axios";
import { LoginContext } from "../../App";

const Comments = ({ Comments ,postId,getPostId}) => {

  const [comment, setComment] = useState({});
  const [message, setMessage] = useState("");
  const { token,getPost, setGetPost } = useContext(LoginContext);
console.log(postId,getPostId);
  const handleCreateComment = (idPost) => {
    axios
      .post(`http://localhost:5000/post/comment/${idPost}`, comment, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
        const a=[res.data.post]
        // setGetPost([...getPost,...a])
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  // console.log(Comments);
  return (
    <div className="comments">
      <div className="write">
        <img src={""} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          onChange={(e) => {
            setComment({
              ...comment,
              comment: e.target.value,
            });
          }}
        />
      { getPostId===postId&& <button onClick={() => handleCreateComment(postId)}>Send</button>}
      </div>
      {Comments.map((comment, i) => (
        <div className="comment" key={i}>
          <img src={comment.commenter.profilePicture} alt="" />
          <div className="info">
            <span>{comment.commenter.firstName}</span>
            <p>{comment.comment}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
