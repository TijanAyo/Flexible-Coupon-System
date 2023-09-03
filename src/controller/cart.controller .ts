import { Request, Response } from "express";
import CartService from "../service/cart.service";

const cartService: CartService = new CartService();

class ItemController {

    public async grabACart(req: Request, res: Response) {
        try {
            const response = await cartService.pickUpACart(req.body);
            return res.status(201).json(response);
        } catch(err:any) {
            // TODO: Implement error handler
            return res.status(500).json({ error: err.message });
        }

    }
    public async getCartInfo(req: Request, res: Response) {
        try {
            const response = await cartService.getCartInfo();
            return res.status(201).json(response);
        } catch(err:any) {
            // TODO: Implement error handler
            return res.status(500).json({ error: err.message });
        }

    }
}

export default ItemController;
