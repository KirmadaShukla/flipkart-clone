"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const productController = new ProductController_1.ProductController();
router.get('/', (req, res, next) => productController.getAll(req, res, next));
router.get('/:id', (req, res, next) => productController.getById(req, res, next));
router.post('/', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => productController.create(req, res, next));
router.put('/:id', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => productController.update(req, res, next));
router.delete('/:id', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => productController.delete(req, res, next));
router.get('/categories', (req, res, next) => productController.getCategories(req, res, next));
router.get('/brands', (req, res, next) => productController.getBrands(req, res, next));
exports.default = router;
//# sourceMappingURL=productRoutes.js.map