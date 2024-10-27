"use strict";
// export type Tfavourite ={
//     bikeId: string;
//     userId: string;
//     isFavourite: boolean;
// }
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favourite = void 0;
// do the model for the favourite module
const mongoose_1 = __importDefault(require("mongoose"));
const favouriteSchema = new mongoose_1.default.Schema({
    bikeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Bike' },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
exports.Favourite = mongoose_1.default.model('Favourite', favouriteSchema);
