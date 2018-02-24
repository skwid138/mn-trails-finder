/*jshint esversion: 6 */

// requires
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('./strategies/local.strategy');
const sessionConfig = require('./modules/session.config');
const ip = require('ip');

const port = process.env.PORT || 6680;

// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use static directory
app.use(express.static('./src/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// route requires
const registrationRouter = require('./routes/registration.router');
const indexRouter = require('./routes/index.router');
const userRouter = require('./routes/user.router');
const trailRouter = require('./routes/trail.router')

// use routes
app.use('/register', registrationRouter);
app.use('/user', userRouter);
app.use('/trail', trailRouter);

app.use('/', indexRouter);

// server listening
app.listen(port, () => {
    console.log('Server listening on: http://' + ip.address() + ':' + port);
}); // end listen