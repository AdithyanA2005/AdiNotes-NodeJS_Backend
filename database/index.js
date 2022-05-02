const display = require("../utilities/display");
const mongoose = require("mongoose");
const { DATABASE_URL } = require("../utilities/constants");

const connect = () => {
  // Extablish Connection To MongoDb
  mongoose.connect(DATABASE_URL, () => {
    display("Connected To MongoDB");
  });
};

module.exports = connect;
