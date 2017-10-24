/*jshint esversion: 6 */
console.log('client.js sourced');

// angular and sourced in modules
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config( function ($routeProvider) {

    // client side routing
    $routeProvider.when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeController as hc'
    }).when('/admin', {
        templateUrl: '/views/admin.html',
        controller: 'AdminController as ac'
    }).when('/add-trail', {
            templateUrl: '/views/add.html',
            controller: 'AddTrailController as atc'
    }).when('/my-trails', {
            templateUrl: '/views/my-trails.html',
            controller: 'MyTrailController as mtc'
    }).when('/trails/:trail_name', {
            templateUrl: '/views/trails.html',
            controller: 'TrailController as tc'
    }).otherwise('/'); 

}); // end config