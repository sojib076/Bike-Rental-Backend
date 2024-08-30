import { Request } from "express";
import { RentalModel } from "./booking.model";
import { BikeModel } from "../bike/bike.model";
import AppError from "../../error/AppError";
import mongoose from "mongoose";
import { IRental } from "./booking.interface";
import { initiatePayment } from "../payment/payment.utilis";

const createRental = async (req: Request) => {
    // get  data from the request body
    const rental: IRental = req.body;
     console.log(rental);

    rental.userId = req.user.userId;
    // find the bike by id
    const findbike = await BikeModel.findById(rental.bikeId);
    if (!findbike?.isAvailable) throw new AppError(400, 'BIke is Already Rented');

    
    // create a transaction id
    const paymentInfo = {

         transactionId :"pay_" + Math.floor(Math.random() * 1000000000).toString(),
         amount : '100',
    
    }
     
    
    

    const payment = await initiatePayment(paymentInfo);



    const session = await mongoose.startSession();


    try {
        session.startTransaction();
        // set the bike to not available
        const setbikeavailable = await BikeModel.findByIdAndUpdate(rental.bikeId, { isAvailable: true });

        if (!setbikeavailable) throw new AppError(500, 'Error updating bike availability');

        // create a rental with session 
        const result = await RentalModel.create([
            {
                userId: rental.userId,
                bikeId: rental.bikeId,
                startTime: rental.startTime,
                isReturned: false,
                paymentId: paymentInfo.transactionId,
                advancedPayment: false,
                totalPaid: false
            }

        ], { session: session });

        if (!result) throw new AppError(500, 'Error creating rental');

        // commit the transaction
        await session.commitTransaction();
        // end the session
        session.endSession();
        return payment;
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
    console.log(bike);

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
       
       
        // calculate the total cost
        const totalCost: number = durationInHours * pricePerHour;

        // update the rental with the return time and total cost and set isReturned to true
        const rentalPriceandTime = await RentalModel.findByIdAndUpdate(id, {  totalCost: totalCost, isReturned: true ,

            returnTime: returnTime
         }
            , { new: true },).session(session);
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

const fullPayment = async (req: Request) => {
    const paymentId = req.body.paymentId;
    const amount = req.body.totalCost;
    console.log(amount, paymentId);
    const paymentInfo = {
            transactionId:paymentId + Math.floor(Math.random() *9).toString(),
            amount: amount,
    }

    
    const payment = await initiatePayment(paymentInfo);
    console.log(payment);
   
  

  return payment;
}  

const allrentalbike = async () => {
    const result = await RentalModel.find({})
        .populate('userId', 'name')  
        .populate('bikeId', 'name'); 
    return result;
};

const getRentalTransaction = async (id: string) => {
    
    const result = await RentalModel.findOne({paymentId: id}).populate('userId', 'name').populate('bikeId', 'name');
    console.log(result);
    return result;
};



export const rentalService = {
    createRental,
    returnRental,
    getAllRentals,
    fullPayment,
    allrentalbike,
    getRentalTransaction
};