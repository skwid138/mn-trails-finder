/*jshint esversion: 6 */

// requires
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// POST new trail data to DB
router.post('/', (req, res) => {
    console.log('in trail post route');

    // check if user is logged in
    if (req.isAuthenticated()) {
        // variables from client
        const trail = {
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
            gain : req.body.gain, // not being used
            approved : req.user.admin // if admin user submits trail then automatically approve it
        }; // end trail
        console.log('new trail: ', trail);

        pool.connect((err, client, done) => {
            if (err) {
                console.log('POST connection error ->', err);
                res.sendStatus(500);
                done();
            } else {
                const queryString = "INSERT INTO trails (park_name, trail_name, address1, address2, city, state, zip, length, dog, child, paved, water, parking, parking_free, park_pass, hiking, biking, skiing, horse, atv, snowmobile, trail_description, photo, ll, gain, approved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26) RETURNING trails_id";
                const values = [trail.park_name, trail.trail_name, trail.address1, trail.address2, trail.city, trail.state, trail.zip, trail.length, trail.dog, trail.child, trail.paved, trail.water, trail.parking, trail.parking_free, trail.park_pass, trail.hiking, trail.biking, trail.skiing, trail.horse, trail.atv, trail.snowmobile, trail.trail_description, trail.photo, trail.ll, trail.gain, trail.approved];
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
    } else {
            console.log('not logged in');
            res.sendStatus(403);
    } // end else
}); // end trail post

// POST new or update existing rating on DB
router.post('/rating', (req, res) => {
    console.log('in rating post route');

    // check if user is logged in
    if (req.isAuthenticated()) {
        // variables from client
        const rating_value = req.body.rating_value;
        const user_id = req.body.user_id;
        const trails_id = req.body.trails_id;
        console.log('rating, user_id, trails_id ', rating_value, user_id, trails_id);

        // check if user has already rated trail 
        pool.connect((err, client, done) => {
            if (err) {
                console.log('POST connection error ->', err);
                res.sendStatus(500);
                done();
            } else {
                const selectQueryString = "SELECT rating_id FROM ratings WHERE (user_id=$1 AND trails_id=$2)";
                const selectValues = [user_id, trails_id];
                client.query(selectQueryString, selectValues, (queryErr, result) => {
                    if (queryErr) {
                        console.log('Query POST connection Error ->', queryErr);
                        res.sendStatus(500);
                    } else {
                        // if the SELECT finds an existing record
                        if (result.rows.length) {
                            // update existing record using rating_id
                            const rating_id = result.rows[0].rating_id;
                            pool.connect((err, client, done) => {
                                if (err) {
                                    console.log('POST connection error ->', err);
                                    res.sendStatus(500);
                                    done();
                                } else {
                                    const updateQueryString = "UPDATE ratings SET rating_value=$2 WHERE rating_id=$1;";
                                    const updateValues = [rating_id, rating_value];
                                    client.query(updateQueryString, updateValues, (queryErr, result) => {
                                        if (queryErr) {
                                            console.log('Query POST connection Error ->', queryErr);
                                            res.sendStatus(500);
                                        } else {
                                            res.sendStatus(202);
                                        } // end else
                                        done();
                                    }); // end query
                                } // end else
                            }); // end pool connect
                        } else {
                            // add new record
                            pool.connect((err, client, done) => {
                                if (err) {
                                    console.log('POST connection error ->', err);
                                    res.sendStatus(500);
                                    done();
                                } else {
                                    const insertQueryString = "INSERT INTO ratings (user_id, trails_id, rating_value) VALUES ($1, $2, $3) RETURNING user_id";
                                    const insertValues = [user_id, trails_id, rating_value];
                                    client.query(insertQueryString, insertValues, (queryErr, result) => {
                                        if (queryErr) {
                                            console.log('Query POST connection Error ->', queryErr);
                                            res.sendStatus(500);
                                        } else {
                                            res.status(201).send(result);
                                        } // end else
                                        done();
                                    }); // end query for INSERT
                                } // end else for INSERT error
                            }); // end pool connect for INSERT
                        } // end else for if rating exists
                    } // end SELECT else
                    done();
                }); // end SELECT query
            } // end else for SELECT error
        }); // end pool connect
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    } // end else for authentication
}); // end rating post

// POST new my_trail data to DB
router.post('/my_trails', (req, res) => {
    console.log('in my_trail post route');

    // check if user is logged in
    if (req.isAuthenticated()) {
        // variables from client
        const user_id = req.body.user_id;
        const trails_id = req.body.trails_id;
        console.log('user_id, trails_id ', user_id, trails_id);

        // check if user has already added trail to my trails
        pool.connect((err, client, done) => {
            if (err) {
                console.log('POST connection error ->', err);
                res.sendStatus(500);
                done();
            } else {
                const selectQueryString = "SELECT my_trails_id FROM my_trails WHERE (user_id=$1 AND trails_id=$2)";
                const selectValues = [user_id, trails_id];
                client.query(selectQueryString, selectValues, (queryErr, result) => {
                    if (queryErr) {
                        console.log('Query POST connection Error ->', queryErr);
                        res.sendStatus(500);
                    } else {
                        // if the SELECT finds an existing record
                        if (result.rows.length) {
                            // let client know it's been added and give option to delete existing record using my_trails_id
                            res.status(302).send(result.rows);
                        } else {
                            // add new record
                            pool.connect((err, client, done) => {
                                if (err) {
                                    console.log('POST connection error ->', err);
                                    res.sendStatus(500);
                                    done();
                                } else {
                                    const insertQueryString = "INSERT INTO my_trails (user_id, trails_id) VALUES ($1, $2) RETURNING my_trails_id";
                                    const insertValues = [user_id, trails_id];
                                    client.query(insertQueryString, insertValues, (queryErr, result) => {
                                        if (queryErr) {
                                            console.log('Query POST connection Error ->', queryErr);
                                            res.sendStatus(500);
                                        } else {
                                            res.status(201).send(result);
                                        } // end else
                                        done();
                                    }); // end query for INSERT
                                } // end else for INSERT error
                            }); // end pool connect for INSERT
                        } // end else for if rating exists
                    } // end SELECT else
                    done();
                }); // end SELECT query
            } // end else for SELECT error
        }); // end pool connect
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    } // end else
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
            const queryString = "SELECT * FROM trails";
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
            const queryString = "SELECT * FROM ratings";
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

router.get('/my_trails', (req, res) => {
    console.log('In rating my_trails GET route.');
    // check if user is logged in
    if (req.isAuthenticated()) {
        const user_id = req.user.user_id;
        pool.connect((err, client, done) => {
            if (err) {
                console.log('GET my_trails connection error ->', err);
                res.sendStatus(500);
                done();
            } else {
                const queryString = "SELECT trails_id FROM my_trails WHERE user_id=$1";
                const values = [user_id];
                client.query(queryString, values, (queryErr, result) => {
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
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    } // end else for authentication
}); // end my_trails GET

// UPDATE trail approval status
router.put('/approve/:trails_id', (req, res) => {
    console.log('In approval PUT route.');
    // check if user is logged in and an admin
    if (req.isAuthenticated() && req.user.admin) {
        // trails_id from client
        const trails_id = req.params.trails_id;
        pool.connect((err, client, done) => {
            if (err) {
                console.log('PUT connection error ->', err);
                res.sendStatus(500);
                done();
            } else {
                const queryString = "UPDATE trails SET approved='true' WHERE trails_id=$1";
                const values = [trails_id];
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
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    } // end else
}); // end PUT

// UPDATE trail approval status
router.put('/flag/:trails_id', (req, res) => {
    console.log('In flag PUT route.');
    // check if user is logged in
    if (req.isAuthenticated()) {
        // trails_id from client
        const trails_id = req.params.trails_id;
        pool.connect((err, client, done) => {
            if (err) {
                console.log('PUT connection error ->', err);
                res.sendStatus(500);
                done();
            } else {
                const queryString = "UPDATE trails SET approved='false' WHERE trails_id=$1";
                const values = [trails_id];
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
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    } // end else
}); // end PUT

// DELETE my_trail from DB
router.delete('/my_trails/:trails_id', (req, res) => {
    console.log('In my_trails DELETE route.');
    // check if user is logged in
    if (req.isAuthenticated()) {
        // trails_id and user_id from client
        const user_id = req.user.user_id;
        const trails_id = req.params.trails_id;
        pool.connect((err, client, done) => {
            if (err) {
                console.log('DELETE my_trails connection error ->', err);
                res.sendStatus(500);
                done();
            } else {
                const queryString = "DELETE FROM my_trails WHERE (user_id=$1 AND trails_id=$2)";
                const values = [user_id, trails_id];
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
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    } // end else
}); // end DELETE

// DELETE trail from DB
router.delete('/:trails_id', (req, res) => {
    console.log('In trail DELETE route.');
    // check if user is logged in and is an admin
    if (req.isAuthenticated() && req.user.admin) {
        // trails_id from client
        const trails_id = req.params.trails_id;
        pool.connect((err, client, done) => {
            if (err) {
                console.log('DELETE trail connection error ->', err);
                res.sendStatus(500);
                done();
            } else {
                const queryString = "DELETE FROM trails WHERE trails_id=$1";
                const values = [trails_id];
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
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    } // end else
}); // end DELETE trail

// export
module.exports = router;