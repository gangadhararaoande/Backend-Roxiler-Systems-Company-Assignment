const express = require("express");
const Barchart = express.Router();
const { TransactionModel } = require("../Models/All_Transactions");
Barchart.get("/price", async (req, res) => {
  const { month, price } = req.query;
  const newprice = price.split("-");
  const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
  try {
    const items = await TransactionModel.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] },
          price: { $gte: Number(newprice[0]), $lte: Number(newprice[1]) },
        },
      },
    ]);
    res.send(items);
  } catch (error) {
    res.send(`error${error}`);
  }
});

module.exports = { Barchart };
