const express = require("express");
const User = require("../models/User");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequests");

const SAFE_DATA = [
  "firstName",
  "lastName",
  "age",
  "photoUrl",
  "about",
  "skills",
];

userRouter.patch("/user/:userId", async (req, res) => {
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

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", SAFE_DATA);

    res.send(connectionRequests);
  } catch (error) {
    res.status(400).send("ERROR -> " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  const connections = await ConnectionRequest.find({
    $or: [
      { fromUserId: loggedInUser._id, status: "accepted" },
      { toUserId: loggedInUser._id, status: "accepted" },
    ],
  })
    .populate("fromUserId", SAFE_DATA)
    .populate("toUserId", SAFE_DATA);

  const data = connections.map((connection) =>
    connection.fromUserId._id.toString() === loggedInUser._id.toString()
      ? connection.toUserId
      : connection.fromUserId
  );

  res.json({ data });
  // res.json({ data: connections });
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = [];
    // Akshay will not see the cards of ->  his own, whom he ignored or send request already, already a connection with akshay
    const fetchedConnections = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
          status: { $in: ["accepted", "rejected", "ignored", "interested"] },
        },
        {
          toUserId: loggedInUser._id,
          status: { $in: ["accepted", "rejected", "ignored", "interested"] },
        },
      ],
    });

    connections.push(fetchedConnections);
    connections.push(loggedInUser);

    console.log(connections);
    // const users = await User.aggregate([{}]);

    res.send("ok");
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = userRouter;
