import express, { Router } from "express";
import CartController from "../controller/cart.controller ";
import ItemController from "../controller/item.controller";
import CouponController from "../controller/coupon.controller";

const cartController: CartController = new CartController();
const itemController: ItemController = new ItemController();
const couponController: CouponController = new CouponController();

const router: Router = express.Router();

router.get("/cart", cartController.getCartInfo);
router.get("/cart/:cartId", itemController.viewCart);
router.post("/cart/new", cartController.grabACart);
router.post("/item/new", itemController.addItemToCart);
router.post("/coupon", couponController.applyCoupon);
router.post("/coupon/new", couponController.addNewCoupon);

export default router;
