const display = require("./utilities/display");
const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/";
const connect = () => {
  // Extablish Connection To MongoDb
  mongoose.connect(mongoURI, () => {
    display("Connected To MongoDB");
  });
};

module.exports = connect;
