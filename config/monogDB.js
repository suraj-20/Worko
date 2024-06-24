const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDb Connected.");
  } catch (error) {
    console.error("Error in connecting DB: ", error.message);
  }
};

module.exports = connectDB;
