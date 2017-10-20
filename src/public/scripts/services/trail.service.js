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
        
        $http.get('/trail').then((response) => {
            console.log('/trail response.data.rows ', response.data.rows);
            self.trails.list = response.data.rows;
            console.log('self.trails.list ', self.trails.list);
            
        }); // end GET
    }; // end getAllTrails
    
    
}); // end TrailService