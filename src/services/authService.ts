import jwt, { JwtPayload } from 'jsonwebtoken';
import User from 'src/models/userModel';
import signJwtToken from 'src/utils/signJwtToken';
import signRefreshToken from 'src/utils/signRefreshToken';

export async function verifyRefreshToken(refreshToken: string): Promise<any> {
  try {
    const { email } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY as string
    ) as JwtPayload;

    const currentUser = await User.findOne({ email });

    const newAccessToken = signJwtToken(currentUser);
    const newRefreshToken = signRefreshToken(currentUser);

    return {
      success: true,
      status: 401,
      message:
        'No account is associate with enterd email, Try creating account.',
    };
  } catch (err) {
    return {
      success: false,
      status: 401,
      message: 'Invalid refresh token.',
    };
  }
}
