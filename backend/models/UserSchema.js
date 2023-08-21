const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true, minlength: 5, maxlength: 20, unique: true },
    dateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const currentDate = new Date();
          const birthDate = new Date(value);
          const age = currentDate.getFullYear() - birthDate.getFullYear();

          return age >= 18;
        },
        message: "You must be at least 18 years old to register",
      },
    },
    gender: { type: String, required: true, enum: ["Male" , "Female" ]},
    country: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
       
      },
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendsRequestReceived: [
      {
        name: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        stauts: { type: String, default: "pending" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    friendsRequestSent: [
      {
        name: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        stauts: { type: String, default: "pending" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.username = this.username.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
