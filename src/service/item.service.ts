import {addItemPayload} from "../interface/interface";
import {addItemSchema} from "../validation/validate";
import {Cart, Item} from "../models/schema.model";
import {BadRequestException, Httpcode, logger, ValidationException} from "../helper";
import {ValidationError} from "joi";

class ItemService {

    /**
     * @desc Add item to cart
     * @param payload
     */
    public async addItemToCart(payload: addItemPayload) {
        try {
            await addItemSchema.validateAsync(payload);
            const cartIdExist = await Cart.findOne({ where: { id: payload.CartId }});
            if (!cartIdExist) return { message: "This cartId does not exist"};
            const newItem = await Item.create({
                name: payload.name,
                price: payload.price,
                CartId: payload.CartId,
            });
            if (!newItem) {
                throw new BadRequestException({
                    httpCode: Httpcode.BAD_REQUEST,
                    description: "An issue occurred while adding item to cart. Kindly try again in 2 minute"
                });
            }
            const items = await Item.findAll({ where: { CartId: payload.CartId }});
            const priceTotal: number = items.reduce((sum: number, item:any) => sum + item.price, 0);
            await Cart.update({ total: priceTotal }, {
                where: { id: payload.CartId },
            });
            return { message: "Item added to cart", data: newItem };
        } catch(err:any) {
            logger.error(err.message);
            if (err instanceof ValidationError) {
                throw new ValidationException({
                    httpCode: Httpcode.VALIDATION_ERROR,
                    description: err.details[0].message
                });
            }
            throw err;
        }
    }
}

export default ItemService;
