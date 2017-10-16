/*jshint esversion: 6 */

// requires
const express = require('express');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
    console.log('in user GET route');

    // check if user is logged in
    if(req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in req.user ->', req.user);

        let userInfo = {
            username : req.user.username
        }; // end userInfo
        res.send(userInfo);
    } else {
        console.log('not logged in');
        res.send(false);
    } // end else
}); // end GET

// clear all server session information about this user
router.get('/logout', (req, res) => {
    console.log('in user logout GET');
    
    // Use passport's built-in method to log out the user
    console.log('Logged out');
    req.logOut();
    res.sendStatus(200);
}); // end GET

// export
module.exports = router;