"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
router.post('/login', (req, res, next) => userController.login(req, res, next));
router.post('/register', (req, res, next) => userController.register(req, res, next));
router.get('/:id', authMiddleware_1.authenticate, (req, res, next) => userController.getById(req, res, next));
router.get('/', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => userController.getAll(req, res, next));
router.post('/', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => userController.create(req, res, next));
router.put('/:id', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => userController.update(req, res, next));
router.delete('/:id', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, (req, res, next) => userController.delete(req, res, next));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map