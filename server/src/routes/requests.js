const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(`${user.firstName} sending the connection request...`);
  } catch (error) {
    res.status(400).send("ERROR -> " + error.message);
  }
});

module.exports = requestRouter;
