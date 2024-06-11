import { Router } from "express";
import {  userRoutes } from "../modules/user/user.routes";



const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route:userRoutes
  },
  {
    path: '/users',
    route: userRoutes
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
