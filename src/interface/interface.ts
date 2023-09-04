import {DiscountType} from "../validation/validate";

export interface addItemPayload {
    name: string;
    price: number;
    CartId: string;
}

export interface addCouponPayload {
    coupon_name: string;
    discount_type: DiscountType;
}

export interface createCartPayload {
    cart_owner: string;
}

export interface applyCouponPayload {
    coupon_name: string;
    CartId: string;
}
