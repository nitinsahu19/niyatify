const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequests");
const User = require("../models/User");
const ConnectionRequest = require("../models/connectionRequests");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id;
      const status = req.params.status;
      const toUser = await User.findOne({ _id: toUserId });

      // If toUserId is not valid
      console.log(toUser);
      if (!toUser) {
        throw new Error("User not found");
      }

      // Validation for status
      const isAllowed = ["interested", "ignored"].includes(status);

      if (!isAllowed) {
        throw new Error("Status type is invalid");
      }

      // Check is connection req already exists
      const isExists = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isExists) {
        throw new Error("Connection request already exists!!");
      }

      const connectionRequest = new ConnectionRequestModel({
        toUserId,
        fromUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: `${req.user.firstName} ${
          status === "interested" ? "is" : ""
        } ${status} ${status === "interested" ? "in" : ""} ${toUser.firstName}`,
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR -> " + error.message);
    }
  }
);

module.exports = requestRouter;
