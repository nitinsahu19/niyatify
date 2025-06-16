const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// Controller for user
app.get("/user/details", (req, res) => {
  throw new Error("Demo error");
  res.json({ name: "Nitin Sahu", age: 25 });
});

// Error handling route or simple we can use try catch in all the routes for better approach
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Internal server error!!");
  }
});

app.listen(3000, () => console.log("Server is running at 3000"));
