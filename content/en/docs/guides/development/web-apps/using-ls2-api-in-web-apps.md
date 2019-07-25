---
title: Using LS2 API in Web Apps
date: 2019-05-13
weight: 30
toc: true
---

You can use LS2 API within your web app to utilize the platform features.

This page describes how to use LS2 API within your web app, with an example of the following dummy service and method:

* Service name: `com.webos.service.<required_service>`
* Method name: `<method_to_call>`

## Before You Begin

To call LS2 API method from a web app, the webOS library (`webOS.js`) is required.

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

## Call LS2 API Methods

With the webOS library included, you can call LS2 API methods within your web app using the `webOS.service.request` method as shown in the following code snippet.

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
