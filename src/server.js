/*jshint esversion: 6 */

// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('./strategies/sql.localstrategy');
const sessionConfig = require('./modules/session.config');

const port = process.env.PORT || 6660;

// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// route requires


// use routes


// server listening
app.listen(port, () => {
    console.log('Server listening on port: ', port);
}); // end listen