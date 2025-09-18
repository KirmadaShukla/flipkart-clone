"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const cartRoutes_1 = __importDefault(require("./cartRoutes"));
const router = (0, express_1.Router)();
router.use('/users', userRoutes_1.default);
router.use('/products', productRoutes_1.default);
router.use('/orders', orderRoutes_1.default);
router.use('/carts', cartRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map