const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  //reading the data from user

  try {
    //const id = req.query.id;
    const user = await User.findById(req.user);
    console.log("user");
    res.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      number: user.number,
      address: user.address,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      country: user.country,
      wallet:user.wallet
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
