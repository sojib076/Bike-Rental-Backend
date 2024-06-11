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
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.UserModel.findOne({ email: payload.email }).select('+password');
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isMatch = yield bcrypt_1.default.compare(payload.password, findUser.password);
    if (!isMatch) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const removePassword = findUser.toObject();
    const { password } = removePassword, user = __rest(removePassword, ["password"]);
    return {
        token: 'token',
        user,
    };
});
const userRegister = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const hashPassword = payload.password;
    const hashPassword = yield bcrypt_1.default.hash(payload.password, 12);
    payload.password = hashPassword;
    const result = yield user_model_1.UserModel.create(payload);
    const removePassword = result.toObject();
    const { password } = removePassword, user = __rest(removePassword, ["password"]);
    return user;
});
exports.authServices = {
    userLogin,
    userRegister
};
