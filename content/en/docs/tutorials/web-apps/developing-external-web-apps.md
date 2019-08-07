---
title: Developing External Web Apps
date: 2018-11-26
weight: 10
toc: true
---

External web apps are 3rd party web apps that must be installed on the webOS target device. External web apps can be created and deployed using the Command-Line Interface (CLI) tool that are provided by the webOS Open Source Edition (OSE) SDK.

This page describes the steps to develop an external web app using CLI. For detailed information on the commands used in this tutorial, see [CLI commands]({{< relref "cli-user-guide#cli-commands" >}}).

{{< note >}}
If you want to add a JS service to your web app, see [Creating JS Services]({{< relref "developing-external-js-services#creating-js-services" >}}).
{{< /note >}}

## Creating Web Apps

Developing an external web app requires the following steps:

* [Step 1: Project creation](#step-1-create-a-web-app-project)
* [Step 2: Implementation](#step-2-implement-the-web-app)
* [Step 3: Configuration](#step-3-configure-the-web-app)
* [Step 4: Packaging](#step-4-package-the-web-app)
* [Step 5: Installation](#step-5-install-the-web-app)
* [Step 6: Launch](#step-6-launch-the-web-app)

### Step 1: Create a Web App Project

Start by creating a project using one of the available web app templates. These templates provide a starting point for developing the web app.

To create a basic web app, execute the following command:

``` bash
$ ares-generate -t basic sampleApp
```

In the above command:

- `basic` is the name of template that creates a basic web app.
- `sampleApp` is the web app directory which is created in the current directory.

The web app directory (`sampleApp`) has the following directory and files:

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>Directory / File</strong></p></th>
<th><p><strong>Description</strong></p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>webOSjs-0.1.0</p></td>
<td><p>webOS library directory to call LS2 API.</p></td>
</tr>
<tr class="even">
<td><p>appinfo.json</p></td>
<td><p>Configuration file that includes metadata for the web app.</p></td>
</tr>
<tr class="odd">
<td><p>icon.png</p></td>
<td><p>The icon image file. Can be replaced with a relevant icon.</p></td>
</tr>
<tr class="even">
<td><p>largeIcon.png</p></td>
<td><p>The large icon image file. Can be replaced with a relevant icon.</p></td>
</tr>
<tr class="odd">
<td><p>index.html</p></td>
<td><p>Web application main page. This page only shows "Hello World" text on the screen.</p></td>
</tr>
</tbody>
</table>
</div>

{{< note >}}
If you already have an existing web app that you want to deploy on a webOS OSE device, you must add the `appinfo.json` file to the app root directory. To create this file, enter the following CLI command:

``` bash
$ ares-generate -t webappinfo webApp
```

See Step 3 below for more information on the `appinfo.json` file.
{{< /note >}}

### Step 2: Implement the Web App

Design and implement the source code for the web app.

By default, the basic web app template includes some basic code that prints a "Hello World" message. Therefore, if you want to create a demo web app to test this process, you can skip this step and proceed.

{{< note >}}
If you want to use a webOS service in the web app, check the information and sample code provided in the [Implement the Web App]({{< relref "developing-built-in-web-apps#step-1-implement-the-web-app" >}}) section in "[Developing Built-in Web Apps]({{< relref "developing-built-in-web-apps" >}})".
{{< /note >}}

### Step 3: Configure the Web App

The details or metadata of the web app must be specified in the `appinfo.json` file. This file is automatically created when you create a web app project. For details, see [appinfo.json]({{< relref "appinfo-json" >}}).

CLI provides the `appinfo.json` file template as below.

``` json
{
    "id": "com.domain.app",
    "version": "0.0.1",
    "vendor": "My Company",
    "type": "web",
    "main": "index.html",
    "title": "new app",
    "icon": "icon.png",
    "largeIcon": "largeIcon.png",
    "requiredPermissions": ["time", "settings.read", "activities.manage"]
}
```

{{< note >}}
If you are packaging a JS service within the web app and the JS service uses methods of external services, you must add the group information of the external methods used by the JS service to the `requiredPermission` field in `appinfo.json`.
{{< /note >}}

### Step 4: Package the Web App

After implementing and configuring the web app, it must be packaged as an IPK file. Make sure the `appinfo.json` file is available, because it is required when packaging a web app for webOS OSE.

To package the web app, use the `ares-package` command. The IPK file is generated in the current directory.

**General usage:**

``` bash
$ ares-package <APP_DIR> [<SERVICE_DIR>]
```

In the above command, `<APP_DIR>` and `<SERVICE_DIR>` mean app and service directories respectively. You can use an absolute or relative path for both `<APP_DIR>` and `<SERVICE_DIR>`.

**Sample usage:**

- Packaging web app only (relative path):
    - Windows: `ares-package sampleApp`
    - Linux/macOS: `ares-package ./sampleApp`
- Packaging web app with one JS service (relative path):
    - Windows: `ares-package sampleApp sampleService`
    - Linux/macOS: `ares-package ./sampleApp ./sampleService`
- Packaging web app with multiple JS services (relative path):
    - Windows: `ares-package sampleApp sampleService sampleServiceNew`
    - Linux/macOS: `ares-package ./sampleApp ./sampleService ./sampleServiceNew`
- Packaging web app with JS service (absolute path)
    - Windows: `ares-package c:\samples\sampleApp c:\samples\sampleService`
    - Linux/macOS: `ares-package ~/samples/sampleApp ~/samples/sampleService`

### Step 5: Install the Web App

Before installing the app, you need to add the webOS OSE target device to the list of registered devices using the `ares-setup-device` command. For more information, see [ares-setup-device]({{< relref "cli-user-guide#ares-setup-device" >}}). Skip this step if the target device is already present in the list.

- To get a list of target devices only, use the command: `ares-setup-device -list`
- To get a list of target device with all properties, use the command: `ares-setup-device -listfull`

{{< caution >}}
Make sure the webOS OSE target device is running during the installation.
{{< /caution >}}

To install the web app on the target device, execute the following command:

``` bash
$ ares-install --device <TARGET_DEVICE> ./com.domain.app_0.0.1_all.ipk
```

In the above command:

- `<TARGET_DEVICE>` is the name of the target device.
- `./com.domain.app_0.0.1_all.ipk` is the name of the IPK file that is generated after packaging the app in the previous step.

To verify the installation, check if the web app ID (in this case, `com.domain.app`) is available in the output of the following command:

``` bash
$ ares-install --device <TARGET_DEVICE> --list
```

{{< note >}}
To remove the app from the device, use the `ares-install` command as follows:

``` bash
$ ares-install --device <TARGET_DEVICE> --remove com.domain.app
```
{{< /note >}}

### Step 6: Launch the Web App

To launch the web app on the target device, execute the following command:

``` bash
$ ares-launch --device <TARGET_DEVICE> com.domain.app
```

In the above command:

- `<TARGET_DEVICE>` is the name of the target device. This is the same device on which the app was installed in the previous step.
- `com.domain.app` is the app ID that is available after installing the app.

After executing the above command, check the target device to see if the app is running.

{{< note >}}
To close the app, use the `ares-launch` command as follows:

``` bash
$ ares-launch --device <TARGET_DEVICE> --close com.domain.app
```
{{< /note >}}

## Debugging Web Apps

You can use the Web Inspector to debug web apps by monitoring the run-time status of the web app running on a target device. The Web Inspector allows you to control JavaScript execution, inspect the CSS and HTML code of the web pages, and monitor the usage of resources.

Web Inspector is based on Chrome DevTools. Refer to [Google Developers](http://developers.google.com/chrome-developer-tools/) for the detailed description of how to use Chrome DevTools. Note that older versions of Google Chrome may not support Web Inspector.

### Launching the Web Inspector

To launch the Web Inspector on a webOS OSE device, execute the `ares-inspect` command while the web app is running. For detailed information on the command, see [ares-inspect]({{< relref "cli-user-guide#ares-inspect" >}}).

**General Usage:**

``` bash
$ ares-inspect --device <TARGET_DEVICE> --app <APP_ID> --open
```

This loads the Web Inspector in your default browser as shown in the following screenshot:

{{< figure src="/images/docs/tutorials/web-apps/web-inspector-new.png" caption="Web Inspector screenshot" >}}

{{< note >}}
Web Inspector works only in Blink-based web browsers such as Chrome and Opera. If another browser (e.g., Safari or Internet Explorer) is set as your default web browser, you must re-open the inspector page in a Blink-based web browser.
{{< /note >}}

### Testing a Local Web App

The `ares-server` command can run a web server based on a given app directory. A web browser has some restrictions related to security policy, on accessing local files (same-origin policy). For this reason, this command provides a simple web server to bypass the security policy of browsers. For detailed information on the command, see [ares-server]({{< relref "cli-user-guide#ares-server" >}}).

To start the web server on your app directory, execute the following command:

``` bash
$ ares-server ./sampleApp

Local server running on http://localhost:7496
```

This command starts the web server and gives a URL which you can use to open the app. Alternatively, if you want the command to directly open the URL on the default browser, execute the following command:

``` bash
$ ares-server ./sampleApp --open
```

{{< note >}}
To terminate the web server, press **Control+C** on the shell prompt.
{{< /note >}}
