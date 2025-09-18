import { BaseModel } from './BaseModel';
import { Product } from './Product';

export interface Order extends BaseModel {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  orderDate: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export interface PaymentInfo {
  method: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'cash_on_delivery';
  transactionId?: string;
  paidAt?: Date;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned';