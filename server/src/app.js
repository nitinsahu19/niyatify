const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/User");
const { validateSignUp } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // Validation
    validateSignUp(req);
    console.log("herer arrived")

    const { firstName, lastName, emailId, password, gender, age } = req.body;

    // Encrypt password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("hash password => ", passwordHash)
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
    });

    await user.save();
    res.status(201).send("User saved successfully!!");
  } catch (error) {
    res.status(400).send("Error in savind the user" + error.message);
    console.log(error.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = req.body;

    const ALLOWED_UPDATES = ["firstName", "lastName", "skills"];

    const isAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isAllowed) {
      throw new Error(
        "User updation failed due to updation of unallowed fields "
      );
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills can maximum 10 only");
    }

    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(201).send("User updated successfully");
  } catch (error) {
    res.status(400).send("Updated failed: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established!!");
    app.listen(3000, () => console.log("Server is running at 3000"));
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
