---
title: Developing External JS Services
date: 2018-10-15
weight: 10
toc: true
---

External JS services must be packaged in a web app. Therefore, before creating a JS service, make sure you have a web app to package with the external JS service. If such a web app is not available, create a web app as described in [Creating Web Apps]({{< relref "developing-external-web-apps#creating-web-apps" >}}).

## Creating JS Services

JS services can be created and deployed using CLI commands that are provided by webOS OSE SDK. This topic describes the steps to create an external JS service. For detailed information on the commands, see [Command-Line Interface]({{< relref "cli-user-guide" >}}).

Once you generate the service, JS service directory should be configured as below.

{{< figure src="/images/docs/tutorials/js-services/js-service-directory-structure.png" caption="JS service directory structure" >}}

- **APP_DIR**: Directory of the web app.
- **SERVICE_DIR**: Directory of the service. This directory will include sub-directories of the services that are included in the web app.

Developing an external JS service requires the following steps:

* [Step 1: Project creation](#step-1-create-a-js-service-project)
* [Step 2: Implementation](#step-2-implement-the-js-service)
* [Step 3: Configuration](#step-3-configure-the-js-service)
* [Step 4: Packaging](#step-4-package-the-js-service)
* [Step 5: Installation](#step-5-install-the-js-service)

### Step 1: Create a JS Service Project

Start by creating a project using the available JS service template.

To create a basic JS service, execute the following command:

``` bash
$ ares-generate -t js_service sampleService
```

In the above command:

  - `js_service` is the name of the template that creates a basic JS service.
  - `sampleService` is the JS service directory which is created in the current directory.

{{< note >}}
When prompted to enter the service name, make sure the service name begins with the app ID. If you do not follow this naming rule, the service packaging does not work normally. So, for example:

* If web app ID is `com.domain.app`
* Then, service name must be `com.domain.app.myservice`
{{< /note >}}

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
<td><p>Configuration file of NPM. For details, see <a href="https://docs.npmjs.com/getting-started/using-a-package.json" target="_blank">https://docs.npmjs.com/getting-started/using-a-package.json</a>.</p></td>
</tr>
<tr class="even">
<td><p>services.json</p></td>
<td><p>Configuration file that defines what commands the service provides on the webOS bus.</p></td>
</tr>
</tbody>
</table>
</div>

### Step 2: Implement the JS Service

Service implementation files provide various use cases of JS service.

Before registering a service into your code, you should load the `webos-service` module. The `webos-service` module for Node.js provides an interface to the system bus, wrapped in familiar Node.js idioms.

This loads the `webos-service` module.

``` javascript
var Service = require('webos-service');
```

The following JavaScript example registers a service (`luna://com.domain.app.myservice/hello`) which responds to a request with a "Hello, World!" message.

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

A 'package.json' file configures the service metadata and points to the main service file. This file is needed for packaging (related with Node.js).

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

There are quite a few other values one can set in the `package.json` file. For the complete specification of the `package.json`, see [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json).

#### services.json

A 'services.json' file defines the services that must be registered on the Luna Bus. The methods of these services can be called from other apps and services. For more information, see [services.json]({{< relref "services-json" >}}).

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
If the JS service uses methods of external services, you must add the group information of the external methods to the `requiredPermission` field in `appinfo.json` of the web app used for packaging the JS service. See [Configuring the Web App]({{< relref "developing-external-web-apps#step-3-configure-the-web-app" >}}) for details.
{{< /note >}}

### Step 5: Install the JS Service

The JS service must be installed along with the web app.

For details on packaging the web app, see [Installing the Web App]({{< relref "developing-external-web-apps#step-5-install-the-web-app" >}}).

{{< note "About launching the JS service" >}}
Because external JS services are installed as a dynamic service type, the service becomes active only when another application or service use the service by calling its method. If its method has been called as subscription, the service remains active without exiting. If the service is not used, it exits after 5 seconds. For more information on the 5-second timeout, see [FAQ]({{< relref "js-service-faq" >}}).
{{< /note >}}

## Debugging JS Services

You can use the Node Inspector to debug JS services by monitoring the run-time status of a JS service that is running on a target device. The Node Inspector allows you to observe the values of variables and to control JavaScript execution. For more information about Node Inspector, refer to the [GitHub of Node Inspector](https://github.com/node-inspector/node-inspector).

To launch the Node inspector on a webOS OSE device, you must execute the `ares-inspect` command while the JS service is running. For detailed information on the command, see [ares-inspect]({{< relref "cli-user-guide#ares-inspect" >}}).

 **General Usage**:

``` bash
$ ares-inspect --device <TARGET_DEVICE> --service <SERVICE_ID> --open
```

This loads the Node Inspector in your default browser as shown below:

{{< figure src="/images/docs/tutorials/js-services/node-inspector-screenshot.png" caption="Node Inspector screenshot" width="700px" >}}

{{< note >}}
Node Inspector works only in Blink-based web browsers such as Chrome and Opera. If another browser (e.g., Safari or Internet Explorer) is set as your default web browser, you must re-open the inspector page in a Blink-based web browser.
{{< /note >}}
