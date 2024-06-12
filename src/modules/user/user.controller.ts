import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./userservices";

const userLogin = asyncHandler(async (req, res) => {
    const result = await userServices.userLogin(req.body);
    const {token, user} = result;
    sendResponse(res,{
        statusCode:200,
        message:"User logged in successfully",
        token:token,
        success:true,
        data:user
    });
});
const userRegister = asyncHandler(async (req, res) => {
    const result = await userServices.userRegister(req.body);
    sendResponse(res,{
        statusCode:200,
        message:"User registered successfully",
        success:true,
        data:result
    });

});

const userGetProfile = asyncHandler(async (req, res) => {
    const result = await userServices.userGetProfile(req);
    sendResponse(res,{
        statusCode:200,
        message:"User profile retrieved successfully",
        success:true,
        data:result
    });
});

const userUpdateProfile = asyncHandler(async (req, res) => {
    // if (req.body.role) {
    //     throw new AppError(httpStatus.BAD_REQUEST, 'Role cannot be updated');
    // }
    
    const result = await userServices.userUpdateProfile(req);
    sendResponse(res,{
        statusCode:200,
        message:" Profile updated successfully",
        success:true,
        data:result
    });
});

export const userController = {
    userLogin,
    userRegister,
    userGetProfile,
    userUpdateProfile
}


