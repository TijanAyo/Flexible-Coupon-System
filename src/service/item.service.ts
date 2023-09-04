import {addItemPayload} from "../interface/interface";
import {addItemSchema} from "../validation/validate";
import {Item, Cart} from "../models/schema.model";

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
                return { message: "Something went wrong"};
            }
            const items = await Item.findAll({ where: { CartId: payload.CartId }});
            const priceTotal: number = items.reduce((sum: number, item:any) => sum + item.price, 0);
            // Update the cart with the new total
            await Cart.update({ total: priceTotal }, {
                where: { id: payload.CartId },
            });
            return { message: "Item added to cart", data: newItem };
        } catch(err:any) {
            // TODO: Throw appropriate error message
            console.error(err.message);
        }
    }
}

export default ItemService;
