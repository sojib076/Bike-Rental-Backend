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
exports.orderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const payment_utilis_1 = require("../payment/payment.utilis");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentSession = yield (0, payment_utilis_1.initiatePayment)();
    return paymentSession;
});
exports.orderService = {
    createOrder
};
