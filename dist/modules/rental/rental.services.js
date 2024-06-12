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
exports.rentalService = void 0;
const rental_model_1 = require("./rental.model");
const bike_model_1 = require("../bike/bike.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const createRental = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const rental = req.body;
    rental.userId = req.user.userId;
    const findbike = yield bike_model_1.BikeModel.findById(rental.bikeId);
    if (!(findbike === null || findbike === void 0 ? void 0 : findbike.isAvailable))
        throw new AppError_1.default(400, 'BIke is Already Rented');
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const setbikeavailable = yield bike_model_1.BikeModel.findByIdAndUpdate(rental.bikeId, { isAvailable: false }, session);
        if (!setbikeavailable)
            throw new AppError_1.default(500, 'Error updating bike availability');
        const result = yield rental_model_1.RentalModel.create([req.body], { session: session });
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(500, 'Error creating rental');
    }
});
const returnRental = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findRentalBike = yield rental_model_1.RentalModel.findById(id);
    if (!findRentalBike)
        throw new AppError_1.default(404, 'Rental not found');
    const bike = yield bike_model_1.BikeModel.findById(findRentalBike === null || findRentalBike === void 0 ? void 0 : findRentalBike.bikeId);
    if (!bike)
        throw new AppError_1.default(404, 'Bike not found');
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const startTime = new Date(findRentalBike.startTime);
        const returnTime = new Date(); // Current time
        const durationInHours = Math.ceil((returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)); // 
        const pricePerHour = 15; // Assuming the price per hour is $15
        const totalCost = durationInHours * pricePerHour;
        const rentalPriceandTime = yield rental_model_1.RentalModel.findByIdAndUpdate(id, { returnTime: returnTime, totalCost: totalCost, isReturned: true }, { new: true }).session(session);
        const setbikeavailable = yield bike_model_1.BikeModel.findByIdAndUpdate(findRentalBike.bikeId, { isAvailable: true }, session);
        if (!setbikeavailable)
            throw new AppError_1.default(500, 'Error updating bike availability');
        yield session.commitTransaction();
        session.endSession();
        return rentalPriceandTime;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(500, 'Error returning rental');
    }
});
const getAllRentals = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield rental_model_1.RentalModel.find({ userId: user.userId });
    return result;
});
exports.rentalService = {
    createRental,
    returnRental,
    getAllRentals
};
