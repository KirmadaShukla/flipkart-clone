import { Schema, model, Document } from 'mongoose';
import { baseSchema, baseSchemaOptions } from './BaseModel';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: 'customer' | 'admin' | 'seller';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
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
  ...baseSchema
}, baseSchemaOptions);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

export default model<IUser>('User', userSchema);