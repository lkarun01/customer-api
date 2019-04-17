const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

// Load User Model
require("./models/User");

// Load Customer Model
require("./models/Customer");

require("./passport");

// Load Routes
const customers = require("./routes/customers");
const users = require("./routes/users");

// Mongoose connect
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch(err => {
    console.log(err);
  });

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use("/customers", customers);
app.use("/users", users);

app.listen(config.PORT, () => {
  console.log(`Server started on por ${config.PORT}`);
});
