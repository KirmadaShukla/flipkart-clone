import { Response } from 'express';
import { IUser } from '../models/mongoose/User';
import { generateToken } from './jwt';

// Send JWT token in cookie
export const sendToken = (user: IUser, statusCode: number, res: Response): Response => {
  // Generate JWT token
  const token = generateToken(user);
  
  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRE || '7') * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as 'strict'
  };

  // Remove password from user object
  const userObject = user.toObject();
  delete (userObject as any).password;

  return res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    data: {
      user: userObject
    }
  });
};