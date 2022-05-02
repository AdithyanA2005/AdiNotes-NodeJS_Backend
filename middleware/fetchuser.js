const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utilities/constants");

// Get user from the jwt token and add it to req object
const fetchuser = (req, res, next) => {
  // Get token from request header
  const token = req.header("auth-token");

  // If token doesn't exist return unauthorized
  if (!token) res.send(401).send({ error: "Please authenticate using a valid token" });

  try {
    // If token exists Get data from the token and send user to request
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
