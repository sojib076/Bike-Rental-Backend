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
exports.paymentServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bike_model_1 = require("../bike/bike.model");
const booking_model_1 = require("../booking/booking.model");
const confirmationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rental = yield booking_model_1.RentalModel.findOne({ paymentId: id });
    if (!rental) {
        const removetheLastDfromId = id.slice(0, -1);
        const rental = yield booking_model_1.RentalModel.findOne({ paymentId: removetheLastDfromId });
        // Check if advancePayment is true
        if (rental === null || rental === void 0 ? void 0 : rental.advancedPayment) {
            const removetheLastDfromId = id.slice(0, -1);
            // find by paymentId and set totalPaid to true
            yield booking_model_1.RentalModel.findOneAndUpdate({ paymentId: removetheLastDfromId }, { totalPaid: true });
            return `
        <html>
        <head>
            <title>Payment Successful</title>
        </head>
        <body>
            <h1>Payment Successful</h1>
            <p>Thank you for your payment</p>
        </body>
        </html>`;
        }
    }
    // If advancePayment is not true, set it to true
    const setBikeAvailable = yield bike_model_1.BikeModel.findByIdAndUpdate(rental === null || rental === void 0 ? void 0 : rental.bikeId, { isAvailable: false });
    if (!setBikeAvailable)
        throw new Error('Error updating bike availability');
    const result = yield booking_model_1.RentalModel.findByIdAndUpdate(rental === null || rental === void 0 ? void 0 : rental._id, { advancedPayment: true });
    if (!result)
        throw new Error('Error updating rental');
    return `
<html>
<head>
    <title>Payment Successful</title>
    <style>
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Payment Successful</h1>
    <p>Thank you for your payment</p>
    <a href="https://bike-rental-tau.vercel.app/" class="button">Go to Home</a>
</body>
</html>
 
 `;
});
exports.paymentServices = {
    confirmationService
};
