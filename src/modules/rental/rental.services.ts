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
    const rental: IRental = req.body;
    rental.userId = req.user.userId;
    const findbike = await BikeModel.findById(rental.bikeId);
    if (!findbike?.isAvailable) throw new AppError(400, 'BIke is Already Rented');
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const setbikeavailable = await BikeModel.findByIdAndUpdate(rental.bikeId, { isAvailable: false }, session);
        if (!setbikeavailable) throw new AppError(500, 'Error updating bike availability');
        const result = await RentalModel.create([req.body], { session: session });
        await session.commitTransaction();
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
    
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const startTime: Date = new Date(findRentalBike.startTime); 
        const returnTime: Date = new Date();  // Current time
        const durationInHours: number = Math.ceil((returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)); // 
        const pricePerHour: number = 15;  // Assuming the price per hour is $15
        const totalCost: number = durationInHours * pricePerHour;
        const rentalPriceandTime = await RentalModel.findByIdAndUpdate(id, { returnTime: returnTime, totalCost: totalCost ,isReturned:true}, { new: true }, ).session(session);

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
 const getAllRentals = async (req:Request) => {
    const user = req.user;
    const result = await RentalModel.find({userId:user.userId});
    
    return result;
 };


export const rentalService = {
    createRental,
    returnRental,
    getAllRentals
};