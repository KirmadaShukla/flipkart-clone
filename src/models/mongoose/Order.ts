import { Schema, model, Document } from 'mongoose';
import { baseSchema, baseSchemaOptions } from './BaseModel';

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

const orderItemSchema = new Schema({
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
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  }
});

const shippingAddressSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: String,
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const paymentInfoSchema = new Schema({
  method: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'cash_on_delivery']
  },
  transactionId: String,
  paidAt: Date
});

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
  shippingAddress: {
    type: shippingAddressSchema,
    required: true
  },
  paymentInfo: {
    type: paymentInfoSchema,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  ...baseSchema
}, baseSchemaOptions);

// Indexes
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderDate: -1 });

export default model<IOrder>('Order', orderSchema);