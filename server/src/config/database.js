const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nitinsahu19:knvw7K9Cf34yvqTt@namaste-nod.zsvn8.mongodb.net/niyatify"
    );
  } catch (error) {
    console.error("Connection failed", error);
  }
};

module.exports = connectDB;
