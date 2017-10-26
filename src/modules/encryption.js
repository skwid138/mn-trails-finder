/*jshint esversion: 6 */

// requires
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const publicAPI = {
    encryptPassword: (password) => {
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
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