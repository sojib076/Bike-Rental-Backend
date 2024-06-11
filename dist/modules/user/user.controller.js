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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const userservices_1 = require("./userservices");
const userLogin = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userservices_1.userServices.userLogin(req.body);
    const { token, user } = result;
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User logged in successfully",
        token: token,
        success: true,
        data: user
    });
}));
const userRegister = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userservices_1.userServices.userRegister(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "User registered successfully",
        success: true,
        data: result
    });
}));
const userGetProfile = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userservices_1.userServices.userGetProfile(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User profile retrieved successfully",
        success: true,
        data: result
    });
}));
const userUpdateProfile = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userservices_1.userServices.userUpdateProfile(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User profile updated successfully",
        success: true,
        data: result
    });
}));
exports.userController = {
    userLogin,
    userRegister,
    userGetProfile,
    userUpdateProfile
};
