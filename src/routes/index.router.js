/*jshint esversion: 6 */

// requires
const router = express.Router();
const passport = require('passport');
const path = require('path');

// Handles login form POST from index.html
router.post('/',
    passport.authenticate('local', { // local strategy
        // request stays within node/express and is routed as a new request
        successRedirect: '/user'   // goes to routes/user.router.js
    }) // end auth
); // end POST

// GET index.html
router.get('/', (req, res) => {
    console.log('In base route.');
    const indexRoute = (path.resolve('public/index.html'));
    res.sendFile(indexRoute);
}); // end GET

// export
module.exports = router;