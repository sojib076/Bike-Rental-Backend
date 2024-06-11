import mongoose, { Schema } from "mongoose";
import { TuserRegister } from "./user.interface";

const UserMongooseSchema = new Schema<TuserRegister>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' } 
  },
{
    timestamps: true,
  
});
  
  // Create and export the Mongoose model
  export const UserModel = mongoose.model<TuserRegister>('User', UserMongooseSchema);
  