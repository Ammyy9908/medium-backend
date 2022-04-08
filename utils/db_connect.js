const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

// Connect to MongoDB
const connect_db = async () => {
  try {
    const connected = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return connected;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = connect_db;
