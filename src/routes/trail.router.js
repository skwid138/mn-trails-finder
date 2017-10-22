/*jshint esversion: 6 */

// requires
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// sends new trail data to DB
router.post('/', (req, res) => {
    console.log('in trail post route');

    // variables from client
    let trail = {
        park_name: req.body.park_name,
        trail_name: req.body.trail_name,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        length: req.body.length,
        dog: Boolean(req.body.dog),
        child: Boolean(req.body.child),
        paved: Boolean(req.body.paved),
        water: Boolean(req.body.water),
        parking: Boolean(req.body.parking),
        parking_free: Boolean(req.body.parking),
        park_pass: Boolean(req.body.park_pass),
        hiking: Boolean(req.body.hiking),
        biking: Boolean(req.body.biking),
        skiing: Boolean(req.body.skiing),
        horse: Boolean(req.body.horse),
        atv: Boolean(req.body.horse),
        snowmobile : Boolean(req.body.snowmobile),
        trail_description : req.body.trail_description,
        photo : req.body.photo, // not being used
        ll : req.body.ll, // not being used
        gain : req.body.gain // not being used
    }; // end trail
    console.log('new trail: ', trail);

    pool.connect((err, client, done) => {
        if (err) {
            console.log('POST connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            let queryString = "INSERT INTO trails (park_name, trail_name, address1, address2, city, state, zip, length, dog, child, paved, water, parking, parking_free, park_pass, hiking, biking, skiing, horse, atv, snowmobile, trail_description, photo, ll, gain) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING trails_id";
            let values = [trail.park_name, trail.trail_name, trail.address1, trail.address2, trail.city, trail.state, trail.zip, trail.length, trail.dog, trail.child, trail.paved, trail.water, trail.parking, trail.parking_free, trail.park_pass, trail.hiking, trail.biking, trail.skiing, trail.horse, trail.atv, trail.snowmobile, trail.trail_description, trail.photo, trail.ll, trail.gain];
            client.query(queryString, values, (queryErr, result) => {
                if (queryErr) {
                    console.log('Query POST connection Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.status(201).send(result);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end pool connect
}); // end post

// GETs all Trails
router.get('/', (req, res) => {
    console.log('In trail GET route.');

    pool.connect((err, client, done) => {
        if (err) {
            console.log('GET connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            let queryString = "SELECT * FROM trails";
            let values = [];
            client.query(queryString, values, (queryErr, result) => {
                if (queryErr) {
                    console.log('Query GET connection Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.status(201).send(result);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end pool connect
}); // end GET

// update trail approval status
router.put('/approve/:id', (req, res) => {
    console.log('In trail GET route.');
    let trail_id = req.params.trail_id;

    pool.connect((err, client, done) => {
        if (err) {
            console.log('PUT connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            let queryString = "UPDATE trails SET approved='true' WHERE trail_id=$1";
            let values = [trail_id];
            client.query(queryString, values, (queryErr, result) => {
                if (queryErr) {
                    console.log('Query PUT connection Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end pool connect
}); // end GET

// export
module.exports = router;