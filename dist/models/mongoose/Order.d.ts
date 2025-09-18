import { Schema, Document } from 'mongoose';
export interface IOrderItem {
    productId: Schema.Types.ObjectId;
    quantity: number;
    price: number;
    totalPrice: number;
}
export interface IShippingAddress {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
}
export interface IPaymentInfo {
    method: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'cash_on_delivery';
    transactionId?: string;
    paidAt?: Date;
}
export interface IOrder extends Document {
    userId: Schema.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
    shippingAddress: IShippingAddress;
    paymentInfo: IPaymentInfo;
    orderDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: import("mongoose").Model<IOrder, {}, {}, {}, Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
