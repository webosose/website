---
title: WebOSServiceBridge API Reference
date: 2021-06-21
weight: 10
toc: true
---

## Overview

WebOSServiceBridge is a JavaScript API that enables web applications to access Luna Bus.

{{< note >}}
WebOSServiceBridge API is available only on webOS Open Source Edition (OSE) 2.0 or higher.
{{< /note >}}

## Constructor

- `WebOSServiceBridge()`: Creates a WebOSServiceBridge object.

{{< note >}}
It is strongly recommended that you create a WebOSServiceBridge object once and re-use it with changing the URL and parameter values. Creating a WebOSServiceBridge object for every function call will waste memory.
{{< /note >}}

## Property

- `onservicecallback`: Registers the callback routine to handle the response.

{{< note >}}
For more information on the object received by callback, see the topic 'Call Returns' in each method of the LS2 APIs.
{{< /note >}}

## Methods

### call

Invokes the Luna service method.

#### Parameters

Name | Type | Description
-----|------|------------
url | String | URL of the Luna service method
params | JSON string | Parameter for the method to invoke

#### Example

```js
var bridge = new WebOSServiceBridge();

bridge.call("luna://com.webos.service.applicationmanager/launch", '{"id":"APP_ID"}');

var url = 'luna://com.webos.service.db/putKind';
var params = JSON.stringify({
    "id":"test.db-api:1",
    "owner":"APP_ID"
});

bridge.call(url, params);
```

### cancel

Cancels the `call()` request.

This method has no return value, because the call is canceled.

#### Example

```js
var bridge = new WebOSServiceBridge();
bridge.onservicecallback = function (msg) { var response = JSON.parse(msg); console.log(response.returnValue);};
bridge.call("luna://com.webos.service.applicationmanager/running", '{"subscribe":true}');
bridge.cancel();
```

## API Usage Example

The following shows an example of JavaScript code that uses WebOSServiceBridge API.

{{< code "servicetest.js" true >}}
``` js {linenos=table}
function quickServiceTest(){
    var bridge = new WebOSServiceBridge();
    var url = 'luna://com.webos.service.applicationmanager/running';

    bridge.onservicecallback = callback;

    function callback(msg){
        var response = JSON.parse(msg);
        console.log(response.returnValue);
    }

    var params = '{}';
    bridge.call(url, params);
}
```
{{< /code >}}

- Line (2): Create the WebOSServiceBridge object
- Line (3~5): Set the URL of the method to call, and register the callback function
- Line (7~10): Define the callback function that will handle the response
- Line (12): Set the parameters in JSON string format
- Line (13): Invoke the method with Luna call

You can test the code above by including the JavaScript file inside an HTML file as below.

{{< code "index.html" true >}}
```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<!-- include servicetest-->
<script type="text/javascript" charset="utf-8" src="servicetest.js"></script>

<body>
  <button onclick="quickServiceTest();"> quick service test </button>
</body>
</html>
```
{{< /code >}}
