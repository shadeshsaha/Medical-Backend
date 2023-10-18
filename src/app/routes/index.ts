import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { FeedBackRoutes } from '../modules/feedBackForms/feedBackForm.routes';
import { ProductsRoutes } from '../modules/products/products.routes';
import { MedServiceRoutes } from '../modules/services/service.routes';
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
    path: '/feedback-forms',
    route: FeedBackRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
