const jwt = require("jsonwebtoken");
//Secrete key for JWT
const JWT_SEC = "Sahil@7718";
const fetchUser = (req, res, next) => {
  //Get the user from the JWT token and add id to req object.
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SEC);
    // console.log(data);
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchUser;
