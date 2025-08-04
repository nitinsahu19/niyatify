const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateUpdateRequestData } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    console.log(req.body);
    const isAccepted = validateUpdateRequestData(req);

    if (!isAccepted) {
      throw new Error("Updation not allowed for these fields");
    } else {
      const loggedInUser = req.user;

      Object.keys(req.body).forEach(
        (key) => (loggedInUser[key] = req.body[key])
      );

      loggedInUser.save();

      res.json({
        message: `${loggedInUser.firstName}, Your profile successfully updated...`,
        data: loggedInUser,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = profileRouter;
