import { Request, Response } from 'express';
import { signInUser } from '../services/userService';

async function logInController(req: Request, res: Response): Promise<Response> {
  const userCredentials = req.body;
  const response = await signInUser(userCredentials);

  if (response.success === true && response.data !== undefined) {
    const { refreshToken, ...userData } = response.data;

    res.cookie('refreshToken', refreshToken, {
      maxAge: 3.154e10,
      httpOnly: true,
    });

    return res.status(response.status).json({ ...response, data: userData });
  }

  return res.status(response.status).json(response);
}

export default logInController;
