// review.model.js

import { model, Schema } from "mongoose";
import { IReview } from "./reviews.interface";


const reviewSchema = new Schema<IReview>({
  bikeId: {
    type: String,

    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
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

export const Review = model<IReview>("Review", reviewSchema);
