const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { initializeSocket } = require("./utils/socket");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Importing routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

// creating http server on top of express server
const server = http.createServer(app);
initializeSocket(server);

// Using routers
app.use("/", authRouter, profileRouter, requestRouter, userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established!!");
    server.listen(3000, () => console.log("Server is running at 3000"));
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
