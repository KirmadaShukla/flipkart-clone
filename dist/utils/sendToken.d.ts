import { Response } from 'express';
import { IUser } from '../models/mongoose/User';
export declare const sendToken: (user: IUser, statusCode: number, res: Response) => Response;
