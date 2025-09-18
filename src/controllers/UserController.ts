import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import { UserRegistration, UserLogin } from '../models/User';
import User, { IUser } from '../models/mongoose/User';
import { hashPassword, comparePassword } from '../utils/password';
import { asyncHandler } from '../utils/asyncHandler';
import { sendToken } from '../utils/sendToken';

export class UserController extends BaseController {
  // Get all users
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const users = await User.find({}, { password: 0 }).exec();
      return this.sendSuccess(res, users, 'Users retrieved successfully');
    })(req, res, next) as any;
  }

  // Get user by ID
  getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      const user = await User.findById(id, { password: 0 }).exec();
      
      if (!user) {
        return this.sendError(res, 'User not found', 404);
      }
      
      return this.sendSuccess(res, user, 'User retrieved successfully');
    })(req, res, next) as any;
  }

  // Create user
  create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const userData: UserRegistration = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email }).exec();
      
      if (existingUser) {
        return this.sendError(res, 'User with this email already exists', 409);
      }
      
      // Check if passwords match
      if (userData.password !== userData.confirmPassword) {
        return this.sendError(res, 'Passwords do not match', 400);
      }
      
      // Hash password
      const hashedPassword = await hashPassword(userData.password);
      
      const user = new User({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        phoneNumber: userData.phoneNumber,
        role: 'customer',
        isActive: true
      });
      
      const savedUser = await user.save();
      
      // Send token
      return sendToken(savedUser, 201, res);
    })(req, res, next) as any;
  }

  // Update user
  update(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      const updateData = req.body;
      
      // Remove password from update data if present
      if (updateData.password) {
        delete updateData.password;
      }
      
      const updatedUser = await User.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, projection: { password: 0 } }
      ).exec();
      
      if (!updatedUser) {
        return this.sendError(res, 'User not found', 404);
      }
      
      return this.sendSuccess(res, updatedUser, 'User updated successfully');
    })(req, res, next) as any;
  }

  // Delete user
  delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      
      const deletedUser = await User.findByIdAndDelete(id).exec();
      
      if (!deletedUser) {
        return this.sendError(res, 'User not found', 404);
      }
      
      return this.sendSuccess(res, null, 'User deleted successfully');
    })(req, res, next) as any;
  }

  // User login
  login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const credentials: UserLogin = req.body;
      
      // Find user by email
      const user = await User.findOne({ email: credentials.email }).exec();
      
      if (!user) {
        return this.sendError(res, 'Invalid credentials', 401);
      }
      
      // Compare passwords
      const isPasswordValid = await comparePassword(credentials.password, user.password);
      
      if (!isPasswordValid) {
        return this.sendError(res, 'Invalid credentials', 401);
      }
      
      // Send token
      return sendToken(user, 200, res);
    })(req, res, next) as any;
  }

  // User registration
  register(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const userData: UserRegistration = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email }).exec();
      
      if (existingUser) {
        return this.sendError(res, 'User with this email already exists', 409);
      }
      
      // Check if passwords match
      if (userData.password !== userData.confirmPassword) {
        return this.sendError(res, 'Passwords do not match', 400);
      }
      
      // Hash password
      const hashedPassword = await hashPassword(userData.password);
      
      const user = new User({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        phoneNumber: userData.phoneNumber,
        role: 'customer',
        isActive: true
      });
      
      const savedUser = await user.save();
      
      // Send token
      return sendToken(savedUser, 201, res);
    })(req, res, next) as any;
  }
}