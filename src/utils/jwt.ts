import jwt from 'jsonwebtoken';
import { IUser } from '../models/mongoose/User';

// Generate JWT token
export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: '30d' }
  );
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
};