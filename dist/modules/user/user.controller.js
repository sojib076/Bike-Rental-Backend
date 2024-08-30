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
    const result = yield userservices_1.userServices.userLogin(req.body); //req.body is the data sent from the frontend
    const { token, user } = result;
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User logged in successfully",
        token: token,
        success: true,
        data: user
    }); //  this is the response sent back to the frontend
}));
const userRegister = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userservices_1.userServices.userRegister(req.body); //req.body is the data sent from the frontend
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User registered successfully",
        success: true,
        data: result
    }); //  this is the response sent back to the frontend
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
    // if (req.body.role) {
    //     throw new AppError(httpStatus.BAD_REQUEST, 'Role cannot be updated');
    // }
    const result = yield userservices_1.userServices.userUpdateProfile(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: " Profile updated successfully",
        success: true,
        data: result
    }); //  this is the response sent back to the frontend
}));
// admin can change user role
const changeUserRole = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userservices_1.userServices.changeUserRole(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User role updated successfully",
        success: true,
        data: result
    });
}));
// getAllUsers
const getAllUsers = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userservices_1.userServices.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "All users retrieved successfully",
        success: true,
        data: result
    }); //  this is the response sent back to the frontend
}));
const deleteUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userservices_1.userServices.deleteUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User deleted successfully",
        success: true,
        data: result
    }); //  this is the response sent back to the frontend
}));
exports.userController = {
    userLogin,
    userRegister,
    userGetProfile,
    userUpdateProfile,
    changeUserRole,
    getAllUsers,
    deleteUser
};
