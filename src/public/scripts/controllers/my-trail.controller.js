/*jshint esversion: 6 */

/*
This controller is for my trails view
- 
*/
myApp.controller('MyTrailController', function () {
    console.log('in MyTrailController');
    const vm = this;

    vm.my_trails = {
        
    }; // end my_trails

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
        let trailId = trail.trails_id;
        $location.path('/trails/' + trailName + '/' + trailId);
    }; // end viewTrailDetails
    
}); // end MyTrailController controller