const jwt = require("jsonwebtoken");
require('dotenv').config();

// Use an environment variable for the JWT secret key
const JWT_SEC = '../process.env.JWT_SEC';

const fetchUser = (req, res, next) => {
  // Get the token from the header
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Authentication token is missing" });
  }
  try {
    const data = jwt.verify(token, JWT_SEC);
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).send({ error: "Invalid authentication token" });
  }
};

module.exports = fetchUser;
