import * as yup from 'yup';

export interface SignInSchemaType {
  email: string;
  password: string;
}

export interface SignUpSchemaType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RefreshTokenShemaType {
  refreshToken: string;
}

export const signInSchema: yup.SchemaOf<SignInSchemaType> = yup.object().shape({
  email: yup
    .string()
    .email({ message: 'Invalid email address.' })
    .required({ message: 'Email is required.' }),
  password: yup
    .string()
    .min(8, { message: 'Password must contain 8 characters or more.' })
    .required({ message: 'Password is required.' }),
});

export const signUpSchema: yup.SchemaOf<SignUpSchemaType> = yup.object().shape({
  firstName: yup.string().required({ message: 'First name is required.' }),
  lastName: yup.string().required({ message: 'Last name is required.' }),
  email: yup
    .string()
    .email({ message: 'Invalid email address.' })
    .required({ message: 'Email is required.' }),
  password: yup
    .string()
    .min(8, { message: 'Password must contain 8 characters or more.' })
    .required({ message: 'Password is required.' }),
});

export const refreshTokenShema: yup.SchemaOf<RefreshTokenShemaType> = yup
  .object()
  .shape({
    refreshToken: yup.string().required({ message: 'Missing refresh token.' }),
  });
