import { Response, Request, NextFunction } from "express";

class CustomError extends Error {
    statusCode: number;
    constructor(statusCode?: number) {
        super();

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
      // Default error status 500
      this.statusCode = statusCode || 500;
    }
}

/**
 * Logs error stack and message.
 */
export function logErrors (err: CustomError, req: Request, res: Response, next: NextFunction): void {
    console.error(err.stack);
    console.error(err.message);
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
      const customErr = new CustomError(err.statusCode);
      res.status(customErr.statusCode).send({ error: customErr.message });
}