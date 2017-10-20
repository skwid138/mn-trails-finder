/*jshint esversion: 6 */

/*
This controller is for the home view.
- displays trails
*/
myApp.controller('HomeController', function (TrailService) {
    console.log('in HomeController');
    const vm = this;

    // object to hold list of trails
    vm.trails = {
        list: []
    }; // end trails

    // gets all trails from service and populates trails array
    vm.getAllTrails = () => {
        console.log('in hc getAllTrails');
        TrailService.getAllTrails();
        vm.buildList();
    }; // end getAllTrails

    // makes trails list
    vm.buildList = () => {
        vm.trails.list = TrailService.trails.list;
        console.log('vm.trails.list', vm.trails.list);
    }; // end buildList

    // on page load get all trails
    vm.getAllTrails();
    


}); // end HomeController