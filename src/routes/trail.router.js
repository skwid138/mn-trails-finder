/*jshint esversion: 6 */

// requires
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// POST new trail data to DB
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
}); // end trail post

// POST new rating data to DB
router.post('/rating', (req, res) => {
    console.log('in rating post route');

    // variables from client
    let rating_value = req.body.rating_value;
    let user_id = req.body.user_id;
    let trails_id = req.body.trails_id;
    console.log('rating, user_id, trails_id ', rating_value, user_id, trails_id);

    pool.connect((err, client, done) => {
        if (err) {
            console.log('POST connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            let queryString = "INSERT INTO ratings (user_id, trails_id, rating_value) VALUES ($1, $2, $3) RETURNING user_id";
            let values = [user_id, trails_id, rating_value];
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
}); // end rating post

// POST new my_trail data to DB
router.post('/my_trails', (req, res) => {
    console.log('in my_trail post route');

    // variables from client
    let user_id = req.body.user_id;
    let trails_id = req.body.trails_id;
    console.log('user_id, trails_id ', user_id, trails_id);

    pool.connect((err, client, done) => {
        if (err) {
            console.log('POST connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            let queryString = "INSERT INTO my_trails (user_id, trails_id) VALUES ($1, $2) RETURNING my_trails_id";
            let values = [user_id, trails_id];
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
}); // end rating post

// GET all Trails
router.get('/', (req, res) => {
    console.log('In trail GET route.');
    pool.connect((err, client, done) => {
        if (err) {
            console.log('GET trail connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            let queryString = "SELECT * FROM trails";
            client.query(queryString, (queryErr, result) => {
                if (queryErr) {
                    console.log('Query GET connection Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.status(200).send(result);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end pool connect
}); // end GET trails

// GET all ratings
router.get('/rating', (req, res) => {
    console.log('In rating GET route.');
    pool.connect((err, client, done) => {
        if (err) {
            console.log('GET rating connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            let queryString = "SELECT * FROM ratings";
            client.query(queryString, (queryErr, result) => {
                if (queryErr) {
                    console.log('Query GET connection Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.status(200).send(result);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end pool connect
}); // end GET ratings

// UPDATE trail approval status
router.put('/approve/:trails_id', (req, res) => {
    console.log('In trail PUT route.');
    let trails_id = req.params.trails_id;

    pool.connect((err, client, done) => {
        if (err) {
            console.log('PUT connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            let queryString = "UPDATE trails SET approved='true' WHERE trails_id=$1";
            let values = [trails_id];
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
}); // end PUT

// DELETE my_trail from DB


// DELETE trail from DB
router.delete('/:trails_id', (req, res) => {
    console.log('In trail DELETE route.');
    let trails_id = req.params.trails_id;

    pool.connect((err, client, done) => {
        if (err) {
            console.log('DELETE connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            let queryString = "DELETE FROM trails WHERE trails_id=$1";
            let values = [trails_id];
            client.query(queryString, values, (queryErr, result) => {
                if (queryErr) {
                    console.log('Query DELETE connection Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end pool connect
}); // end DELETE

// export
module.exports = router;