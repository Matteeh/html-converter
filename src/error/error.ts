import { Response, Request, NextFunction } from 'express';

/**
 * Extends Error with statusCode property
 * @param statusCode HTTP status code
 * @param params Error arguments
 */
export class CustomError extends Error {
    statusCode: number;
    constructor(statusCode: number, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
      // Default error status 500
      this.statusCode = statusCode;
    }
}

/**
 * Logs error stack and message.
 */
export function logErrors (err: CustomError, req: Request, res: Response, next: NextFunction): void {
    console.error(err.stack);
    console.error('Error Message: ', err.message);
    next(err);
  }

/**
 * Handles all errors
 */
export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction): void {
    // Delegate to the default Express error handler, when the headers have already been sent 
    if (res.headersSent) {
        return next(err);
      }
      const customErr = err.statusCode ? err : new CustomError(500, err);
      res.status(customErr.statusCode).send({ error: customErr.message });
}