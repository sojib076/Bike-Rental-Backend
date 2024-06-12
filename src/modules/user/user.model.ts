import mongoose, { Schema } from "mongoose";
import { TuserRegister,UserModel } from "./user.interface";

const UserMongooseSchema = new Schema<TuserRegister,UserModel>({
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
  
  // Create and export the Mongoo se model

  UserMongooseSchema.statics.removePassword = async function (payload: any) {
    const removePassword = payload.toObject();
    const { password, ...userWithoutPassword } = removePassword;
    return userWithoutPassword;
  };
  
  export const User = mongoose.model<TuserRegister ,UserModel>('User', UserMongooseSchema);
  