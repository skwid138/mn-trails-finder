/*jshint esversion: 6 */

// requires
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let publicAPI = {
    encryptPassword: (password) => {
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        return bcrypt.hashSync(password, salt);
    },
    comparePassword: (candidatePassword, storedPassword) => {
        console.log('comparing passwords');
        console.log(candidatePassword, storedPassword);
        //candidatePassword, this.password
        return bcrypt.compareSync(candidatePassword, storedPassword);
    } // end compare
}; // end publicAPI

// export
module.exports = publicAPI;