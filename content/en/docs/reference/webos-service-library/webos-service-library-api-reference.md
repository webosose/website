---
title: webos-service Library API Reference
date: 2018-10-15
weight: 10
toc: true
---

## About webos-service

The `webos-service` module for Node.js provides an interface to the system bus, wrapped in familiar Node.js idioms.

### webos-service Example

This example registers a service (`luna://com.example.helloworld/hello`) on the system bus, which responds to a request with a "Hello, World!" message.

``` javascript
//helloworld.js
//simple service, based on webos-service Library API
var Service = require('webos-service');

var service = new Service("com.example.helloworld");
service.register("hello", function(message) {
    message.respond({
        greeting: "Hello, World!"
    });
});
```

### Loading webos-service library

This loads the `webos-service` module. The only thing exported from the `webos-service` module is the **`Service`** constructor.

``` javascript
var Service = require("webos-service");
```

## webos-service Library API Reference

### Service Object

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Property/Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Service (busID)</p></td>
<td><p>Creates a <strong>Service</strong> object, which handles registering methods on the system bus.</p>
<ul>
<li><p><strong>busId</strong>: A string containing the bus address of the service, e.g. "<em>com.example.helloworld</em>"</p></li>
</ul>
<p>For example,</p>
<pre>var service = new Service(busID)</pre>
</td>
</tr>
<tr class="even">
<td><p>service.activityManager</p></td>
<td><p>The ActivityManager proxy object for this service. See the <a href="#activitymanager-object">ActivityManager object</a> for details.</p></td>
</tr>
<tr class="odd">
<td><p>service.busId</p></td>
<td><p>The busId used when creating the <strong>Service</strong>.</p></td>
</tr>
<tr class="even">
<td><p>service.call(uri,</p>
<p>arguments,</p>
<p>function callback(message){...}) </p></td>
<td><p>This sends a one-shot request to another service.</p>
<ul>
<li><p><code>uri</code>:<strong> </strong>The bus address of the service to send to, for example: luna://<em>com.webos.service.wifi/getstatus</em></p></li>
<li><p><code>arguments</code>: A JSON-compatible object which is encoded by the library and sent as part of the request</p></li>
<li><p><code>callback</code>: Called with a single parameter, which is a <strong>Message</strong>. See the <a href="#message-object">Message object</a> for details. </p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>service.register(methodName,</p>
<p>[function request(message){...}],</p>
<p>[function cancel(message){...}]) </p></td>
<td><p>Registers a method for the service. When a request is made for that method, the callback function will be called. The callback gets one argument, which is a <a href="#message-object">Message object</a>. </p>
<p><code>methodName</code> is the name of the method to register. You can group methods in categories by putting a category at the front of the methodName, separated by "/" characters, for example,</p>
<pre>service.register("/config/setup", function callback(message)\{...});</pre>
<p>This function returns a <a href="#method-object">Method object</a>, which emits the <code>request</code> and <code>cancel</code> events. If the request and cancel arguments are provided, they're bound to the <code>request</code> and <code>cancel</code> events, respectively.</p></td>
</tr>
<tr class="even">
<td><p>service.subscribe(uri, arguments) </p></td>
<td><p>This sends a subscription request to another service, for services that support it. The <code>uri</code> and <code>arguments</code> are the same as those of <code>call</code> method above. This function returns a <a href="#subscription-object">Subscription object</a>, which emits events as responses come back from the other service. </p></td>
</tr>
<tr class="odd">
<td><p>service.subscriptions </p></td>
<td><p>All of the {{Message}}s currently subscribed to this service, indexed by their System Bus unique token.</p></td>
</tr>
</tbody>
</table>
</div>

### Message Object

