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
        state: 'MN',
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
            return { dist : length + ' miles' };
        } // end map
    ); // end lengths


    // adds a new trail row to DB
    vm.addTrail = () => {
        console.log('in addTrail');

        console.log('trail object to post ', vm.trail);
        

        $http.post('/trail', vm.trail).then((response) => {
            //console.log('response', response);
            // if server responds with 'Created'
            if (response.status === 201) {
                // trail_id of newly created trail
                console.log(response.data.rows[0].trails_id);
                // can use id to route to the trail's page
            }
        }); // end POST
    }; // end addTrail

}); // end AddTrailController