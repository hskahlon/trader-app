import express from "express";

import { signin, signup, getInfo } from "../controllers/user.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/info", getInfo);
export default router;
