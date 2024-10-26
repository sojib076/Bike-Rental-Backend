"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalModel = void 0;
const mongoose_1 = require("mongoose");
const RentalSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Bike', required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, default: 0 },
    totalPaid: { type: Boolean, default: false },
    paymentId: { type: String, required: true },
    advancedPayment: { type: Boolean, default: false },
    isReturned: { type: Boolean, default: false },
    reviewAdded: { type: Boolean, default: false },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.RentalModel = (0, mongoose_1.model)('Rental', RentalSchema);
