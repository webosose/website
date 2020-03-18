---
title: Using IoTivity
date: 2020-03-17
weight: 10
toc: true
---

webOS IoT includes [IoTivity](https://iotivity.org/) and [iotivity-node](http://github.com/intel/iotivity-node) for developers to implement JS services that are needed to support IoT connectivity based on [Open Connectivity Foundation](http://openconnectivity.org/) (OCF) standard specification.

  - IoTivity: The open source reference implementation of the OCF standard specifications.
  - iotivity-node: The node module implemented as a native add-on using IoTivity to provide a JavaScript API for OCF functionality.

The platform adapter for webOS IoT enables IoTivity to interact with webOS connectivity components through webOS Bus system (Luna Bus). With the adapter, you can monitor connectivity status.

## Using iotivity-node for JavaScript Service

You can develop Node.js-based JavaScript (JS) services communicating with the other OCF IoT devices by using the built-in iotivity-node module, as follows:

{{< code "Using low-level interface" >}}
``` js
var iotivity = require("iotivity-node/lowlevel");
...
iotivity.OCInit(...);
...
```
{{< /code >}}

{{< code "Using high-level interface" >}}
``` js
var device = require("iotivity-node");
...
device.server.oncreate(...);
...
```
{{< /code >}}

JS services provide access to platform features such as low-level networking, file system access, and binary data processing. For more detailed information about using iotivity-node in webOS IoT, refer to the [JS Service example](https://wiki.iotivity.org/webos#execute_sample_webos_javascript_service) in [IoTivity for webOS documentation](https://wiki.iotivity.org/webos).

For details of JS service development for webOS IoT, refer the the following guide.

  - [JS Service Development Guide]({{< relref "js-service-overview-iot" >}})

## Getting IoTivity and iotivity-node

The current version of IoTivity and iotivity-node in webOS IoT is 2.0.1. To apply the other version of IoTivity in your webOS IoT device, refer to the [IoTivity webOS Build Instructions](https://wiki.iotivity.org/webos).

{{< note >}}
To use IoTivity master branch or webos branch for tracking upstream, complete the steps in [How to use IoTivity Gerrit](https://wiki.iotivity.org/how_to_use_gerrit).
{{< /note >}}
