const express = require("express");
const { body, validationResult, check } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const { findUserByEmail } = require("../utilities/database");

// Field lengths
const passwordMinLength = 8;
const passwordMaxLength = 30;
const usernameMinLength = 5;

function handleDBErrors(err) {
  if (Object.keys(err.keyPattern).includes("email")) return { message: "Email already exists" };
  if (Object.keys(err.keyPattern).includes("username"))
    return { message: "Username already exists" };
  return { message: "Unknown Error Occured in API, we will fix it soon" };
}

// CREATE A NEW USER | /api/auth | auth not-required
router.post(
  "/createuser",
  // Onpage Validation Checks
  [
    check("username")
      .isLength({ min: usernameMinLength })
      .withMessage(`Username should atleast contain ${usernameMinLength} character`),

    check("password")
      .isLength({ min: passwordMinLength })
      .withMessage(`Password should atleast contain ${passwordMinLength} character`)
      .isLength({ max: passwordMaxLength })
      .withMessage(`Passwords should not exceed the length of ${passwordMaxLength} characters`),

    check("email", "Invalid Email Entered").isEmail(),
  ],
  (req, res) => {
    // If onpage validation errors exists send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // (Create new user || Handle DB errors) && finally provide the new-user/db-error
    User.create({
      username: req.body.username.trim(),
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim(),
    })
      .then((user) => res.json(user))
      .catch((err) => {
        res.status(400).send(handleDBErrors(err));
      });
  }
);

module.exports = router;
