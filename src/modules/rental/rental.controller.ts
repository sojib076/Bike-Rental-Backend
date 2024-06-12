import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { rentalService } from "./rental.services";

const createRental= asyncHandler(async (req, res) => {
    const result = await rentalService.createRental(req);

    sendResponse(res, {
        data: result,
        message: 'Rental created successfully',
        statusCode: 200,
        success: true
    });
});

const returnRental= asyncHandler(async (req, res) => {
    const result = await rentalService.returnRental(req.params.id);
    sendResponse(res, {
        data: result,
        message: 'Bike returned successfully',
        statusCode: 200,
        success: true
    });
});

const getAllRentals= asyncHandler(async (req, res) => {
    const result = await rentalService.getAllRentals(req);
    if (result.length === 0) {
        return sendResponse(res, {
            data: result,
            message: 'No Data Found',
            statusCode: 404,
            success: false
        });
    }
    sendResponse(res, {
        data: result,
        message: 'All Rentals',
        statusCode: 200,
        success: true
    });
});




export const rentalController = {
    createRental,
    returnRental,
    getAllRentals
};