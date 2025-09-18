"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../controllers/OrderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const orderController = new OrderController_1.OrderController();
router.get('/', authMiddleware_1.authenticate, (req, res, next) => orderController.getAll(req, res, next));
router.get('/:id', authMiddleware_1.authenticate, (req, res, next) => orderController.getById(req, res, next));
router.post('/', authMiddleware_1.authenticate, (req, res, next) => orderController.create(req, res, next));
router.put('/:id', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => orderController.update(req, res, next));
router.delete('/:id', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => orderController.delete(req, res, next));
router.get('/user/:userId', authMiddleware_1.authenticate, (req, res, next) => orderController.getOrdersByUser(req, res, next));
router.put('/:id/status', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => orderController.updateOrderStatus(req, res, next));
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map