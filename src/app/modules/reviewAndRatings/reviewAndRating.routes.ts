import express from 'express';

import { userRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './reviewAndRating.controller';
import { ReviewAndRatingValidation } from './reviewAndRating.validations';

const router = express.Router();

router.get(
  '/',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  ReviewController.getAllReviews
);

// get only user reviews
router.get(
  '/my-reviews',
  auth(userRole.USER),
  ReviewController.getOnlyUserReviews
);

router.post(
  '/add-review',
  auth(userRole.USER),
  validateRequest(ReviewAndRatingValidation.createReviewAndRating),
  ReviewController.createNewSlot
);

router.patch(
  '/:reviewId',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  // validateRequest(ReviewAndRatingValidation.createReviewAndRating),
  ReviewController.updateReview
);

router.delete(
  '/:reviewId',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  ReviewController.singleReviewDelete
);

export const ReviewAndRatingRoutes = router;
