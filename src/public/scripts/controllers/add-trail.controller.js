/*jshint esversion: 6 */

/*
This controller allows users to add trails to the DB
- it will allow users to create trail records and write them to the DB
*/
myApp.controller('AddTrailController', function(TrailService, $http) {
    console.log('in AddTrailController');
    const vm = this;

    // object for POST
    vm.trail = {
        trail_name : '',
        park_name : '',
        length : '',
        ll : '', // if location services to get trail head lat and lon
        address1 : '',
        address2 : '',
        city : '',
        state : '',
        zip : '',
        parking : false,
        parking_free : false,
        dogs : false,
        child : false,
        paved : false,
        water : false,
        park_pass : false,
        hiking : false,
        biking : false,
        skiing : false,
        horse : false,
        atv : false,
        snowmobile : false,
        description : '',
        image : '' // if image upload
    }; // end trail

    // list of states to display on DOM in drop down menu
    vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY')
        .split(' ').map((state) => {
        return { abbrev : state };
        } // end map
    ); // end states

    // list of trail lengths to display on dom in drop down menu
    vm.lengths = ("0 - 1, 1 - 3, 3 - 5, 5 - 7, 8 - 10, 10 - 15, 15 - 20, > 20")
        .split(', ').map((length) => {
            return { dist : length };
        } // end map
    ); // end lengths


    // adds a new trail row to DB
    vm.addTrail = () => {
        console.log('in addTrail');

        $http.post('/trail').then((response) => {

        }); // end POST
    }; // end addTrail

}); // end AddTrailController