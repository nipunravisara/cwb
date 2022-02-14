import { Request } from 'express';

async function refreshTokenController(req: Request): Promise<unknown> {
  const { refreshToken } = req.cookies;

  return {
    success: true,
    status: 200,
    message: 'refreshed',
  };
}

export default refreshTokenController;
