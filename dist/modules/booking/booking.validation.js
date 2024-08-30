"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalSchema = void 0;
const zod_1 = require("zod");
exports.rentalSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        bikeId: zod_1.z.string(),
        startTime: zod_1.z.string().transform((str) => new Date(str)), // Transform string to Date
        returnTime: zod_1.z.string().nullable().optional().transform((str) => str ? new Date(str) : null), // Optional and nullable
        totalCost: zod_1.z.number().optional().default(0),
        isReturned: zod_1.z.boolean().optional().default(false),
    }),
});
