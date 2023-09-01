import React, { useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleVerifyEmail = async () => {
    try {
      // Replace 'your-server-url' with your actual server URL
      const response = await axios.post('your-server-url/verify-email', {
        emailToken: 'the-email-token', // Replace with the actual email token
      });

      if (response.status === 200) {
        setVerificationStatus('Email verification successful.');
        // You can perform any additional actions here, like updating your UI.
      } else {
        setVerificationStatus('Email verification failed. Invalid token.');
      }
    } catch (error) {
      setVerificationStatus('An error occurred while verifying the email.');
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleVerifyEmail}>Verify Email</button>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default VerifyEmail;
