import { Request } from "express";
import { IRental } from "./rental.interface";
import { RentalModel } from "./rental.model";
import { BikeModel } from "../bike/bike.model";
import { User } from "../user/user.model";
import AppError from "../../error/AppError";
import { TBike } from "../bike/bike.interface";
import mongoose from "mongoose";
import { date } from "zod";

const createRental = async (req: Request) => {
    // get  data from the request body
    const rental: IRental = req.body;
    // set the user id to the current user id
    rental.userId = req.user.userId;
    // find the bike by id
    const findbike = await BikeModel.findById(rental.bikeId);
    if (!findbike?.isAvailable) throw new AppError(400, 'BIke is Already Rented');

    // start a transaction
    const session = await mongoose.startSession();


    try {
        session.startTransaction();
        // set the bike to not available
        const setbikeavailable = await BikeModel.findByIdAndUpdate(rental.bikeId, { isAvailable: false }, session);
        // if bike is not available throw an error
        if (!setbikeavailable) throw new AppError(500, 'Error updating bike availability');

        // create a rental with session 
        const result = await RentalModel.create([req.body], { session: session });
        // if rental is not created throw an error
        if (!result) throw new AppError(500, 'Error creating rental');

        // commit the transaction
        await session.commitTransaction();
        // end the session
        session.endSession();
        return result;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError(500, 'Error creating rental');
    }
};

const returnRental = async (id: string) => {
    const findRentalBike = await RentalModel.findById(id);
    if (!findRentalBike) throw new AppError(404, 'Rental not found');

    const bike = await BikeModel.findById(findRentalBike?.bikeId);

    if (!bike) throw new AppError(404, 'Bike not found');

    // start a session
    const session = await mongoose.startSession();
    try {
    // start a transaction

        session.startTransaction();
        // get the start time of the rental
        const startTime: Date = new Date(findRentalBike.startTime);
        // set the return time to the current time
        const returnTime: Date = new Date();  

        // calculate the duration in hours
        const durationInHours: number = Math.ceil((returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)); // 
        const pricePerHour: number = bike.pricePerHour;  
        console.log(durationInHours, pricePerHour);
        // calculate the total cost
        const totalCost: number = durationInHours * pricePerHour;

        // update the rental with the return time and total cost and set isReturned to true
        const rentalPriceandTime = await RentalModel.findByIdAndUpdate(id, { returnTime: returnTime, totalCost: totalCost, isReturned: true }, { new: true },).session(session);
        // sesstion used to make sure the transaction is more secure

        const setbikeavailable = await BikeModel.findByIdAndUpdate(findRentalBike.bikeId, { isAvailable: true }, session);
        if (!setbikeavailable) throw new AppError(500, 'Error updating bike availability');
        await session.commitTransaction();
        session.endSession();
        return rentalPriceandTime;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError(500, 'Error returning rental');

    }
}
const getAllRentals = async (req: Request) => {
    const user = req.user;
    const result = await RentalModel.find({ userId: user.userId });

    return result;
};


export const rentalService = {
    createRental,
    returnRental,
    getAllRentals
};