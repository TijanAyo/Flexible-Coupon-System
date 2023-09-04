import { Request, Response } from "express";
import CouponService from "../service/coupon.service";
import CustomErrorHandler from "../helper/custom-error-handler";

const couponService: CouponService = new CouponService();
const customErrorHandler: CustomErrorHandler = new CustomErrorHandler();

class CouponController {

    public async applyCoupon(req: Request, res: Response) {
        try {
            const response = await couponService.applyCoupon(req.body);
            return res.status(201).json(response);
        } catch (err:any) {
            return await customErrorHandler.handleCustomError(err, res);
        }
    }

    public async addNewCoupon(req: Request, res: Response) {
        try {
            const response = await couponService.addNewCoupon(req.body);
            return res.status(201).json(response);
        } catch(err:any) {
            return await customErrorHandler.handleCustomError(err, res);
        }
    }
}

export default CouponController;
