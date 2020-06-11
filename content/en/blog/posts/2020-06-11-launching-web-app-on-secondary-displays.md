---
title: Launching web app on secondary displays
date: 2020-06-11
slug: launching-web-app-on-secondary-displays
posttype: article
toc: true
thumbnail: th-web-app-on-secondary-displays.jpg
---

**Author: NERGI**

Since version 2.0.0, webOS OSE has been supporting the Dual-Display feature. Thanks to that feature, a user can select an output display of a webOS OSE app.

For those who want to experience the feature on webOS OSE, this guide introduces a sample app that can adjust the output display.

## How to Install the App

To install the app, first you have to clone the repository.

``` bash
$ git clone https://github.com/Heeam-Shin/web-app-controller-sample.git
$ cd web-app-controller-sample
```

The installation procedure is same as that of a web app. Type the following commands:

``` bash
$ ares-package .
$ ares-install ./com.dual.webapp.sample_1.0.0_all.ipk -d [your-target-device]
```

{{< note >}}
For more details on the above procedure, refer to [Developing External Web Apps]({{< relref "developing-external-web-apps" >}}).
{{< /note >}}

If the installation succeed, the app card appears in Home Launcher.

{{< figure src="/images/blog/articles/dual-display-sample-app-card.jpg" alt="Sample app in Home Launcher" caption="" >}}

Then click the app card to launch the sample app. You can launch/close the built-in YouTube app by clicking the buttons.

{{< figure src="/images/blog/articles/dual-display-web-app-sample.jpg" alt="Launched sample app" caption="" >}}

## Source Codes

This section explains the codes which are directly related to usage of LS2 API rather than explaining whole codes.

### appinfo.json

``` json {linenos=table}
{
  "id": "com.dual.webapp.sample",
  "version": "1.0.0",
  "vendor": "LG Electronics",
  "type": "web",
  "main": "index.html",
  "title": "Secondary display sample",
  "icon": "./images/NERGI.png",
  "requiredPermissions": ["configurator.callbacks","applications","all","applications.launch","applications.internal"]
}
```

A brief explanation of the above file:

- Line(9) : Sets ACG (Access Control Groups) information. Every method of LS2 APIs needs ACG information to get security permissions. For more details on how to get the ACG information, see [Identify the ACG Group of the Methods]({{< relref "using-ls2-api-in-web-apps#identify-the-acg-group-of-the-methods" >}}).

### index.html

``` html {linenos=table}
<body>
    <div class="middle-center-align">
        <h1 class="burning-shadow">Launch/Close YouTube App!</h1>
        <h2>(on your secondary display)</h2>
        <div class="center-align">
            <button class="button" onclick="openApp();">Launch</button>
            <button class="button" onclick="closeApp();">Close</button>
        </div>
    </div>
</body>
```

It's a pretty basic HTML code. A brief explanation of the above file:

- Line(6~7) : Call JavaScript functions using `onclick` event.

### webapp-test.js

In this file, `openApp()` function calls `launch` method and `closeApp()` calls `close` method using [WebOSServiceBridge API]({{< relref "webosservicebridge-api-reference" >}}). The usage of WebOSServiceBridge API is very similar in both functions, so I'll explain the `openApp()` function only.

{{< note >}}
For more details on `launch` and `close`, see [com.webos.service.applicationmanager API]({{< relref "com-webos-service-applicationmanager" >}}).
{{< /note >}}

``` js {linenos=table}
function openApp(){
    var bridge = new WebOSServiceBridge();

    var url = 'luna://com.webos.service.applicationmanager/launch';
    var params = '{"id":"com.webos.app.test.youtube", "params": {"displayAffinity": 1}}';

    bridge.call(url, params);
}
```

A brief explanation of the above file:

- Line(2) : Creates a `WebOSServiceBridge` object.
- Line(4~5) : Defines parameters for a LS2 API.
- Line(7) : Calls a LS2 API with predefined parameters (`url`, `params`). You can use various LS2 APIs by changing parameters of `bridge.call` function.

{{< note >}}
For more information about other LS2 APIs, see [LS2 API Index]({{< relref "ls2-api-index" >}}).
{{< /note >}}