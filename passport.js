const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { authenticate } = require("./auth");
const Users = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]"
    },
    (email, password, next) => {
      // Authenticate User
      const user = authenticate(email, password);

      return next(null, user);
    }
  )
);
