import { Document } from 'mongoose';

export interface IUser extends Document {
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  password: string,
}