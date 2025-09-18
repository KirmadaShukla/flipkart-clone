import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import Cart, { ICart } from '../models/mongoose/Cart';
import { asyncHandler } from '../utils/asyncHandler';

export class CartController extends BaseController {
  // Get all carts
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const carts = await Cart.find().exec();
      return this.sendSuccess(res, carts, 'Carts retrieved successfully');
    })(req, res, next) as any;
  }

  // Get cart by ID
  getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      const cart = await Cart.findById(id).exec();
      
      if (!cart) {
        return this.sendError(res, 'Cart not found', 404);
      }
      
      return this.sendSuccess(res, cart, 'Cart retrieved successfully');
    })(req, res, next) as any;
  }

  // Create cart
  create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const cartData = req.body;
      
      // Check if cart already exists for user
      const existingCart = await Cart.findOne({ userId: cartData.userId }).exec();
      
      if (existingCart) {
        return this.sendError(res, 'Cart already exists for this user', 409);
      }
      
      const cart = new Cart({
        userId: cartData.userId,
        items: cartData.items || [],
        totalItems: cartData.items?.length || 0,
        totalAmount: this.calculateTotalAmount(cartData.items || [])
      });
      
      const savedCart = await cart.save();
      
      return this.sendSuccess(res, savedCart, 'Cart created successfully', 201);
    })(req, res, next) as any;
  }

  // Update cart
  update(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedCart = await Cart.findByIdAndUpdate(
        id,
        {
          ...updateData,
          totalItems: updateData.items?.length || 0,
          totalAmount: this.calculateTotalAmount(updateData.items || [])
        },
        { new: true }
      ).exec();
      
      if (!updatedCart) {
        return this.sendError(res, 'Cart not found', 404);
      }
      
      return this.sendSuccess(res, updatedCart, 'Cart updated successfully');
    })(req, res, next) as any;
  }

  // Delete cart
  delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      
      const deletedCart = await Cart.findByIdAndDelete(id).exec();
      
      if (!deletedCart) {
        return this.sendError(res, 'Cart not found', 404);
      }
      
      return this.sendSuccess(res, null, 'Cart deleted successfully');
    })(req, res, next) as any;
  }

  // Get cart by user
  getCartByUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { userId } = req.params;
      let userCart = await Cart.findOne({ userId }).exec();
      
      if (!userCart) {
        // Create a new cart if one doesn't exist for the user
        const cart = new Cart({
          userId,
          items: [],
          totalItems: 0,
          totalAmount: 0
        });
        
        userCart = await cart.save();
        return this.sendSuccess(res, userCart, 'Cart created successfully', 201);
      }
      
      return this.sendSuccess(res, userCart, 'User cart retrieved successfully');
    })(req, res, next) as any;
  }

  // Add item to cart
  addItemToCart(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { userId } = req.params;
      const item = req.body;
      
      // Find user's cart
      let userCart = await Cart.findOne({ userId }).exec();
      
      if (!userCart) {
        // Create a new cart if one doesn't exist for the user
        const cart = new Cart({
          userId,
          items: [],
          totalItems: 0,
          totalAmount: 0
        });
        
        userCart = await cart.save();
      }
      
      // Check if item already exists in cart
      const existingItemIndex = userCart.items.findIndex(
        (i: any) => i.productId.toString() === item.productId
      );
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        userCart.items[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item to cart
        userCart.items.push(item);
      }
      
      // Update totals
      userCart.totalItems = userCart.items.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );
      userCart.totalAmount = this.calculateTotalAmount(userCart.items);
      
      // Save updated cart
      const updatedCart = await userCart.save();
      
      return this.sendSuccess(res, updatedCart, 'Item added to cart successfully');
    })(req, res, next) as any;
  }

  // Remove item from cart
  removeItemFromCart(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { userId, productId } = req.params;
      
      // Find user's cart
      const userCart = await Cart.findOne({ userId }).exec();
      
      if (!userCart) {
        return this.sendError(res, 'Cart not found', 404);
      }
      
      // Remove item from cart
      userCart.items = userCart.items.filter(
        (item: any) => item.productId.toString() !== productId
      );
      
      // Update totals
      userCart.totalItems = userCart.items.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );
      userCart.totalAmount = this.calculateTotalAmount(userCart.items);
      
      // Save updated cart
      const updatedCart = await userCart.save();
      
      return this.sendSuccess(res, updatedCart, 'Item removed from cart successfully');
    })(req, res, next) as any;
  }

  // Clear cart
  clearCart(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { userId } = req.params;
      
      // Find user's cart
      const userCart = await Cart.findOne({ userId }).exec();
      
      if (!userCart) {
        return this.sendError(res, 'Cart not found', 404);
      }
      
      // Clear cart items
      userCart.items = [];
      userCart.totalItems = 0;
      userCart.totalAmount = 0;
      
      // Save updated cart
      const updatedCart = await userCart.save();
      
      return this.sendSuccess(res, updatedCart, 'Cart cleared successfully');
    })(req, res, next) as any;
  }

  private calculateTotalAmount(items: any[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}