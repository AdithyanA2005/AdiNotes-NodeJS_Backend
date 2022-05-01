const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    name: "thanos",
    age: "5 months",
  };
  res.json(obj);
});

module.exports = router;
