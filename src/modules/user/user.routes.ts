import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userLoginValidation, userRegisterValidation } from "./user.validation";
import { auth } from "../../middlewares/auth";


const router = Router();

router.post('/login', validateRequest(userLoginValidation),userController.userLogin); // user login
router.post('/signup', validateRequest(userRegisterValidation), userController.userRegister); // user register


router.get('/me',auth(), userController.userGetProfile); // get user profile
router.put('/me',auth(), userController.userUpdateProfile); // update user profile

export const userRoutes = router;