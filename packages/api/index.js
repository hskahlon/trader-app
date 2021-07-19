import express from "express";
import cors from "cors";
import path from "path";

import db from "./db/index.js";
import stockRoutes from "./routes/stock.js";
import userRoutes from "./routes/users.js";

const app = express();
const apiPort = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTION") {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    return res.status(200).json({});
  }
  next();
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use("/stock", stockRoutes);
app.use("/user", userRoutes);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
