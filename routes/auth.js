const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signupValidatorChecksArray = require("../config/validator/signupchecks");
const loginValidatorChecksArray = require("../config/validator/loginchecks");
const getValidationError = require("../middleware/get-validation-error");
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
const { findUserWithEmail, findUserWithUsername } = require("../database/operation");
const { noSpecialCharacters } = require("../utilities/helpers");
const { JWT_SECRET } = require("../utilities/constants");

const router = express.Router();

// CREATE A NEW USER | /api/v1/auth/signup | auth not-required | POST
router.post("/signup", signupValidatorChecksArray, getValidationError, async (req, res) => {
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
});

// LOGIN A USER | /api/v1/auth/login | auth not-required | POST
router.post("/login", loginValidatorChecksArray, getValidationError, async (req, res) => {
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
});

// GET LOGIN IN USER DETAILS | /api/v1/auth/getuser | auth requierd | POST
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    // TODO: Add Logger
    console.error(error);
    res.status(500).send("Some Internal Error Occured in API: ");
  }
});

module.exports = router;
