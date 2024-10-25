"use strict";
// review.model.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    bikeId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    helpful: {
        type: Number,
        default: 0,
    },
});
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
