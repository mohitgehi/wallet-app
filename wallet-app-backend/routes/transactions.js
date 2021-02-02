const router = require("express").Router();
const User = require("../models/user.model");
const Transaction = require("../models/transactions.model");
const auth = require("../middleware/auth");
const { find } = require("../models/user.model");

router.post("/addmoney", auth, async (req, res) => {
  //reading the data from user

  try {
    //const id = req.query.id;
    const { amount } = req.body;
    console.log(req.body);
    console.log("amount");
    console.log(amount);
    console.log(req.user);

    const user = await User.findById(req.user);
    console.log("user");
    console.log(user);
    user.wallet = user.wallet + +amount;

    user.save();
    console.log(user);

    res.status(200).json({ msg: `${amount} added to your wallet` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/sendMoney", auth, async (req, res) => {
  //reading the data from user

  try {
    //const id = req.query.id;
    const { from, to, amount } = req.body;
    console.log(req.body);

    const user = await User.findById(req.user);
    const toUser = await User.findOne({ number: to });
    const fromUser = await User.findOne({ number: from });
    console.log("user");
    console.log(fromUser);
    console.log(toUser);

    fromUser.wallet -= +amount;
    toUser.wallet += +amount;

    const newTransaction = new Transaction({
      from: from,
      to: to,
      amount: amount,
      nameFrom: fromUser.firstName + " " + fromUser.lastName,
      nameTo: toUser.firstName + " " + toUser.lastName,
    });
    fromUser.save();
    toUser.save();
    newTransaction.save();
    // user.wallet = user.wallet + +amount;

    // user.save();
    // console.log(user);

    res.status(200).json({ msg: `${amount} sent to ${newTransaction.nameTo}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/viewtransactions", auth, async (req, res) => {
  //reading the data from user

  try {
    //const id = req.query.id;
    const user = await User.findById(req.user);

    // const transactions = await Transaction.find({ from: user.number });
    // transactions.append(await Transaction.find({ to: user.number }));

    const transactionsFrom = await Transaction.find({
      from: user.number,
    });
    const transactionsTo = await Transaction.find({
      to: user.number,
    });

    // console.log(transactionsFrom);
    // console.log(transactionsTo);
    const transactions = [...transactionsFrom, ...transactionsTo];

    console.log(transactions);
    transactions.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
