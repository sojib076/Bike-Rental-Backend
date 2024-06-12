"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const bike_routes_1 = require("../modules/bike/bike.routes");
const rental_routes_1 = require("../modules/rental/rental.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_routes_1.userRoutes
    },
    {
        path: '/users',
        route: user_routes_1.userRoutes
    },
    {
        path: '/bikes',
        route: bike_routes_1.bikeRoutes
    },
    {
        path: '/rentals',
        route: rental_routes_1.rentalRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
