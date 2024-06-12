import { Router } from "express";
import { rentalController } from "./rental.controller";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { rentalSchema } from "./rental.validation";
import { USER_ROLE } from "../user/user.constant";

const router = Router();



router.post('/', auth(USER_ROLE.admin,USER_ROLE.user), validateRequest(rentalSchema), rentalController.createRental);
router.put('/:id/return', auth(USER_ROLE.admin), rentalController.returnRental);
router.get('/', auth(USER_ROLE.admin,USER_ROLE.user), rentalController.getAllRentals);


export const rentalRoutes = router;