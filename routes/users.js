const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../auth");
const config = require("../config");
const auth = require("../routes/auth");

// Register User
router.post("/register", auth.required, (req, res, next) => {
  // Check for JSON
  if (!req.is("application/json")) {
    return next("Invalid data format");
  }

  const { email, password } = req.body;
  const user = new User({
    email,
    password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      // Hash password
      user.password = hash;

      try {
        const newUser = await user.save();
        res.sendStatus(201);
        next();
      } catch (err) {
        return next(err.message);
      }
    });
  });
});

//Auth User
router.post("/auth", async (req, res, next) => {
  // Check for JSON
  if (!req.is("application/json")) {
    return next("Invalid data format");
  }

  const { email, password } = req.body;

  try {
    // Authenticate User
    const user = await authenticate(email, password);

    // Create JWT
    const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
      expiresIn: "15m"
    });

    const { iat, exp } = jwt.decode(token);
    res.send({ iat, exp, token });

    res.sendStatus(200);
    console.log(user);
    next();
  } catch (err) {
    // User Unauthorized
    return next(err);
  }
});

module.exports = router;
