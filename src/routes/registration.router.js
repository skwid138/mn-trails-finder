/*jshint esversion: 6 */

const router = express.Router();
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');

router.post('/', (req,res,next) => {
    console.log('in register user post route');

    // variables from client
    let saveUser = {
        username: req.body.username,
        password: encryptLib.encryptPassword(req.body.password)
    }; // end saveUser
    console.log('new user: ', saveUser);
    
    pool.connect((err, client, done)=> {
        if (err) {
            console.log('POST connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            let queryString = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id";
            let values = [saveUser.username, saveUser.password];
            client.query(queryString, values, (queryErr, result) => {
                if (queryErr) {
                    console.log('Query POST Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end pool connect
}); // end post

//export
module.exports = router;