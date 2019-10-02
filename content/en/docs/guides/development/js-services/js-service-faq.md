---
title: FAQ on JS Services
date: 2018-10-15
weight: 60
toc: true
---

## Q1. Why does my service quit after 5 seconds, with a "No active activities" message?

There is a 5-second timer built into the *webos-service* library, which causes services to exit if they're not currently active. For purposes of this timer, a service is considered to be active if either of the following is true:

1.  It has a subscription taken on it from another application or service.

2.  It has received a message to which it has not responded yet [with `message.respond()`].

## Q2. Why does my service never exit?

As a corollary to the above, if your service seems to be hanging around when it should have already quit, there are a couple of possibilities. It may have gotten a message that it never called `respond()` on, or it may have an outstanding subscription from another service, or it might just be stuck in an infinite loop.

## Q3. How can I change the idle timeout to last longer?

There will be an API added to the Service object to support manipulating the timer. For now, you have to do this through the ActivityManager object:

``` javascript
var Service = require("webos-service");
var service = new Service("com.example.myservice");
service.activityManager.idleTimeout = 15;
// this timeout is in seconds
```

## Q4. How do I disable the idle timeout permanently?

First, make sure you actually need to do that. In general, you want to work with the standard service lifecycle, rather than against it. In particular, if your service is waiting for some condition to change, you'd be better off registering an activity with ActivityManager, and having ActivityManager re-launch your service when the conditions are met. The best way to disable the timeout is to create an ActivityManager activity that you keep "live" for the time that you need to service to keep running. This is the best way to do this because it not only causes the timer to be disabled, but will also protect your service from being killed by the ActivityManager, if someone enables the idle-task-killing feature of ActivityManager.

``` javascript
// create an Activity
var keepAlive;
service.activityManager.create("keepAlive", function(activity) {
    keepAlive = activity;
});
// When you're done, complete the activity
service.activityManager.complete(keepAlive, function(activity) {
    console.log("completed activity");
});
```

## Q5. When I try to send a message to my service, I get a 'Service does not exist' error, what does that mean, and how can I fix it?

This means that the System bus doesn't know about your service. Here are some things to check:

  - Check that the service name in the application exactly matches the service name the service registers under.
