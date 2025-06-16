const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// middlewares
app.use("/admin", adminAuth);
app.use("/user", userAuth);

// Controller for  admin
app.post("/admin/deleteData", (req, res) => {
  res.send("Data deleted successfully");
});

// Controller for user
app.get("/user/details", (req, res) => {
  res.json({ name: "Nitin Sahu", age: 25 });
});

app.listen(3000, () => console.log("Server is running at 3000"));
