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
exports.bikeController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const bike_service_1 = require("./bike.service");
const createBike = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeService.createBike(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        data: result,
        success: true,
        message: 'Bike added successfully'
    });
}));
const getAllbikes = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield bike_service_1.bikeService.getAllbikes(req);
    if (((_a = result === null || result === void 0 ? void 0 : result.bikes) === null || _a === void 0 ? void 0 : _a.length) === 0) {
        return (0, sendResponse_1.default)(res, {
            data: result,
            message: 'No Data Found',
            statusCode: 404,
            success: false
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        data: result,
        success: true,
        message: 'Bikes retrieved successfully'
    });
}));
const updateBike = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeService.updateBike(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        data: result,
        success: true,
        message: 'Bike updated successfully'
    });
}));
const deleteBike = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeService.deleteBike(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        data: result,
        success: true,
        message: 'Bike deleted successfully'
    });
}));
const getSingleBike = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeService.getSingleBike(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        data: result,
        success: true,
        message: 'Bike retrieved successfully'
    });
}));
exports.bikeController = {
    createBike,
    getAllbikes,
    updateBike,
    deleteBike,
    getSingleBike
};
