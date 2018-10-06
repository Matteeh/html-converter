import express, { Router } from 'express';
import { Response, Request, NextFunction } from "express";
import * as converter from './convert';
export const router: Router = express.Router();

converter.createConverter({html: "<h1>Hello World</h1>"});

/**
 * POST /convert
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('Do something');
});
