import express, { Router } from 'express';
import { Response, Request, NextFunction } from 'express';
import { convert, newConversion } from './conversion';
import { CustomError } from '../error';
import { PhantomLocalOptions } from '../../models';
import { PdfConversion } from 'conversion';

export const router: Router = express.Router();

/**
 * GET /conversions
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    return 'queue status';
});

/**
 * POST /conversions/pdf
 * Start html to pdf conversion
 * @return jobId an identifier for the job
 */
router.post('/pdf', (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        next(new CustomError(400, 'ReferenceError: body is not defined'));
    }
    newConversion(req.body);
    res.send({message: 'Queuing job'});
});

/**
 * POST /conversions/png
 * Convert html to png
 */
router.post('/png', (req: Request, res: Response, next: NextFunction) => {
    /* const data: PhantomLocalOptions = req.body.data;
      convert({ html: Buffer.from(data.html).toString('utf8') })
      .then(pdfStream => pdfStream.pipe(res))
      .catch(err => next(new CustomError(500, err.message)));
    */
});