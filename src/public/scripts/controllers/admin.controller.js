/*jshint esversion: 6 */

/*
This controller is for admin users
- it will allow users with the admin rights to approve or edit trails
*/
myApp.controller('AdminController', function (UserService) {
    console.log('in AdminController');
    const vm = this;

    // boolean for ng-if
    vm.isAdmin = false;

    console.log('vm.isAdmin ', vm.isAdmin);

    // gets user info and sets UserService.userObject to current users credentials
    vm.getUser = () => {
        console.log('admin - getting user credentials');

        UserService.getUser().then(vm.isAdmin = true);
    }; // end getUser

    // update user credentials on user.service when page loads
    vm.getUser();
    

}); // end AdminController