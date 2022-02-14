import express, { Request, Response } from 'express';

import {
  validateRefreshToken,
  signInUser,
  signUpUser,
} from '../controllers/authenticationController';

import validateRequest from '../middlewares/validateRequest';

import validateRefreshTokenSchema from '../schemas/validateRefreshTokenSchema';
import signInSchema from '../schemas/signInSchema';
import signUpSchema from '../schemas/signUpSchema';

const router = express.Router();

// sign up
router.post(
  '/signup',
  validateRequest({ schema: signUpSchema }),
  async (req: Request, res: Response) => {
    const userData = req.body;
    const response = await signUpUser(userData);

    if (response.success === true) {
      res.status(response.status).json(response);
    }

    res.status(response.status).json(response);
  }
);

router.post(
  '/signin',
  validateRequest({ schema: signInSchema }),
  async (req: Request, res: Response) => {
    const userCredentials = req.body;
    const response = await signInUser(userCredentials);

    if (response.success === true) {
      res.status(response.status).json(response);
    }

    res.status(response.status).json(response);
  }
);

// validate refresh token
router.post(
  '/refresh-token',
  validateRequest({ type: 'cookies', schema: validateRefreshTokenSchema }),
  async (req: Request, res: Response) => {
    const { userRefreshToken } = req.cookies;
    const response = await validateRefreshToken(userRefreshToken);

    if (response.success === true) {
      res.status(response.status).json(response);
    }

    res.status(response.status).json(response);
  }
);

export default router;
