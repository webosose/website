---
title: Using LS2 API in Web Apps
date: 2021-10-22
weight: 30
toc: true
---

To utilize the platform capabilities in your web app, you can use [LS2 API]({{< relref "ls2-api-index" >}}).

This page describes how to use LS2 API in your web app, with an example of the following dummy service and method:

* Service name: `com.webos.service.<required_service>`
* Method name: `<method_to_call>`

## Call LS2 API Methods

Depending on the platform version, a different API or library is used in order to call LS2 API.

This section describes how you can call LS2 API methods by platform version.

  - [webOS OSE 2.0 or higher](#webos-ose-2-0-or-higher)
  - [webOS OSE 1.x](#webos-ose-1-x)

{{< note >}}
The Enact framework includes a webOS support module for interfacing with LS2. To call LS2 API in the Enact framework, please refer to the [Luna Service API](https://enactjs.com/docs/developer-guide/webos/luna-service-api/) in the Enact documentation.
{{< /note >}}

### webOS OSE 2.0 or higher

webOS OSE 2.0 or higher provides **WebOSServiceBridge**, a built-in JavaScript API for web apps to access Luna Bus.

You can use the WebOSServiceBridge API to call LS2 API methods in your web app.

For detailed information on how to use the API, see the [WebOSServiceBridge API reference]({{< relref "webosservicebridge-api-reference" >}}).

### webOS OSE 1.x

On webOS OSE 1.x, using the **webOS library** lets you call LS2 API methods in your web app.

For details on how to prepare the webOS library, see the [Appendix](#appendix-preparing-webos-libarary-for-webos-ose-1-x).

After including the webOS library, use the `webOS.service.request` method as below in order to call LS2 API.

``` javascript
var subscriptionStatus = true; //change this to false to disable subscription

var request = webOS.service.request("luna://com.webos.service.<required_service>/", {
    method:"<method_to_call>",
    parameters: {
        foo:"bar"
    },
    onSuccess: function(inResponse) {
        //....
    },
    onFailure: function(inError) {
        //....
    },
    subscribe: subscriptionStatus
});
```

## Identify the ACG Group of the Methods

You need to identify the ACG (Access Control Groups) information for the methods being used.

Find out the ACG information using the [`ls-monitor`]({{< relref "ls-monitor" >}}) command with the `-i` option.

```bash
$ ls-monitor -i com.webos.service.<required_service>

METHODS AND SIGNALS REGISTERED BY SERVICE 'com.webos.service.<required_service>' WITH UNIQUE NAME '********' AT HUB
  "/":
...
      "<method_to_call>": {"provides:["group1","group2"]}
...
```

## Specify the Permissions for Using the Methods

In your web app project, add the `requiredPermissions` property to the `appinfo.json` file and specify the ACG information of the methods on the property.

{{< code "appinfo.json" true >}}
```json
{
    ...
    "requiredPermissions": ["group1", "group2"],
    ...
}
```
{{< /code >}}

## What's Next

You need to iterate the steps above for each LS2 API method used in your web app.

After you finish implementing the web app, proceed with the rest of the [development process]({{< relref "web-app-development-workflow" >}}) to build and run your app.

## Appendix: Preparing webOS libarary for webOS OSE 1.x

In webOS OSE 1.x, the webOS library (`webOS.js`) is required in order to call LS2 API method from a web app.

{{< note >}}
If you create a web app using the "basic" template of the [Command-Line Interface (CLI)]({{< relref "cli-user-guide" >}}) tool, the web app will already contain the webOS library in its `webOSjs-0.1.0` directory and have the library included in the `index.html` file. In this case, you don't need to add additional code to import the library, so you can safely skip this step.
{{< /note >}}

To include the library in a web app, follow the steps below:

1.  Download the webOS library file from [webOSjs-0.1.0.zip](https://rpwebosose.s3.ap-southeast-2.amazonaws.com/tools/webOSjs-0.1.0.zip) and decompress it to the project root directory. The following directory will be created:

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
