const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  obj = {
    name: "thanos",
    age: "5 months",
  };
  res.json(obj);
});

module.exports = router;
