import {createCartPayload} from "../interface/interface";
import {createCartSchema} from "../validation/validate";
import {Cart, Item} from "../models/schema.model";

const defaultCartId: string = process.env.CARTID || '';

class CartService {
    public async pickUpACart(payload: createCartPayload) {
        try {
            await createCartSchema.validateAsync(payload);
            const newCart = await Cart.create({
                cart_owner: payload.cart_owner
            });
            if (!newCart) {
                return { message: "Something went wrong while grabbing a cart"};
            }
            await newCart.save();
            return { message: "Cart created successfully"};
        } catch(err:any) {
            console.error(err.message);
        }
    }

    public async getCartInfo() {
        try {
            const cart = await Cart.findOne({
                where: { id: defaultCartId },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            if (!cart) {
                return { message: 'Cart not found' };
            }
            const items = await Item.findAll({
                where: { CartId: defaultCartId},
                attributes: {
                    exclude: ['CartId','createdAt', 'updatedAt']
                }
            });
            const priceTotal: number = items.reduce((sum: number, item:any) => sum + item.price, 0);
            await Cart.update({ total: priceTotal }, {
                where: { id: defaultCartId }
            });
            return { cart, items };
        } catch(err:any) {
            console.error(err.message);
        }
    }
}

export default CartService
