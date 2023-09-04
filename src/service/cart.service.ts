import {createCartPayload} from "../interface/interface";
import {createCartSchema} from "../validation/validate";
import {Cart, Item} from "../models/schema.model";

const defaultCartId: string = process.env.CARTID || '';

class CartService {
    /**
     * @desc User can pick up(create) a new cart
     * @param payload
     */
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

    /**
     * @desc User can view cart information ( Cart Owner, items in cart and total )
     */
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
            return { cart, items };
        } catch(err:any) {
            console.error(err.message);
        }
    }
}

export default CartService
