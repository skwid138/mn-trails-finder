/*jshint esversion: 6 */

/*
This controller allows users to add trails to the DB
- it will allow users to create trail records and write them to the DB
*/
myApp.controller('AddTrailController', function(TrailService, $http) {
    console.log('in AddTrailController');
    const vm = this;

    vm.trail = {
        trail_name : '',
        park_name : '',
        address1 : '',
        address2 : '',
        city : '',
        state : '',
        zip : '',
        description : ''
    }; // end trail

    vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY')
        .split(' ').map((state) => {
        return { abbrev : state };
        });

    // adds a new trail row to DB
    // vm.addTrail = () => {
    //     console.log('in addTrail');

    //     $http.post('/trail').then((response) => {

    //     }); // end POST
    // }; // end addTrail

}); // end AddTrailController