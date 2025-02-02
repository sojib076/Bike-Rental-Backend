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
exports.reviewController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const reviews_services_1 = require("./reviews.services");
const addReview = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_services_1.reviewService.addReview(req);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Rental created successfully',
        statusCode: 200,
        success: true
    });
}));
const getpostreviews = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get from id 
    const bikeId = req.params.bikeId;
    const result = yield reviews_services_1.reviewService.getpostreviews(bikeId);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Rental created successfully',
        statusCode: 200,
        success: true
    });
}));
const getuserreviews = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get from id 
    const userId = req.user.userId;
    const result = yield reviews_services_1.reviewService.getuserreviews(userId);
    console.log(result, 'result reviews');
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Rental created successfully',
        statusCode: 200,
        success: true
    });
}));
exports.reviewController = {
    addReview,
    getpostreviews,
    getuserreviews
};
