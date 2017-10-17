/*jshint esversion: 6 */

console.log('client.js sourced');
// Setup Angular and source in modules
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

myApp.config( function ($routeProvider) {

    // Client Side Routes
    $routeProvider.when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeController as hc'
    }).when('/register',{
        templateUrl: '/views/register.html',
        controller: 'RegisterController as rc'
    }).otherwise('/'); 

}); // end config