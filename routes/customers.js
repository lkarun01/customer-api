const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const auth = require("../routes/auth");

// Get Customers
try {
  router.get("/", async (req, res, next) => {
    const customers = await Customer.find({});
    res.send(customers);
    //throw new Error("BROKEN");
    next();
  });
} catch (err) {
  next(err);
}

// Get Single Customers
try {
  router.get("/:id", async (req, res, next) => {
    const customers = await Customer.findById(req.params.id);
    res.send(customers);
    //throw new Error("BROKEN");
    next();
  });
} catch (err) {
  next(err + `there is no customer for the ID ${req.params.id}`);
}

// Add customer
router.post("/add", auth.required, async (req, res, next) => {
  // Check for JSON
  if (!req.is("application/json")) {
    return next("Invalid data format");
  }

  const { name, email, balance } = req.body;
  const CustomerNew = new Customer({
    name,
    email,
    balance
  });

  try {
    const newCustomer = await CustomerNew.save();
    res.send(201);
    next();
  } catch (err) {
    return next(err.message);
  }
});

// Update customer
router.put("/:id", async (req, res, next) => {
  // Check for JSON
  if (!req.is("application/json")) {
    return next("Invalid data format");
  }

  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.send(200);
    next();
  } catch (err) {
    return next(err.message);
  }
});

// delete customer
router.delete("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
    next();
  } catch (err) {
    return next(err.message);
  }
});

module.exports = router;
