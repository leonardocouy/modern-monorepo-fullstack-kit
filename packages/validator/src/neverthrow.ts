import { type Request, type Response, type NextFunction } from 'express';
import { Result, ok, err } from 'neverthrow';

import { type AppError } from './error';

export type AsyncResult<T, E = AppError> = Promise<Result<T, E>>;

export const handleResult = <T>(
  resultPromise: AsyncResult<T>,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  resultPromise
    .then((result) => {
      result.match(
        (value) => {
          res.json(value);
        },
        (error) => {
          next(error);
        }
      );
    })
    .catch(next);
};

export { ok, err, Result };
