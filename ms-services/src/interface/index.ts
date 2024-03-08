import { Document } from 'mongoose';

export interface IUser extends Document {
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  password: string,
  role: string,
}

export interface ISlot extends Document {
  slot_name: string,
}