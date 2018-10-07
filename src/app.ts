import express from 'express';
import bodyParser from 'body-parser';

import { router as convert } from './convert';
// Create Express server
const app = express();

const API = process.env.API_URL;

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Primary app api routes
 */
app.use(API + '/convert', convert);

/**
 * Health check
 */
app.get('/', (req, res) => {
    res.send('App ready.');
});

export { app };