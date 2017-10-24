/*jshint esversion: 6 */

/*
This controller is for the home view.
- displays trails
*/
myApp.controller('HomeController', function (TrailService, UserService) {
    console.log('in HomeController');
    const vm = this;

    // object to hold list of trails
    vm.trails = TrailService.trails;

    // sets user information for rating and my-trails queries
    vm.user = UserService.userObject;

    // toggles for rating stars to change color and fill
    vm.toggleOne = false;
    vm.toggleTwo = false;
    vm.toggleThree = false;
    vm.toggleFour = false;
    vm.toggleFive = false;

    // gets all trails from service and populates trails array
    vm.getAllTrails = () => {
        console.log('in hc getAllTrails');
        TrailService.getAllTrails();
        console.log('hc service list', TrailService.trails.list);
    }; // end getAllTrails

    // get user credentials
    vm.getUser = () => {
        console.log('in getUser');
        UserService.getUser();
    }; // end getUser

    // users provide a rating to a trail and store it in a junction table
    vm.rateTrailPost = (trails_id, rating_value) => {
        console.log('in rateTrail');
        vm.ratingObject = {
            trails_id : trails_id,
            user_id: vm.user.user_id,
            rating_value: rating_value
        }; // end ratingObject
        console.log('vm.ratingObject', vm.ratingObject);
        // POST to DB
        vm.message = TrailService.rateTrailPost(vm.ratingObject);
    }; // end rateTrailPost

    // users can add trail to their my-trails page
    vm.myTrailPost = (trails_id) => {
        console.log('in addMyTrailPost: trails_id, user_id', trails_id, vm.user.user_id);
        // if there is a user logged in, add the trail to the my_trails junction table
        if (vm.user.user_id) {
            vm.my_trailsObject = {
                trails_id: trails_id,
                user_id: vm.user.user_id
            }; // end my_trailsObject

            // POST to DB
            TrailService.myTrailPost(vm.my_trailsObject);
            // if a user is not logged in then prompt them to register and login first
            // the page content should dynamically hide using ng-if based on a user being logged in anyway
            // this is more of a backup
        } else {
            vm.message = swal({
                title: 'Please Login First',
                text: 'Must register and login to add a trail to My Trails',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }); // end vm.message
        } // end else
    }; // end addMyTrailPost


    /************** on page load **************/

    vm.getAllTrails(); // get all trails
    vm.getUser(); // set user credentials
    

}); // end HomeController