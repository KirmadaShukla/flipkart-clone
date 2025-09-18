import { Router } from 'express';
import { CartController } from '../controllers/CartController';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();
const cartController = new CartController();

// Protected routes (admin only for general cart management)
router.get('/', authenticate, authorizeAdmin, (req, res, next) => cartController.getAll(req, res, next));
router.get('/:id', authenticate, authorizeAdmin, (req, res, next) => cartController.getById(req, res, next));
router.post('/', authenticate, authorizeAdmin, (req, res, next) => cartController.create(req, res, next));
router.put('/:id', authenticate, authorizeAdmin, (req, res, next) => cartController.update(req, res, next));
router.delete('/:id', authenticate, authorizeAdmin, (req, res, next) => cartController.delete(req, res, next));

// User cart routes (users can manage their own carts)
router.get('/user/:userId', authenticate, (req, res, next) => cartController.getCartByUser(req, res, next));
router.post('/user/:userId/items', authenticate, (req, res, next) => cartController.addItemToCart(req, res, next));
router.delete('/user/:userId/items/:productId', authenticate, (req, res, next) => cartController.removeItemFromCart(req, res, next));
router.delete('/user/:userId/clear', authenticate, (req, res, next) => cartController.clearCart(req, res, next));

export default router;