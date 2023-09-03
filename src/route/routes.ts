import express, { Router } from "express";

const router: Router = express.Router();

router.get("/cart");
router.post("/cart/new");
router.post("/coupon");
router.post("/coupon/new");

export default router;
