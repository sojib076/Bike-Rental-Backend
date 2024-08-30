import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

type UserRole = 'admin' | 'user';

export type TuserLogin= {
    email: string;
    password: string;
  };

  
  export type TuserRegister = {
    name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role?: UserRole;
}


// extend on user model 

export interface UserModel extends Model<TuserRegister> {
    removePassword(payload:any): Partial<TuserRegister>;

}
export type TUserRole = keyof typeof USER_ROLE;