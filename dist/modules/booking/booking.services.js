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
    const rental = req.body;
    const RequestQuantity = parseInt(req.body.quantity);
    rental.userId = req.user.userId;
    const findbike = yield bike_model_1.BikeModel.findById(rental.bikeId);
    console.log(findbike === null || findbike === void 0 ? void 0 : findbike.quantity);
    if ((findbike === null || findbike === void 0 ? void 0 : findbike.quantity) === 0)
        throw new AppError_1.default(400, 'BIke is Already Rented');
    const paymentInfo = {
        transactionId: "pay_" + Math.floor(Math.random() * 1000000000).toString(),
        amount: '100',
    };
    const payment = yield (0, payment_utilis_1.initiatePayment)(paymentInfo);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (!findbike || findbike.quantity === undefined) {
            throw new AppError_1.default(400, 'Bike not found or quantity is undefined');
        }
        const setbikeavailable = yield bike_model_1.BikeModel.findByIdAndUpdate(rental.bikeId, {
            isAvailable: true,
            quantity: findbike.quantity - RequestQuantity
        }, { session });
        if (!setbikeavailable)
            throw new AppError_1.default(500, 'Error updating bike availability');
        const result = yield booking_model_1.RentalModel.create([
            {
                userId: rental.userId,
                bikeId: rental.bikeId,
                startTime: rental.startTime,
                isReturned: false,
                paymentId: paymentInfo.transactionId,
                advancedPayment: false,
                totalPaid: false,
                quantity: RequestQuantity
            }
        ], { session: session });
        if (!result)
            throw new AppError_1.default(500, 'Error creating rental');
        yield session.commitTransaction();
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
    if (!bike)
        throw new AppError_1.default(404, 'Bike not found');
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const startTime = new Date(findRentalBike.startTime);
        const returnTime = new Date();
        const durationInHours = Math.ceil((returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)); // 
        const pricePerHour = bike.pricePerHour;
        // calculate the total cost
        const totalCost = durationInHours * pricePerHour * ((findRentalBike === null || findRentalBike === void 0 ? void 0 : findRentalBike.quantity) || 1);
        const rentalPriceandTime = yield booking_model_1.RentalModel.findByIdAndUpdate(id, { totalCost: totalCost, isReturned: true,
            returnTime: returnTime
        }, { new: true }).session(session);
        const setbikeavailable = yield bike_model_1.BikeModel.findByIdAndUpdate(findRentalBike.bikeId, {
            isAvailable: true,
            quantity: bike.quantity + findRentalBike.quantity
        }, session);
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
    const result = yield booking_model_1.RentalModel.find({ userId: user.userId })
        .populate('bikeId', 'name')
        .populate('userId', 'name');
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
