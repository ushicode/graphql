require("dotenv").config();
const mongoose = require("mongoose");

const connect = async () => {
  try {
    console.log("Connected to DB");
    await mongoose.connect(
      process.env.DB_CONNECT_STRING, //mongodb+srv://appadmin:<password>@app-cluster.thing.mongodb.net/?retryWrites=true&w=majority
      {useNewUrlParser: true }
      );
  } catch (err) {
    console.log(`SERVER CONNECTION ERR => ${err.message}`);
  }
};

module.exports = { connect };
