const { check } = require("express-validator");

const loginValidatorChecksArray = [
  check("account").notEmpty().withMessage("Field cannot remain empty"),
  check("password").notEmpty().withMessage("Pasword cannot remain empty"),
];

module.exports = loginValidatorChecksArray;
