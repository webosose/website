---
title: Requesting Subscription
date: 2020-03-10
weight: 40
toc: true
---

The `webos-service` module supports subscription feature. You can send a subscription request to another service, for services that support it. For more details about the `webos-service` module, see [webos-service Library API Reference]({{< relref "webos-service-library-api-reference-iot" >}}).

## Client-side Subscriptions

On the client (requester) side, subscriptions are handled by the Subscription object. In most cases, you merely need to do something like this:

``` javascript
var Service = require('webos-service');
var service = new Service("com.mycom.test");
var sub = service.subscribe("luna://com.webos.service.connectionmanager/getStatus", {"subscribe": true});
sub.on("response", function(message) {
    //do something with the subscription
});
```

## Service-side Subscriptions

The webos-service library offers some built-in support for services that would like to support subscriptions. If a method has a *cancel* handler, then it's considered to be subscribable. The library automatically tracks subscription requests, registering them with System Bus to ensure that `cancel` event is delivered properly. Your *request* handler for the method should check the message's `isSubscription` property, to determine whether a subscription has been requested. In most cases, you'll want to add subscribed messages to an array or object hash, in order to keep track of them when it's time to update them later. Here's a partial example:

``` javascript
var subscriptions = {};

var heartbeat = service.register("heartbeat2");
heartbeat.on("request", function(message) {
    message.respond({event: "beat"}); // initial response
    if (message.isSubscription) {
        subscriptions[message.uniqueToken] = message; //add message to "subscriptions"
        if (!interval) {
            createInterval(); // launch some async process
        }
    }
});
heartbeat.on("cancel", function(message) {
    delete subscriptions[message.uniqueToken]; // remove message from "subscriptions"
    var keys = Object.keys(subscriptions);
    if (keys.length === 0) { // count the remaining subscriptions
        console.log("no more subscriptions, canceling interval");
        clearInterval(interval); // don't do work in the background when there are no subscriptions
        interval = undefined;
    }
});
```
