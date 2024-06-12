"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = exports.updateUserValidation = exports.userRegisterValidation = exports.userLoginValidation = void 0;
const zod_1 = require("zod");
exports.userLoginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
exports.userRegisterValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
    }),
});
exports.updateUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
exports.authValidation = {
    userLoginValidation: exports.userLoginValidation,
    userRegisterValidation: exports.userRegisterValidation
};
