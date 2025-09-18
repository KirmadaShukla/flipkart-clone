"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseSchemaOptions = exports.baseSchema = void 0;
exports.baseSchema = {
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
};
exports.baseSchemaOptions = {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
};
//# sourceMappingURL=BaseModel.js.map