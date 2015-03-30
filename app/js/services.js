/**
 * Created by LarsKristian on 30.03.2015.
 */

'use strict';

var myAppServices = angular.module('myApp.services', []);

myAppServices.service('mqtt', function($rootScope) {

    var mqtt = this;

    mqtt.client = new Paho.MQTT.Client("hub.roland.bz", 9001, "webclient");

    mqtt.messages = [];
    mqtt.subscribeChannel = "test";

    mqtt.getMessages = function() {
        return mqtt.messages;
    };

    // called when the client connects
    mqtt.onConnect = function () {
        mqtt.connected = true;
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        mqtt.client.subscribe(mqtt.subscribeChannel);
        console.log("onConnect sub");
        var message = new Paho.MQTT.Message("Hello");
        message.destinationName = "/World";
        mqtt.client.send(message);
        console.log("sent");
    }

    // called when the client loses its connection
    mqtt.onConnectionLost = function (responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
        mqtt.connected = false;
    }

    // called when a message arrives
    mqtt.onMessageArrived = function (message) {
        console.log("onMessageArrived:" + message.payloadString);
        var msg = {};
        msg.payloadString = message.payloadString;
        msg.destinationName = message.destinationName;
        $rootScope.$apply(mqtt.messages.push(msg));
        console.log(JSON.stringify(mqtt.messages));
        console.log(JSON.stringify(message));
    }

    // set callback handlers
    mqtt.client.onConnectionLost = mqtt.onConnectionLost;
    mqtt.client.onMessageArrived = mqtt.onMessageArrived;
    // connect the client

    mqtt.connect = function (channel) {
        mqtt.subscribeChannel = channel;
        $rootScope.connected = true;
        mqtt.client.connect({onSuccess: mqtt.onConnect});
    };

    mqtt.send = function (content, channel) {
        var message = new Paho.MQTT.Message(content + " " + new Date().getSeconds());
        message.destinationName = channel;
        mqtt.client.send(message);
        console.log("Message ("+content+") sent to "+channel);
    }

});
