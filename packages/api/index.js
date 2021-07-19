import express from "express";
import cors from "cors";
import path from "path";

import db from "./db/index.js";
import stockRoutes from "./routes/stock.js";
import userRoutes from "./routes/users.js";

const app = express();
app.use(cors());

const apiPort = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use("/stock", stockRoutes);
app.use("/user", userRoutes);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
