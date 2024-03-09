import mongoose, { Schema } from 'mongoose';
import { IMedicine } from '../interface';

const MedicineSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    busket_id: { type: String, required: true },
    pices: { type: String, required: true },
    price: { type: String, required: true },
    exp_date: { type: String, required: true },
  },
  { timestamps: true }
);

export const MedicineModel = mongoose.model<IMedicine>(
  'Medicine',
  MedicineSchema
);
