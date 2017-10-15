console.log('client.js sourced');
// Setup Angular and source in modules
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

myApp.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

/// Client Side Routes ///
$routeProvider.when('/', {
    templateUrl: '/views/home.html',
    controller: 'HomeController as hc'
}).otherwise('/'); // end routeProvider
}); // end config