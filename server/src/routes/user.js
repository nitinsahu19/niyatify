const express = require("express");
const User = require("../models/user");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequests");
const mongoose = require("mongoose");

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
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const page = req.query.page || 1;
    let limit = req.query.limit || 10;

    // Sanitizing limit from max data request
    limit = limit > 50 ? 50 : limit;

    // Step 1: Find all relevant connections (from or to the user)
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
      status: { $in: ["accepted", "rejected", "ignored", "interested"] },
    });

    // Step 2: Extract connected user IDs
    const connectionIds = connections.map((item) => {
      const from = item.fromUserId.toString();
      const to = item.toUserId.toString();
      return from === loggedInUserId.toString() ? to : from;
    });

    // Step 3: Add logged-in user ID to list to exclude themselves too
    connectionIds.push(loggedInUserId.toString());

    // Step 4: Convert all IDs to ObjectId for consistency
    const objectIdsToExclude = connectionIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Step 5: Query only users not in connectionIds
    const users = await User.find(
      { _id: { $nin: objectIdsToExclude } },
      "firstName lastName emailId gender age skills about" // project only what’s needed
    )
      .skip((page - 1) * limit >= 0 ? (page - 1) * limit : 0)
      .limit(limit);

    // Step 6: Send response
    res.status(200).json({
      message: "Data fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRouter;
