/*jshint esversion: 6 */

// require
const Pool = require('pg').Pool;

//server config
const config = {
    host: 'localhost',
    port: 5432,
    database: 'mn-trails-finder',
    max: 20
}; // end config

// construct pool
const pool = new Pool(config);

//export
module.exports = pool;