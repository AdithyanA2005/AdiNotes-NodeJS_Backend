// Database
const DATABASE_NAME = "adinote";
const DATABASE_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

// Password
const PASSWORD_MINIMUM_LENGTH = 8;
const PASSWORD_MAXIMUM_LENGTH = 50;

// Username
const USERNAME_MINIMUM_LENGTH = 5;
const USERNAME_MAXIMUM_LENGTH = 30;

// Name
const NAME_MAXIMUM_LENGTH = 100;

module.exports = {
  PASSWORD_MINIMUM_LENGTH,
  PASSWORD_MAXIMUM_LENGTH,
  USERNAME_MINIMUM_LENGTH,
  USERNAME_MAXIMUM_LENGTH,
  NAME_MAXIMUM_LENGTH,
  DATABASE_URL,
};
