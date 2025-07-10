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

const userAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new Error("Kindly login first");
  } else {
    const decodedValue = jwt.verify(token, "niyatify@143");

    const { _id } = decodedValue;

    const user = User.findOne(_id);

    req.user = user;

    console.log(user);
  }
};

module.exports = { adminAuth, userAuth };
