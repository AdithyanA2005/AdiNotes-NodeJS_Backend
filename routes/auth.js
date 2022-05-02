const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { noSpecialCharacters, onlyLettersAndSpaces } = require("../utilities/helpers");
const { body, validationResult, check } = require("express-validator");
const {
  USERNAME_MINIMUM_LENGTH,
  USERNAME_MAXIMUM_LENGTH,
  PASSWORD_MINIMUM_LENGTH,
  PASSWORD_MAXIMUM_LENGTH,
  NAME_MAXIMUM_LENGTH,
  JWT_SECRET,
} = require("../utilities/constants");

const router = express.Router();
const User = require("../models/User");
const { findUserWithEmail, findUserWithUsername } = require("../database/operation");

// CREATE A NEW USER | /api/v1/auth/signup | auth not-required | POST
router.post(
  "/signup",
  [
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
  ],
  async (req, res) => {
    // If any validation error send it
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Generate the salt for getting the secured version of users password
    const salt = await bcrypt.genSalt(10);
    securePassword = await bcrypt.hash(req.body.password, salt);

    // If no validation error, create new user
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
        username: req.body.username,
      });

      // Creating and sending a JWT auth token with user id as payload
      const authPayload = { user: { id: user.id } };
      const authToken = jwt.sign(authPayload, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      // TODO: Add Logger
      console.error(error);
      res.status(500).send("Some Internal Error Occured in API: ");
    }
  }
);

// LOGIN A USER | /api/v1/auth/login | auth not-required | POST
router.post(
  "/login",
  [
    check("account").notEmpty().withMessage("Field cannot remain empty"),
    check("password").notEmpty().withMessage("Pasword cannot remain empty"),
  ],
  async (req, res) => {
    // If any validation error return send it
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Get the login credentials
    const { account, password } = req.body;
    const accountIdentifier = noSpecialCharacters(req.body.account) ? "username" : "email";

    try {
      // Get the user with the credentials
      let user =
        accountIdentifier === "username"
          ? await findUserWithUsername(account)
          : await findUserWithEmail(account);

      // If no user exists with the given account respond with a error
      if (!user) return res.status(400).json({ error: "Please enter correct credentials" });

      // Respond with a error if the entered password and user.password are not same
      const passwordSame = await bcrypt.compare(password, user.password);
      if (!passwordSame) return res.status(400).json({ error: "Please enter correct credentials" });

      // Generating the authtoken and send it as a response
      const authPayload = { user: { id: user.id } };
      const authToken = jwt.sign(authPayload, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      // TODO: Add Logger
      console.error(error);
      res.status(500).send("Some Internal Error Occured in API: ");
    }
  }
);
module.exports = router;
