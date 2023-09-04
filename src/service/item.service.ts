import {addItemPayload} from "../interface/interface";
import {addItemSchema} from "../validation/validate";
import {Item, Cart} from "../models/schema.model";

class ItemService {

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
            return { message: "Item added to cart", data: newItem };
        } catch(err:any) {
            // TODO: Throw appropriate error message
            console.error(err.message);
        }
    }

    public async showItemsInCart(cartId: string) {
        try {
            const isCartValid = await Cart.findByPk(cartId);
            if (!isCartValid) {
                return { message: `Cart with ID: ${cartId} was not found`};
            }
            const listItemInCart = await Cart.findOne({
                where: { id: cartId }
            });
            return { data: listItemInCart };
        } catch(err:any) {
            // TODO: Throw appropriate error message\
            console.error("err.message");
        }
    }
}

export default ItemService;
