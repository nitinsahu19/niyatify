const express = require("express");
const User = require("../models/user.js");
const { validateSignUp } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation
    validateSignUp(req);

    const { firstName, lastName, emailId, password, gender, age, photoUrl } =
      req.body;

    // Encrypt password
    const passwordHash = await bcrypt.hash(password, 10);
    const isPresent = await User.findOne({ email: emailId });
    if (isPresent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      emailId,
      age,
      gender,
      password: passwordHash,
      photoUrl,
    });

    const savedUser = await user.save();

    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res
      .status(201)
      .json({ message: "User saved successfully!!", data: savedUser });
  } catch (error) {
    res.status(400).send("Error in savind the user" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.verifyPassword(password, user);

    if (!isPasswordValid) {
      throw new Error("Invaling credentials");
    } else {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.json({ message: "Login Successfull", user });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("Logout successfully");
});

module.exports = authRouter;
