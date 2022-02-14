import User from '../models/userModel';

import signJwtToken from '../utils/signJwtToken';
import signRefreshToken from '../utils/signRefreshToken';
import validatePassword from '../utils/validatePassword';
import getHashedPassword from '../utils/getHashedPassword';

interface ISignUpUserInputType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ISignUpUserReturnType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

interface LoginUserReturnType {
  userId: string;
  userName: string;
  userEmail: string;
  accessToken: string;
  refreshToken: string;
}

// create new user
export async function signUpUser(
  userData: ISignUpUserInputType
): Promise<ReturnType<any>> {
  const existingUser = await User.findOne({ email: userData.email });

  // Check user already exist
  if (existingUser !== null) {
    return {
      success: false,
      status: 409,
      message: 'User already exist.',
    };
  }

  // Hash user password and create a new user in system
  try {
    const hashedPassword = await getHashedPassword(userData.password);
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });

    return {
      success: true,
      status: 200,
      message: 'User created successfully.',
      data: newUser,
    };
  } catch (error: any) {
    return {
      success: false,
      status: 404,
      message: error.message,
    };
  }
}

// sign in user
export async function signInUser(
  userCredentials: LoginUserInput
): Promise<ReturnType<any>> {
  const currentUser = await User.findOne({ email: userCredentials.email });

  if (!currentUser) {
    return {
      success: false,
      status: 401,
      message:
        'No account is associate with enterd email, Try creating account.',
    };
  }

  const isPasswordValid = await validatePassword(
    currentUser,
    userCredentials.password
  );

  if (!isPasswordValid) {
    return {
      success: false,
      status: 401,
      message: 'Invalid password, Try again.',
    };
  }

  const accessToken = signJwtToken(currentUser);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const refreshToken = signRefreshToken(currentUser);

  const user = {
    userId: currentUser.id,
    userName: `${currentUser.firstName} ${currentUser.lastName}`,
    userEmail: currentUser.email,
    accessToken,
    refreshToken,
  };

  return {
    success: true,
    status: 200,
    message: 'Login success.',
    data: user,
  };
}

export async function validateRefreshToken(
  userRefreshToken: string
): Promise<any> {
  // eslint-disable-next-line no-console
  console.log(userRefreshToken);

  return {
    success: true,
    status: 200,
    message: 'refreshed',
  };
}
