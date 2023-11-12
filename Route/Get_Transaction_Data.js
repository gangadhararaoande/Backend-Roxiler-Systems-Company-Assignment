const express = require("express");
const Transaction = express.Router();
const { TransactionModel } = require("../Models/All_Transactions");

//THIS API IS CREATED FOR ADDING A DATA TO MONGODB DATABASE
Transaction.post("/items", async (req, res) => {
  console.log(req.body);
  try {
    const post_data = new TransactionModel(req.body);
    await post_data.save();
    res.send("data added successfully");
  } catch (err) {
    res.send(`something wrong ${err}`);
  }
});

//SEARCH API ACCORDING TO DESCRIPTION AND TITLE , PAGINATION IS ALSO IMPLEMENTED HERE
Transaction.get("/items", async (req, res) => {
  const allSearchdata = [];
  if (req.query.q) {
    try {
      const searchItems = await TransactionModel.find({});
      for (let i = 0; i < searchItems.length; i++) {
        const description_data = searchItems[i].description.toLowerCase();
        const title_data = searchItems[i].title.toLowerCase();
        if (description_data.includes(req.query.q.toLowerCase())) {
          allSearchdata.push(searchItems[i]);
        }
        if (title_data.includes(req.query.q.toLowerCase())) {
          allSearchdata.push(searchItems[i]);
        }
      }

      res.send(allSearchdata);
    } catch (err) {
      res.send(err);
    }
  } else if (req.query.page) {
    const { page, limit } = req.query;
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const newlimit = Number(limit);
    let size = (page - 1) * limit;
    let paginated = await TransactionModel.find({}).limit(newlimit).skip(size);
    
    res.send(paginated);
  } else if (req.query.month) {
    const { month } = req.query;
    const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;

    try {
      const items = await TransactionModel.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] },
          },
        },
      ]);
      res.send(items);
    } catch (err) {
      res.send(err);
    }
  } else {
    try {
      const allitems = await TransactionModel.find({});
      res.send(allitems);
    } catch (err) {
      res.send(err);
    }
  }
});

module.exports = { Transaction };
