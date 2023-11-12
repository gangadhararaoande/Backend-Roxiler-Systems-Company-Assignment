const mongoose = require("mongoose");
const Items_schema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sold: { type: Boolean, required: true },
  dateOfSale: { type: Date, required: true },
});
const TransactionModel = mongoose.model("Transaction-APP", Items_schema);
module.exports = {
  TransactionModel,
};
