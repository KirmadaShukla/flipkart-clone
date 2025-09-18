import { BaseModel } from './BaseModel';
export interface Cart extends BaseModel {
    userId: string;
    items: CartItem[];
    totalItems: number;
    totalAmount: number;
}
export interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    productName: string;
    productImage: string;
}
