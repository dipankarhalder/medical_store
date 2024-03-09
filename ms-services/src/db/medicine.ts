import mongoose, { Schema } from 'mongoose';
import { IMedicine } from '../interface';

const MedicineSchema: Schema = new Schema(
  {
    slotid: { type: String },
    name: { type: String, required: true },
    busket_id: { type: String, required: true },
    pices: { type: Number, required: true },
    price: { type: Number, required: true },
    exp_date: { type: String, required: true },
    per_pices: { type: Number },
  },
  { timestamps: true }
);

export const MedicineModel = mongoose.model<IMedicine>(
  'Medicine',
  MedicineSchema
);
