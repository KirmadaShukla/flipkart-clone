import { Schema, Document } from 'mongoose';
export interface IReview {
    userId: Schema.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
}
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    category: string;
    subCategory?: string;
    brand: string;
    images: string[];
    inStock: boolean;
    quantity: number;
    ratings?: number;
    reviews?: IReview[];
    specifications: Record<string, string>;
    tags: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: import("mongoose").Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct, {}, {}> & IProduct & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
