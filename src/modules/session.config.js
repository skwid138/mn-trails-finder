/*jshint esversion: 6 */

const session = require('express-session');

// session 
const config = {
    secret: 'secret',
    key: 'user', // this is the name of the req.variable
    resave: 'true',
    saveUninitialized: false,
    cookie: { maxage: 60000, secure: false }
}; // end session

// construct and export
module.exports = session(config);