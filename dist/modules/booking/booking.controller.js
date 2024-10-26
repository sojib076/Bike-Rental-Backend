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
exports.rentalController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_services_1 = require("./booking.services");
const createRental = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.rentalService.createRental(req);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Rental created successfully',
        statusCode: 200,
        success: true
    });
}));
const returnRental = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { returntime } = req.query;
    console.log(req.query);
    const result = yield booking_services_1.rentalService.returnRental(id, returntime);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Bike returned successfully',
        statusCode: 200,
        success: true,
    });
}));
const getAllRentals = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.rentalService.getAllRentals(req);
    if (result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            data: result,
            message: 'No Data Found',
            statusCode: 404,
            success: false
        });
    }
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'All Rentals',
        statusCode: 200,
        success: true
    });
}));
const fullPayment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.rentalService.fullPayment(req);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Full Payment Successful',
        statusCode: 200,
        success: true
    });
}));
const allrentalbike = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.rentalService.allrentalbike();
    if (result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            data: result,
            message: 'No Data Found',
            statusCode: 404,
            success: false
        });
    }
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'All Rentals',
        statusCode: 200,
        success: true
    });
}));
const getRentalTransaction = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.rentalService.getRentalTransaction(req.params.id);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            data: result,
            message: 'No Data Found',
            statusCode: 404,
            success: false
        });
    }
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Rental Transaction',
        statusCode: 200,
        success: true
    });
}));
const rentalPayment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('rentalPayment');
    const result = yield booking_services_1.rentalService.rentalPayment();
    console.log(result);
    if (result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            data: result,
            message: 'No Data Found',
            statusCode: 404,
            success: false
        });
    }
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'All Rentals',
        statusCode: 200,
        success: true
    });
}));
exports.rentalController = {
    createRental,
    returnRental,
    getAllRentals,
    fullPayment,
    allrentalbike,
    getRentalTransaction,
    rentalPayment
};
