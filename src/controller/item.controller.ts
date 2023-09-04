import { Request, Response } from "express";
import ItemService from "../service/item.service";

const itemService: ItemService = new ItemService();

class ItemController {

    public async addItemToCart(req: Request, res: Response) {
        try {
           const response = await itemService.addItemToCart(req.body);
           return res.status(201).json(response);
        } catch(err:any) {
            // TODO: Implement error handler
            console.error(err.message);
            return res.status(500).json({error: err.message});
        }
    }
}

export default ItemController;
