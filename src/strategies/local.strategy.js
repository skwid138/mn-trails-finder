/*jshint esversion: 6 */

// requires
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
    done(null, user.user_id);
}); // end serializeUser

passport.deserializeUser((id, done) => {
    console.log('in deserializeUser');
    
    pool.connect((err, client, release) => {
        if (err) {
            console.log('connection err ', err);
            release();
            done(err);
        } // end if error

        let user = {};
        const queryString = "SELECT * FROM users WHERE user_id = $1";
        const values = [id];

        client.query(queryString, values, (queryErr, result) => {
            // Handle Errors
            if (queryErr) {
                console.log('Query connection error ->', queryErr);
                done(queryErr);
                release();
            } // end if error
            user = result.rows[0];
            release();
            // if no user is found
            if (!user) {
                return done(null, false, { message: 'Incorrect credentials.' });
            // user found
            } else {
                console.log('User row ', user);
                done(null, user);
            } // end else
        }); // end query
    }); // end pool connect
}); // end deserializeUser

// log user in
passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
    },(req, username, password, done) => {
        pool.connect( function(err, client, release) {
            console.log('in local passport use');
            // username will be unique, thus returning 1 or 0 results
            const queryString = "SELECT * FROM users WHERE username = $1";
            const values = [username];
            client.query(queryString, values, (queryErr, result) => {
                let user = {};
                // if error
                if (queryErr) {
                    console.log('Query connection error ->', queryErr);
                    done(null, user);
                } // end if error
                release();
                // if user is found
                if (result.rows[0] != undefined) {
                    user = result.rows[0];
                    console.log('User obj', user);
                    // Hash and compare
                    if (encryptLib.comparePassword(password, user.password)) {
                        // all good!
                        console.log('passwords match');
                        done(null, user);
                    } else {
                        console.log('password does not match');
                        done(null, false, { message: 'Incorrect credentials.' });
                    } // end else
                } else {
                    console.log('no user');
                    done(null, false);
                } // end else
            }); // end query
        }); // end pool connect
    } // end anonymous func
)); // end passport use

// export
module.exports = passport;