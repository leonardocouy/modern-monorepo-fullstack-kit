import { type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';

import { ValidationError } from './error';

export const validate = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));
        next(new ValidationError(JSON.stringify(errorMessages)));
      } else {
        next(error);
      }
    }
  };
};
