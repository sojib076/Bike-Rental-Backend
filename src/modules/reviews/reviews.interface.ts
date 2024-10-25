

import { Schema } from "mongoose";

export type IReview = {
    bikeId: string
    userId?: Schema.Types.ObjectId;
    rating: number;
    date?: Date;
    comment: string;
    helpful?: number;
    paymentId: string;
};
