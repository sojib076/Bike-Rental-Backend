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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const reviews_model_1 = require("./reviews.model");
const booking_model_1 = require("../booking/booking.model");
const addReview = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewbody = req.body;
    const userId = req.user.userId;
    const paymentId = req.body.paymentId;
    try {
        const result = yield reviews_model_1.Review.create(Object.assign(Object.assign({}, reviewbody), { userId }));
        if (result) {
            const check = yield booking_model_1.RentalModel.findOneAndUpdate({ paymentId: paymentId }, { reviewAdded: true }, { new: true });
            console.log(check);
            return result;
        }
        else {
            return "Review not added";
        }
    }
    catch (err) {
        console.log(err);
        return err;
    }
});
const getpostreviews = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield reviews_model_1.Review.find({ bikeId: bikeId }).populate('userId', 'name email');
        return result;
    }
    catch (err) {
        console.log(err);
        return err;
    }
});
const getuserreviews = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId);
    try {
        const result = yield reviews_model_1.Review.find({ userId: userId }).populate('bikeId', 'name');
        console.log(result);
        return result;
    }
    catch (err) {
        console.log(err);
        return err;
    }
});
exports.reviewService = {
    addReview,
    getpostreviews,
    getuserreviews
};
