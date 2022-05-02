const User = require("../models/User");

const findUserWithEmail = async (email) => {
  let user = await User.findOne({ email });
  return user;
};

const findUserWithUsername = async (username) => {
  let user = await User.findOne({ username });
  return user;
};

module.exports = {
  findUserWithEmail,
  findUserWithUsername,
};
