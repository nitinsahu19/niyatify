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
  console.log("User auth is running");
  const token = "okk";
  const isAuthorized = token === "okk";

  if (!isAuthorized) {
    res.status(401).send("User is not authorized");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
