---
title: Calling JS Services
date: 2018-10-15
weight: 30
toc: true
---

In this page, you can learn how to call JS services from web apps or another JS services in webOS Open Source Edition (OSE).

## Calling JS Services from Web Apps

Depending on the platform version, a different API or library is used in order to call JS services.

This section describes how you can call JS services by platform version.

  - [webOS OSE 2.0 or higher](#webos-ose-2-0-or-higher)
  - [webOS OSE 1.x](#webos-ose-1-x)

### webOS OSE 2.0 or higher

webOS OSE 2.0 or higher provides **WebOSServiceBridge**, a built-in JavaScript API for web apps to access Luna Bus.

You can use the WebOSServiceBridge API to call JS services in your web app.

For detailed information on how to use the API, see the [WebOSServiceBridge API reference]({{< relref "webosservicebridge-api-reference" >}}).

### webOS OSE 1.x

#### Import the webOS Library

In webOS OSE 1.x, the webOS library is required in order to call a JS service from a web app.

{{< note >}}
If you create a web app using the "basic" template of the [Command-Line Interface (CLI)]({{< relref "cli-user-guide" >}}) tool, the web app will already contain the webOS library in its `webOSjs-0.1.0` directory and have the library included in the `index.html` file. In this case, you don't need to add additional code to import the library, so you can safely skip this step.
{{< /note >}}

To include the library in a web app, follow the steps below:

1.  Download the webOS library file from [webOSjs-0.1.0.zip](https://webosose.s3.ap-northeast-2.amazonaws.com/tools/webOSjs-0.1.0.zip) and decompress it to the project root directory. The following directory will be created:

    ``` bash
    webOSjs-0.1.0
    ├── LICENSE-2.0.txt
    └── webOS.js
    ```

2.  In the `index.html` file, include the webOS library with the following code.

    {{< code "index.html" true >}}
    ``` html
    <script type="text/javascript" src="webOSjs-0.1.0/webOS.js"></script>
    ```
    {{< /code >}}

{{< note >}}
The webOS library file can be placed in any folder within your app project, but you must set the proper directory when including the library in the source code.
{{< /note >}}

#### Call JS Services in the Web App Code

In webOS OSE 1.x, with the webOS library included, a web app can make webOS service calls using the `webOS.service.request` method.

To call a service in a web app, use the `webOS.service.request` method as shown below.

``` javascript
var subscribeStatus = true; //change this to false to disable subscription
var resubscribeStatus = true; //change this to false to disable resubscription

var request = webOS.service.request("luna://com.mycom.helloworld/", {
    method:"someMethod",
    parameters: {
        foo:"bar"
    },
    onSuccess: function(inResponse) {
        //....
    },
    onFailure: function(inError) {
        //....
    },
    onComplete: function(inResponse) {
        //....
    },
    subscribe: subscribeStatus,
    resubscribe: resubscribeStatus
});
```

## Calling JS Services from Another JS Service

To call a JS service from another JS service, you must load the `webos-service` module first. After that, you can make webOS service calls using the `service.call` method.

Below is an example of how a webOS service can be called using the `webos-service` module.

``` javascript
var Service = require('webos-service');
var service = new Service("com.mycom.helloworld");

service.register("hello", function(message) {
    service.call("luna://com.webos.service.connectionmanager/getstatus", {}, function(response) {
        console.log(response.payload);
        if(response.payload.isInternetConnectionAvailable == true) {
            // ...
            message.respond({
                "returnValue": true
            });
        }
    });
});
```

For more details about the `webos-service` module, see [webos-service Library API Reference]({{< relref "webos-service-library-api-reference" >}}).
