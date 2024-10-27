

import { Schema } from "mongoose";

export type IReview = {
    bikeId:  Schema.Types.ObjectId;
    userId?: Schema.Types.ObjectId;
    rating: number;
    date?: Date;
    comment: string;
    helpful?: number;
    paymentId: string;
};
