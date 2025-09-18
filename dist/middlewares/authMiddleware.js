"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/mongoose/User"));
const authenticate = async (req, res, next) => {
    try {
        let token;
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({
                success: false,
                error: 'Access denied. No token provided.'
            });
            return;
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        const user = await User_1.default.findById(decoded.id);
        if (!user) {
            res.status(401).json({
                success: false,
                error: 'Invalid token. User not found.'
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid token.'
        });
    }
};
exports.authenticate = authenticate;
const authorizeAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== 'admin') {
        res.status(403).json({
            success: false,
            error: 'Access denied. Admins only.'
        });
        return;
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
//# sourceMappingURL=authMiddleware.js.map