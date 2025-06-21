const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nitinsahu19:knvw7K9Cf34yvqTt@namaste-nod.zsvn8.mongodb.net/niyatify"
  );
};

module.exports = connectDB;
