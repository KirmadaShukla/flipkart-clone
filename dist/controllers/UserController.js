"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const BaseController_1 = require("./BaseController");
const User_1 = __importDefault(require("../models/mongoose/User"));
const password_1 = require("../utils/password");
const asyncHandler_1 = require("../utils/asyncHandler");
const sendToken_1 = require("../utils/sendToken");
class UserController extends BaseController_1.BaseController {
    getAll(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const users = await User_1.default.find({}, { password: 0 }).exec();
            return this.sendSuccess(res, users, 'Users retrieved successfully');
        })(req, res, next);
    }
    getById(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const user = await User_1.default.findById(id, { password: 0 }).exec();
            if (!user) {
                return this.sendError(res, 'User not found', 404);
            }
            return this.sendSuccess(res, user, 'User retrieved successfully');
        })(req, res, next);
    }
    create(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const userData = req.body;
            const existingUser = await User_1.default.findOne({ email: userData.email }).exec();
            if (existingUser) {
                return this.sendError(res, 'User with this email already exists', 409);
            }
            if (userData.password !== userData.confirmPassword) {
                return this.sendError(res, 'Passwords do not match', 400);
            }
            const hashedPassword = await (0, password_1.hashPassword)(userData.password);
            const user = new User_1.default({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: hashedPassword,
                phoneNumber: userData.phoneNumber,
                role: 'customer',
                isActive: true
            });
            const savedUser = await user.save();
            return (0, sendToken_1.sendToken)(savedUser, 201, res);
        })(req, res, next);
    }
    update(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const updateData = req.body;
            if (updateData.password) {
                delete updateData.password;
            }
            const updatedUser = await User_1.default.findByIdAndUpdate(id, updateData, { new: true, projection: { password: 0 } }).exec();
            if (!updatedUser) {
                return this.sendError(res, 'User not found', 404);
            }
            return this.sendSuccess(res, updatedUser, 'User updated successfully');
        })(req, res, next);
    }
    delete(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const deletedUser = await User_1.default.findByIdAndDelete(id).exec();
            if (!deletedUser) {
                return this.sendError(res, 'User not found', 404);
            }
            return this.sendSuccess(res, null, 'User deleted successfully');
        })(req, res, next);
    }
    login(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const credentials = req.body;
            const user = await User_1.default.findOne({ email: credentials.email }).exec();
            if (!user) {
                return this.sendError(res, 'Invalid credentials', 401);
            }
            const isPasswordValid = await (0, password_1.comparePassword)(credentials.password, user.password);
            if (!isPasswordValid) {
                return this.sendError(res, 'Invalid credentials', 401);
            }
            return (0, sendToken_1.sendToken)(user, 200, res);
        })(req, res, next);
    }
    register(req, res, next) {
        return (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
            const userData = req.body;
            const existingUser = await User_1.default.findOne({ email: userData.email }).exec();
            if (existingUser) {
                return this.sendError(res, 'User with this email already exists', 409);
            }
            if (userData.password !== userData.confirmPassword) {
                return this.sendError(res, 'Passwords do not match', 400);
            }
            const hashedPassword = await (0, password_1.hashPassword)(userData.password);
            const user = new User_1.default({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: hashedPassword,
                phoneNumber: userData.phoneNumber,
                role: 'customer',
                isActive: true
            });
            const savedUser = await user.save();
            return (0, sendToken_1.sendToken)(savedUser, 201, res);
        })(req, res, next);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map