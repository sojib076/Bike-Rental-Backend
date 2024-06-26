"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRoutes = void 0;
const express_1 = require("express");
const rental_controller_1 = require("./rental.controller");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const rental_validation_1 = require("./rental.validation");
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(rental_validation_1.rentalSchema), rental_controller_1.rentalController.createRental);
router.put('/:id/return', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), rental_controller_1.rentalController.returnRental);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), rental_controller_1.rentalController.getAllRentals);
exports.rentalRoutes = router;
