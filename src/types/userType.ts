import { Document } from 'mongoose';

// common

export interface ReturnType<T> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
}

// User create
export interface SignUpUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// User login
export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserReturnType {
  userId: string;
  userName: string;
  userEmail: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserDocument extends SignUpUserInput, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
