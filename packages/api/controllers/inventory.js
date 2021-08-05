import Inventory from "../models/inventory.js";

const addInventory = async (req, res) => {
  const inventory = new Inventory({
    stockName: req.body.stockName,
    ticker: req.body.ticker,
    quantity: req.body.quantity,
    email: req.body.email,
    name: req.body.name,
    date: new Date(),
    stockPrice: req.body.stockPrice,
  });

  const query = {
    stockName: req.body.stockName,
    ticker: req.body.ticker,
    email: req.body.email,
    name: req.body.name,
  };

  const oldInventory = await Inventory.find(query);
  if (oldInventory.length != 0) {
    const newQuantity = req.body.quantity + oldInventory[0].quantity;
    Inventory.findByIdAndUpdate(
      { _id: oldInventory[0]._id },
      { quantity: newQuantity },
      { useFindAndModify: false },
      function () {
        console.log("Stock updated");
      }
    );
  } else {
    inventory.save(function (err) {
      if (err) {
        throw err;
      } else {
        console.log("Stock added to user");
      }
    });
  }
  res.send("Stock bought.");
};

const sellInventory = async (req, res) => {
  const query = {
    stockName: req.body.stockName,
    ticker: req.body.ticker,
    email: req.body.email,
    name: req.body.name,
  };

  const oldInventory = await Inventory.find(query);
  if (oldInventory.length != 0) {
    const newQuantity = oldInventory[0].quantity - req.body.quantity;
    if (newQuantity < 1) {
      Inventory.findByIdAndDelete(
        oldInventory[0]._id,
        { useFindAndModify: false },
        function () {
          console.log("Stock deleted");
        }
      );
    } else {
      Inventory.findByIdAndUpdate(
        { _id: oldInventory[0]._id },
        { quantity: newQuantity },
        { useFindAndModify: false },
        function () {
          console.log("Stock updated");
        }
      );
    }
    res.send("Stock sold.");
  } else {
    res.send("You don't own this stock.");
  }
};

const getInventory = async (req, res) => {
  const query = {
    email: req.body.email,
    name: req.body.name,
  };
  const inventory = await Inventory.find(query);
  res.send(inventory);
};

export default {
  addInventory,
  sellInventory,
  getInventory,
};
