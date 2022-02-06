import { Request, Response } from 'express';
import { signInUser } from '../services/userService';

async function logInController(req: Request, res: Response): Promise<Response> {
  const userCredentials = req.body;
  const response = await signInUser(userCredentials);

  if (response.success === true && response.data !== undefined) {
    const { accessToken, refreshToken, ...userData } = response.data;

    res.cookie('accessToken', accessToken, {
      maxAge: 30000,
      httpOnly: true,
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 3.154e10,
      httpOnly: true,
    });

    return res.status(response.status).json(userData);
  }

  return res.status(response.status).json(response);
}

export default logInController;
