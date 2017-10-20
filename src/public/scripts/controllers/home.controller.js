/*jshint esversion: 6 */

/*
This controller is for the home view.
- displays trails
*/
myApp.controller('HomeController', function (TrailService) {
    console.log('in HomeController');
    const vm = this;

    // object to hold list of trails
    vm.trails = TrailService.trails;

    //vm.trails.list = TrailService.trails.list;

    // gets all trails from service and populates trails array
    vm.getAllTrails = () => {
        console.log('in hc getAllTrails');
        TrailService.getAllTrails();
        console.log('hc service list', TrailService.trails.list);
    }; // end getAllTrails


    // on page load get all trails
    vm.getAllTrails();
    

}); // end HomeController