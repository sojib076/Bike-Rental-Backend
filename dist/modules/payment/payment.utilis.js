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
exports.initiatePayment = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initiatePayment = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post('https://sandbox.aamarpay.com/jsonpost.php', {
            store_id: "aamarpaytest",
            signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
            tran_id: paymentInfo.transactionId,
            success_url: `https://bike-rental-backend-delta.vercel.app/api/payment/confirmation?transactionId=${paymentInfo.transactionId}&status=success`,
            fail_url: `http://localhost:5000/api/payment/confirmation?status=failed`,
            cancel_url: "http://localhost:5173/",
            amount: paymentInfo.amount,
            currency: "BDT",
            desc: "Merchant Registration Payment",
            cus_name: 'sojib',
            cus_email: 'sojibdas@gmail.com',
            cus_add1: 'N/A',
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "N/A",
            cus_country: "N/A",
            cus_phone: '017817436024',
            type: "json"
        });
        return response.data;
    }
    catch (err) {
        throw new Error("Payment initiation failed!");
    }
});
exports.initiatePayment = initiatePayment;
