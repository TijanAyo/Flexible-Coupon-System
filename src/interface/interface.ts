import {DiscountType} from "../validation/validate";

export interface addItemPayload {
    name: string;
    price: number;
    CartId: string;
}

export interface addCouponPayload {
    coupon_name: string;
    price: DiscountType;
}

export interface createCartPayload {
    cart_owner: string;
}
