'use strict';

angular.module('myApp.controllers', []).controller('ViewController', ['$scope', 'mqtt', function ($scope, mqtt) {

    $scope.messages = mqtt.getMessages();

    // Create a client instance
    $scope.connected = false;

    $scope.send = function (content, channel) {
        mqtt.send(content, channel);
    };

    $scope.connect = function() {
        mqtt.connect($scope.onMessageArrived);
        $scope.connected = true;
    };

}]);