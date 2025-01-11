"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../config"));
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isMatch = yield bcrypt_1.default.compare(payload.password, findUser.password); // compare the password
    if (!isMatch) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // remove the password from the user object
    const removePassword = findUser.toObject();
    const { password } = removePassword, user = __rest(removePassword, ["password"]);
    // create a jwt payload
    const jwtPayload = {
        userId: findUser._id,
        email: findUser.email,
        role: findUser.role
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, { expiresIn: '365d' });
    // return the token and user object
    return {
        token,
        user
    };
});
const userRegister = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  hash the password and save the user
    const hashPassword = yield bcrypt_1.default.hash(payload.password, 12);
    payload.password = hashPassword;
    const result = yield user_model_1.User.create(payload);
    const removePassword = user_model_1.User.removePassword(result);
    return removePassword;
});
const userGetProfile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // get the user from the request user , this user come form auth middleware with jwt payload
    const user = req.user;
    // find the user in the database
    const findUser = yield user_model_1.User.findById(user.userId);
    // if user not found throw an error
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // this function remove the password from the user object
    const removePassword = user_model_1.User.removePassword(findUser);
    return removePassword;
});
const userUpdateProfile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const findUser = yield user_model_1.User.findById(user.userId);
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const update = req.body;
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(user.userId, update, { new: true });
    if (!updatedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Error updating user profile');
    }
    const removePassword = user_model_1.User.removePassword(updatedUser);
    return removePassword;
});
// admin can change user role
const changeUserRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const find = yield user_model_1.User.findById(id);
    console.log(find, id);
    console.log(find);
    if (!find) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const update = yield user_model_1.User.findByIdAndUpdate(id, { role: 'admin' }, { new: true });
    if (!update) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Error updating user role');
    }
});
const getAllUsers = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const users = yield user_model_1.User.find().skip(skip).limit(limit);
    const totalUsers = yield user_model_1.User.countDocuments();
    return {
        users,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        totalUsers,
    };
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const find = yield user_model_1.User.findById(id);
    if (!find) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const remove = yield user_model_1.User.findByIdAndDelete(id);
    if (!remove) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Error deleting user');
    }
});
exports.userServices = {
    userLogin,
    userRegister,
    userGetProfile,
    userUpdateProfile,
    changeUserRole,
    getAllUsers,
    deleteUser
};
