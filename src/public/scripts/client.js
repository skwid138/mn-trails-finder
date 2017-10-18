/*jshint esversion: 6 */
console.log('client.js sourced');

// angular and sourced in modules
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

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
    }).otherwise('/'); 

}); // end config