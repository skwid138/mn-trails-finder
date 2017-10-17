/*jshint esversion: 6 */

// requires
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var pool = require('../modules/pool');

passport.serializeUser( function(user, done) {
    done(null, user.id);
}); // end serializeUser

passport.deserializeUser( function(id, done) {
    console.log('in deserializeUser');
    
    pool.connect( function(err, client, release) {
        if (err) {
            console.log('connection err ', err);
            release();
            done(err);
        } // end if error

        let user = {};
        let queryString = "SELECT * FROM users WHERE user_id = $1";
        let values = [id];

        client.query(queryString, values, function(queryErr, result) {
            // Handle Errors
            if (queryErr) {
                console.log('Query connection error ->', queryErr);
                done(queryErr);
                release();
            } // end if error

            user = result.rows[0];
            release();

            if (!user) {
                // user not found
                return done(null, false, { message: 'Incorrect credentials.' });
            } else {
                // user found
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
    }, function(req, username, password, done) {
        pool.connect( function(err, client, release) {
            console.log('in local passport use');
            
            // assumes the username will be unique, thus returning 1 or 0 results
            let queryString = "SELECT * FROM users WHERE username = $1";
            let values = [username];

            client.query(queryString, values, (queryErr, result) => {
                let user = {};

                // Handle Errors
                if (queryErr) {
                    console.log('Query connection error ->', queryErr);
                    done(null, user);
                } // end if error

                release();

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