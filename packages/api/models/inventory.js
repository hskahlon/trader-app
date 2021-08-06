import mongoose from "mongoose";

const Inventory = new mongoose.Schema({
  stockName: { type: String, required: true },
  ticker: { type: String, required: true },
  quantity: { type: Number, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  stockPrice: { type: Number, required: true },
});

export default mongoose.model("inventory", Inventory);
