/*jshint esversion: 6 */

myApp.service('TrailService', function($http) {
    console.log('in TrailService');
    const self = this;

    // object for holding trails array
    self.trails = {
        list: []
    }; // end self.trails

    // get all trails from DB
    self.getAllTrails = () => {
        console.log('in getAllTrails');
        
        $http.get('/trails').then((response) => {
            self.trails.list = response.data;
        }); // end GET
    }; // end getAllTrails
    
    
}); // end TrailService