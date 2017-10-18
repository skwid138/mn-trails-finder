/*jshint esversion: 6 */

/*
This controller allows users to add trails to the DB
- it will allow users to create trail records and write them to the DB
*/
myApp.controller('AddTrailController', function(TrailService) {
    console.log('in AddTrailController');
    const vm = this;

    // adds a new trail row to DB
    vm.addTrail = () => {
        console.log('in addTrail');

        $http.post('/trail').then((response) => {

        }); // end POST
    }; // end addTrail

}); // end AddTrailController