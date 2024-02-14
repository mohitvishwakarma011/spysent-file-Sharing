// require('dotenv').config();

const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URL)
    .then(() => {
      console.log("connected to database.");
    })
    .catch((e) => {
      console.log(`\n unable to connected with database:- ${e}`);
    });
}

module.exports = connectDB;
