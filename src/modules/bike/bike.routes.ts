import { Router } from "express";
import { bikeController } from "./bike.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { bikeSchema, updatedBikeSchema } from "./bike.validation";

const router = Router();




router.post("/",auth(USER_ROLE.admin),validateRequest(bikeSchema) ,bikeController.createBike);
router.get("/",bikeController.getAllbikes);
router.put("/:id",auth(USER_ROLE.admin),validateRequest(updatedBikeSchema) ,bikeController.updateBike);
router.delete("/:id",auth(USER_ROLE.admin),bikeController.deleteBike);



export const  bikeRoutes= router;