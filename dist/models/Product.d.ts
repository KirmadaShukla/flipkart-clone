import { BaseModel } from './BaseModel';
export interface Product extends BaseModel {
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
    reviews?: Review[];
    specifications: Record<string, string>;
    tags: string[];
    isActive: boolean;
}
export interface Review {
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
}
export interface ProductFilter {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    inStock?: boolean;
    search?: string;
}
