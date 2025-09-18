import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();
const productController = new ProductController();

// Public routes
router.get('/', (req, res, next) => productController.getAll(req, res, next));
router.get('/:id', (req, res, next) => productController.getById(req, res, next));

// Protected routes (admin only)
router.post('/', authenticate, authorizeAdmin, (req, res, next) => productController.create(req, res, next));
router.put('/:id', authenticate, authorizeAdmin, (req, res, next) => productController.update(req, res, next));
router.delete('/:id', authenticate, authorizeAdmin, (req, res, next) => productController.delete(req, res, next));

// Additional product routes (public)
router.get('/categories', (req, res, next) => productController.getCategories(req, res, next));
router.get('/brands', (req, res, next) => productController.getBrands(req, res, next));

export default router;