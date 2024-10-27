import { Router } from "express";
import { favouriteController } from "./favourite.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const router = Router();



router.post("/", auth(USER_ROLE.user) ,favouriteController.addFavourite);
router.get("/", auth(USER_ROLE.user), favouriteController.getFavourite);
router.delete("/:bikeId", auth(USER_ROLE.user), favouriteController.removeFavourite);



export const  favourite= router;