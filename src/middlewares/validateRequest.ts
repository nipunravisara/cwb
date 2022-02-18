import { NextFunction, Request, Response } from 'express';
import { SchemaOf } from 'yup';
import {
  SignUpSchemaType,
  SignInSchemaType,
  RefreshTokenShemaType,
} from '../schemas';

interface IvalidateRequestProps {
  type?: string;
  schema: SchemaOf<SignUpSchemaType | SignInSchemaType | RefreshTokenShemaType>;
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
