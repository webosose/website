---
title: Downloadable JS Services
display_title: Developing Downloadable JS Services
date: 2024-09-10
weight: 10
toc: true
---

A **downloadable JavaScript (JS) service** is a 3rd party JS service that can be installed on the webOS target device.

{{< note "Downloadable vs. Built-In" >}}
In webOS OSE, apps and services are divided into two categories: downloadable and built-in.

- **Downloadable** apps/services are installed by appinstalld service. This service automatically generates several configurations for the apps/services. (such as trust level)
- **Built-in** apps/services are built and installed by developers. Developers can **customize** configurations to suit their needs.
{{< /note >}}

This tutorial shows a step-by-step guide for creating a downloadable JS service from scratch.

## Prerequisites

Before you begin, you must install the [Command-Line Interface (CLI)](https://github.com/webos-tools/cli).

The CLI enables you to create, install, and launch apps or services using in a command-line environment.

{{< note >}}
If you already installed Node.js & CLI and registed your target device, you can skip this section.
{{< /note >}}

1. Install [Node.js](https://nodejs.org/en/download) (Recommended version: v16.20.2).
2. Install the CLI.

    ``` bash
    sudo npm install -g @webos-tools/cli
    ```

3. Change the profile.

    ``` bash
    ares-config --profile ose
    ```

4. After installing the CLI, you must register your target device. Enter the `ares-setup-device` command to start an interactive mode:

    {{< note >}}
    In the interactive mode, pressing the **Enter** key means to use the default value.
    {{< /note >}}

    ``` bash
    document@document:~$ ares-setup-device
    name                deviceinfo                connection  profile
    ------------------  ------------------------  ----------  -------
    emulator (default)  developer@127.0.0.1:6622  ssh         ose
    
    
    ** You can modify the device info in the above list, or add new device.
    ? Select add                             # Select 'add'.
    ? Enter Device Name: webos               # The nickname of your target device. Use the short name.
    ? Enter Device IP address: 127.0.0.1     # The IP address of your target device
    ? Enter Device Port: 22                  # Just press the Enter key. Do not change this value.
    ? Enter ssh user: root                   # Just press the Enter key. Do not change this value.
    ? Enter description: new device          # Descriptions about your target device
    ? Select authentication password         # Select 'password'
    ? Enter password: [hidden]               # Leave it blank (Press the Enter key).
    ? Set default ? No                       # Enter 'y' if you want to set this device as the default device.
    ? Save ? Yes                             # Enter 'Yes'.
    
    name                deviceinfo                connection  profile
    ------------------  ------------------------  ----------  -------
    webos                root@127.0.0.1:22        ssh         ose
    emulator (default)  developer@127.0.0.1:6622  ssh         ose
    ```

## Step 01. Creating a Dummy App and Service

Let's get started by creating a dummy app and service from templates. CLI provides various templates for webOS apps and services.

### App

webOS OSE's service requires an app to be packaged with. In this tutorial, we will use a web app.

Enter the following command:

``` bash
# Comannd format
# ares-generate -t <TEMPLATE TYPE> <YOUR APP NAME>
ares-generate -t webapp sampleApp
```

{{< note >}}
For more details about CLI commands, refer to [CLI User Guide]({{< relref "cli-user-guide" >}}).
{{< /note >}}

### JS Service

Enter the following command:

``` bash
# Comannd format
# ares-generate -t <TEMPLATE TYPE> <YOUR SERVICE NAME>
ares-generate -t js_service sampleService
```

If the command succeeds, the following directory will be generated under the current directory:

```
sampleService/
|---- helloclient.js
|---- helloworld_webos_service.js
|---- package.json
|---- services.json
```

Descriptions for each file are as follows:

| File | Description |
| ---- | ----------- |
| helloclient.js | A sample service that subscribes to the `helloworld_webos_service.js` service. This sample shows how services communicate with each other. |
| helloworld_webos_service.js | A sample service that provides several simple methods |
| package.json | Configuration file for [NPM](https://www.npmjs.com/). See also [Creating a package.json file \| npm Docs](https://docs.npmjs.com/getting-started/using-a-package.json). |
| index.html | The main page of the web app |

## Step 02. Packaging the Service

To install the service, you have to package the service with an app first.

Enter the following command:

``` bash
# Command format
# ares-package <APP DIRECTORY> <SERVICE DIRECTORY>
ares-package sampleApp sampleService
```

If the command succeeds, an `.ipk` file will be generated under the current directory.

``` bash
# Generated .ipk file
# com.domain.app is an ID of the dummy app
com.domain.app_1.0.0_all.ipk
```

## Step 03. Installing the Service

It's time to install your package to the target device.

Enter the following command:

``` bash
# Command format
# ares-install --device <TARGET DEVICE> <PACKAGED APP>
ares-install --device webos com.domain.app_1.0.0_all.ipk
```

## Step 04. Testing the Service

You can check whether the service is running or not.

Enter the following command:

``` bash
# Command format
# ares-shell -r "luna-send -n 1 -f luna://<SERVICE NAME>/<METHOD NAME> '<PARAMETERS>'" --device <TARGET DEVICE>
ares-shell -r "luna-send -n 1 -f luna://com.domain.app.service/hello '{\"name\":\"webOS\"}'" --device webos
```

In the above command, 

- `<SERVICE NAME>` is the service name defined in `services.json` and `package.json`.
- `<METHOD NAME>` is one of the method's names defined in the main service file.
- `<PARAMETERS>` is a JSON string containing the method's input parameters.
- `<TARGET DEVICE>` is the nickname of the target device set by `ares-setup-device`.

If the command succeeds, the target device returns the following message:

``` bash
# Return
{
    "returnValue": true,
    "Response": "Hello, webOS!"
}
```

Since this JS service is dynamic, it will be terminated automatically after a certain amount of time (5 seconds). For more information about the dynamic service, see [Static and Dynamic Services]({{< relref "native-service-overview#static-and-dynamic-services" >}}).

## Debugging the Service

Node’s Inspector is used to debug a JS service.

By communicating with it on the host machine, Node’s Inspector lets you observe variable values and control JavaScript execution. 

{{< note >}}
- Please do not be confused with the legacy node-inspector, which has been deprecated as of Node 7.7.0. See [Legacy Debugger | Node.js](https://nodejs.org/en/docs/guides/debugging-getting-started/#legacy-debugger) for details.
- For more information on Node.js debugging using the Inspector, refer to the [Debugging Guide | Node.js](https://nodejs.org/en/docs/guides/debugging-getting-started/).
{{< /note >}}

To start the Inspector on a webOS device, use the `ares-inspect` command. For detailed usage of the command, see [ares-inspect]({{< relref "cli-user-guide#ares-inspect" >}}).

``` bash
# Command format
# ares-inspect --device <TARGET DEVICE> --service <SERVICE NAME>
ares-inspect --device webos --serivce com.domain.app.service
```

If the command succeeds, a URL for Node's Inspector will be returned. 

``` bash
ares-inspect --device webos --service com.domain.app.service
 
[Info] Set target device : rpir
To debug your service, set "127.0.0.1:63532" on Node's Inspector Client(Chrome DevTools, Visual Studio Code, etc.).
```

To start the debugging window, you need a client tool to connect to the Inspector. For a list of tools that can connect to Node’s Inspector, see [Inspector Clients | Node.js](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients).

In this tutorial, we will use the [Chrome DevTools](https://developer.chrome.com/docs/devtools/overview) as the client tool.

1. Copy the URL in the above return.
2. Open the Chrome browser.
3. Go to '**chrome://inspect**' and do the followings:

    {{< figure src="/images/docs/tutorials/js-services/chrome-inspect-setup.png" >}}

4. Click **inspect**.

    {{< figure src="/images/docs/tutorials/js-services/inspect-button.png" >}}

    Then, the debugging window will be displayed.

    {{< figure src="/images/docs/tutorials/js-services/launched-debugging-window.png" >}}

## Appendix. Code Explanation

This section explains the sample source codes in this tutorial.

### helloclient.js

`helloworld_webos_service.js` shows a typical way to call a service on webOS.

``` js {linenos=table}
const Service = require('webos-service');
 
const service = new Service("com.example.helloclient"); // Register com.example.helloworld
 
console.log("simple call");
// Change @SERVICE-NAME@ to real service name
service.call("luna://@SERVICE-NAME@/hello", {}, function(message) {
    console.log("call @SERVICE-NAME@/hello");
    console.log("message payload: " + JSON.stringify(message.payload));
    const sub = service.subscribe("luna://@SERVICE-NAME@/heartbeat", {subscribe: true});
    const max = 10;
    let count = 0;
    sub.addListener("response", function(msg) {
        console.log(JSON.stringify(msg.payload));
        if (++count >= max) {
            sub.cancel();
            setTimeout(function() {
                console.log(max+" responses received, exiting...");
                process.exit(0);
            }, 1000);
        }
    });
});
```

A brief explanation of the above file:

- Line (1): Loads the `webos-service` module.
- Line (3): Registers the service.
- Line (7-21): Calls methods that are defined in `helloworld_webos_service.js`.

### helloworld_webos_service.js

`helloworld_webos_service.js` shows a typical way to register a service on webOS. For more details, see [webos-service Library API Reference]({{< relref "webos-service-library-api-reference" >}}).

``` js

const pkgInfo = require('./package.json');
const Service = require('webos-service');    // webos-service module provides an interface for the webOS system bus.
                                             // The interface is wrapped in a familiar Node.js idiom.
 
const service = new Service(pkgInfo.name);   // Create service by service name on package.json
const logHeader = "[" + pkgInfo.name + "]";
 
...
 
// The hello method returns "Hello, <name>!" to the client
service.register("hello", function(message) {
    console.log(logHeader, "SERVICE_METHOD_CALLED:/hello");
    console.log("In hello callback");
    const name = message.payload.name ? message.payload.name : "World";
 
    message.respond({
        returnValue: true,
        Response: "Hello, " + name + "!"
    });
});
 
...
```

### services.json

`services.json` stores the metadata of the service.

``` json
{
  "id": "com.domain.app.service",         // An ID of the "services" array. Typically, this value is the "name" of the first object of the "services" array.
  "description": "HelloWorld Service",
  "services": [
    {
      "name": "com.domain.app.service"   // A unique identifier of the service.
                                         // This value MUST START with the app ID, which is packaged with the service.
                                         // For example, if the app ID is com.domain.app, the service ID must start with com.domain.app.xxx. (e.g., com.domain.app.service)
    }
  ]
}
```

{{< note >}}
See also [services.json]({{< relref "services-json" >}}).
{{< /note >}}

### package.json

`package.json` contains information for packaging.

``` json
{
  "name": "com.domain.app.service",             // A unique identifier of the service. This is the same value as the "name" in services.json.
  "version": "1.0.0",
  "description": "Helloworld service",
  "main": "helloworld_webos_service.js",        // The main JS file for this service
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "BSD"
}
```

{{< note >}}
See also [Creating a package.json file | npm Docs](https://docs.npmjs.com/getting-started/using-a-package.json).
{{< /note >}}
