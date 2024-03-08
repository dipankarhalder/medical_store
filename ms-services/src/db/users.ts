import mongoose, { Schema } from 'mongoose';
import { IUser } from "../interface";

const UserSchema: Schema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
  },
  { timestamps: true, }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
