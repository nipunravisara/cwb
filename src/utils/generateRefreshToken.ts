import jwt from 'jsonwebtoken';
import { UserDocument } from '../types/userType';

function generateRefreshToken(user: UserDocument): string {
  return jwt.sign(
    {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY as string,
    {
      expiresIn: '1m',
    }
  );
}

export default generateRefreshToken;
