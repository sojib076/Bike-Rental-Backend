/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { Favourite } from "./favourite.model";




const addFavourite = async (req: Request) => {
    const userId = req.user.userId;
    const bikeId = req.body.bikeId;

    try {
        const favourite = await Favourite.findOne({ userId, bikeId });
        if (favourite) {
            return { message: "Already added to favourite" };
        }
        const result = await Favourite.create({ userId, bikeId });
        return { message: "Added to favourite", result };


    } catch (error:any) {
        return { message: error.message };
    }


};


const getFavourite = async (req: Request) => {
    const userId = req.user.userId;
    try {
        const result = await Favourite.find({ userId }).populate('bikeId');
        return result ;
    } catch (error:any) {
        return { message: error.message };
    }
};

const removeFavourite = async (req: Request) => {
    const userId = req.user?.userId; // Optional chaining for safety
    const bikeId = req.params?.bikeId;

    if (!userId || !bikeId) {
        return { message: "User ID or Bike ID not provided" };
    }

    try {
       
        const favourite = await Favourite.findOne({ userId, bikeId });
        
        if (!favourite) {
            return { message: "Bike is not in favourites" };
        }

        // If found, delete the favourite
        const result = await Favourite.findOneAndDelete({ userId, bikeId });
        
        if (!result) {
            return { message: "Failed to remove favourite" };
        }

        return { message: "Favourite removed successfully" };
    } catch (error: any) {
        return { message: error.message };
    }
};


export const favouriteServices = {
    addFavourite,
    getFavourite,
    removeFavourite
};