/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TBike } from "./bike.interface";
import { BikeModel } from "./bike.model";


const createBike = async (body: TBike) => {
    const bike = await BikeModel.create(body);
    
    return bike;
};

const getAllbikes= async(req:any)=>{
    const searchQuery = req.query.searchTerm as string;
    
    let query: any = {};
    if (searchQuery) {
        query.name = { $regex: searchQuery, $options: 'i' }; 
      }

    const bikes = await BikeModel.find(query);
    if (!bikes) {
        throw new AppError(httpStatus.NOT_FOUND, 'No bikes found');
    }
    const fillterQunatity = bikes.filter((bike)=>bike.quantity>0)
    return fillterQunatity;
}

const updateBike = async (id:string,body:Partial<TBike>) => {
    const bike = await BikeModel.findById(id);
    if (!bike) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike not found')
    }
    const result = await BikeModel.findByIdAndUpdate(id,body,{new:true});

    return result;
};
const deleteBike = async (id:string) => {
    const updatedBike = await BikeModel.findByIdAndUpdate(id, { isAvailable: false }, { new: true });
    if (!updatedBike) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
    }

    // Step 2: Delete the bike from the database
    const deletedBike = await BikeModel.findByIdAndDelete(id);
    if (!deletedBike) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike not found during deletion');
    }

    // Step 3: Return the deleted bike's data
    return deletedBike;
};

const getSingleBike = async (id: string) => {
    const bike = await BikeModel.findById(id);
    if (!bike) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
    }

    return bike;
};
export const bikeService = {
    createBike,
    getAllbikes,
    updateBike,
    deleteBike,
    getSingleBike
   
};










