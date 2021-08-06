import mongoose from "mongoose";

const Stock = new mongoose.Schema(
  {
    name: { type: String, required: true },
    time: { type: [String], required: true },
    value: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("stocks", Stock);
