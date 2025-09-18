import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import Product, { IProduct } from '../models/mongoose/Product';
import { asyncHandler } from '../utils/asyncHandler';

export class ProductController extends BaseController {
  // Get all products
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      // Get query parameters for filtering
      const { category, minPrice, maxPrice, brand, inStock, search } = req.query;
      
      // Build filter object
      const filter: any = {};
      
      if (category) filter.category = category;
      if (brand) filter.brand = brand;
      if (inStock !== undefined) filter.inStock = inStock === 'true';
      
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice as string);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice as string);
      }
      
      if (search) {
        filter.$text = { $search: search as string };
      }
      
      const products = await Product.find(filter).exec();
      
      return this.sendSuccess(res, products, 'Products retrieved successfully');
    })(req, res, next) as any;
  }

  // Get product by ID
  getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      const product = await Product.findById(id).exec();
      
      if (!product) {
        return this.sendError(res, 'Product not found', 404);
      }
      
      return this.sendSuccess(res, product, 'Product retrieved successfully');
    })(req, res, next) as any;
  }

  // Create product
  create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const productData = req.body;
      
      const product = new Product({
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
    })(req, res, next) as any;
  }

  // Update product
  update(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      ).exec();
      
      if (!updatedProduct) {
        return this.sendError(res, 'Product not found', 404);
      }
      
      return this.sendSuccess(res, updatedProduct, 'Product updated successfully');
    })(req, res, next) as any;
  }

  // Delete product
  delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      const { id } = req.params;
      
      const deletedProduct = await Product.findByIdAndDelete(id).exec();
      
      if (!deletedProduct) {
        return this.sendError(res, 'Product not found', 404);
      }
      
      return this.sendSuccess(res, null, 'Product deleted successfully');
    })(req, res, next) as any;
  }

  // Get categories
  getCategories(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      // Get unique categories
      const categories = await Product.distinct('category').exec();
      
      return this.sendSuccess(res, categories, 'Categories retrieved successfully');
    })(req, res, next) as any;
  }

  // Get brands
  getBrands(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      // Get unique brands
      const brands = await Product.distinct('brand').exec();
      
      return this.sendSuccess(res, brands, 'Brands retrieved successfully');
    })(req, res, next) as any;
  }
}