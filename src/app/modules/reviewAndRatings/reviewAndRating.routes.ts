import { userRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './reviewAndRating.controller';
import { ReviewAndRatingValidation } from './reviewAndRating.validations';

const router = express.Router();

router.get('/my-reviews', auth(userRole.USER), ReviewController.getMyReviews);

router.post(
  '/add-review',
  auth(userRole.USER),
  validateRequest(ReviewAndRatingValidation.createReviewAndRating),
  ReviewController.createNewSlot
);

router.patch(
  '/:reviewId',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  validateRequest(ReviewAndRatingValidation.updateReviewAndRating),
  ReviewController.updateReview
);

router.delete(
  '/:reviewId',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  ReviewController.singleReviewDelete
);

export const ReviewAndRatingRoutes = router;
