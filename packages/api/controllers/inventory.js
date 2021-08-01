import Inventory from '../models/inventory.js'

const addInventory = async (req, res) => {
    var inventory = new Inventory ({
        stockName: req.body.stockName,
        ticker: req.body.ticker,
        quantity: req.body.quantity,
        email: req.body.email,
        name: req.body.name,
    });

    const oldInventory = await Inventory.find({ 
        stockName: req.body.stockName,
        ticker: req.body.ticker,
        email: req.body.email,
        name: req.body.name,
    });

    if(!isNaN(oldInventory.quantity)) {
        inventory.quantity += oldInventory.quantity;
    }

    inventory.save(function(err) {
        if(err)
            throw err;
        else
            console.log('Stock added to user');
    })
  }

const getInventory = async (req, res) => {
    const inventory = await Inventory.find({ email: req.body.email });
    res.send(inventory);
}
  
export default {
    addInventory,
    getInventory,
}
  