const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nitinsahu19:5FrCIquPUgIN0F5B@namaste-nod.zsvn8.mongodb.net/niyatify"
  );
};

module.exports = connectDB;
