const { mongoose } = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address : *" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong password : *" + value);
        }
      },
    },
    age: {
      type: Number,
      required: true,
      trim: true,
      min: [18, "Age must be at least 18"],
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ["male", "female", "others"],
        message: `Selected gender, {VALUE} is invalid`,
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Not valid gender");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url : *" + value);
        }
      },
    },
    about: {
      trim: true,
      type: String,
      default: "Hey's there, I am using Node.js",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);



// Schema methods
userSchema.methods.getJWT = async function () {
  const user = this; //attaching instance to user

  // Creating a JWT token
  const token = jwt.sign({ _id: user._id }, "niyatify@143", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.verifyPassword = async function (inputPassword) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(inputPassword, this.password); //it can also be user as -> user.password
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
