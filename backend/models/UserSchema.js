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
    gender: { type: String, enum: ["Male" , "Female" ]},
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
    profilePicture: { type: String, default: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1693061596~exp=1693062196~hmac=c1d28bc37c653cf9ef38b5675d75a95824d7f961127f33e41d4815024b13e1a7" },
    coverPicture: { type: String, default: "https://img.freepik.com/free-photo/black-white-shot-forest-during-foggy-weather_181624-16669.jpg?w=1380&t=st=1693061757~exp=1693062357~hmac=a7efd4d09a0751b98eee5356f47142a5c738cdbf8e38abecfcbc1bffed95a35d" },
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
