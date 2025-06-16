const express = require("express");

const app = express();

// Controller
app.get(
  "/user",
  (req, res, next) => {
    console.log("1st route handler running");
    next();
  },
  (req, res, next) => {
    console.log("2nd route handler is working");
    // next();
  },
  (req, res) => {
    res.json({ name: "Nitin Sahu", age: 25 });
  }
);

app.listen(3000, () => console.log("Server is running at 3000"));
