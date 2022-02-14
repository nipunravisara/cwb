import {
  UserDocument,
  CreateUserInput,
  LoginUserInput,
  LoginUserReturnType,
  ReturnType,
} from 'src/types/userType';
import signJwtToken from '../utils/signJwtToken';

import User from '../models/userModel';
import getHashedPassword from '../utils/getHashedPassword';
import validatePassword from '../utils/validatePassword';
import signRefreshToken from '../utils/signRefreshToken';

// Create new user
export async function createUser(
  userData: CreateUserInput
): Promise<ReturnType<Omit<UserDocument, 'password'>>> {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser !== null) {
    return {
      success: false,
      status: 409,
      message: 'User already exist.',
    };
  }

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
): Promise<ReturnType<LoginUserReturnType>> {
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
