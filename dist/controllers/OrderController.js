"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const BaseController_1 = require("./BaseController");
const Order_1 = __importDefault(require("../models/mongoose/Order"));
const asyncHandler_1 = require("../utils/asyncHandler");
class OrderController extends BaseController_1.BaseController {
    getAll(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const orders = await Order_1.default.find().exec();
            return this.sendSuccess(res, orders, 'Orders retrieved successfully');
        })(req, res, next);
    }
    getById(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const order = await Order_1.default.findById(id).exec();
            if (!order) {
                return this.sendError(res, 'Order not found', 404);
            }
            return this.sendSuccess(res, order, 'Order retrieved successfully');
        })(req, res, next);
    }
    create(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const orderData = req.body;
            const order = new Order_1.default({
                userId: orderData.userId,
                items: orderData.items,
                totalAmount: orderData.totalAmount,
                status: 'pending',
                shippingAddress: orderData.shippingAddress,
                paymentInfo: orderData.paymentInfo
            });
            const savedOrder = await order.save();
            return this.sendSuccess(res, savedOrder, 'Order created successfully', 201);
        })(req, res, next);
    }
    update(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const updateData = req.body;
            const updatedOrder = await Order_1.default.findByIdAndUpdate(id, updateData, { new: true }).exec();
            if (!updatedOrder) {
                return this.sendError(res, 'Order not found', 404);
            }
            return this.sendSuccess(res, updatedOrder, 'Order updated successfully');
        })(req, res, next);
    }
    delete(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const deletedOrder = await Order_1.default.findByIdAndDelete(id).exec();
            if (!deletedOrder) {
                return this.sendError(res, 'Order not found', 404);
            }
            return this.sendSuccess(res, null, 'Order deleted successfully');
        })(req, res, next);
    }
    getOrdersByUser(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { userId } = req.params;
            const userOrders = await Order_1.default.find({ userId }).exec();
            return this.sendSuccess(res, userOrders, 'User orders retrieved successfully');
        })(req, res, next);
    }
    updateOrderStatus(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const { status } = req.body;
            const updatedOrder = await Order_1.default.findByIdAndUpdate(id, { status }, { new: true }).exec();
            if (!updatedOrder) {
                return this.sendError(res, 'Order not found', 404);
            }
            return this.sendSuccess(res, updatedOrder, 'Order status updated successfully');
        })(req, res, next);
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map