import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import Order, { IOrder } from '../models/mongoose/Order';
import { asyncHandler } from '../utils/asyncHandler';

export class OrderController extends BaseController {
  // Get all orders
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      // In a real app, you might want to filter by user or apply pagination
      const orders = await Order.find().exec();
      
      return this.sendSuccess(res, orders, 'Orders retrieved successfully');
    })(req, res, next) as any;
  }

  // Get order by ID
  getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      const order = await Order.findById(id).exec();
      
      if (!order) {
        return this.sendError(res, 'Order not found', 404);
      }
      
      return this.sendSuccess(res, order, 'Order retrieved successfully');
    })(req, res, next) as any;
  }

  // Create order
  create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const orderData = req.body;
      
      const order = new Order({
        userId: orderData.userId,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        status: 'pending',
        shippingAddress: orderData.shippingAddress,
        paymentInfo: orderData.paymentInfo
      });
      
      const savedOrder = await order.save();
      
      return this.sendSuccess(res, savedOrder, 'Order created successfully', 201);
    })(req, res, next) as any;
  }

  // Update order
  update(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      ).exec();
      
      if (!updatedOrder) {
        return this.sendError(res, 'Order not found', 404);
      }
      
      return this.sendSuccess(res, updatedOrder, 'Order updated successfully');
    })(req, res, next) as any;
  }

  // Delete order
  delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      
      const deletedOrder = await Order.findByIdAndDelete(id).exec();
      
      if (!deletedOrder) {
        return this.sendError(res, 'Order not found', 404);
      }
      
      return this.sendSuccess(res, null, 'Order deleted successfully');
    })(req, res, next) as any;
  }

  // Get orders by user
  getOrdersByUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { userId } = req.params;
      const userOrders = await Order.find({ userId }).exec();
      
      return this.sendSuccess(res, userOrders, 'User orders retrieved successfully');
    })(req, res, next) as any;
  }

  // Update order status
  updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      const { status } = req.body;
      
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).exec();
      
      if (!updatedOrder) {
        return this.sendError(res, 'Order not found', 404);
      }
      
      return this.sendSuccess(res, updatedOrder, 'Order status updated successfully');
    })(req, res, next) as any;
  }
}