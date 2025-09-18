import { Router } from 'express';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';
import cartRoutes from './cartRoutes';

const router = Router();

// API routes
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/carts', cartRoutes);

export default router;