"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/login', (0, validateRequest_1.default)(user_validation_1.userLoginValidation), user_controller_1.userController.userLogin); // user login
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.userRegisterValidation), user_controller_1.userController.userRegister); // user register
router.get('/me', (0, auth_1.auth)(), user_controller_1.userController.userGetProfile); // get user profile
router.put('/me', (0, auth_1.auth)(), user_controller_1.userController.userUpdateProfile); // update user profile
exports.userRoutes = router;
