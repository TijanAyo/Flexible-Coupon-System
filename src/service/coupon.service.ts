import {addCouponPayload, applyCouponPayload} from "../interface/interface";
import {addCouponSchema, applyCouponSchema, DiscountType} from "../validation/validate";
import {Cart, Coupon} from "../models/schema.model";

class CouponService {

    public async applyCoupon(payload: applyCouponPayload) {
        try {
            await applyCouponSchema.validateAsync(payload);

            // Check if the coupon name is valid
            const isCouponNameValid = await Coupon.findOne({
                where: { coupon_name: payload.coupon_name },
            });
            if (!isCouponNameValid) {
                return { message: "Coupon code is not valid, check input and try again" };
            }

            // Check if the cart ID is valid and get the cart's total
            const cart = await Cart.findOne({
                where: { id: payload.CartId },
            });
            if (!cart) {
                return { message: "CartId is not valid, check input and try again" };
            }
            const cartTotal = cart.dataValues.total;

            let discountAmount: string = "";
            let discount: number = 0;
            let adjustedPriceTotal: number = 0;

            // Apply different discounts based on coupon types
            switch (payload.coupon_name) {
                case DiscountType.FIXED10:
                    discountAmount = "%10";
                    if (cartTotal < 50) {
                        return { message: "Can't apply this coupon on cart... total price should be above $50" };
                    }
                    discount = 10;
                    break;

                case DiscountType.PERCENT10:
                    discountAmount = "%10";
                    if (cartTotal < 100) {
                        return { message: "Can't apply this coupon on cart... total price should be above $100" };
                    }
                    discount = (cartTotal * 10) / 100;
                    break;

                case DiscountType.MIXED10:
                    discountAmount = "%10";
                    if (cartTotal < 200) {
                        return { message: "Can't apply this coupon on cart... total price should be above $200" };
                    }
                    discount = (cartTotal * 10) / 100;
                    break;

                case DiscountType.REJECTED10:
                    discountAmount = "%10 & $10";
                    if (cartTotal < 1000) {
                        return { message: "Can't apply this coupon on cart... total price should be above $1000" };
                    }
                    discount = (cartTotal * 10) / 100 + 10;
                    break;

                default:
                    return { message: "Invalid coupon type" };
            }

            adjustedPriceTotal = cartTotal - discount;

            // Update the cart with the new total
            await Cart.update({ total: adjustedPriceTotal }, {
                where: { id: payload.CartId },
            });

            return { message: `${payload.coupon_name} Coupon Applied`, discountAmount, adjustedPriceTotal };
        } catch (err:any) {
            // TODO: Throw appropriate error message
            console.log(err.message);
        }
    }


    public async addNewCoupon(payload: addCouponPayload) {
        try {
            await addCouponSchema.validateAsync(payload);
            const createCoupon = await Coupon.create({
                coupon_name: payload.coupon_name,
                discount_type: payload.discount_type,
            });
            if (!createCoupon) {
                return { message: "Something went wrong in coupon creation"};
            }
            return { message: "Coupon created"};
        } catch(err:any) {
            // TODO: Throw appropriate error message
            console.log(err.message);
        }

    }
}

export default CouponService;
