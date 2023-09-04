import { Request, Response } from "express";
import ItemService from "../service/item.service";
import CustomErrorHandler from "../helper/custom-error-handler";

const itemService: ItemService = new ItemService();
const customErrorHandler: CustomErrorHandler = new CustomErrorHandler();

class ItemController {

    public async addItemToCart(req: Request, res: Response) {
        try {
           const response = await itemService.addItemToCart(req.body);
           return res.status(201).json(response);
        } catch(err:any) {
            return await customErrorHandler.handleCustomError(err, res);
        }
    }
}

export default ItemController;
