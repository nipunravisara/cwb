import express from 'express';

import refreshTokenController from '../controllers/refreshTokenController';
import signInController from '../controllers/signInController';
import signUpController from '../controllers/signUpController';
import validateRequest from '../middlewares/validateRequest';
import refreshTokenShema from '../schemas/refreshTokenSchema';
import signInSchema from '../schemas/signInSchema';
import signUpSchema from '../schemas/signUpSchema';

const router = express.Router();

router.post(
  '/signup',
  validateRequest({ schema: signUpSchema }),
  signUpController
);

router.post(
  '/signin',
  validateRequest({ schema: signInSchema }),
  signInController
);

router.post(
  '/refresh-token',
  validateRequest({ type: 'cookies', schema: refreshTokenShema }),
  refreshTokenController
);

export default router;
