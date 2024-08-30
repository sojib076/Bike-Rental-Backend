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
exports.bikeService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const bike_model_1 = require("./bike.model");
const createBike = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield bike_model_1.BikeModel.create(body);
    return bike;
});
const getAllbikes = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.searchTerm;
    let query = {};
    if (searchQuery) {
        query.name = { $regex: searchQuery, $options: 'i' }; // i means case-insensitive
    }
    const bikes = yield bike_model_1.BikeModel.find(query);
    return bikes;
});
const updateBike = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield bike_model_1.BikeModel.findById(id);
    if (!bike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    const result = yield bike_model_1.BikeModel.findByIdAndUpdate(id, body, { new: true });
    return result;
});
const deleteBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBike = yield bike_model_1.BikeModel.findByIdAndUpdate(id, { isAvailable: false }, { new: true });
    if (!updatedBike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    // Step 2: Delete the bike from the database
    const deletedBike = yield bike_model_1.BikeModel.findByIdAndDelete(id);
    if (!deletedBike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found during deletion');
    }
    // Step 3: Return the deleted bike's data
    return deletedBike;
});
const getSingleBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield bike_model_1.BikeModel.findById(id);
    if (!bike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    return bike;
});
exports.bikeService = {
    createBike,
    getAllbikes,
    updateBike,
    deleteBike,
    getSingleBike
};
