import express from 'express';
import { Response, Request } from 'express';
import bodyParser from 'body-parser';

import { router as conversion } from './conversion';
// Create Express server
const app = express();

// Get api URI from environment variable
const API_URI = process.env.API_URI;

// Express configuration
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * App primary API routes
 */
app.use(API_URI + '/auth')
app.use(API_URI + '/conversions', conversion);

/**
 * Health check
 */
app.get('/', (req: Request, res: Response) => {
    res.send({ status:'Live', apiVersion: `Current api version: ${API_URI}` });
});

export { app };