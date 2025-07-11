const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminAuth = (req, res, next) => {
  console.log("Auth validation is running");
  const token = "xyza";

  const isAuthorized = token === "xyz";

  if (!isAuthorized) {
    res.status(401).send("Admin is not authorized");
  } else {
    next();
  }
};

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Kindly login first");
    } else {
      const decodedValue = jwt.verify(token, "niyatify@143");

      const { _id } = decodedValue;

      const user = await User.findOne({ _id });

      req.user = user;

      next();
    }
  } catch (error) {
    res.status(400).send("ERROR -> " + error.message);
  }
};

module.exports = { adminAuth, userAuth };
