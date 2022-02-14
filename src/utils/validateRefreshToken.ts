import jwt from 'jsonwebtoken';

interface ValidateRefreshTokenReturnType {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

function validateRefreshToken(
  refreshToken: string
): ValidateRefreshTokenReturnType | unknown {
  try {
    return jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY as string
    );
  } catch (err) {
    return err;
  }
}

export default validateRefreshToken;
