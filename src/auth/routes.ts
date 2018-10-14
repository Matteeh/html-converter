import express, { Router } from 'express';
import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../error';
import { newClient } from './auth';

export const router: Router = express.Router();

/**
 * POST /auth/oauth2-token
 */
router.post('/oauth2-token', (req: Request, res: Response, next: NextFunction) => {
    if(!req.body) {
        next(new CustomError(400, 'ReferenceError: body is not defined'));
    }
    newClient(req.body)
});