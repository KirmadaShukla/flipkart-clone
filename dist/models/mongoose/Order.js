"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BaseModel_1 = require("./BaseModel");
const orderItemSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
});
const shippingAddressSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: String,
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});
const paymentInfoSchema = new mongoose_1.Schema({
    method: {
        type: String,
        required: true,
        enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'cash_on_delivery']
    },
    transactionId: String,
    paidAt: Date
});
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
        default: 'pending'
    },
    shippingAddress: {
        type: shippingAddressSchema,
        required: true
    },
    paymentInfo: {
        type: paymentInfoSchema,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    ...BaseModel_1.baseSchema
}, BaseModel_1.baseSchemaOptions);
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderDate: -1 });
exports.default = (0, mongoose_1.model)('Order', orderSchema);
//# sourceMappingURL=Order.js.map