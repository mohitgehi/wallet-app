const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  from: { type: Number, required: true },
  to: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  nameFrom: { type: String, required: true },
  nameTo: { type: String, required: true },
});

module.exports = Transactions = mongoose.model(
  "transactions",
  transactionSchema
);
