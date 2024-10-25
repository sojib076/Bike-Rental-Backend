"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const bike_routes_1 = require("../modules/bike/bike.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const reviews_route_1 = require("../modules/reviews/reviews.route");
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
        route: booking_routes_1.rentalRoutes
    },
    {
        path: '/payment',
        route: payment_routes_1.paymentRoutes
    }, {
        path: '/reviews',
        route: reviews_route_1.reviewsRoute
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
