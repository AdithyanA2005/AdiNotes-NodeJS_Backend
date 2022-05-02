const dotenv = require("dotenv");

// Load .env
dotenv.config();

// APP
const PORT = process.env.PORT;

// Database
const DATABASE_URL = process.env.DATABASE_URL;

// Password
const PASSWORD_MINIMUM_LENGTH = process.env.PASSWORD_MINIMUM_LENGTH;
const PASSWORD_MAXIMUM_LENGTH = process.env.PASSWORD_MAXIMUM_LENGTH;

// Username
const USERNAME_MINIMUM_LENGTH = process.env.USERNAME_MINIMUM_LENGTH;
const USERNAME_MAXIMUM_LENGTH = process.env.USERNAME_MAXIMUM_LENGTH;

// Name
const NAME_MAXIMUM_LENGTH = process.env.NAME_MAXIMUM_LENGTH;

module.exports = {
  PASSWORD_MINIMUM_LENGTH,
  PASSWORD_MAXIMUM_LENGTH,
  USERNAME_MINIMUM_LENGTH,
  USERNAME_MAXIMUM_LENGTH,
  NAME_MAXIMUM_LENGTH,
  DATABASE_URL,
  PORT,
};
