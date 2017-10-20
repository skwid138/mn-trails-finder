/*jshint esversion: 6 */

/*
This controller is for admin users
- it will allow users with the admin rights to approve or edit trails
*/
myApp.controller('AdminController', function (UserService, TrailService) {
    console.log('in AdminController');
    const vm = this;

    // sets ng-if based on user permissions
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
        vm.approveTrails();
    }; // end getAllTrails

    vm.approveTrails = () => {
        console.log('in approveTrails');

        for (var i = 0; i < vm.trails.list.length; i++) {
            // if trail has NOT been has been flagged for approval
            if(!vm.trails.list[i].approved) {
                vm.flaggedTrails.push(vm.trails.list[i]);
            } // end if
        } // end for 
    }; // end approveTrails


    /* on page load */ 
    
    //get all trails
    vm.getAllTrails();
    
    // get user credentials on page load
    // confirm admin is true and change ng-if
    vm.getUser();

}); // end AdminController