import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/userModel';

function signRefreshToken(user: UserDocument): string {
  return jwt.sign(
    {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY as string,
    {
      expiresIn: '1y',
    }
  );
}

export default signRefreshToken;
