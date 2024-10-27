import { Request } from "express";
import { RentalModel } from "./booking.model";
import { BikeModel } from "../bike/bike.model";
import AppError from "../../error/AppError";
import mongoose from "mongoose";
import { IRental } from "./booking.interface";
import { initiatePayment } from "../payment/payment.utilis";

const createRental = async (req: Request) => {
    const rental: IRental = req.body;
    const RequestQuantity = parseInt(req.body.quantity);
   
    rental.userId = req.user.userId ;
    
    const findbike = await BikeModel.findById(rental.bikeId);
    console.log(findbike?.quantity);
    if (findbike?.quantity===0) throw new AppError(400, 'BIke is Already Rented');

   
    const paymentInfo = {

         transactionId :"pay_" + Math.floor(Math.random() * 1000000000).toString(),
         amount : '100',
    
    }
     
    const payment = await initiatePayment(paymentInfo);
    const session = await mongoose.startSession();


    try {
        session.startTransaction();
        if (!findbike || findbike.quantity === undefined) {
            throw new AppError(400, 'Bike not found or quantity is undefined');
        }

        const setbikeavailable = await BikeModel.findByIdAndUpdate(rental.bikeId, { 
            isAvailable: true,
            quantity: findbike.quantity - RequestQuantity 
        }, { session });

        if (!setbikeavailable) throw new AppError(500, 'Error updating bike availability');

       
        const result = await RentalModel.create([
            {
                userId: rental.userId,
                bikeId: rental.bikeId,
                startTime: rental.startTime,
                isReturned: false,
                paymentId: paymentInfo.transactionId,
                advancedPayment: false,
                totalPaid: false,
                quantity: RequestQuantity

            }

        ], { session: session });

        if (!result) throw new AppError(500, 'Error creating rental');

     
        await session.commitTransaction();
     
        session.endSession();
        return payment;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError(500, 'Error creating rental');
    }


};

const returnRental = async (id: string,returnTime:any) => {
    console.log(returnTime,'sdfghjkl');
  
    const findRentalBike = await RentalModel.findById(id);

    if (!findRentalBike) throw new AppError(404, 'Rental not found');

    const bike = await BikeModel.findById(findRentalBike?.bikeId);
 

    if (!bike) throw new AppError(404, 'Bike not found');

  
    const session = await mongoose.startSession();
    try {
      

        session.startTransaction();
      
        const startTime: Date = new Date(findRentalBike.startTime);
      
        const returnTimea: Date = new Date(returnTime);

        
        const durationInHours: number = Math.ceil((returnTimea.getTime() - startTime.getTime()) / (1000 * 60 * 60)); // 
        const pricePerHour: number = bike.pricePerHour;
       
       
        // calculate the total cost
        const totalCost: number = durationInHours * pricePerHour * (findRentalBike?.quantity || 1);
        
        const rentalPriceandTime = await RentalModel.findByIdAndUpdate(id, {  totalCost: totalCost, isReturned: true ,

            returnTime: returnTimea
         }
            , { new: true },).session(session);
        

        const setbikeavailable = await BikeModel.findByIdAndUpdate(findRentalBike.bikeId, { 
            isAvailable: true,
            quantity: bike.quantity + findRentalBike.quantity
         }, session);
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
    const result = await RentalModel.find({ userId: user.userId })
        .populate('bikeId', 'name')
        .populate('userId', 'name');

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



const rentalPayment = async () => {
    const result = await RentalModel.find()
        .populate('userId', 'email')
        .populate('bikeId', 'name');
    return result;
};


export const rentalService = {
    createRental,
    returnRental,
    getAllRentals,
    fullPayment,
    allrentalbike,
    getRentalTransaction,
    rentalPayment
};