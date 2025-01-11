/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TBike } from "./bike.interface";
import { BikeModel } from "./bike.model";


const createBike = async (body: TBike) => {
    const bike = await BikeModel.create(body);
    
    return bike;
};

const getAllbikes = async (req: any) => {
    const searchQuery = req.query.searchTerm as string;
    const bikeFilter = req.query.brand as string;
    const modelFilter = req.query.model as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const recentlyAdded = req.query.recentlyAdded as string;
    console.log(page,limit);
  

    const query: any = {};

    if (searchQuery) {
        query.name = { $regex: searchQuery, $options: 'i' };
    }

    if (bikeFilter) {
        query.brand = { $regex: bikeFilter, $options: 'i' };
    }

    if (modelFilter) {
        query.model = { $regex: modelFilter, $options: 'i' };
    }

   
    const totalCount = await BikeModel.countDocuments(query);
  
 
    const bikes = await BikeModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit);



    const availableBikes = bikes.filter((bike) => bike.quantity > 0 );
    if (recentlyAdded === 'true') {
        availableBikes.reverse();
    }else{
        availableBikes 
    }



    return {
        bikes: availableBikes,
        totalCount, 
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
    };
};


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

  
    const deletedBike = await BikeModel.findByIdAndDelete(id);
    if (!deletedBike) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike not found during deletion');
    }

   
    return deletedBike;
};

const getSingleBike = async (id: string) => {
    const bike = await BikeModel.findById(id);
    if (!bike) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
    }

    return bike;
};


const getrelatedBikes = async (id: string) => {
   console.log(id);

    const relatedBikes = await BikeModel.find({ _id: { $ne: id } }).limit(3);

    return relatedBikes;
};
export const bikeService = {
    createBike,
    getAllbikes,
    updateBike,
    deleteBike,
    getSingleBike,
    getrelatedBikes
   
};










