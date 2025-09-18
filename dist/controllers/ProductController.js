"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const BaseController_1 = require("./BaseController");
const Product_1 = __importDefault(require("../models/mongoose/Product"));
const asyncHandler_1 = require("../utils/asyncHandler");
class ProductController extends BaseController_1.BaseController {
    getAll(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { category, minPrice, maxPrice, brand, inStock, search } = req.query;
            const filter = {};
            if (category)
                filter.category = category;
            if (brand)
                filter.brand = brand;
            if (inStock !== undefined)
                filter.inStock = inStock === 'true';
            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice)
                    filter.price.$gte = parseFloat(minPrice);
                if (maxPrice)
                    filter.price.$lte = parseFloat(maxPrice);
            }
            if (search) {
                filter.$text = { $search: search };
            }
            const products = await Product_1.default.find(filter).exec();
            return this.sendSuccess(res, products, 'Products retrieved successfully');
        })(req, res, next);
    }
    getById(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const product = await Product_1.default.findById(id).exec();
            if (!product) {
                return this.sendError(res, 'Product not found', 404);
            }
            return this.sendSuccess(res, product, 'Product retrieved successfully');
        })(req, res, next);
    }
    create(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const productData = req.body;
            const product = new Product_1.default({
                name: productData.name,
                description: productData.description,
                price: productData.price,
                discountPrice: productData.discountPrice,
                category: productData.category,
                subCategory: productData.subCategory,
                brand: productData.brand,
                images: productData.images || [],
                inStock: productData.inStock !== undefined ? productData.inStock : true,
                quantity: productData.quantity || 0,
                specifications: productData.specifications || {},
                tags: productData.tags || [],
                isActive: productData.isActive !== undefined ? productData.isActive : true
            });
            const savedProduct = await product.save();
            return this.sendSuccess(res, savedProduct, 'Product created successfully', 201);
        })(req, res, next);
    }
    update(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const updateData = req.body;
            const updatedProduct = await Product_1.default.findByIdAndUpdate(id, updateData, { new: true }).exec();
            if (!updatedProduct) {
                return this.sendError(res, 'Product not found', 404);
            }
            return this.sendSuccess(res, updatedProduct, 'Product updated successfully');
        })(req, res, next);
    }
    delete(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const deletedProduct = await Product_1.default.findByIdAndDelete(id).exec();
            if (!deletedProduct) {
                return this.sendError(res, 'Product not found', 404);
            }
            return this.sendSuccess(res, null, 'Product deleted successfully');
        })(req, res, next);
    }
    getCategories(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const categories = await Product_1.default.distinct('category').exec();
            return this.sendSuccess(res, categories, 'Categories retrieved successfully');
        })(req, res, next);
    }
    getBrands(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const brands = await Product_1.default.distinct('brand').exec();
            return this.sendSuccess(res, brands, 'Brands retrieved successfully');
        })(req, res, next);
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map