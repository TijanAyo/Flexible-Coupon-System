import joi from "joi";

export enum DiscountType {
    FIXED10 = 'FIXED10',
    PERCENT10 = 'PERCENT10',
    MIXED10 = 'MIXED10',
    REJECTED10 = 'REJECTED10',
}

export const addItemSchema = joi.object({
    name: joi.string().max(20).required(),
    price: joi.number().required(),
    CartId: joi.string().required(),
});


export const addCouponSchema = joi.object({
    coupon_name: joi.string().max(20).required(),
    price: joi.number().valid(
        DiscountType.FIXED10,
        DiscountType.PERCENT10,
        DiscountType.MIXED10,
        DiscountType.REJECTED10
    ).required(),
    CartId: joi.string().required(),
});

export const createCartSchema = joi.object({
   cart_owner: joi.string().max(20).required(),
});
