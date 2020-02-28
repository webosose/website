---
title: Launching Web Apps for Dual Display
date: 2020-02-28
weight: 40
toc: true
---

From webOS Open Source Edition (OSE) 2.0.0, you can launch web apps on the secondary display if you use dual display with Raspberry Pi 4. This page explains how to launch web apps on the secondary display.

## API and Parameter Description

To launch a web app on the secondary display, the following LS2 API and parameter is used.

* Use the `com.webos.service.applicationmanager/launch` method with the `luna-send` command.
* In the `params` parameter of the `launch` method, add **`displayAffinity`** and set its value to 0 or 1. Each value corresponds to each display as below:
    - `0`: primary display
    - `1`: secondary display

## Usage Example

The following shows an example of launching YouTube app on the secondary display using the [luna-send]({{< relref "luna-send" >}}) tool.

{{< code "Example" true >}}
``` shell
root@raspberrypi4:/# luna-send -n 1 luna://com.webos.service.applicationmanager/launch '{ "id":"com.webos.app.test.youtube", "params": {"displayAffinity": 1}}'
```
{{< /code >}}

{{< note >}}
You cannot launch two instances of the same app on the primary display and the secondary display at the same time.

* If Enact browser is running on the primary display, executing the above command will launch YouTube app on the secondary display.
* On the other hand, if YouTube app is already running on the primary display, executing the above command will not launch YouTube app on the secondary display but will re-launch the YouTube app on the primary display.
{{< /note >}}
