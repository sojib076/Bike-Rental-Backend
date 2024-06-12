import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { bikeService } from "./bike.service";

const createBike = asyncHandler(async (req, res) => {
    const result = await bikeService.createBike(req.body);
    sendResponse(res,{
    statusCode:200,
    data:result,
    success:true,
    message:'Bike added successfully'
    })
});

const getAllbikes = asyncHandler(async (req, res) => {
    const result = await bikeService.getAllbikes();
    sendResponse(res,{
        statusCode:200,
        data:result,
        success:true,
        message:'Bikes retrieved successfully'
    })
});


const updateBike = asyncHandler(async (req, res) => {
    const result = await bikeService.updateBike(req.params.id,req.body);
    sendResponse(res,{
        statusCode:200,
        data:result,
        success:true,
        message:'Bike updated successfully'
    })
});
const deleteBike = asyncHandler(async (req, res) => {
    const result = await bikeService.deleteBike(req.params.id);
    sendResponse(res,{
        statusCode:200,
        data:result,
        success:true,
        message:'Bike deleted successfully'
    })
});



export const bikeController = {
    createBike,
    getAllbikes,
    updateBike,
    deleteBike
}