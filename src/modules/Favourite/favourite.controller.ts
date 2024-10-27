import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { favouriteServices } from "./favourite.services";

const addFavourite = asyncHandler(async (req, res) => {
 
    const result = await favouriteServices.addFavourite(req);
    
    sendResponse(res,{
        statusCode:200,
        data:result,
        success:true,
        message: result.message
    })
});


const getFavourite = asyncHandler(async (req, res) => {
    const result = await favouriteServices.getFavourite(req);
   
    sendResponse(res,{
        statusCode:200,
        data:result,
        success:true,
        message:'Favourite List'
    })
});

const removeFavourite = asyncHandler(async (req, res) => {
    const result = await favouriteServices.removeFavourite(req);
    sendResponse(res,{
        statusCode:200,
        data:result,
        success:true,
        message: result.message
    })
});

export const favouriteController = {
    addFavourite,
    getFavourite,
    removeFavourite
};
