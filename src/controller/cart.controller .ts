import { Request, Response } from "express";
import CartService from "../service/cart.service";
import CustomErrorHandler from "../helper/custom-error-handler";

const cartService: CartService = new CartService();
const customErrorHandler: CustomErrorHandler = new CustomErrorHandler();

class ItemController {

    public async grabACart(req: Request, res: Response) {
        try {
            const response = await cartService.pickUpACart(req.body);
            return res.status(201).json(response);
        } catch(err:any) {
            return await customErrorHandler.handleCustomError(err, res);
        }

    }
    public async getCartInfo(req: Request, res: Response) {
        try {
            const response = await cartService.getCartInfo();
            return res.status(201).json(response);
        } catch(err:any) {
            return await customErrorHandler.handleCustomError(err, res);
        }

    }
}

export default ItemController;
