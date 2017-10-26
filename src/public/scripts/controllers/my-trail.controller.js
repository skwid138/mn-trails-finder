/*jshint esversion: 6 */

/*
This controller is for my trails view
- 
*/
myApp.controller('MyTrailController', function (TrailService, UserService) {
    console.log('in MyTrailController');
    const vm = this;

    vm.my_trails = {
        
    }; // end my_trails

    // object to hold list of trails
    vm.trails = TrailService.trails;

    // sets user information for rating and my-trails queries
    vm.user = UserService.userObject;

    // need to either have a query to get users my_trails list
    // and use the trails id along with TrailService.trails list
    // to generate their page
    // OR make a join query to get the data based on user_id
    // and then join the trails table based on my_trails table

    // after that display the trails

    // clicking a trail's card redirects to /trails/trail_name
    vm.viewTrailDetails = (trail) => {
        console.log('in viewTrailDetails');
        let trailName = trail.trail_name;
        $location.path('/trails/' + trailName);
        // sets selected trail as value for 
        // TrailService.trails.trailsView
        TrailService.setTrailsViewObject(trail);
    }; // end viewTrailDetails
    
}); // end MyTrailController controller