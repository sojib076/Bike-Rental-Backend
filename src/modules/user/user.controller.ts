
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./userservices";

const userLogin = asyncHandler(async (req, res) => {
    const result = await userServices.userLogin(req.body);  //req.body is the data sent from the frontend
    const {token, user} = result;
    sendResponse(res,{
        statusCode:200,
        message:"User logged in successfully",
        token:token,
        success:true,
        data:user
    }); //  this is the response sent back to the frontend
});
const userRegister = asyncHandler(async (req, res) => {
    const result = await userServices.userRegister(req.body); //req.body is the data sent from the frontend
    sendResponse(res,{
        statusCode:200,
        message:"User registered successfully",
        success:true,
        data:result
    }); //  this is the response sent back to the frontend

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
    }) //  this is the response sent back to the frontend
});

// admin can change user role
const changeUserRole = asyncHandler(async (req, res) => {
    const result = await userServices.changeUserRole(req.params.id);
    sendResponse(res,{
        statusCode:200,
        message:"User role updated successfully",
        success:true,
        data:result
    }) 
});
// getAllUsers
const getAllUsers = asyncHandler(async (req, res) => {
  
    const result = await userServices.getAllUsers(req);
    sendResponse(res,{
        statusCode:200,
        message:"All users retrieved successfully",
        success:true,
        data:result
    }) //  this is the response sent back to the frontend
});
const deleteUser = asyncHandler(async (req, res) => {
    const result = await userServices.deleteUser(req.params.id);
    sendResponse(res,{
        statusCode:200,
        message:"User deleted successfully",
        success:true,
        data:result
    }) //  this is the response sent back to the frontend
});
export const userController = {
    userLogin,
    userRegister,
    userGetProfile,
    userUpdateProfile,
    changeUserRole,
    getAllUsers,
    deleteUser
}


