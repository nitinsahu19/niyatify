const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Kindly login first");
    } else {
      const decodedValue = jwt.verify(token, "niyatify@143");

      const { _id } = decodedValue;

      const user = await User.findOne({ _id });

      if (!user) {
        return res.status(401).send("User not found. Please login again.");
      }

      req.user = user;

      next();
    }
  } catch (error) {
    res.status(401).send("Authentication failed: " + error.message);
  }
};

module.exports = { userAuth };
