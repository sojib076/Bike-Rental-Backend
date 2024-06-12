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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const bike_model_1 = require("./bike.model");
const createBike = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield bike_model_1.BikeModel.create(body);
    return bike;
});
const getAllbikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const bikes = yield bike_model_1.BikeModel.find();
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
    const findbyidandupdateAvailable = yield bike_model_1.BikeModel.findByIdAndUpdate(id, { isAvailable: false }, { new: true });
    if (!findbyidandupdateAvailable) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    return findbyidandupdateAvailable;
});
exports.bikeService = {
    createBike,
    getAllbikes,
    updateBike,
    deleteBike
};
