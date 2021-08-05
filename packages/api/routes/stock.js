import { Router } from "express";

import fromDB from "../controllers/stock.js";

const router = Router();

router.post("/stock", fromDB.createStock);
router.put("/stock/:id", fromDB.updateStock);
router.delete("/stock/:id", fromDB.deleteStock);
router.get("/stock/:id", fromDB.getStockById);
router.get("/stocks", fromDB.getStocks);

export default router;
