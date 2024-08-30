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
const booking_model_1 = require("./booking.model");
const bike_model_1 = require("../bike/bike.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const payment_utilis_1 = require("../payment/payment.utilis");
const createRental = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // get  data from the request body
    const rental = req.body;
    console.log(rental);
    rental.userId = req.user.userId;
    // find the bike by id
    const findbike = yield bike_model_1.BikeModel.findById(rental.bikeId);
    if (!(findbike === null || findbike === void 0 ? void 0 : findbike.isAvailable))
        throw new AppError_1.default(400, 'BIke is Already Rented');
    // create a transaction id
    const paymentInfo = {
        transactionId: "pay_" + Math.floor(Math.random() * 1000000000).toString(),
        amount: '100',
    };
    const payment = yield (0, payment_utilis_1.initiatePayment)(paymentInfo);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // set the bike to not available
        const setbikeavailable = yield bike_model_1.BikeModel.findByIdAndUpdate(rental.bikeId, { isAvailable: true });
        if (!setbikeavailable)
            throw new AppError_1.default(500, 'Error updating bike availability');
        // create a rental with session 
        const result = yield booking_model_1.RentalModel.create([
            {
                userId: rental.userId,
                bikeId: rental.bikeId,
                startTime: rental.startTime,
                isReturned: false,
                paymentId: paymentInfo.transactionId,
                advancedPayment: false,
                totalPaid: false
            }
        ], { session: session });
        if (!result)
            throw new AppError_1.default(500, 'Error creating rental');
        // commit the transaction
        yield session.commitTransaction();
        // end the session
        session.endSession();
        return payment;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(500, 'Error creating rental');
    }
});
const returnRental = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findRentalBike = yield booking_model_1.RentalModel.findById(id);
    if (!findRentalBike)
        throw new AppError_1.default(404, 'Rental not found');
    const bike = yield bike_model_1.BikeModel.findById(findRentalBike === null || findRentalBike === void 0 ? void 0 : findRentalBike.bikeId);
    console.log(bike);
    if (!bike)
        throw new AppError_1.default(404, 'Bike not found');
    // start a session
    const session = yield mongoose_1.default.startSession();
    try {
        // start a transaction
        session.startTransaction();
        // get the start time of the rental
        const startTime = new Date(findRentalBike.startTime);
        // set the return time to the current time
        const returnTime = new Date();
        // calculate the duration in hours
        const durationInHours = Math.ceil((returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)); // 
        const pricePerHour = bike.pricePerHour;
        // calculate the total cost
        const totalCost = durationInHours * pricePerHour;
        // update the rental with the return time and total cost and set isReturned to true
        const rentalPriceandTime = yield booking_model_1.RentalModel.findByIdAndUpdate(id, { totalCost: totalCost, isReturned: true,
            returnTime: returnTime
        }, { new: true }).session(session);
        // sesstion used to make sure the transaction is more secure
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
    const result = yield booking_model_1.RentalModel.find({ userId: user.userId });
    return result;
});
const fullPayment = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentId = req.body.paymentId;
    const amount = req.body.totalCost;
    console.log(amount, paymentId);
    const paymentInfo = {
        transactionId: paymentId + Math.floor(Math.random() * 9).toString(),
        amount: amount,
    };
    const payment = yield (0, payment_utilis_1.initiatePayment)(paymentInfo);
    console.log(payment);
    return payment;
});
const allrentalbike = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.RentalModel.find({})
        .populate('userId', 'name')
        .populate('bikeId', 'name');
    return result;
});
const getRentalTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.RentalModel.findOne({ paymentId: id }).populate('userId', 'name').populate('bikeId', 'name');
    console.log(result);
    return result;
});
exports.rentalService = {
    createRental,
    returnRental,
    getAllRentals,
    fullPayment,
    allrentalbike,
    getRentalTransaction
};
