import { Router } from "express";
import {  userRoutes } from "../modules/user/user.routes";
import { bikeRoutes } from "../modules/bike/bike.routes";
import { rentalRoutes } from "../modules/booking/booking.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";
import { reviewsRoute } from "../modules/reviews/reviews.route";
import { favourite } from "../modules/Favourite/favourite.routes";



const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route:userRoutes
  },
  {
    path: '/users',
    route: userRoutes
  },
  {
    path: '/bikes',
    route:bikeRoutes
  },
  {
    path:'/rentals',
    route:rentalRoutes
  },
  {
    path:'/payment',
    route:paymentRoutes
  },{
    path:'/reviews',
    route:reviewsRoute
  },
  {
    path: '/favourite',
    route: favourite
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
