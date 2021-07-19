import mongoose from "mongoose";

mongoose
  .connect("mongodb+srv://username:username@cluster0.uzp2z.mongodb.net/", {
    useNewUrlParser: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

export default db;
