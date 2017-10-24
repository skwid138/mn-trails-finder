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
myApp.controller('TrailController', function (TrailService, UserService) {
    console.log('in TrailController');
    const vm = this;

    // object to hold list of trails
    vm.trails = TrailService.trails;

    // sets user information for rating and my-trails queries
    vm.user = UserService.userObject;


    // show trail name in the url - like this? from other three controllers
    // $location.path('/trail/{{trail.trail_name}}')
    


    // if user - have ability to edit which sets approved flag back to false
    // if user - have ability to flag trail for approval again
    // if admin user - can delete or edit trail without resetting approved flag



    

}); // end MyTrailController controller