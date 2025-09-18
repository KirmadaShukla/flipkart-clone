import { BaseModel } from './BaseModel';
export interface User extends BaseModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role: 'customer' | 'admin' | 'seller';
    isActive: boolean;
}
export interface UserRegistration {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
}
export interface UserLogin {
    email: string;
    password: string;
}
