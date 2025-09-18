"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const BaseController_1 = require("./BaseController");
const Cart_1 = __importDefault(require("../models/mongoose/Cart"));
const asyncHandler_1 = require("../utils/asyncHandler");
class CartController extends BaseController_1.BaseController {
    getAll(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const carts = await Cart_1.default.find().exec();
            return this.sendSuccess(res, carts, 'Carts retrieved successfully');
        })(req, res, next);
    }
    getById(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const cart = await Cart_1.default.findById(id).exec();
            if (!cart) {
                return this.sendError(res, 'Cart not found', 404);
            }
            return this.sendSuccess(res, cart, 'Cart retrieved successfully');
        })(req, res, next);
    }
    create(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const cartData = req.body;
            const existingCart = await Cart_1.default.findOne({ userId: cartData.userId }).exec();
            if (existingCart) {
                return this.sendError(res, 'Cart already exists for this user', 409);
            }
            const cart = new Cart_1.default({
                userId: cartData.userId,
                items: cartData.items || [],
                totalItems: cartData.items?.length || 0,
                totalAmount: this.calculateTotalAmount(cartData.items || [])
            });
            const savedCart = await cart.save();
            return this.sendSuccess(res, savedCart, 'Cart created successfully', 201);
        })(req, res, next);
    }
    update(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const updateData = req.body;
            const updatedCart = await Cart_1.default.findByIdAndUpdate(id, {
                ...updateData,
                totalItems: updateData.items?.length || 0,
                totalAmount: this.calculateTotalAmount(updateData.items || [])
            }, { new: true }).exec();
            if (!updatedCart) {
                return this.sendError(res, 'Cart not found', 404);
            }
            return this.sendSuccess(res, updatedCart, 'Cart updated successfully');
        })(req, res, next);
    }
    delete(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const deletedCart = await Cart_1.default.findByIdAndDelete(id).exec();
            if (!deletedCart) {
                return this.sendError(res, 'Cart not found', 404);
            }
            return this.sendSuccess(res, null, 'Cart deleted successfully');
        })(req, res, next);
    }
    getCartByUser(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { userId } = req.params;
            let userCart = await Cart_1.default.findOne({ userId }).exec();
            if (!userCart) {
                const cart = new Cart_1.default({
                    userId,
                    items: [],
                    totalItems: 0,
                    totalAmount: 0
                });
                userCart = await cart.save();
                return this.sendSuccess(res, userCart, 'Cart created successfully', 201);
            }
            return this.sendSuccess(res, userCart, 'User cart retrieved successfully');
        })(req, res, next);
    }
    addItemToCart(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { userId } = req.params;
            const item = req.body;
            let userCart = await Cart_1.default.findOne({ userId }).exec();
            if (!userCart) {
                const cart = new Cart_1.default({
                    userId,
                    items: [],
                    totalItems: 0,
                    totalAmount: 0
                });
                userCart = await cart.save();
            }
            const existingItemIndex = userCart.items.findIndex((i) => i.productId.toString() === item.productId);
            if (existingItemIndex > -1) {
                userCart.items[existingItemIndex].quantity += item.quantity;
            }
            else {
                userCart.items.push(item);
            }
            userCart.totalItems = userCart.items.reduce((sum, item) => sum + item.quantity, 0);
            userCart.totalAmount = this.calculateTotalAmount(userCart.items);
            const updatedCart = await userCart.save();
            return this.sendSuccess(res, updatedCart, 'Item added to cart successfully');
        })(req, res, next);
    }
    removeItemFromCart(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { userId, productId } = req.params;
            const userCart = await Cart_1.default.findOne({ userId }).exec();
            if (!userCart) {
                return this.sendError(res, 'Cart not found', 404);
            }
            userCart.items = userCart.items.filter((item) => item.productId.toString() !== productId);
            userCart.totalItems = userCart.items.reduce((sum, item) => sum + item.quantity, 0);
            userCart.totalAmount = this.calculateTotalAmount(userCart.items);
            const updatedCart = await userCart.save();
            return this.sendSuccess(res, updatedCart, 'Item removed from cart successfully');
        })(req, res, next);
    }
    clearCart(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { userId } = req.params;
            const userCart = await Cart_1.default.findOne({ userId }).exec();
            if (!userCart) {
                return this.sendError(res, 'Cart not found', 404);
            }
            userCart.items = [];
            userCart.totalItems = 0;
            userCart.totalAmount = 0;
            const updatedCart = await userCart.save();
            return this.sendSuccess(res, updatedCart, 'Cart cleared successfully');
        })(req, res, next);
    }
    calculateTotalAmount(items) {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}
exports.CartController = CartController;
//# sourceMappingURL=CartController.js.map