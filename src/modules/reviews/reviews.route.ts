import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { reviewController } from './reviews.controller';


const router = Router();

router.post('/addreviews', auth(USER_ROLE.user), reviewController.addReview);
router.get('/getpostreviews/:bikeId', reviewController.getpostreviews);


export const reviewsRoute = router;