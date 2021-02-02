const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  //reading the data from user
  console.log(req.body);

  try {
    const {
      email,
      password,
      firstName,
      lastName,
      number,
      address,
      city,
      state,
      pincode,
      country,
    } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: "User account already exists" });
    }

    //encryption for password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log("Password");
    console.log(passwordHash);

    const newUser = new User({
      email: email,
      password: passwordHash,
      firstName: firstName,
      lastName: lastName,
      number: number,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
      country: country,
    });

    console.log("newUser");
    console.log(newUser);

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: { id: newUser._id },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User account does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: { id: user._id },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
      wallet: user.wallet,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
