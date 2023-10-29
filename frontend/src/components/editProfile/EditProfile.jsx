import React, { useState } from "react";
import axios from "axios";
import "./editProfile.scss";
const EditProfile = ({ userInfo, closeModal }) => {
  const [updatedInfo, setUpdatedInfo] = useState(userInfo);
  const [img, setImg] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };
  const handleSaveChanges = async (url) => {
  const  newUpdatedInfo={
    ...updatedInfo,
    profilePicture:url||""
   }
  await  axios
      .put(`https://bow-social.onrender.com/users/update/${userInfo._id}`, newUpdatedInfo)
      .then((res) => {
        console.log(res.data);
        closeModal();
        localStorage.setItem("currntUser",JSON.stringify(newUpdatedInfo))

      })
      .catch((err) => {
        console.error(err);
      });
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
        console.log(data);

        setUpdatedInfo({ ...updatedInfo, profilePicture: data.url });
        handleSaveChanges(data.url);

      } else {
        console.log(" upload failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editProfile">
      <h2>Edit Profile</h2>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        name="firstName"
        value={updatedInfo.firstName}
        onChange={handleInputChange}
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={updatedInfo.lastName}
        onChange={handleInputChange}
      />
      <label htmlFor="userName">userName:</label>
      <input
        type="text"
        name="userName"
        value={updatedInfo.username}
        onChange={handleInputChange}
      />
      <label htmlFor="dateOfBirth">dateOfBirth:</label><br/>
      <input
        type="date"
        name="dateOfBirth"
        value={updatedInfo.dateOfBirth}
        onChange={handleInputChange}
      /><br/>
      <label htmlFor="country">country:</label><br/>
      <input
        type="text"
        name="country"
        value={updatedInfo.country}
        onChange={handleInputChange}
      /><br/>
      <label htmlFor="email">email:</label><br/>
      <input
        type="email"
        name="email"
        value={updatedInfo.email}
        onChange={handleInputChange}
      />
      {/* <label type="file" >profile picture:</label> */}

      {/* <input
        type="file"
        id="file"
        // onChange={(e) => {
        //     console.log(e);
        // //   setImg(e.target.files[0]);
        //   handleInputChange()
        // }}
        value={updatedInfo.profilePicture}

        onChange={handleInputChange}
      /> */}
      <label htmlFor="profilePicture">Profile Picture:</label>
      <input
        type="file"
        id="file"
        name="profilePicture"
        accept="image/*"
        onChange={handleFileChange}
      />
      {img && <p>Selected: {img.name}</p>}
      <button
        onClick={() => {
          if (img) {
            uploadImage();
          } else {
            handleSaveChanges();
          }
        }}
      >
        Save Changes
      </button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default EditProfile;
