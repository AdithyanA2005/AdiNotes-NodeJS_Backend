const display = require("./utilities/display");
const mongoose = require("mongoose");

const databaseName = "adinote";
const mongoURI = `mongodb://localhost:27017/${databaseName}`;
const connect = () => {
  // Extablish Connection To MongoDb
  mongoose.connect(mongoURI, () => {
    display("Connected To MongoDB");
  });
};

module.exports = connect;
