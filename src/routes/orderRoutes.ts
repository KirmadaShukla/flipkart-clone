import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();
const orderController = new OrderController();

// Protected routes (all users can view their own orders)
router.get('/', authenticate, (req, res, next) => orderController.getAll(req, res, next));
router.get('/:id', authenticate, (req, res, next) => orderController.getById(req, res, next));
router.post('/', authenticate, (req, res, next) => orderController.create(req, res, next));

// Protected routes (admin only)
router.put('/:id', authenticate, authorizeAdmin, (req, res, next) => orderController.update(req, res, next));
router.delete('/:id', authenticate, authorizeAdmin, (req, res, next) => orderController.delete(req, res, next));

// Additional order routes
router.get('/user/:userId', authenticate, (req, res, next) => orderController.getOrdersByUser(req, res, next));
router.put('/:id/status', authenticate, authorizeAdmin, (req, res, next) => orderController.updateOrderStatus(req, res, next));

export default router;