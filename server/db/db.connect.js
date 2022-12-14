require("dotenv").config();
const mongoose = require("mongoose");

const connect = async () => {
  try {
    console.log("Connected to DB");
    mongoose.connect(
      process.env.DB_CONNECT_STRING,
      { useNewUrlParser: true }
    );
  } catch (err) {
    console.log(`SERVER CONNECTION ERR ${err.message}`);
  }
};

module.exports = { connect };
