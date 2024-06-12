import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TBike } from "./bike.interface";
import { BikeModel } from "./bike.model";


const createBike = async (body: TBike) => {
    const bike = await BikeModel.create(body);
    
    return bike;
};

const getAllbikes= async()=>{
    const bikes = await BikeModel.find();
    if (bikes.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, ' NO Bikes found')
    }
    return bikes;
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
    const findbyidandupdateAvailable = await BikeModel.findByIdAndUpdate(id,{isAvailable:false},{new:true});
    if (!findbyidandupdateAvailable) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike not found')
    }
    
    return findbyidandupdateAvailable;
};

export const bikeService = {
    createBike,
    getAllbikes,
    updateBike,
    deleteBike
   
};










