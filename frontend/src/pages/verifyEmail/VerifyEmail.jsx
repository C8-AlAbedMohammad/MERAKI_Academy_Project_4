import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./VerifyEmail.scss"; 

const VerifyEmail = () => {
  const location = useLocation();
  const { token } = useParams();
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (token) {
      axios
        .post(`http://localhost:5000/users/verify-email/${token}`)
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            setShowMessage(true);
          }, 2000);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [location.search]);

  return (
    <div className="verify-email-container">
      <div className="verify-email-content">
        <h2>Verifying Email...</h2>
        {showMessage && (
          <p>Email verified successfully.</p>
        )}
      { showMessage&& <Link to="/login">
          <button className="login-button">Go to Login</button>
        </Link>}
      </div>
    </div>
  );
};

export default VerifyEmail;
