import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { reviewService } from "./reviews.services";

const addReview= asyncHandler(async (req, res) => {
    const result = await  reviewService.addReview(req);

    sendResponse(res, {
        data: result,
        message: 'Rental created successfully',
        statusCode: 200,
        success: true
    });
});

const getpostreviews= asyncHandler(async (req, res) => {
    // get from id 
    const bikeId=  req.params.bikeId as string;

    const result = await  reviewService.getpostreviews(bikeId);

    sendResponse(res, {
        data: result,
        message: 'Rental created successfully',
        statusCode: 200,
        success: true
    });
});
const getuserreviews = asyncHandler(async (req, res) => {
    // get from id 
    const userId=  req.user.userId as string;

    const result = await  reviewService.getuserreviews(userId);
    console.log(result ,'result reviews');

    sendResponse(res, {
        data: result,
        message: 'Rental created successfully',
        statusCode: 200,
        success: true
    });
});


export const reviewController = {
    addReview,
    getpostreviews,
    getuserreviews
};