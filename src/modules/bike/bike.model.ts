import { Schema, model } from "mongoose";
import { TBike } from "./bike.interface";

const BikeSchema = new Schema< TBike>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    imgageurl: { type: String, required: true },
    quantity: { type: Number, 
        default: 10,
    },

});

export const  BikeModel = model<TBike>('Bike', BikeSchema);