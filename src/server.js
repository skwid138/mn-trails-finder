/*jshint esversion: 6 */

// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var port = process.env.PORT || 6660;

// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route requires


// use routes


// server listening
app.listen(port, () => {
    console.log('Server listening on port: ', port);
}); // end listen