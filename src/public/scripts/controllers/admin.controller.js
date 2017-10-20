/*jshint esversion: 6 */

/*
This controller is for admin users
- it will allow users with the admin rights to approve or edit trails
*/
myApp.controller('AdminController', function (UserService) {
    console.log('in AdminController');
    const vm = this;

    console.log('vm.isAdmin ', vm.isAdmin);

    // sets ng-if based on user permissions
    vm.isAdmin = UserService.isAdmin;
    

}); // end AdminController