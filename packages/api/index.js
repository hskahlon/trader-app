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

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/api", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use("/stock", stockRoutes);
app.use("/user", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(path.dirname("./"), "../webapp/build", "index.html")
  );
});
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
