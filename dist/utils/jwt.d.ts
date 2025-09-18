import { IUser } from '../models/mongoose/User';
export declare const generateToken: (user: IUser) => string;
export declare const verifyToken: (token: string) => any;
