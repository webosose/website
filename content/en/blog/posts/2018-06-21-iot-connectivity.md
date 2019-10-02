---
title: IoT Connectivity in webOS OSE
date: 2018-06-21
slug: iot-connectivity
posttype: article
toc: true
---

**Author: Seokhee Lee**

webOS Open Source Edition (OSE) includes [IoTivity](http://www.iotivity.org/) and [iotivity-node](http://github.com/intel/iotivity-node) for developers to implement web apps, native apps, and services that are needed to support IoT connectivity based on [Open Connectivity Foundation](http://openconnectivity.org/) (OCF) standard specification.

- IoTivity: The open source reference implementation of the OCF standard specifications.
- iotivity-node: The node module implemented as a native add-on using IoTivity to provide a JavaScript API for OCF functionality.

We are contributing the platform adapter for webOS OSE to IoTivity. The adapter enables IoTivity to interact with webOS connectivity components through webOS Bus system (Luna Bus). With the adapter, you can monitor connectivity status and send/receive data for non-IP transport such as BLE/BT.

{{< figure src="/images/blog/articles/iot-connectivity-in-webos-ose.png" alt="" caption="IoT Connectivity in webOS OSE" >}}

## Using iotivity-node for JavaScript Service

webOS OSE developers can develop node.js-based JavaScript (JS) services communicating with the other OCF IoT devices by using the built-in iotivity-node module, as follows:

Using low-level interface

``` javascript
var iotivity = require("iotivity-node/lowlevel");
...
iotivity.OCInit(...);
...
```

Using high-level interface

``` javascript
var device = require("iotivity-node");
...
device.server.oncreate(...);
...
```

JS services can be packaged into a web app and allow the app to operate, even when the app is not running on the foreground. JS service also provides additional access to platform features which are usually unavailable to web apps such as low-level networking, file system access, and binary data processing. Therefore, you can implement most IoT features in your web app using JS service. For more detailed information about using iotivity-node in webOS OSE, refer to the example web app in [IoTivity webOS build Instructions](https://wiki.iotivity.org/webos).

Developer guides for web apps and JS services of webOS OSE are as follows:

- [webOS SDK Tools]({{< relref "cli-user-guide" >}})
- [JS Service Development Guide]({{< relref "js-service-overview" >}})
- [Web App Development Guide]({{< relref "web-app-overview" >}})

## Using IoTivity for Native App and Service

webOS OSE has not provided SDK tools for native app or services yet; however, platform developers can access built-in IoTivity directly and develop their own native services. For more detailed information about developing webOS native services using IoTivity in webOS OSE, refer to the native service example in the [IoTivity webOS Build Instructions](https://wiki.iotivity.org/webos).

## Getting IoTivity and iotivity-node

The current version of IoTivity and iotivity-node in webOS OSE is 1.2.1. The next version (1.3.1 or higher) is going to be released together with the upcoming release of webOS OSE. To apply the other version of IoTivity in your webOS OSE device, please refer to the [IoTivity webOS Build Instructions](https://wiki.iotivity.org/webos).

{{< note >}}
To use IoTivity master branch for tracking upstream, complete the steps in [How to use IoTivity Gerrit](https://wiki.iotivity.org/how_to_use_gerrit).
{{< /note >}}
