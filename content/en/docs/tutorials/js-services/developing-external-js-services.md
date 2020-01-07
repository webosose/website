---
title: Developing External JS Services
date: 2020-01-06
weight: 10
toc: true
---
External JS services are 3rd party JS services that must be installed on the webOS target device. External JS services can be created and deployed using the Command-Line Interface (CLI) tool that are provided by the webOS Open Source Edition (OSE) SDK.

External JS services must be packaged in a web app. Therefore, before creating a JS service, make sure you have a web app to package with the external JS service. If such a web app is not available, create a web app as described in [Creating Web Apps]({{< relref "developing-external-web-apps#creating-web-apps" >}}).

This page describes the steps to develop an external JS service using CLI. For detailed information on the commands used in this tutorial, see [CLI commands] ({{< relref "cli-user-guide#cli-commands" >}}).

## Creating JS Services

Developing an external JS service requires the following steps:

* [Step 1: Create a JS Service](#step-1-create-a-js-service)
* [Step 2: Implement the JS Service](#step-2-implement-the-js-service)
* [Step 3: Configure the JS Service](#step-3-configure-the-js-service)
* [Step 4: Package the JS Service](#step-4-package-the-js-service)
* [Step 5: Install the JS Service](#step-5-install-the-js-service)
* [Step 6: Run the JS Service](#step-6-run-the-js-service)

### Step 1: Create a JS Service

Start by creating a JS service using the available JS service template.

To create a basic JS service, execute the following command:

``` bash
$ ares-generate -t js_service sampleService
```

In the above command:

  - `js_service` is the name of the template that creates a basic JS service.
  - `sampleService` is the JS service directory which is created in the current directory.

The following shows an example directory structure of JS services packaged in a web app.

``` bash
sampleService
├── helloclient.js
├── helloworld_webos_service.js
├── package.json
└── services.json
```


The JS service directory (`sampleService`) has the following files:

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>File</strong></p></th>
<th><p><strong>Description</strong></p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>helloclient.js</p></td>
<td><p>Sample JS service which subscribes helloworld_webos_service.js service. This sample shows how to communicate between services.</p></td>
</tr>
<tr class="even">
<td><p>helloworld_webos_service.js</p></td>
<td><p>Sample JS service which provides several simple commands. These commands are specified in the services.json file.</p></td>
</tr>
<tr class="odd">
<td><p>package.json</p></td>
<td><p>Configuration file of NPM. For details, see <a href="https://docs.npmjs.com/getting-started/using-a-package.json" target="_blank">Creating a package.json file</a> in the npm documentation.</p></td>
</tr>
<tr class="even">
<td><p>services.json</p></td>
<td><p>Configuration file that defines what commands the service provides on the webOS bus. See <a href="{{< relref "services-json" >}}">services.json</a> for details.</p></td>
</tr>
</tbody>
</table>
</div>

{{< note >}}
When prompted to enter the service name, make sure the service name begins with the app ID. If you do not follow this naming rule, the service packaging does not work normally. So, for example:

* If web app ID is `com.domain.app`
* Then, service name must be `com.domain.app.myservice`
{{< /note >}}

### Step 2: Implement the JS Service

Service implementation files provide various use cases of JS service.

Before registering a service into your code, you should load the `webos-service` module. The `webos-service` module for Node.js provides an interface to the system bus, wrapped in familiar Node.js idioms.

This loads the `webos-service` module.

``` javascript
var Service = require('webos-service');
```

The following JavaScript example registers a service which responds to a request with a "Hello, World!" message.

``` javascript
var service = new Service("com.domain.app.myservice");

service.register("Hello", function(message) {
    message.respond({
        Response: "Hello, World " + message.payload.name + "!"
    });
});
```

For more details about `webos-service` module, see [webos-service Library API Reference.]({{< relref "webos-service-library-api-reference" >}})

### Step 3: Configure the JS Service

#### package.json

A `package.json` file configures the service metadata and points to the main service file. This file is needed for packaging (related with Node.js).

A minimal `package.json` looks like this:

``` json
{
    "name": "com.domain.app.myservice",
    "main": "helloworld_webos_service.js"
}
```

A brief explanation of the above file:

- `name` - Specify the name of the service. The service name must begin with the web app ID. So, if web app ID is `com.domain.app`, the service name must be `com.domain.app.myservice`.

- `main` - Specify the name of the main service JavaScript file.

There are quite a few other values one can set in the `package.json` file. For the complete specification of the `package.json`, see the [npm documentation](https://docs.npmjs.com/files/package.json).

#### services.json

A `services.json` file defines the services that must be registered on the Luna Bus. The methods of these services can be called from other apps and services. For more information, see [services.json]({{< relref "services-json" >}}).

A `services.json` file looks like this:

``` json
{
    "id": "com.domain.app.myservice",
    "description": "Sample helloworld service",
    "services": [{
        "name": "com.domain.app.myservice",
        "description": "Sample helloworld service"
    }]
}
```

### Step 4: Package the JS Service

The JS service must be packaged along with the web app.

For details on packaging the web app, see [Packaging the Web App]({{< relref "developing-external-web-apps#step-4-package-the-web-app" >}}).

{{< note >}}
If the JS service uses methods of external services, you must add the group information of the external methods to the `requiredPermissions` field in `appinfo.json` of the web app used for packaging the JS service. See [Configuring the Web App]({{< relref "developing-external-web-apps#step-3-configure-the-web-app" >}}) for details.
{{< /note >}}

### Step 5: Install the JS Service

The JS service must be installed along with the web app.

For details on installing the web app, see [Installing the Web App]({{< relref "developing-external-web-apps#step-5-install-the-web-app" >}}).


### Step 6: Run the JS Service

If the JS service is successfully installed, you can try running the JS service on the target device.

To call the JS service, use the following command:

``` bash
root@raspberrypi4:/# luna-send -n 1 -f luna://com.domain.app.myservice/Hello '{"name":"webOS"}'
```

The response will be:

``` bash
{
    "Response": "Hello, World webOS",
    "returnValue": true
}
```

When `Hello` method of `com.domain.app.myservice` is called, the service adds `name`, the delivered parameter, at the end and returns the text.

Since this JS service is a dynamic service, it is run when called and terminated after a certain period of inactivity (5 seconds). For more information about dynamic service, see [Static and Dynamic Services]({{< relref "native-service-overview#static-and-dynamic-services" >}}).


## Debugging JS Services

To debug a JS service, Node's Inspector is used. (Not to be confused with the legacy _node-inspector_, which has been deprecated as of Node 7.7.0. See [Legacy Debugger](https://nodejs.org/en/docs/guides/debugging-getting-started/#legacy-debugger) for details.)

By communicating with the Inspector clients on the host machine, Node's Inspector lets you observe the values of variables and control the JavaScript execution. For more information on Node.js debugging using the Inspector, refer to the [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/).

To enable the Inspector on a webOS OSE device, use the `ares-inspect` command. For detailed usage of the command, see [ares-inspect](https://www.webosose.org/docs/tools/sdk/cli/cli-user-guide/#ares-inspect).

**General Usage:**

``` bash
$ ares-inspect --device <TARGET_DEVICE> --service <SERVICE_ID>
```

To start debugging the JS service, open a client tool, such as Chrome DevTools and Visual Studio Code, and connect to the Inspector. For a list of tools that can connect to Node's Inspector, see [Inspector Clients](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients).

The following shows an example screenshot of debugging with Chrome DevTools and Node's Inspector.

{{< figure src="/images/docs/tutorials/js-services/node-inspector-new.png"  link="/images/docs/tutorials/js-services/node-inspector-new.png" target="_blank" alt="" caption="Using Node's Inspector with Chrome DevTools" >}}
