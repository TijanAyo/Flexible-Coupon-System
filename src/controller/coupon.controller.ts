import { Request, Response } from "express";
import CouponService from "../service/coupon.service";

const couponService: CouponService = new CouponService();

class CouponController {

    public async applyCoupon(req: Request, res: Response) {
        try {
            const response = await couponService.applyCoupon(req.body);
            return res.status(201).json(response);
        } catch (err:any) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
    }

    public async addNewCoupon(req: Request, res: Response) {
        try {
            const response = await couponService.addNewCoupon(req.body);
            return res.status(201).json(response);
        } catch(err:any) {
            // TODO: Implement error handler
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
    }
}

export default CouponController;
