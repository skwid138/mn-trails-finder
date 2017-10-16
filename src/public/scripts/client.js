console.log('client.js sourced');
// Setup Angular and source in modules
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

myApp.config(function ($routeProvider) {

/// Client Side Routes ///
$routeProvider.when('/', {
    templateUrl: '/views/', // not a thing
    controller: '' // not a thing
}).otherwise('/'); // end routeProvider
}); // end config