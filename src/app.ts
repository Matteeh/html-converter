import express from 'express';
import { Response, Request } from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import { router as conversion } from './conversion';
import { router as auth } from './auth';

// Create Express server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Get api URI from environment variable
const API_URI = process.env.API_URI;

/**
 * App primary API routes
 */
app.use(`${API_URI}/auth`, auth);
app.use(`${API_URI}/conversions`, conversion);

/**
 * Health check
 */
app.get('/', (req: Request, res: Response) => {
    res.send({ status:'Live', apiVersion: `Current api version: ${API_URI}` });
});

export { app };