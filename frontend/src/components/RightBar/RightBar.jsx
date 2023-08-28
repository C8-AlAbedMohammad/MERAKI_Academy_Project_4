import axios from "axios";
import "./rightBar.scss";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../App";

const RightBar = () => {
  const { token, userInfo, setUserInfo, currntUser } = useContext(LoginContext);
  const [friendRec, setfriendRec] = useState({});

  useEffect(() => {
    handleGetFriendRecived();
    // handleAcceptFriendRecived()
  }, []);
  const handleGetFriendRecived = () => {
    axios
      .get(`http://localhost:5000/users/getftreq`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setfriendRec(res.data.result[0].friendsRequestReceived);
        console.log(res.data.result[0].friendsRequestReceived);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAcceptFriendRecived = (senderId) => {
    console.log(senderId);
    axios
      .post(
        `http://localhost:5000/users/accept-request/${senderId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const newReq = friendRec.filter((e, i) => {
          e._id !== senderId;
        });
        setfriendRec(newReq);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // if(friendRec&&friendRec.length===0){
  //   return <p>Looding</p>
  // }
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {friendRec.length > 0 &&
            friendRec.map((fe, i) => {
              return (
                <div className="user" key={i}>
                  <div className="userInfo">
                    <img
                      className="userInfo"
                      src={fe.name.profilePicture}
                      alt=""
                    />
                    <span>{fe.name.firstName}</span>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={(e) => handleAcceptFriendRecived(fe.name._id)}
                    >
                      Accept{" "}
                    </button>
                    <button>dismiss</button>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="item">
          <span>Online Friends</span>

          {currntUser.friends.map((e) => {
            return (
              <div className="user" key={e._id}>
                <div className="userInfo">
                  <>
                    <img src={e.profilePicture} alt="" />
                    <div className="online" />
                    <span>
                      {e.firstName} {e.lastName}
                    </span>
                  </>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
