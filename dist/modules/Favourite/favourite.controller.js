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
exports.favouriteController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const favourite_services_1 = require("./favourite.services");
const addFavourite = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield favourite_services_1.favouriteServices.addFavourite(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        data: result,
        success: true,
        message: result.message
    });
}));
const getFavourite = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield favourite_services_1.favouriteServices.getFavourite(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        data: result,
        success: true,
        message: 'Favourite List'
    });
}));
const removeFavourite = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield favourite_services_1.favouriteServices.removeFavourite(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        data: result,
        success: true,
        message: result.message
    });
}));
exports.favouriteController = {
    addFavourite,
    getFavourite,
    removeFavourite
};
