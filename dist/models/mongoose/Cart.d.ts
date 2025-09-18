import { Schema, Document } from 'mongoose';
export interface ICartItem {
    productId: Schema.Types.ObjectId;
    quantity: number;
    price: number;
}
export interface ICart extends Document {
    userId: Schema.Types.ObjectId;
    items: ICartItem[];
    totalItems: number;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: import("mongoose").Model<ICart, {}, {}, {}, Document<unknown, {}, ICart, {}, {}> & ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
