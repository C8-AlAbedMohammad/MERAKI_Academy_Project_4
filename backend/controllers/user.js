const usersModel = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This function creates a  (new user)
const register = (req, res) => {
  const {
    firstName,
    lastName,
    username,
    dateOfBirth,
    gender,
    country,
    email,
    password,
    friendsRequestReceived,
  } = req.body;
  const user = new usersModel({
    firstName,
    lastName,
    username,
    dateOfBirth,
    gender,
    country,
    email,
    password,
    role: "64e271bbc93475c36974e07b",
    profilePicture:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1693061596~exp=1693062196~hmac=c1d28bc37c653cf9ef38b5675d75a95824d7f961127f33e41d4815024b13e1a7",
    coverPicture:"https://img.freepik.com/free-photo/black-white-shot-forest-during-foggy-weather_181624-16669.jpg?w=1380&t=st=1693061757~exp=1693062357~hmac=a7efd4d09a0751b98eee5356f47142a5c738cdbf8e38abecfcbc1bffed95a35d",
    friends: [],
    friendsRequestReceived,
    friendsRequestSent: [],
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      if (err?.keyPattern?.email) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      if (err?.keyPattern?.username) {
        return res.status(409).json({
          success: false,
          message: `The username already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
// Login
const login = (req, res) => {
  const { email, username, password } = req.body;

  usersModel
    .findOne({ $or: [{ email }, { username }] })
    .populate("role").populate("friends")
    .then(async (result) => {
      console.log(result);
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: ` The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          username: result.username,
          role: result.role,
        };
        console.log(payload);
        const options = {
          expiresIn: "3d",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          userInfo: { userId:result._id,
          firstName:result.firstName,
          lastName:result.lastName,
          profilePicture:result.profilePicture,
          friends:result.friends
          }}
         );
      } catch (error) {
        throw new Error(error);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// update user
const upDateUser = async (req, res) => {
  const { id } = req.params;
  let {
    firstName,
    lastName,
    username,
    dateOfBirth,
    gender,
    country,
    email,
    password,
    profilePicture,
    covePicture,
  } = req.body;
  email = email?.toLowerCase();
  username = username?.toLowerCase();
  password = await bcrypt.hash(password, 10);
  usersModel
    .findByIdAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        username,
        dateOfBirth,
        gender,
        country,
        email,
        password,
        profilePicture,
        covePicture,
      },
      { new: true }
    )
    .then((update) => {
      if (!update) {
        return res.status(404).json({
          success: false,
          message: `The user with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `User updated`,
        updated: update,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
// delete user
const deleteUserById = (req, res) => {
  const id = req.params.id;
  usersModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The user with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `User deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// get user
const getUserById = (req, res) => {
  let id = req.params.id;
  usersModel
    .findById(id)
    .populate("username")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The user with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The user ${id} `,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// send friend request

const sendFriendRequest = async (req, res) => {
    console.log(req.token);
  try {
    const { receiverId } = req.params;
    const senderId  = req.token.userId;
    console.log(req.token);

    const sender = await usersModel.findById(senderId);
    const receiver = await usersModel.findById(receiverId);
    console.log("sender: ",sender?._id,"rece: ",receiver?._id);
    if (!sender || !receiver) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    const sentRequestIndex =  sender.friendsRequestSent.findIndex(req => req.name.equals(receiverId))
    const receivedRequestIndex = receiver.friendsRequestReceived.findIndex(req => req.name.equals(senderId))
      if (
          !sentRequestIndex ||
          !receivedRequestIndex)
      {
          return res.status(400).json({ success: false, message: "Friend request not found " });
      }
    await Promise.all([ usersModel.updateOne({_id:senderId},{$push:{friendsRequestSent:{name:receiverId}}}),  usersModel.updateOne({_id:receiverId},{$push:{friendsRequestReceived:{name:senderId}}})])

 
    // !-------------------------------------------
    res
      .status(200)
      .json({ success: true, message: "Friend request sent successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Failed to send friend request.", error: error });
  }
};

const getFrindRequest=(req,res)=>{
  const userId=req.token.userId;
  usersModel
  .find({_id:userId},"friendsRequestReceived")
  .populate("friendsRequestReceived").populate(
    {
      path:"friendsRequestReceived",
      populate:{
        path:"name",
        select: "firstName lastName profilePicture",

      }

    }
  )
  .exec()
  .then((result) => {
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `No Friend Request `,
      });
    }
    res.status(200).json({
      success: true,
      message: `The friend  `,
      result: result,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });
}
// !---- cancel Friend Request ----
const cancelFriendRequest  = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId  = req.token.userId;
    console.log(req.token);

    const sender = await usersModel.findById(senderId);
    const receiver = await usersModel.findById(receiverId);
    console.log("sender: ",sender?._id,"rece: ",receiver?._id);
    if (!sender || !receiver) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
  const sentRequestIndex =  sender.friendsRequestSent.findIndex(req => req.name.equals(receiverId))
  const receivedRequestIndex = receiver.friendsRequestReceived.findIndex(req => req.name.equals(senderId))
    if (
        sentRequestIndex===-1 ||
        receivedRequestIndex===-1)
    {
        return res.status(400).json({ success: false, message: "Friend request not found " });
    }
    await Promise.all([ usersModel.updateOne({_id:senderId},{$pull:{friendsRequestSent:{name:receiverId}}}),  usersModel.updateOne({_id:receiverId},{$pull:{friendsRequestReceived:{name:senderId}}})])

 
    // !-------------------------------------------
    res
      .status(200)
      .json({ success: true, message: "Friend request canceled." });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Failed to cancel friend request.", error: error });
  }
}

// !---- Accept Friend Request ----
const acceptFriendRequest= async (req, res) => {
 
try {
    const receiverId = req.token.userId; 
    const {senderId} = req.params;
     console.log("receiverId",receiverId,"{senderId}",senderId);
    const receiver = await usersModel.findById(receiverId);
    const sender = await usersModel.findById(senderId);

    const requestIndex = receiver.friends.findIndex(req => req.equals(senderId));
console.log(requestIndex);
    if (!requestIndex===-1 ) {
        return res.status(400).json({ success: false, message: " Friend request not found" });
    }

    if (!receiver.friends.includes(senderId) && !sender.friends.includes(receiverId)) {
    await Promise.all([ usersModel.updateOne({_id:senderId},{$push:{friends:receiverId}}),  usersModel.updateOne({_id:receiverId},{$push:{friends:senderId}}),usersModel.updateOne({_id:senderId},{$pull:{friendsRequestSent:{name:receiverId}}}),  usersModel.updateOne({_id:receiverId},{$pull:{friendsRequestReceived:{name:senderId}}})])
    }else{
        return res.status(400).json({ success: false, message: " you are Friends " });
 
    }
    res
    .status(200)
    .json({ success: true, message: "Friend request accepted ." });
  
} catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Failed to accept friend request.", error: error });
}
}
// !serch for user 

const secrhUser=async (req,res)=>{
  const searchQuery = req.query.q;
  try {
    const regex = new RegExp(searchQuery)
    const users = await usersModel.find({
      $or: [
        { firstName: regex },
        { lastName: regex }
      ]
    });
    res
    .status(200)
    .json({ success: true, message: "search for friend .", users:users});
  } catch (error) {
    res.status(500).json({ message: 'Failed  request searching for users.' });
  }
}



module.exports = {
  register,
  login,
  upDateUser,
  deleteUserById,
  getUserById,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,getFrindRequest,secrhUser
};
