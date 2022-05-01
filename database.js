const display = require("./utilities");
const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/";
const connect = () => {
  // This will establish connection to mongoDB
  mongoose.connect(mongoURI, () => {
    display("Connection Established With MongoDB");
  });
};

module.exports = connect;
