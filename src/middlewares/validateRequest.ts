import { NextFunction, Request, Response } from 'express';
import { SignUpSchema } from 'src/schemas/signUpSchema';
import { SignInSchema } from 'src/schemas/signInSchema';
import { SchemaOf } from 'yup';
import { RefreshTokenShema } from 'src/schemas/refreshTokenSchema';

interface IvalidateRequestProps {
  type?: string;
  schema: SchemaOf<SignInSchema | SignUpSchema | RefreshTokenShema>;
}

function validateRequest({ type, schema }: IvalidateRequestProps) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let validatedReqBody;

      switch (type) {
        case 'cookies':
          validatedReqBody = await schema.validate(req.cookies);
          break;
        default:
          validatedReqBody = await schema.validate(req.body);
          break;
      }

      req.body = validatedReqBody;
      next();
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };
}

export default validateRequest;
