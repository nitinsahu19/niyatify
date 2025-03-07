const express = require("express");

const app = express();

// Controller
app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello man!!");
});

app.use("/test", (req, res) => {
  res.send("This is server, who are you:)");
});

app.use("/", (req, res) => {
  res.send("Hello from the dashboard!!");
});

app.listen(3000, () => console.log("Server is running at 3000"));
