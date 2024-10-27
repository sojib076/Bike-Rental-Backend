"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favourite = void 0;
const express_1 = require("express");
const favourite_controller_1 = require("./favourite.controller");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)(user_constant_1.USER_ROLE.user), favourite_controller_1.favouriteController.addFavourite);
router.get("/", (0, auth_1.auth)(user_constant_1.USER_ROLE.user), favourite_controller_1.favouriteController.getFavourite);
router.delete("/:bikeId", (0, auth_1.auth)(user_constant_1.USER_ROLE.user), favourite_controller_1.favouriteController.removeFavourite);
exports.favourite = router;
