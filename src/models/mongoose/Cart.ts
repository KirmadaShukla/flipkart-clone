import { Schema, model, Document } from 'mongoose';
import { baseSchema, baseSchemaOptions } from './BaseModel';

export interface ICartItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
  price:number;
}

export interface ICart extends Document {
  userId: Schema.Types.ObjectId;
  items: ICartItem[];
  totalItems: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
});

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalItems: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  ...baseSchema
}, baseSchemaOptions);

// Indexes
cartSchema.index({ userId: 1 });

export default model<ICart>('Cart', cartSchema);