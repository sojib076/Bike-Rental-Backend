

// export type Tfavourite ={
//     bikeId: string;
//     userId: string;
//     isFavourite: boolean;
// }


// do the model for the favourite module
import mongoose from 'mongoose';
import { Tfavourite } from './favourite.inteface';

const favouriteSchema = new mongoose.Schema <Tfavourite> ({
    bikeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { timestamps: true });

export const Favourite = mongoose.model('Favourite', favouriteSchema);