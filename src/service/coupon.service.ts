import {addCouponPayload, applyCouponPayload} from "../interface/interface";
import {addCouponSchema, applyCouponSchema, DiscountType} from "../validation/validate";
import {Cart, Coupon, Item} from "../models/schema.model";
import {BadRequestException, Httpcode, logger, NotFoundException, ValidationException} from "../helper";
import {ValidationError} from "joi";

class CouponService {

    /**
     * @desc User can apply coupon to Cart
     * @param payload
     */
    public async applyCoupon(payload: applyCouponPayload) {
        try {
            await applyCouponSchema.validateAsync(payload);
            const isCouponNameValid = await Coupon.findOne({
                where: { coupon_name: payload.coupon_name },
            });
            if (!isCouponNameValid) {
                throw new BadRequestException({
                    httpCode: Httpcode.BAD_REQUEST,
                    description: "Coupon code is not valid, check input and try again"
                });
            }
            const cart = await Cart.findOne({
                where: { id: payload.CartId },
            });
            if (!cart) {
                throw new NotFoundException({
                    httpCode: Httpcode.NOT_FOUND,
                    description: "CartId is not valid, check input and try again"
                });
            }
            const cartTotal = cart.dataValues.total;
            const itemsAndCount = await Item.findAndCountAll({
                where: { CartId: payload.CartId },
            });
            const itemsInCart: number = itemsAndCount.count;

            let discountAmount: string = "";
            let discount: number = 0;
            let adjustedPriceTotal: number = 0;

            // Apply different discounts based on coupon types
            switch (payload.coupon_name) {
                case DiscountType.FIXED10:
                    discountAmount = "$10";
                    if (cartTotal < 50 || itemsInCart < 1) {
                        throw new BadRequestException({
                            httpCode: Httpcode.BAD_REQUEST,
                            description: "Can't apply this coupon on cart... total price should be above $50 and should include " +
                                "more than one item."
                        });
                    }
                    discount = 10;
                    break;

                case DiscountType.PERCENT10:
                    discountAmount = "%10";
                    if (cartTotal < 100 || itemsInCart < 2) {
                        throw new BadRequestException({
                            httpCode: Httpcode.BAD_REQUEST,
                            description: "Can't apply this coupon on cart... total price should be above $100 and should include " +
                                "more than 2 items."
                        });
                    }
                    discount = (cartTotal * 10) / 100;
                    break;

                case DiscountType.MIXED10:
                    discountAmount = "%10";
                    if (cartTotal < 200 || itemsInCart < 3) {
                        throw new BadRequestException({
                            httpCode: Httpcode.BAD_REQUEST,
                            description: "Can't apply this coupon on cart... total price should be above $200 and should include " +
                                "more than 3 items."
                        });
                    }
                    discount = (cartTotal * 10) / 100;
                    break;

                case DiscountType.REJECTED10:
                    discountAmount = "%10 & $10";
                    if (cartTotal < 1000) {
                        throw new BadRequestException({
                            httpCode: Httpcode.BAD_REQUEST,
                            description: "Can't apply this coupon on cart... total price should be above $1000"
                        });
                    }
                    discount = (cartTotal * 10) / 100 + 10;
                    break;

                default:
                    throw new BadRequestException({
                        httpCode: Httpcode.BAD_REQUEST,
                        description: "Invalid coupon type"
                    });
            }

            adjustedPriceTotal = cartTotal - discount;

            // Update the cart with the new total
            await Cart.update({ total: adjustedPriceTotal }, {
                where: { id: payload.CartId },
            });

            return { message: `${payload.coupon_name} Coupon Applied`, discountAmount, adjustedPriceTotal };
        } catch (err:any) {
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
     * @desc Admin feature: Admin users can create new coupon
     * @param payload
     */
    public async addNewCoupon(payload: addCouponPayload): Promise<{message:string}> {
        try {
            await addCouponSchema.validateAsync(payload);
            const createCoupon = await Coupon.create({
                coupon_name: payload.coupon_name,
                discount_type: payload.discount_type,
            });
            if (!createCoupon) {
                throw new BadRequestException({
                    httpCode: Httpcode.BAD_REQUEST,
                    description: "An error occurred while creating your coupon. Kindly wait 2 minute."
                });
            }
            return { message: "Coupon created" };
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

export default CouponService;
