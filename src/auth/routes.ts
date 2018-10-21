import express, { Router } from 'express';
import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../error';
import { newUser } from './auth';
import { ClientResponse } from '../types/authentication';

export const router: Router = express.Router();

/**
 * POST /auth/oauth2-token
 */
router.post('/oauth2-token', (req: Request, res: Response, next: NextFunction) => {
    if(!req.body) {
        next(new CustomError(400, 'ReferenceError: body is not defined'));
    }
    newUser(req.body).subscribe((token: string) => {
        res.status(201).send({ token });
    }, err => next(err));
});
