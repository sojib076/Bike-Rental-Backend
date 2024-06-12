import { Schema, model } from "mongoose";
import { IRental } from "./rental.interface";

const RentalSchema = new Schema<IRental>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, default: 0 },
    isReturned: { type: Boolean, default: false }
  },);
  
  // Create and export the Rental model

export const RentalModel = model<IRental>('Rental', RentalSchema);