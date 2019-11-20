---
title: Developing External QML Apps
date: 2019-11-06
weight: 10
toc: true
---

External QML apps are 3rd party QML apps that must be installed on the webOS target device. External QML apps can be created and deployed using the Command-Line Interface (CLI) tool that are provided by the webOS Open Source Edition (OSE) SDK.

This page describes the steps to develop an external QML app using CLI. For detailed information on the commands used in this tutorial, see [CLI commands]({{< relref "cli-user-guide#cli-commands" >}}).

## Creating QML Apps

Developing an external QML app requires the following steps:

  - [Step 1: Create a QML App](#step-1-create-a-qml-app)
  - [Step 2: Implement the QML App](#step-2-implement-the-qml-app)
  - [Step 3: Configure the QML App](#step-3-configure-the-qml-app)
  - [Step 4: Package the QML App](#step-4-package-the-qml-app)
  - [Step 5: Install the QML App](#step-5-install-the-qml-app)
  - [Step 6: Launch the QML App](#step-6-launch-the-qml-app)

### Step 1: Create a QML App

Start by creating a QML app using one of the available QML app templates. These templates provide a starting point for developing the QML app.

To create a basic QML app, execute the following command:

``` bash
$ ares-generate -t qmlapp sampleApp
```

In the above command:

  - `qmlapp` is the name of template that creates a basic QML app.
  - `sampleApp` is the QML app directory which is created in the current directory.

The QML app directory (`sampleApp`) has the following directory and files:

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
<td><p>appinfo.json</p></td>
<td><p>Configuration file that includes metadata for the QML app.</p></td>
</tr>
<tr class="even">
<td><p>icon.png</p></td>
<td><p>The icon image file. Can be replaced with a relevant icon.</p></td>
</tr>
<tr class="odd">
<td><p>largeIcon.png</p></td>
<td><p>The large icon image file. Can be replaced with a relevant icon.</p></td>
</tr>
<tr class="even">
<td><p>main.qml</p></td>
<td><p>QML application main page. This page only shows "Hello, QML Application!!" text on the screen.</p></td>
</tr>
</tbody>
</table>
</div>

If you already have an existing QML app that you want to deploy on a webOS OSE device, you must add the `appinfo.json` file to the app root directory. To create this file, enter the following CLI command:

``` bash
$ ares-generate -t qmlappinfo sampleApp
```

### Step 2: Implement the QML App

Design and implement the source code for the QML app.

By default, the basic QML app template includes some basic code that prints a "Hello, QML Application!!" message. Therefore, if you want to create a demo QML app to test this process, you can skip this step and proceed.

If you want to use a webOS service in the QML app, check the information and sample code provided in the [Implement the QML App] ({{< relref "developing-built-in-qml-apps#step-1-implement-the-qml-app" >}}) section in [Developing Built-in QML Apps]({{< relref "developing-built-in-qml-apps" >}}).

### Step 3: Configure the QML App

The details or metadata of the QML app must be specified in the `appinfo.json` file. This file is automatically created when you create a QML app. For details, see [appinfo.json] ({{< relref "appinfo-json" >}}).

CLI provides the `appinfo.json` file template as below.

{{< highlight json "linenos=table" >}}
{
    "id": "com.domain.app",
    "version": "1.0.0",
    "vendor": "My Company",
    "type": "qml",
    "main": "main.qml",
    "title": "QML App",
    "icon": "icon.png",
    "requiredPermissions" : ["time"]
}
{{< /highlight >}}

{{< note >}}
If you are packaging a JS service within the QML app and the JS service uses methods of external services, you must add the group information of the external methods used by the JS service to the `requiredPermissions` field in `appinfo.json`.
{{< /note >}}

### Step 4: Package the QML App

After implementing and configuring the QML app, it must be packaged as an IPK file. Make sure the `appinfo.json` file is available, because it is required when packaging a QML app for webOS OSE.

To package the QML app, use the `ares-package` command. The IPK file is generated in the current directory.

**General usage:**

``` bash
$ ares-package <APP_DIR> [<SERVICE_DIR>]
```

In the above command, `<APP_DIR>` and `<SERVICE_DIR>` mean app and service directories respectively. You can use an absolute or relative path for both `<APP_DIR>` and `<SERVICE_DIR>`. For details on using `ares-package`, see [ares-package] ({{< relref "cli-user-guide#ares-package" >}}).

**Sample usage:**

  - Packaging QML app only (relative path):
      - Windows: `ares-package sampleApp`
      - Linux/macOS: `ares-package ./sampleApp`

### Step 5: Install the QML App

Before installing the app, you need to add the webOS OSE target device to the list of registered devices using the `ares-setup-device` command. For more information, see [ares-setup-device] ({{< relref "cli-user-guide#ares-setup-device" >}}). Skip this step if the target device is already present in the list.

  - To get a list of target devices only, use the command: `ares-setup-device -list`
  - To get a list of target device with all properties, use the command: `ares-setup-device -listfull`

{{< caution >}}
Make sure the webOS OSE target device is running during the installation.
{{< /caution >}}

To install the QML app on the target device, execute the following command:

``` bash
$ ares-install --device <TARGET_DEVICE> ./com.domain.app_0.0.1_all.ipk
```

In the above command:

  - `<TARGET_DEVICE>` is the name of the target device.
  - `./com.domain.app_0.0.1_all.ipk` is the name of the IPK file that is generated after packaging the app in the previous step.

To verify the installation, check if the QML app ID (in this case, `com.domain.app`) is available in the output of the following command:

``` bash
$ ares-install --device <TARGET_DEVICE> --list
```

To remove the app from the device, use the `ares-install` command as follows:

``` bash
$ ares-install --device <TARGET_DEVICE> --remove com.domain.app
```

### Step 6: Launch the QML App

To launch the QML app on the target device, execute the following command:

``` bash
$ ares-launch --device <TARGET_DEVICE> com.domain.app
```

In the above command:

  - `<TARGET_DEVICE>` is the name of the target device. This is the same device on which the app was installed in the previous step.
  - `com.domain.app` is the app ID that is available after installing the app.

After executing the above command, check the target device to see if the app is running.

To close the app, use the `ares-launch` command as follows:

``` bash
$ ares-launch --device <TARGET_DEVICE> --close com.domain.app
```
