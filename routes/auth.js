const express = require("express");
const { body, validationResult, check } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const { findUserByEmail } = require("../utilities/database");

// Field lengths
const passwordMinLength = 8;
const passwordMaxLength = 30;
const usernameMinLength = 5;

// CREATE A NEW USER | /api/auth | auth not-required
router.post(
  "/createuser",
  // Checks for client validation error
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
  async (req, res) => {
    // If validation error send it with a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      // Checks for user with same email
      if (await User.findOne({ email: req.body.email }))
        return res.status(400).json({ error: "User with same email exists" });

      // Checks for user with same username
      if (await User.findOne({ username: req.body.username }))
        return res.status(400).json({ error: "User with same username exists" });

      // If user with same email || same username doesn't exists create new user and send it
      res.json(
        await User.create({
          username: req.body.username.trim(),
          name: req.body.name.trim(),
          email: req.body.email.trim(),
          password: req.body.password.trim(),
        })
      );
    } catch (error) {
      // TODO: ADD LOGGER
      res.status(500).send("Some error occured: ", error);
    }
  }
);

module.exports = router;
