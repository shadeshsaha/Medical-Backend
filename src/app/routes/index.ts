import express from 'express';
import { SpecializationRoutes } from '../modules/Specialization/specialization.routes';
import { AppointmentBookingRoutes } from '../modules/appointmentBooking/appointmentBooking.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogRoutes } from '../modules/blogs/blogs.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { FeedBackRoutes } from '../modules/feedBackForms/feedBackForm.routes';
import { ProductsRoutes } from '../modules/products/products.routes';
import { ReviewAndRatingRoutes } from '../modules/reviewAndRatings/reviewAndRating.routes';
import { MedServiceRoutes } from '../modules/services/service.routes';
import { SlotRoutes } from '../modules/slots/slots.routes';
import { UserRoutes } from '../modules/users/users.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductsRoutes,
  },
  {
    path: '/services',
    route: MedServiceRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedBackRoutes,
  },
  {
    path: '/review-ratings',
    route: ReviewAndRatingRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/specialization',
    route: SpecializationRoutes,
  },
  {
    path: '/appointment-booking',
    route: AppointmentBookingRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/faqs',
    route: FaqRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
