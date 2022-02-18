import express, { Request, Response } from 'express';

import {
  validateRefreshToken,
  signInUser,
  signUpUser,
} from '../controllers/authenticationController';

import validateRequest from '../middlewares/validateRequest';

import { refreshTokenShema, signInSchema, signUpSchema } from '../schemas';

const router = express.Router();

// sign up
router.post(
  '/signup',
  validateRequest({ schema: signUpSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const userData = req.body;
    const response = await signUpUser(userData);

    if (response.success === true) {
      return res.status(response.status).json(response);
    }

    return res.status(response.status).json(response);
  }
);

router.post(
  '/signin',
  validateRequest({ schema: signInSchema }),
  async (req: Request, res: Response): Promise<Response> => {
    const userCredentials = req.body;
    const response = await signInUser(userCredentials);

    if (response.success === true) {
      return res.status(response.status).json(response);
    }

    return res.status(response.status).json(response);
  }
);

// validate refresh token
router.post(
  '/refresh-token',
  validateRequest({ type: 'cookies', schema: refreshTokenShema }),
  async (req: Request, res: Response): Promise<Response> => {
    const { userRefreshToken } = req.cookies;
    const response = await validateRefreshToken(userRefreshToken);

    if (response.success === true) {
      return res.status(response.status).json(response);
    }

    return res.status(response.status).json(response);
  }
);

export default router;
