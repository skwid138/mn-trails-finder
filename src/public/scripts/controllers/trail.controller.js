/*jshint esversion: 6 */

/*
This controller is for a specified trail view
- linked to from home, my-trails, or admin views after clicking on trail card
- take a trails id to reference just that trails info
- will display detailed trail information dynamically
- will allow users to flag for admin approval
- will allow users to edit
- will allow admin to delete
*/
myApp.controller('TrailController', function (TrailService, UserService, $routeParams, $location, NgMap) {
    console.log('in TrailController');
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

    vm.map = {
        ll: '44.906005, -93.198442',
        zoom: 18
    }; // end map


    // if the trails data isn't set then redirect home 
    // ie: page refresh on a trail)
    vm.checkForTrail = () => {
        if (vm.trails.trailsView.trails_id === undefined) {
            $location.path('/');
        } // end if
    }; // end checkForTrail


    // if I put the id back in $routeParams even on page refresh it could do a get with the ID


    // if user - have ability to edit which sets approved flag back to false
    // if user - have ability to flag trail for approval again
    // if admin user - can delete or edit trail without resetting approved flag


    /************** $http **************/

    // users provide a rating to a trail and store it in a junction table
    vm.rateTrailPost = (trails_id, rating_value) => {
        console.log('in rateTrail');
        vm.ratingObject = {
            trails_id: trails_id,
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

    // redirect to home if no trail data is set
    vm.checkForTrail();

    

}); // end MyTrailController controller