import {createCartPayload} from "../interface/interface";
import {createCartSchema} from "../validation/validate";
import {Cart, Item} from "../models/schema.model";
import {BadRequestException, Httpcode, logger, NotFoundException, ValidationException} from "../helper";
import {ValidationError} from "joi";

const defaultCartId: string = process.env.CARTID || '';

class CartService {
    /**
     * @desc User can pick up(create) a new cart
     * @param payload
     */
    public async pickUpACart(payload: createCartPayload): Promise<{message: string}> {
        try {
            await createCartSchema.validateAsync(payload);
            const newCart = await Cart.create({
                cart_owner: payload.cart_owner
            });
            if (!newCart) {
                throw new BadRequestException({
                    httpCode: Httpcode.NOT_FOUND,
                    description: "Something went wrong while grabbing a cart"
                });
            }
            await newCart.save();
            return { message: "Cart created successfully"};
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
               throw new NotFoundException({
                  httpCode: Httpcode.NOT_FOUND,
                  description: "Cart does not exist."
               });
            }
            const items = await Item.findAll({
                where: { CartId: defaultCartId},
                attributes: {
                    exclude: ['CartId','createdAt', 'updatedAt']
                }
            });
            return { cart, items };
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

export default CartService
