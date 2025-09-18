import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();
const userController = new UserController();

// Public routes
router.post('/login', (req, res, next) => userController.login(req, res, next));
router.post('/register', (req, res, next) => userController.register(req, res, next));

// Protected routes (users can view their own profile)
router.get('/:id', authenticate, (req, res, next) => userController.getById(req, res, next));

// Protected routes (admin only)
router.get('/', authenticate, authorizeAdmin, (req, res, next) => userController.getAll(req, res, next));
router.post('/', authenticate, authorizeAdmin, (req, res, next) => userController.create(req, res, next));
router.put('/:id', authenticate, authorizeAdmin, (req, res, next) => userController.update(req, res, next));
router.delete('/:id', authenticate, authorizeAdmin, (req, res, next) => userController.delete(req, res, next));

export default router;