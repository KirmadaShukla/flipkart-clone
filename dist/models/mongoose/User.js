"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BaseModel_1 = require("./BaseModel");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'seller'],
        default: 'customer'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    ...BaseModel_1.baseSchema
}, BaseModel_1.baseSchemaOptions);
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
exports.default = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.js.map