'use strict';

angular.module('myApp.controllers', []).controller('ViewController', ['$scope', 'mqtt', function ($scope, mqtt) {

    $scope.messages = mqtt.getMessages();

    $scope.subscribeChannel = "World";
    $scope.inputChannel = "World";

    // Create a client instance
    $scope.connected = false;

    $scope.send = function (content, channel) {
        mqtt.send(content, channel);
    };

    $scope.connect = function(channel) {
        mqtt.connect(channel);
        $scope.connected = true;
    };

}]);