"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedBikeSchema = exports.bikeSchema = void 0;
// bike.schema.ts
const zod_1 = require("zod");
exports.bikeSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        pricePerHour: zod_1.z.number(),
        isAvailable: zod_1.z.boolean().optional().default(true),
        cc: zod_1.z.number(),
        year: zod_1.z.number(),
        model: zod_1.z.string(),
        brand: zod_1.z.string(),
    }),
});
exports.updatedBikeSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        isAvailable: zod_1.z.boolean().optional(),
        cc: zod_1.z.number().optional(),
        year: zod_1.z.number().optional(),
        model: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
    }),
});
