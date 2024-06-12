import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateUserValidation, userLoginValidation, userRegisterValidation } from "./user.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";


const router = Router();

router.post('/login', validateRequest(userLoginValidation),userController.userLogin); // user login
router.post('/signup', validateRequest(userRegisterValidation), userController.userRegister); // user register


router.get('/me',auth(USER_ROLE.admin,USER_ROLE.user), userController.userGetProfile); // get user profile
router.put('/me', auth(USER_ROLE.admin,USER_ROLE.user), validateRequest(updateUserValidation), userController.userUpdateProfile); // update user profile

export const userRoutes = router;