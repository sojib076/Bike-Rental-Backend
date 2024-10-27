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
exports.favouriteServices = void 0;
const favourite_model_1 = require("./favourite.model");
const addFavourite = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const bikeId = req.body.bikeId;
    try {
        const favourite = yield favourite_model_1.Favourite.findOne({ userId, bikeId });
        if (favourite) {
            return { message: "Already added to favourite" };
        }
        const result = yield favourite_model_1.Favourite.create({ userId, bikeId });
        return { message: "Added to favourite", result };
    }
    catch (error) {
        return { message: error.message };
    }
});
const getFavourite = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const result = yield favourite_model_1.Favourite.find({ userId }).populate('bikeId');
        return result;
    }
    catch (error) {
        return { message: error.message };
    }
});
const removeFavourite = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Optional chaining for safety
    const bikeId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.bikeId;
    if (!userId || !bikeId) {
        return { message: "User ID or Bike ID not provided" };
    }
    try {
        const favourite = yield favourite_model_1.Favourite.findOne({ userId, bikeId });
        if (!favourite) {
            return { message: "Bike is not in favourites" };
        }
        // If found, delete the favourite
        const result = yield favourite_model_1.Favourite.findOneAndDelete({ userId, bikeId });
        if (!result) {
            return { message: "Failed to remove favourite" };
        }
        return { message: "Favourite removed successfully" };
    }
    catch (error) {
        return { message: error.message };
    }
});
exports.favouriteServices = {
    addFavourite,
    getFavourite,
    removeFavourite
};
