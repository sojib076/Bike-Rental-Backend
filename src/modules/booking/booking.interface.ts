import { Schema } from "mongoose";

export type IRental= {
    userId?: Schema.Types.ObjectId;
    bikeId: Schema.Types.ObjectId;
    startTime: Date;
    returnTime?: Date | null;
    totalCost?: number;
    isReturned?: boolean;
    paymentId: string;
   advancedPayment?: boolean;
   totalPaid?: boolean
   reviewAdded?:boolean
   quantity:number,
   createdAt?: Date;
  }