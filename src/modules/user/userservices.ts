import httpStatus from "http-status";
import jwt from 'jsonwebtoken';
import AppError from "../../error/AppError";
import { TuserLogin, TuserRegister } from "./user.interface";
import bcrypt from 'bcrypt';
import { User } from "./user.model";
import config from "../../config";
import { Request } from "express";

const userLogin = async (payload: TuserLogin) => {
    const findUser = await User.findOne({ email: payload.email }).select('+password');
    if (!findUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const isMatch = await bcrypt.compare(payload.password, findUser.password);
    if (!isMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }
    const removePassword = findUser.toObject();
    const { password, ...user } = removePassword;
    console.log(user);
    const jwtPayload = {
        userId: findUser._id,
        email: findUser.email,
        role: findUser.role
    }

    const token = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: '1d' });
console.log(token);
    return {
        token,
        user
    };
};

const userRegister = async (payload: TuserRegister) => {

    // const hashPassword = payload.password;
    const hashPassword = await bcrypt.hash(payload.password, 12);
    payload.password = hashPassword;
    const result = await User.create(payload);
    const removePassword = User.removePassword(result);
    return removePassword;
}

const userGetProfile = async (req: Request) => {
    const user = req.user;
    const findUser = await User.findById(user.userId);
    if (!findUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const removePassword = User.removePassword(findUser);
    return removePassword;
}

const userUpdateProfile = async (req: Request) => {
    const user = req.user;
    const findUser = await User.findById(user.userId);
    
    if (!findUser) { throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const update = req.body;

    const updatedUser = await User.findByIdAndUpdate(user.userId, update, { new: true });
    if (!updatedUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'Error updating user profile');
    }

    const removePassword = User.removePassword(updatedUser);
    return removePassword;
}



export const userServices = {
    userLogin,
    userRegister,
    userGetProfile,
    userUpdateProfile

}