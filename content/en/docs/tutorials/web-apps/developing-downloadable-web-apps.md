---
title: Downloadable Web Apps
display_title: Developing Downloadable Web Apps
date: 2024-10-02
weight: 10
toc: true
---

A **downloadable web app** is a 3rd party web app that can be installed on the webOS target device.

{{< note "Downloadable vs. Built-In" >}}
In webOS OSE, apps and services can be classified into two types based on how they are installed on the target device.

- **Downloadable** apps/services are installed by the appinstalld service. The appinstalld service creates webOS configurations based on files created by developers. (such as trust level) Developers can modify only certain parts of the app/service settings.
- **Built-in** apps/services are built and installed by developers. Developers can **customize** app/service's configurations to suit their needs.
{{< /note >}}

This tutorial shows a step-by-step guide for creating a downloadable web app from scratch.

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

## Step 01. Creating a Dummy App

Let's get started by creating a dummy app from templates. CLI provides various templates for webOS apps and services.

Enter the following command:

``` bash
# Comannd format
# ares-generate -t <TEMPLATE TYPE> <YOUR APP NAME>
ares-generate -t webapp sampleApp
```

{{< note >}}
For more details about CLI commands, refer to [CLI User Guide]({{< relref "cli-user-guide" >}}).
{{< /note >}}

If the command succeeds, the following directory will be generated under the current directory:

```
sampleApp/
├── appinfo.json
├── icon.png
└── index.html
```

Descriptions for each file are as follows:

| File | Description |
| ---- | ----------- |
| appinfo.json | Metadata for the web app. For more details, see [appinfo.json]({{< relref "appinfo-json" >}}). |
| icon.png | An image for the app icon displayed on the app bar |
| index.html | The main page of the web app |

## Step 02. Packaging the App

To install the app, you have to package the app first.

Enter the following command:

``` bash
# Command format
# ares-package <APP DIRECTORY>
ares-package sampleApp
```

If the command succeeds, an `.ipk` file will be generated under the current directory.

``` bash
# Generated .ipk file
com.domain.app_1.0.0_all.ipk
```

## Step 03. Installing the App

It's time to install your package to the target device.

Enter the following command:

``` bash
# Command format
# ares-install --device <TARGET DEVICE> <PACKAGED APP>
ares-install --device webos com.domain.app_1.0.0_all.ipk
```

## Step 04. Launching the App

To launch the installed app, enter the following command:

``` bash
# Command format
# ares-launch --device <TARGET_DEVICE> <APP ID>
ares-launch --device webos com.domain.app
```

If the command succeeds, the following string will be displayed:

{{< figure src="/images/docs/tutorials/web-apps/launched-web-app.jpg" width="600px" class="align-left" >}}

## Debugging the App

### Using Chrome

You can use the [Chrome DevTools](https://developer.chrome.com/docs/devtools/overview) to debug and monitor the runtime status of web apps. It allows you to control JavaScript execution, inspect the web pages' CSS and HTML code, and monitor resource usage. Old versions of Chrome might not support the DevTools.

To debug your app, enter the following command:

``` bash
# Command format
# ares-inspect --device <TARGET DEVICE> --app <APP ID> --open
 
ares-inspect --device webos --app com.domain.app --open
[Info] Set target device : testdevice
# This URL is for the DevTools page
Application Debugging - http://localhost:40709/devtools/inspector.html?ws=localhost:40709/devtools/page/1E2113E4B12042E37916985F86B5B378
```

If the command succeeds, the DevTools page will be launched.

{{< figure src="/images/docs/tutorials/web-apps/web-inspector.png" link="/images/docs/tutorials/web-apps/web-inspector.png" target="_blank" alt="" caption="Web Inspector screenshot" >}}

{{< note >}}
Web Inspector works only in Blink-based web browsers such as Chrome and Opera. If another browser (e.g., Safari or Internet Explorer) is set as your default web browser, you must re-open the inspector page in a Blink-based web browser.
{{< /note >}}

### Using ares-server

`ares-server` runs a web server based on files in the specified directory.

Originally, web browsers' security policies restrict access to local files during debugging sessions. `ares-server` bypasses these policies so the user can access the local files. 

Enter the following command:

``` bash
# Command format
# ares-server <APP DIRECTORY> [--open]
# --open is optional.
# This option opens the debugging window directly on the default browser.
 
ares-server ./sampleApp --open
 
Local server running on http://localhost:43527 # Check the URL address
```

## Appendix. Code Explanation

This section briefly explains the sample codes used in this tutorial.

### appinfo.json

`appinfo.json` stores the app's metadata.

``` json
{
    "id": "com.domain.app",    # ID of the app. This ID will be used as a unique identifier for the app.
    "version": "1.0.0",
    "vendor": "My Company",
    "type": "web",             # Type of the app
    "main": "index.html",      # The HTML file that contains the contents of your app
    "title": "new app",        # This string will be displayed on the app bar
    "icon": "icon.png",        # A path to an image for your app icon
    "requiredPermissions": ["time.query", "activity.operation"]   # ACG values for the app
}
```

### index.html

`index.html` is an HTML file that contains the content of your web app.

You can use another file name, but if you do so, you'll also need to update the `main` in `appinfo.json`.

The template codes will print "Hello, Web Application!!" on the screen. (The dummy app also has code for JavaScript services, but they won't be used in this tutorial.)
