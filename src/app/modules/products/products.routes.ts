import express from 'express';
import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
import { userRole } from '@prisma/client';
import { ProductsController } from './products.controller';
// import { StylesValidation } from './products.validation';
// import { userRole, User } from '@prisma/client';

const router = express.Router();

router.post(
  '/create-product',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  ProductsController.createNewProduct
);
router.get(
  '/',
  //   auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  ProductsController.getAllProducts
);

router.get(
  '/:productId',
  //   auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  ProductsController.getSingleProduct
);

router.patch(
  '/:productId',
  // validateRequest(StylesValidation.updateStyle),
  //   auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  ProductsController.updateProduct
);

router.delete(
  '/:productId',
  // validateRequest(StylesValidation.updateStyle),
  //   auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  ProductsController.singleProductDelete
);

export const ProductsRoutes = router;
