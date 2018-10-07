import express from 'express';
import bodyParser from 'body-parser';

import { router as convert } from './convert';
// Create Express server
const app = express();

// Get api URI from environment variable
const API_URI = process.env.API_URI;

// Express configuration
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Primary app api routes
 */
app.use(API_URI + '/convert', convert);

/**
 * Health check
 */
app.get('/', (req, res) => {
    res.send({ status:'Live', apiVersion: '1' });
});

export { app };