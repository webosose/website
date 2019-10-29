---
title: Web App Lifecycle
date: 2018-10-28
weight: 20
toc: true
---

This topic describes web app lifecycle in webOS Open Source Edition (OSE).

## Managing App State Changes

Web apps can be launched, suspended or terminated by user interactions or system events. Web apps can be in one of the following states: **Not Launched**, **Launched** (Foreground), **Suspended** (Background).

 {{< figure src="/images/docs/guides/core-topics/app-management/webos-ose-web-app-lifecycle-20180316.png" alt="" caption="Web app lifecycle" width="700px" >}}

  - **Not Launched**: A web app has not been launched or has been terminated.

      - A web app can be launched by the following actions:

          - Clicking on an app icon

          - Using `ares-launch` command of Command-Line Interface (CLI)

          - Calling `launch` method of Application Manager on LS2 API

      - A launched app or suspended app can be terminated by the following actions:

          - Launching another app when the `keepAlive` property of the current app is set to `false`

          - Using the CLI command `ares-launch --close`

          - Calling `closeByAppId` method of Application Manager on LS2 API

  - **Launched**: A web app is running in the foreground and listening for events (`webOSRelaunch`, `visibilitychange`). The app can be terminated or suspended at any time.

  - **Suspended**: A web app is suspended in the background and listening for events (`webOSRelaunch`, `visibilitychange`).

      - A web app in the background can be re-launched by the following actions:

          - Clicking on an app icon of the suspended app

          - Using the CLI command `ares-launch` for the suspended app

          - Calling `launch` method of Application Manager on LS2 API for the suspended app

      - The running app is suspended only in the following case:

          - The running web app whose `keepAlive` property is set to `true` is suspended after a new app is launched.

{{< note >}}
In webOS OSE, except the case above, the running app is terminated when a new app is launched.
{{< /note >}}

## Launching an App

A web app is launched using the Application Manager ([`com.webos.service.applicationmanager`]({{< relref "com-webos-service-applicationmanager" >}})) service. The Application Manager service can be invoked by:

  - The Launcher

  - Any type of app

  - A service or a custom JavaScript service running on the device

  - Using the CLI command `ares-launch`

## Handling an App Launch

webOS OSE fires the `webOSLaunch` event when it launches an app in Not Launched state. When the `webOSLaunch` event is handled, any parameters that may have been supplied by the launch process are passed to the app.

A `webOSLaunch` event is fired by:

  - Clicking on an app icon

  - Using the CLI command `ares-launch`

  - Calling `launch` method of Application Manager on LS2 API

Then, the app is launched and runs in the foreground.

## Handling an App Re-launch

If the app is already running, webOS OSE prevents it from being launched again. Instead, webOS OSE fires a `webOSRelaunch` event. When the `webOSRelaunch` is handled, any parameters that may have been supplied by the launch process are passed to the app.

A `webOSRelanunch` event is fired by:

  - Clicking on an app icon of the suspended app

  - Using the CLI command `ares-launch`

  - Calling `launch` method of Application Manager on LS2 API

Whenever a web app is re-launched, webOS OSE will fire a `webOSRelaunch` event. webOS OSE will display the app in the full-screen mode in the foreground immediately after the `webOSRelaunch` event occurs.

Web apps can add an event listener to handle the `webOSLaunch` or `webOSRelaunch` event. When a specified event occurs, the function will receive a notification and handle the event. And the added event listener receives event parameter which holds launch parameters.

{{< highlight javascript >}}
// webOSLaunch event
document.addEventListener('webOSLaunch', function(inData) {
    // Check the received parameters
    console.log(JSON.stringify(inData.detail);

    // Do something in the foreground
    ...
}, true);

// webOSRelaunch event
document.addEventListener('webOSRelaunch', function(inData) {
    // Check the received parameters
    console.log(JSON.stringify(inData.detail);

    // Do something in the foreground
    ...
}, true);
{{< /highlight >}}

{{< note >}}
In case of the suspended app, the current instance of the app is killed, and a new instance is launched with the new parameters.
{{< /note >}}

## Managing App Visibility

An app, once launched, can be either visible or hidden based on user interactions or system events. An app is suspended when it is hidden. An app can be hidden by any of the following actions:

  - Launching another app when the `keepAlive` property of the current app is set to `true`

Also, an app can be visible by any of the following actions:

  - An app icon of the app in Not Launched or Suspended state is clicked

The `visibilitychange` event will be fired when a web app changes from visible to hidden or vice versa. The app can have an event listener to manage the actions for its visibility status.

The sample code below shows how to add an event listener in webOS OSE.

{{< highlight javascript >}}
document.addEventListener ('visibilitychange', function() {
    if (document.hidden)
       doHiddenCleanup();
    else
        doShowingTasks();
}, true);
{{< /highlight >}}

## Terminating an App

Apps in the Launched or Suspended state can be terminated by:

  - Launching another app when the `keepAlive` property of the current app is set to `false`

  - Using the CLI command `ares-launch --close`

  - Calling `closeByAppId` method of Application Manager on LS2 API
