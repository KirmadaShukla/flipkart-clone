"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BaseModel_1 = require("./BaseModel");
const reviewSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discountPrice: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subCategory: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
            type: String,
            trim: true
        }],
    inStock: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5
    },
    reviews: [reviewSchema],
    specifications: {
        type: Map,
        of: String
    },
    tags: [{
            type: String,
            trim: true
        }],
    isActive: {
        type: Boolean,
        default: true
    },
    ...BaseModel_1.baseSchema
}, BaseModel_1.baseSchemaOptions);
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ inStock: 1 });
exports.default = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=Product.js.map