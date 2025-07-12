const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// Importing routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

// Using routers
app.use("/", authRouter, profileRouter, requestRouter, userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established!!");
    app.listen(3000, () => console.log("Server is running at 3000"));
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
