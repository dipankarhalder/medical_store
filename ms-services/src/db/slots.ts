import mongoose, { Schema } from 'mongoose';
import { ISlot } from '../interface';

const SlotsSchema: Schema = new Schema(
  {
    slot_name: { type: String, required: true },
  },
  { timestamps: true }
);

export const SlotsModel = mongoose.model<ISlot>(
  'Slots',
  SlotsSchema
);
