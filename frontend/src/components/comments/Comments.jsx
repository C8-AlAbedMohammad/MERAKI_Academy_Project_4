import { useContext } from "react";
import "./comments.scss";

const Comments = ({Comments}) => {

console.log(Comments);
  return (
    <div className="comments">
      <div className="write">
        <img src={""} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {Comments.map((comment,i) => (
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
