'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.controllers',
    'myApp.services'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {templateUrl: 'view1/view1.html'});
        $routeProvider.when('/view2', {templateUrl: 'view2/view2.html'});
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);


myApp.run(function ($rootScope) {
    console.log('myApp.run');
    $rootScope.test = 'test';
});
