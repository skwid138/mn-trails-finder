/*jshint esversion: 6 */

/*
This controller is for my trails view
- shows trails a user has added to their My Trails list
*/
myApp.controller('MyTrailController', function (TrailService, UserService, $location) {
    console.log('in MyTrailController');
    const vm = this;

    // sets ng-if based on user permissions
    // user must be an admin to approve trails
    vm.user = UserService.userObject;

    // object to hold list of trails
    vm.trails = TrailService.trails;

    // clicking a trail's card redirects to /trails/trail_name
    vm.viewTrailDetails = (trail) => {
        console.log('in viewTrailDetails');
        let trailName = trail.trail_name;
        $location.path('/trails/' + trailName);
        // sets selected trail as value for 
        // TrailService.trails.trailsView
        TrailService.setTrailsViewObject(trail);
    }; // end viewTrailDetails


    /************** $http **************/
    // get user credentials
    vm.getUser = () => {
        console.log('in getUSer');
        UserService.getUser();
    }; // end getUser

    // gets all trails from service and populates trails array
    vm.getAllTrails = () => {
        console.log('in hc getAllTrails');
        TrailService.getAllTrails();
    }; // end getAllTrails

    // remove trail from my trails
    vm.deleteMyTrail = (trails_id) => {
        console.log('in deleteTrail');
        TrailService.deleteMyTrail(trails_id);
        swal({
            title: 'Trail Removed!',
            text: 'trail has been removed from my trails',
            type: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }); // end swal
    }; // end deleteTrail


    
    /************** on page load **************/

    //get all trails
    vm.getAllTrails();

    // get user credentials on page load
    // confirm admin is true and change ng-if
    vm.getUser();
    
}); // end MyTrailController controller