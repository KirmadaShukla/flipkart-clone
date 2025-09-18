import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../models/mongoose/User';

// Authentication middleware
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from cookie or header
    let token: string | undefined;
    
    // Check if token is in cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // Check if token is in header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
      return;
    }
    
    // Verify token
    const decoded: any = verifyToken(token);
    
    // Check if user exists
    const user = await User.findById(decoded.id);
    
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid token. User not found.'
      });
      return;
    }
    
    // Add user info to request object
    (req as any).user = user;
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token.'
    });
  }
};

// Admin authorization middleware
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  // Check if user is admin
  const user = (req as any).user;
  
  if (!user || user.role !== 'admin') {
    res.status(403).json({
      success: false,
      error: 'Access denied. Admins only.'
    });
    return;
  }
  
  next();
};