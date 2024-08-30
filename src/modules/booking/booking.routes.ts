import { Router } from "express";
import { rentalController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { rentalSchema } from "./booking.validation";
import { USER_ROLE } from "../user/user.constant";

const router = Router();



router.post('/', auth(USER_ROLE.admin,USER_ROLE.user), validateRequest(rentalSchema), rentalController.createRental);
router.put('/:id/return', auth(USER_ROLE.admin), rentalController.returnRental);
router.get('/', auth(USER_ROLE.admin,USER_ROLE.user), rentalController.getAllRentals);
router.get('/allrentalbike', auth(USER_ROLE.admin), rentalController.allrentalbike);

router.post('/fullpayment', rentalController.fullPayment);
router.get('/trans/:id', auth(USER_ROLE.user) ,rentalController.getRentalTransaction);

export const rentalRoutes = router;