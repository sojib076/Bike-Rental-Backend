import { Schema } from "mongoose";


export type Tfavourite ={
    bikeId: Schema.Types.ObjectId;
    userId?: Schema.Types.ObjectId;
    
}