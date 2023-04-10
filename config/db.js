// require('dotenv').config();

const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect("mongodb://0.0.0.0:27017/File-Sharing")
    .then(() => {
      console.log("connected to database.");
    })
    .catch((e) => {
      console.log(`\n unable to connected with database:- ${e}`);
    });
}

module.exports = connectDB;
