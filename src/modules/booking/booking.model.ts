import { Schema, model } from "mongoose";
import { IRental } from "./booking.interface";

const RentalSchema = new Schema<IRental>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, default: 0 },
    totalPaid : { type: Boolean, default: false },
    paymentId: { type: String, required: true },
    advancedPayment: { type: Boolean, default: false },
    isReturned: { type: Boolean, default: false },
    reviewAdded:{ type: Boolean, default: false },
    quantity:{type:Number,required:true},
    createdAt: { type: Date, default: Date.now },
  },);
  
  // Create and export the Rental model

export const RentalModel = model<IRental>('Rental', RentalSchema);