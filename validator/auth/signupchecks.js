const { check, body } = require("express-validator");
const {
  USERNAME_MINIMUM_LENGTH,
  USERNAME_MAXIMUM_LENGTH,
  PASSWORD_MINIMUM_LENGTH,
  PASSWORD_MAXIMUM_LENGTH,
  NAME_MAXIMUM_LENGTH,
} = require("../../utilities/constants");
const User = require("../../models/User");
const { noSpecialCharacters, onlyLettersAndSpaces } = require("../../utilities/helpers");

const signupValidatorChecksArray = [
  // CHECKS BASED ON USERNAME
  check("username")
    // Checks the username is not undefined
    .notEmpty()
    .withMessage("Username shouldn't be empty")
    .bail()

    // Should have a minimum length USERNAME_MINIMUM_LENGTH
    .isLength({ min: USERNAME_MINIMUM_LENGTH })
    .withMessage(`Username should atleast contain ${USERNAME_MINIMUM_LENGTH} character`)
    .bail()

    // Should have a maximum length USERNAME_MAXIMUM_LENGTH
    .isLength({ max: USERNAME_MAXIMUM_LENGTH })
    .withMessage(`Username should not be greater than ${USERNAME_MAXIMUM_LENGTH} characters`)
    .bail()

    // Should Not contain special characters or whitespaces
    .custom((value) => noSpecialCharacters(value))
    .withMessage("Username should consist of only letters, digits and underscores")
    .bail(),

  // CHECKS BASED ON PASSWORD
  check("password")
    // Checks the password is not undefined
    .notEmpty()
    .withMessage("Password shouldn't be empty")
    .bail()

    // Should have a minimum length PASSWORD_MINIMUM_LENGTH
    .isLength({ min: PASSWORD_MINIMUM_LENGTH })
    .withMessage(`Password should atleast contain ${PASSWORD_MINIMUM_LENGTH} character`)
    .bail()

    // Should have a maximum length PASSWORD_MAXIMUM_LENGTH
    .isLength({ max: PASSWORD_MAXIMUM_LENGTH })
    .withMessage(`Passwords should not be greater than ${PASSWORD_MAXIMUM_LENGTH} characters`)
    .bail(),

  // CHECKS BASED ON NAME
  check("name")
    // Checks the name is not undefined
    .notEmpty()
    .withMessage("Name shouldn't be empty")
    .bail()

    // Should have a maximum length PASSWORD_MAXIMUM_LENGTH
    .isLength({ max: NAME_MAXIMUM_LENGTH })
    .withMessage(`Name should not be greater than ${PASSWORD_MAXIMUM_LENGTH} characters`)
    .bail()

    // Should only contain letters and spaces
    .custom((value) => onlyLettersAndSpaces(value))
    .withMessage("Name should consist of only letters and spaces")
    .bail(),

  // CHECKS BASED ON EMAIL
  check("email")
    // Checks the email is not undefined
    .notEmpty()
    .withMessage("Email shouldn't be empty")
    .bail()

    // Checks the email to be a valid email
    .isEmail()
    .withMessage("Enter a valid email")
    .bail(),

  // CHECK WHETHER THE EMAIL IS ALREADY TAKEN
  body("email").custom(async (value) => {
    let user = await User.findOne({ email: value });
    if (user) return Promise.reject("Email entered is already in use");
  }),

  // CHECK WHETHER THE USERNAME IS ALREADY TAKEN
  body("username").custom(async (value) => {
    let user = await User.findOne({ username: value });
    if (user) return Promise.reject("Username entered is already in use");
  }),
];

module.exports = signupValidatorChecksArray;
