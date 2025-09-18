"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController_1 = require("../controllers/CartController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const cartController = new CartController_1.CartController();
router.get('/', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => cartController.getAll(req, res, next));
router.get('/:id', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => cartController.getById(req, res, next));
router.post('/', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => cartController.create(req, res, next));
router.put('/:id', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => cartController.update(req, res, next));
router.delete('/:id', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => cartController.delete(req, res, next));
router.get('/user/:userId', authMiddleware_1.authenticate, (req, res, next) => cartController.getCartByUser(req, res, next));
router.post('/user/:userId/items', authMiddleware_1.authenticate, (req, res, next) => cartController.addItemToCart(req, res, next));
router.delete('/user/:userId/items/:productId', authMiddleware_1.authenticate, (req, res, next) => cartController.removeItemFromCart(req, res, next));
router.delete('/user/:userId/clear', authMiddleware_1.authenticate, (req, res, next) => cartController.clearCart(req, res, next));
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map