---
title: Calling JS Services
date: 2020-03-10
weight: 30
toc: false
---

In this page, you can learn how to call JS services from another JS services in webOS IoT.

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

For more details about the `webos-service` module, see [webos-service Library API Reference]({{< relref "webos-service-library-api-reference-iot" >}}).
