/*jshint esversion: 6 */

/*
This controller is for admin users
- it will allow users with the admin rights to approve or edit trails
*/
myApp.controller('AdminController', function (UserService, TrailService) {
    console.log('in AdminController');
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
        let trailId = trail.trails_id;
        $location.path('/trails/' + trailName + '/' + trailId);
        TrailService.setTrailsViewObject(trail);
    }; // end viewTrailDetails

    /************** DB GETs **************/
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

    /************** DB PUTs/DELETEs **************/
    // updates trail.approved as true
    vm.approveTrail = (trails_id) => {
        console.log('in approveTrail');
        TrailService.approveTrail(trails_id);
        vm.message = swal({
            title: 'Trail Approved!',
            text: 'trail will now be accessible to all users',
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }); // end vm.message
    }; // end approveTrail

    // removes a trail from the DB
    vm.deleteTrail = (trails_id) => {
        console.log('in deleteTrail');
        TrailService.deleteTrail(trails_id);
        vm.message = swal({
            title: 'Trail Deleted!',
            text: 'trail will be removed from the database',
            type: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }); // end vm.message
    }; // end deleteTrail


    /************** on page load **************/ 
    
    //get all trails
    vm.getAllTrails();
    
    // get user credentials on page load
    // confirm admin is true and change ng-if
    vm.getUser();

}); // end AdminController