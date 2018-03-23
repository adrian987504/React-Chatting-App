const express = require('express');
const { enableCors } = require('./utils/middleware');
const api = require('./api/index');
require('./common/handlers/passportHandler');

// create our express app
const app = express();

// enable CORS
app.use(enableCors);

// trust x-forwarded-proto header from proxy
app.enable('trust proxy');

// route for load balancer health checks
app.use('/health-check', (req, res) => res.send('This server is healthy'));

// handle our API routes
app.use('/', api);

// export the app to be used in start.js
module.exports = app;
