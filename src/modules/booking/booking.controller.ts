import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { rentalService } from "./booking.services";

const createRental= asyncHandler(async (req, res) => {
    const result = await rentalService.createRental(req);

    sendResponse(res, {
        data: result,
        message: 'Rental created successfully',
        statusCode: 200,
        success: true
    });
});

const returnRental = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const { returntime } = req.query; 
    console.log(req.query);


    const result = await rentalService.returnRental(id, returntime);
    sendResponse(res, {
        data: result,
        message: 'Bike returned successfully',
        statusCode: 200,
        success: true,
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

const fullPayment = asyncHandler(async (req, res) => {

    const result = await rentalService.fullPayment(req);
    sendResponse(res, {
        data: result,
        message: 'Full Payment Successful',
        statusCode: 200,
        success: true
    });
});

const allrentalbike = asyncHandler(async (req, res) => {
    const result = await rentalService.allrentalbike();
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

const getRentalTransaction = asyncHandler(async (req, res) => {
    const result = await rentalService.getRentalTransaction(req.params.id);

    if (!result) {
        return sendResponse(res, {
            data: result,
            message: 'No Data Found',
            statusCode: 404,
            success: false
        });
    }
    sendResponse(res, {
        data: result,
        message: 'Rental Transaction',
        statusCode: 200,
        success: true
    });
});


    const rentalPayment = asyncHandler(async (req, res) => {
        console.log('rentalPayment');
        const result = await rentalService.rentalPayment();
        console.log(result);
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

    }
    );





export const rentalController = {
    createRental,
    returnRental,
    getAllRentals,
    fullPayment,
    allrentalbike,
    getRentalTransaction,
    rentalPayment
};