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
    const isMatch = await bcrypt.compare(payload.password, findUser.password); // compare the password


    if (!isMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect'); 
    }
    // remove the password from the user object
    const removePassword = findUser.toObject();
    const { password, ...user } = removePassword; 


     // create a jwt payload
    const jwtPayload = {
        userId: findUser._id,
        email: findUser.email,
        role: findUser.role
    }

    const token = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: '365d' });


    // return the token and user object
    return {
        token,
        user
    };
};

const userRegister = async (payload: TuserRegister) => {

    //  hash the password and save the user
    const hashPassword = await bcrypt.hash(payload.password, 12);
    payload.password = hashPassword;
    const result = await User.create(payload);
    const removePassword = User.removePassword(result);
    return removePassword;
}

const userGetProfile = async (req: Request) => {
    // get the user from the request user , this user come form auth middleware with jwt payload
    const user = req.user;

    // find the user in the database
    const findUser = await User.findById(user.userId);

    // if user not found throw an error
    if (!findUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // this function remove the password from the user object
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

// admin can change user role
const changeUserRole = async (id: string) => {
    const find = await User.findById(id);
    console.log(find,id);
    console.log(find);
    if (!find) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const update = await User.findByIdAndUpdate(id, { role: 'admin' }, { new: true });
    if (!update) {
        throw new AppError(httpStatus.NOT_FOUND, 'Error updating user role');
    }

}

const getAllUsers = async (req:Request) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    
    const totalUsers = await User.countDocuments();
    return {
        users,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        totalUsers,
    };
};
const deleteUser = async (id: string) => {
    const find = await User.findById(id);
    if (!find) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const remove = await User.findByIdAndDelete(id);
    if (!remove) {
        throw new AppError(httpStatus.NOT_FOUND, 'Error deleting user');
    }


}

export const userServices = {
    userLogin,
    userRegister,
    userGetProfile,
    userUpdateProfile,
    changeUserRole,
    getAllUsers,
    deleteUser

}