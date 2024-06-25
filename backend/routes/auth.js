const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

//Secrete key for JWT
const JWT_SEC = "Sahil@7718";

//Route 1 : Create a User with end-point using POST: /api/v1/auth/createUser .no loggin require
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").trim().isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Make sure password length should be at least 6")
      .trim()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    //Check and valid request data or req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return  res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the email already exists
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      //Generate a salt for password hash using bcrypt.genSalt(saltRound) & saltRound is 10;
      const salt = await bcrypt.genSalt(10);
      //Generate Hash of the request body password with combining salt using bcrypt.hash(plaintextPassword,salt)  and then  replace  the req.body.password with the Hash password.
      req.body.password = await bcrypt.hash(req.body.password, salt);

      // Create and save the new user
      user = new Users(req.body);
      await user.save();

      //get user id to generate auth token or JWT
      const data = {
        user: {
          id: user.id,
        },
      };

      //Generate authtiken or JWT tocken
      const authtoken = jwt.sign(data, JWT_SEC);
      //Send Response to user success message and authtoken
      return res.json({ success: "User has been created successfully", authtoken });
    } catch (error) {
      console.error("ERROR " + error.message);
      return res.status(500).send("Internal Server error");
    }
  }
);

// Route 2 : Authenticate a User with end-point using POST: /api/v1/auth/login .login require
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank or less than 6")
      .trim()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    //Check and valid request data or req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructuring or get email and password from request body
    try {
      const { email, password } = req.body;
      //Finding the email exist or not in Database
      let user = await Users.findOne({ email });
      if (!user) {
        //if not exist email in Database then send response with bas status
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      //Verify or compare hashed password with given password with the help of bcrypt.compare(plaintextPassword,dbHashedPassword)
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        //if wrong password then send response as a bad request
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      //get user id to generate auth token or JWT
      const data = {
        user: {
          id: user.id,
        },
      };

      //Generate authtiken or JWT tocken
      const authtoken = jwt.sign(data, JWT_SEC);
      return res.json({ authtoken });
    } catch (error) {
      console.error("ERROR " + error.message);
      return res.status(500).send("Internal server error!");
    }
  }
);

//Route 3 : Get User details with end-point using POST: /api/v1/auth/getUser . loggin require

router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    return res.json(user);
  } catch (error) {
    console.error("Error" + error.message);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
