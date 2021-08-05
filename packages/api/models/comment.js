import mongoose from "mongoose";

const Comment = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

export default mongoose.model("comment", Comment);
