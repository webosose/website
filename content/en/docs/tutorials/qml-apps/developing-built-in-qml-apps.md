---
title: Built-in QML Apps
display_title: Developing Built-in QML Apps
date: 2024-11-29
weight: 20
toc: true
---

A **built-in QML app** is a QML app that is installed with the webOS OSE platform at build time.

{{< note "Downloadable vs. Built-In" >}}
In webOS OSE, apps and services can be classified into two types based on how they are installed on the target device.

- **Downloadable** apps/services are installed by the appinstalld service. The appinstalld service creates webOS configurations based on files created by developers. (such as trust level) Developers can modify only certain parts of the app/service settings.
- **Built-in** apps/services are built and installed by developers. Developers can **customize** app/service's configurations to suit their needs.
{{< /note >}}

This tutorial shows a step-by-step guide for creating a built-in QML app from scratch.

## Prerequisites

Before you begin, prepare the following:

- [Samples repository](https://github.com/webosose/samples)
- [webOS OSE platform source code](https://github.com/webosose/build-webos)

{{< note >}}
If you already prepared the above things, you can skip this section.
{{< /note >}}

### Samples Repository

The samples repository provides basic sample codes for webOS OSE apps and services.

Download the samples repository.

``` bash
git clone https://github.com/webosose/samples.git
```

The directory structure of the sample QML app will be as follows:

```
samples/qml-apps/
├── build-config/
|     ├── com.example.app.qml.bb
|     └── webos-local.conf
└── com.example.app.qml/
    ├── README.md
    ├── appinfo.json
    ├── com.example.app.qml.pro
    ├── icon.png
    └── main.qml
```

### Platform Source Code

Since the built-in QML app is built using the [webOS OSE source code](https://github.com/webosose/build-webos), you need to download and set up the source code.

1. Download the source code.

    ``` bash
    git clone https://github.com/webosose/build-webos.git
    ```

2. Move in the downloaded directory.

    ``` bash
    cd build-webos
    ```

3. Install the prerequisites.

    ``` bash
    sudo scripts/prerequisites.sh
    ```

4. Donwload required components.

    ``` bash
    # ./mcf -p <num of CPUs> -b <num of CPUs> <device type>
    ./mcf -p 2 -b 2 raspberrypi4-64
    ```

    {{< note >}}
    `<num of CPUs>` determines how many CPU cores you will use in the build process. For more details, refer to [Appendix A. Setting Values for mcf]({{< relref "building-webos-ose#appendix-a-setting-values-for-mcf" >}}).
    {{< /note >}}

    After you execute the `mcf` command, various webOS-related components are downloaded in the `build-webos` directory. Then, you are ready to start.

## Step 01. Configuring an App

Copy the following files to the source code directory (default: `build-webos`):

- `samples/qml-apps/build-config/com.example.app.qml.bb`
- `samples/qml-apps/build-config/webos-local.conf`

### com.example.app.qml.bb

1. Create a new directory.

    ``` bash
    mkdir build-webos/meta-webosose/meta-webos/recipes-webos/com.example.app.qml/
    ```

2. Copy the file.

    - **From**: `samples/web-apps/build-config/com.example.app.qml.bb`
    - **To**: `build-webos/meta-webosose/meta-webos/recipes-webos/com.example.app.qml/com.example.app.qml.bb`

### webos-local.conf

1. Copy the file.

    - **From**: `samples/web-apps/build-config/webos-local.conf`
    - **To**: `build-webos/webos-local.conf`

2. Edit the copied `webos-local.conf`.

    ```plain {linenos=table}
    INHERIT += "externalsrc"
    EXTERNALSRC:pn-com.example.app.qml = "<PATH TO samples/qml-apps/com.example.app.qml>/"
    EXTERNALSRC_BUILD:pn-com.example.app.qml = "<PATH TO samples/qml-apps/com.example.app.qml>/build/"
    PR:append:pn-com.example.app.qml =".local0"
    ``` 

    1. Change `<PATH TO samples/web-apps/com.example.app.qml>` with your own path.
    2. We recommend adding a trailing slash (/) at the end of all directory paths, as in Lines 2 and 3.

## Step 02. Building the App

There are two options to build a QML app: **App alone** or **with the platform**.

**Choose your build option** depending on your target device.

| Option | Description |
| ------ | ----------- |
| App Alone | This option generates an `.ipk` package by building an app using the platform source code, and then installs the generated package on the target device. <br /><br />This option is **only available for Raspberry Pi 4**. For other type of devices, use the **with the platform** option. |
| With the Platform | This option embeds the app into the platform source code and build it at once. |

### App Alone

1. (Optional) Remove the existing `build` directory. (If you've ever built a built-in web app.)

    ``` bash
    rm -rf <PATH TO samples/qml-apps/com.example.app.qml>/build
    ```

2. Move to the root directory (`build-webos`), and build the web app.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake com.example.app.qml
    ```

    If the build succeeds, an `.ipk` file will be generated under the samples directory:

    ```
    samples/qml-apps/com.example.app.qml/oe-workdir/deploy-ipks/raspberrypi4_64/
    └── com.example.app.qml_1.0.0-r0.local0_raspberrypi4_64.ipk
    ```

    Now it's time to install the generated `.ipk` on your target device. Go to [Step 03. Installing the App](#step-03-installing-the-app).

### With Platform

{{< note >}}
In this section, there are a lot of contents about modifying **recipe** files. For more about the recipe files, refer to the [Yocto Project Reference Manual](https://docs.yoctoproject.org/).
{{< /note >}}

1. Add the app ID to the build recipe file.

    **File Path**: `build-webos/meta-webosose/meta-webos/recipes-core/packagegroups/packagegroup-webos-extended.bb`

    ``` bb
    ...
    RDEPENDS:${PN} += " \
        activitymanager \
        ...
        com.example.app.qml \       # Add the app ID
    "
        ...
    ```

2. Move to the root directory (`build-webos`), and build the webOS OSE platform.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake webos-image
    ```

    Once the build is done, a webOS image will be generated as follows: 
    
    - `build-webos/BUILD/deploy/images/raspberrypi4-64/webos-image-raspberrypi4-64.rootfs.wic`

3. Flash the generated image. See [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).

{{< note >}}
You don't need to go to the [Step 03. Installing the App](#step-03-installing-the-app). You've already installed the app on the webOS OSE platform.
{{< /note >}}

## Step 03. Installing the App

This step describes how to install the `.ipk` file you've built in [App Alone](#app-alone).

1. Copy the `.ipk` file to the target device.

    ``` bash
    scp <PATH TO IPK FILE> root@<TARGET DEVICE IP ADDRESS>:/media/internal/downloads/
    ```

2. Connect to the target device.

    ``` bash
    ssh root@<TARGET DEVICE IP ADDRESS>
    ```

3. Move into the `/media/internal/downloads/` directory and install the `.ipk` file.

    ``` bash
    root@raspberrypi4-64:~# cd /media/internal/downloads/
    root@raspberrypi4-64:/media/internal/downloads# opkg install com.example.app.qml_1.0.0-r0.local0_raspberrypi4_64.ipk

    Installing com.example.app.qml (1.0.0) on root.
    Configuring com.example.app.qml.
    No image conversions needed for com.example.app.qml
    ```

4. Reboot the device. 

    ``` bash
    reboot -f
    ```

    After rebooting the device, you can see the app icon in the Launchpad.

    {{< figure src="/images/docs/tutorials/qml-apps/installed-built-in-qml-app.jpg" >}}


## Appendix. Code Explanation

This section briefly explains the sample codes used in this tutorial.

### com.example.app.qml.bb

{{< code "com.example.app.qml.bb" >}}
``` bb {linenos=table}
SUMMARY = "QML App"
SECTION = "webos/apps"
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/Apache-2.0;md5=89aea4e17d99a7cacdbeed46a0096b10"
 
DEPENDS = "qtbase qt-features-webos qtdeclarative pmloglib"
RDEPENDS:${PN} += "qml-webos-framework qml-webos-bridge"
 
WEBOS_VERSION="1.0.0"
PR = "r0"
 
inherit webos_qmake6
inherit webos_submissions
inherit webos_app
 
FILES:${PN} += "${webos_applicationsdir}"
```
{{< /code >}}

A brief explanation of the above file:

- Line (2): The section where packages should be categorized.
- Line (3~4): License information for the app.
- Line (6): A list of build-time dependencies.
- Line (7): A list of runtime dependencies.
- Line (9): The version of the component. Every webOS component must contain this.
- Line (10): The revision of the recipe. Unless you're changing the `WEBOS_VERSION` or just adding a comment, you should increment this value each time you modify the recipe.
- Line (12-14): Inherits from other classes.
    - Line (12): Sets QMake for configuration.
    - Line (13): Inherits `webos_submissions` to check the version information set correctly. This field is required if you develop your component on a local repository.
    - Line (14): For apps, this field is required.
- Line (16): Defines files included in the package. `${webos_applicationsdir}` indicates `/usr/palm/applications`. `${PN}` is the package name (`com.example.app.qml`).

### webos-local.conf

``` plain {linenos=table}
INHERIT += "externalsrc"
EXTERNALSRC:pn-<APP ID> = "<PATH TO THE APP DIRECTORY>/"
EXTERNALSRC_BUILD:pn-<APP ID> = "<PATH TO THE APP DIRECTORY>/build/"
PR:append:pn-<APP ID> =".local0"
```

A brief explanation of the above file:

- Line (1): Inherits the `externalsrc.bbclass` file.
- Line (2): Specifies the path to the app directory.
    - `<APP ID>`: The app ID specified in the `appinfo.json` file.
    - `<PATH TO THE APP DIRECTORY>`: The root directory of the app where the `appinfo.json` file is located. You must use the absolute path.
- Line (3): Specifies the build directory. The build directory is located under the app directory.
- Line (4): The revision for local source builds. This line is optional.

### appinfo.json

`appinfo.json` stores the app’s metadata.

``` json
{
    "id": "com.example.app.qml",            # ID of the app. This ID will be used as a unique identifier for the app.
    "version": "0.0.1",
    "vendor": "My Company",
    "type": "qml",                          # Type of the app
    "main": "main.qml",                     # The HTML file that contains the contents of your app
    "title": "QML App",                     # This string will be displayed on the app bar
    "icon": "icon.png",                     # A path to an image for your app icon
    "requiredPermissions" : ["time.query", "application.operation"]  # ACG values for the app
}
```

{{< note >}}
See also [appinfo.json]({{< relref "appinfo-json" >}}).
{{< /note >}}

### com.example.app.qml.pro

This file defines the procedures to build the app.

{{< code "com.example.app.qml.pro" >}}
``` pro {linenos=table}
TEMPLATE = aux
!load(webos-variables):error("Cannot load webos-variables.prf")
 
# install
defined(WEBOS_INSTALL_WEBOS_APPLICATIONSDIR, var) {
    INSTALL_APPDIR = $$WEBOS_INSTALL_WEBOS_APPLICATIONSDIR/com.example.app.qml
    target.path = $$INSTALL_APPDIR
 
    appinfo.path = $$INSTALL_APPDIR
    appinfo.files = appinfo.json
 
    base.path = $$INSTALL_APPDIR
    base.files = main.qml
 
    icon.path = $$INSTALL_APPDIR
    icon.files = icon.png
 
    INSTALLS += target appinfo base icon
}
```
{{< /code >}}

A brief explanation of the above file:

- Line (1): Creates a Makefile for not building anything. QML apps don't require any compiling or linking steps.
- Line (2): Loads webos-variables module. This line will set `WEBOS_INSTALL_WEBOS_APPLICATIONSDIR`, which will be used in lines (5~18).
- Line (5): If `WEBOS_INSTALL_WEBOS_APPLICATIONSDIR` exists, execute the following code.
- Line (6): Stores the path to `INSTALL_APPDIR`. `INSTALL_APPDIR` would be `/usr/palm/applications/com.example.app.qml` on the target.
- Line (7~16): Specifies variables.
    - `.files`: Specifies a file to be installed.
    - `.path`: Specifies a path where the files are to be installed.
- Line (18): Adds variables to the `INSTALLS` list.

{{< note >}}
See also [QMake Documentation](https://doc.qt.io/qt-6/qmake-manual.html).
{{< /note >}}

### main.qml

This file defines your QML app's behavior.

{{< code "main.qml" >}}
``` qml {linenos=table}
import QtQuick 2.4
import WebOSServices 1.0
import Eos.Window 0.1
import PmLog 1.0
 
WebOSWindow {
    id: root
    width: 1920
    height: 1080
    visible: true
    appId: "com.example.app.qml"
    title: "QML app"
    color: "lightblue"
    displayAffinity: params["displayAffinity"]
 
    Text {
        id: mainText
        anchors.centerIn: parent
        font.family: "Helvetica"
        font.pointSize: 50
        text: "Hello, QML Application!!"
    }
 
    property var launchParams: params
    onLaunchParamsChanged: {
        pmLog.info("LAUNCH_PARAMS", {"params": launchParams})
    }
 
    Service {
        id: systemService
        appId: "com.example.app.qml"
 
        function getTime() {
            call("luna://com.webos.service.systemservice","/clock/getTime","{}")
        }
 
        onResponse: {
            var jsonObject = JSON.parse(payload);
            pmLog.info("GETTIME", {"utc": jsonObject.utc});
            mainText.text = "UTC : " + jsonObject.utc
        }
 
        onError: {
            var jsonObject = JSON.parse(payload);
            pmLog.error("GETTIME", {"error": jsonObject});
        }
    }
 
    MouseArea {
        anchors.fill: parent
        onClicked: systemService.getTime()
    }
 
    onWindowStateChanged: {
        pmLog.info("WINDOW_CHANGED", {"status": windowState})
    }
 
    PmLog {
        id: pmLog
        context: "QMLApp"
    }
}
```
{{< /code >}}

A brief explanation of the above file:

- Line (1~4): Import required modules.
- Line (1): Enables the use of QML.
- Line (2): Enables to call system services via luna-service.
- Line (3): Enables the use of WebOSWindow QML components.
- Line (4): Enables the use of PmLog for printing logs.
- Line (6~62): Declares a WebOSWindow object with child objects.
    - Line (7 ~13): Sets the object's properties.
    - Line (14): The app can be launched on the display that corresponds to the `displayAffinity` value passed as the launch parameter.
    - Line (16~22): Declares an object (`Text`).
    - Line (24~27): A QML app is launched and registered to SAM by qml-runner. This process allows the QML app to receive parameters passed with the launch method as params. `onLaunchParamsChanged` is called every time the launch method is called. For details of PmLogLib usage, refer to [Using PmLogLib in QML]({{< relref "using-pmloglib-in-qml" >}}).
        - Line (24): `launchParams` stores the parameters that are passed when the app is executed.
        - Line (25~27): `onLaunchParamsChanged` handler logs each time the `launchParams` changes.
    - Line (29~47): The `Service` component interacts with the system service. It defines an API call: API, method, response, and error handling
    - Line (49~52): When the user clicks on the screen, systemservice’s getTime method is called.
    - Line (54~56): `windowState` is a value that the WebOSWindow QML component sends to the app. Whenever the windowState value changes, `onWindowStateChanged` is called. Its value is 1 when the app is in the background and 4 when the app is in the foreground, following the definition of `Qt::WindowState`. For details, see [enum Qt::WindowState | Qt Documentation](https://doc.qt.io/qt-5/qt.html#WindowState-enum).
    - Line (58~61): Declares an object (`PmLog`).

### README.md

This file provides overall information about the app.

{{< caution >}}
- If the README.md file is missing, a build error occurs.
- Make sure the ‘Summary’ section is a single line. Even any whitespace at the line above the ‘Description’ section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}

``` markdown
Summary
-------
QML app sample

Description
-----------

QML app sample

How to Build on Linux
---------------------

## Dependencies

Below are the tools and libraries (and their minimum versions) required to build sample program:

* qmake

## Building

    $ cd build-webos
    $ source oe-init-build-env
    $ bitbake com.example.app.qml

Copyright and License Information
=================================
Unless otherwise specified, all content, including all source code files and
documentation files in this repository are:

Copyright (c) 2020 LG Electronics, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

SPDX-License-Identifier: Apache-2.0

```
