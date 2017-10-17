/*jshint esversion: 6 */

console.log('client.js sourced');
// Setup Angular and source in modules
const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

myApp.config(($routeProvider) => {

    // Client Side Routes
    $routeProvider.when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeController as hc'
    }).otherwise('/'); 

}); // end config