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

    // get user credentials
    vm.getUser = () => {
        console.log('in getUSer');
        UserService.getUser();
    }; // end getUSer

    // gets all trails from service and populates trails array
    vm.getAllTrails = () => {
        console.log('in hc getAllTrails');
        TrailService.getAllTrails();
    }; // end getAllTrails

    // updates trail.approved as true
    vm.approveTrail = () => {
        console.log('in approveTrail');
        
    }; // end approveTrail


    /************** on page load **************/ 
    
    //get all trails
    vm.getAllTrails();
    
    // get user credentials on page load
    // confirm admin is true and change ng-if
    vm.getUser();

}); // end AdminController