Message objects are used to represent messages coming in from other services or apps.

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Property/Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>message.cancel()</p></td>
<td><p>This sends a "cancel" message to the sender, which indicates no more responses will be coming. This is normally only used for subscribed calls. Single-shot calls do not require a "cancel" response.</p></td>
</tr>
<tr class="even">
<td><p>message.category</p></td>
<td><p>The category of the method that was called.</p></td>
</tr>
<tr class="odd">
<td><p>message.isSubscription</p></td>
<td><p>This is set to <code>true</code> if "subscribe": <code>true</code> is included in the payload, which indicates the sender wants to subscribe.</p></td>
</tr>
<tr class="even">
<td><p>message.method</p></td>
<td><p>The name of the method that was called. This is the part of the service URI that's before the method name.</p></td>
</tr>
<tr class="odd">
<td><p>message.respond(payload)</p></td>
<td><p>This sends a response to the requester.</p>
<ul>
<li><p><strong>payload</strong>: The payload object will be JSON-encoded before being sent. Every response should include a <code>returnValue</code> property, which is set to <code>true</code> for success replies, and <code>false</code> for errors.</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>message.sender</p></td>
<td><p>The appID or busID of the message sender, depending on whether it was sent from an app or another service.</p></td>
</tr>
<tr class="odd">
<td><p>message.uniqueToken</p></td>
<td><p>A string which uniquely identifies this request. It is guaranteed to be unique within any one run of the service. If you need to track service requests, this is probably the token you want to use.</p></td>
</tr>
</tbody>
</table>
</div>

### Method Object

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Property/Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>service.register(methodName[,</p>
<p>requestCallback][,</p>
<p>cancelCallback])</p></td>
<td><p>Creates a Method object, which is an EventEmitter that emits the request and cancel methods.</p>
<p>For example,</p>
<pre>var method = service.register(methodName[, requestCallback][, cancelCallback])</pre>
</td>
</tr>
<tr class="even">
<td><p>event "request"</p></td>
<td><p>This event is emitted when a message is sent to the registered method. The event handler receives the Message object corresponding to the request.</p></td>
</tr>
<tr class="odd">
<td><p>event "cancel"</p></td>
<td><p>This event is emitted when a sender of a message indicates that it is no longer interested in receiving replies. This event is only emitted for subscribed messages.</p></td>
</tr>
</tbody>
</table>
</div>

### Subscription Object

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Property/Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>service.subscribe(uri, payload)</p></td>
<td><p>This creates a Subscription object, representing a request to uri.</p>
<ul>
<li><p><code>uri</code>: The complete URI for the service method, e.g. luna://<em>com.webos.service.wifi/getstatus</em></p></li>
<li><p><code>payload</code>: An object, which is JSON-encoded before sending</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>subscription.on("response",</p>
<p>function callback(message){...})</p></td>
<td><p>A <code>response</code> event is sent every time the other service sends a response. The callback receives a single Message parameter.</p></td>
</tr>
<tr class="odd">
<td><p>subscription.on("cancel",</p>
<p>function callback(message){...})</p></td>
<td><p>The <code>cancel</code> response indicates that the other service has canceled that subscription. It is a good idea to remove any references to the subscription at that time so that the message can be garbage-collected.</p></td>
</tr>
<tr class="even">
<td><p>subscription.cancel()</p></td>
<td><p>Sends a cancel message to the other service, indicating that you no longer wish to receive responses.</p></td>
</tr>
</tbody>
</table>
</div>

### ActivityManager Object

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Property/Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>service.activityManager</p></td>
<td><p>This object represents a proxy to the ActivityManager System Bus service (<em>com.webos.service.activitymanager</em>) and also provides a timer that's used to control a service's lifetime.</p>
<p>Example</p>
<pre>var activityManager = service.activityManager;</pre>
</td>
</tr>
<tr class="even">
<td><p>activityManager.create</p>
<p>("name", callback)</p></td>
<td><p>Creates an activity with a reasonable set of default properties, for immediate execution by the service. The service will not exist due to timeout while an activity is active.</p>
<p>Note that the <code>webos-service</code> library creates a new activity for each request that comes in, so you don't need to create your own for simple cases. Your callback will be called with the new activity as an argument.</p></td>
</tr>
<tr class="odd">
<td><p>activityManager.create</p>
<p>(activitySpecification,</p>
<p>callback)</p></td>
<td><p>Creates an activity with the given activity specification. This is useful when you want to create an activity with a callback, to cause your service to be executed at a later time. Your callback will be called with the new activity as an argument. </p>
<p>You might call complete explicitly if you wanted to specify options for the complete operation, for example, to restart the activity, or change the triggers or schedule associated with the activity.</p></td>
</tr>
<tr class="even">
<td><p>activityManager.complete</p>
<p>(activitySpecification,</p>
<p>options, callback)</p></td>
<td><p>The activity associated with a command will automatically be completed when you send a response. You might call complete explicitly if you wanted to specify options for the complete operation, for example, to restart the activity, or change the triggers or schedule associated with the activity.</p></td>
</tr>
</tbody>
</table>
</div>
