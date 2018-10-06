import express, { Router } from 'express';
import { Response, Request, NextFunction } from "express";
import { convert } from './convert';
export const router: Router = express.Router();

/**
 * POST /convert
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('i run');
    convert({url: 'https://github.com/pofider/phantom-html-to-pdf'})
    .then(pdfStream => pdfStream.pipe(res))
    .catch(err => console.error(err));
});
