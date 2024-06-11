import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World from User Routes!');
});

export const  UserRoutes = router;