import * as yup from 'yup';

export interface RefreshTokenShema {
  refreshToken: string;
}

const refreshTokenShema: yup.SchemaOf<RefreshTokenShema> = yup.object().shape({
  refreshToken: yup.string().required({ message: 'Missing refresh token.' }),
});

export default refreshTokenShema;
