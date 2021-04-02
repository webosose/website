---
title: Developing Built-in QML Apps
date: 2021-03-23
weight: 20
toc: true
---

To create a built-in QML app, you must write the source code and prepare the required configuration files.

For easier understanding, the process to create a built-in QML app is explained using a sample app in [Sample Code Repository](https://github.com/webosose/samples). The sample app has the following features:

- When the app is launched, it displays a "Hello, QML Application!!" message on the screen.
- When the user clicks on the screen, it calls the `com.webos.service.systemservice/clock/getTime` method. "UTC" time on the response is printed on the screen.
- Prints logs in the following conditions:
    - When it is first launched and relaunched, outputting the `params` value which is passed on the `launch` method of System and Application Manager (SAM)
    - When `windowState` changed.

The directory structure of the sample app must be as follows:

``` bash
qml-apps/
├── build-config/
│   ├── com.example.app.qml.bb
│   └── webos-local.conf
└── com.example.app.qml/
    ├── appinfo.json
    ├── com.example.app.qml.pro
    ├── icon.png
    ├── main.qml
    └── README.md
```

Developing a built-in QML app requires the following steps:

* [Prerequisites](#before-you-begin)
* [Step 1: Implementation](#step-1-implement-the-qml-app)
* [Step 2: Configuration](#step-2-configure-the-qml-app)
* [Step 3: Build](#step-3-build-the-qml-app)
* [Step 4: Verification](#step-4-run-and-verify-the-qml-app)
* [Step 5: Deployment](#step-5-deploy-the-qml-app)

## Before you begin

- Build and flash the webOS OSE image. For detailed information, see [Building webOS OSE]({{< relref "building-webos-ose" >}}) and [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).
- Download the sample repository, and move into `samples/qml-apps` directory.

    ``` bash
    $ git clone https://github.com/webosose/samples
    $ cd samples/qml-apps
    ```

## Step 1: Implement the QML App

{{< note >}}
In this guide, we will only explain essential parts of the sample codes. For full list of codes, refer to the sample repository.
{{< /note >}}

### Source Code

First, define the functionality of the QML app on the source code.

{{< code "main.qml" >}}
``` javascript {linenos=table}
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

- Line(1) : Import QtQuick 2.4 to use QML.
- Line(2) : Import WebOSServices to call system services via luna-service.
- Line(3) : Import Eos.Window to use WebOSWindow QML component.
- Line(4) : Import PmLog to print logs.
- Line(6~62) :  Declare a WebOSWindow object with child objects.
    - Line(7~13) : Set WebOSWindow properties and size and color.
    - Line(14): Set the `displayAffinity` property so that the app can be launched on the display corresponding to the `displayAffinity` value passed as a launch parameter.
    - Line(16~22) : Declare a Text object and string.
    - Line(24~27) : A QML app (with the type "qml" on `appinfo.json`) is launched and registered to SAM by qml-runner. Through this process, the QML app can receive the parameters passed with the `launch` method call as `params`. With each `launch` method call, `onLaunchParamsChanged` is called even if the value of `params` ds not change from that of the previous call. For details of PmLogLib usage, refer to [Using PmLogLib in QML]({{< relref "using-pmloglib-in-qml" >}}).
    - Line(29~47) : Declare a Service object to call systemservice's `getTime` method. If the object receives the response, the app prints the UTC time on the screen.
    - Line(49~52) : When the user clicks on the screen, systemservice's `getTime` method is called.
    - Line(54~56) : `windowState` is a value that the WebOSWindow QML component sends to the app. Whenever the `windowState` value changes, `onWindowStateChanged` is called. Its value is 1 when the app is in the background and 4 when the app is in the foreground, following the definition of `Qt::WindowState`. For details, see [Qt::WindowState](https://doc.qt.io/qt-5/qt.html#WindowState-enum) on Qt documentation.
    - Line(58~61) : Declare a `PmLog` object.

{{< note >}}
webOS OSE supports use of `QtQuick` module up to version 2.12, because webOS OSE supports Qt 5.12 LTS since 2.0.0 release. However, using lower version of `QtQuick` module can be helpful for keeping backward compatibility with other environments using a lower version of Qt. For details, refer to [Qt documentation](https://doc.qt.io/qt-5.12/qtquick-qmlmodule.html).
{{< /note >}}

For detailed information for Qt, see [Qt documentation](http://doc.qt.io/).

### README.md

This file provides general information of the QML app.

{{< caution >}}
* If the `README.md` file is missing, a build error occurs.
* Make sure the 'Summary' section is a single line. Even **any whitespace** at the line above the 'Description' section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}

{{< code "Sample README.md">}}
``` plaintext
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
{{< /code >}}

## Step 2: Configure the QML App

This section describes how to prepare the configuration files required to build and test the QML app.

### appinfo.json

Apps are required to have metadata before they can be packaged. This metadata is stored in a file called `appinfo.json`, which is used by the webOS device to identify the app, its icon, and other information that is needed to launch the app.

{{< code "appinfo.json" >}}
``` json {linenos=table}
{
    "id": "com.example.app.qml",
    "version": "1.0.0",
    "vendor": "My Company",
    "type": "qml",
    "main": "main.qml",
    "title": "QML App",
    "icon": "icon.png",
    "requiredPermissions" : ["time.query", "application.operation"]
}
```
{{< /code >}}

A brief explanation of the above file:

- Line(2) : The ID for the app.
- Line(5) : The type of the QML app.
- Line(6) : The executable file name.
- Line(7) : The title to be shown on the Home Launcher app.
- Line(8) : The icon to be shown on the Home Launcher app. Make sure the icon file is available in the project root directory. You can use your own icon.png (80*80) file or attached [icon.png](/images/docs/tutorials/icon.png).
- Line(9) : Specify the group to which the external service's method called by the app belongs.
    - Because systemservice's `getTime` method belongs to "time.query" group, put "time.query" in this property.
    - When qml-runner launches QML app, qml-runner calls the method to register the app to SAM. To enable qml-runner to call this method, put "application.operation" group.
    - To check the group of each method, use [`ls-monitor`]({{< relref "ls-monitor" >}}) command with "-i" option.

For more details, see [appinfo.json]({{< relref "appinfo-json" >}}).

### qmake Project File

This file specifies the application name and the qmake template to be used for generating the project, as well as the source, header, and UI files included in the project.

{{< code "com.example.app.qml.pro" >}}
``` bash {linenos=table}
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

- Line(1) : We do not require any actual compilation or link steps for the QML app. So, we set `TEMPLATE = aux`.
- Line(2) : webOS platform `load(webos-variables)` will set `WEBOS_INSTALL_WEBOS_APPLICATIONSDIR`, which we will use as the deployment target folder.
- Line(6) : Set installation directory on the target board. `INSTALL_APPDIR` would be `/usr/palm/applications/com.example.app.qml` on the target.
- Line(7~16) : `*.files` specifies a path in the project directory and `*.path` specifies the path to the file system to be installed on the target.
- Line(18) : Add target, appinfo, base, and icon to `INSTALLS` list.

For more details, see [qmake Project Files](http://doc.qt.io/archives/qt-4.8/qmake-project-files.html).

## Step 3: Build the QML App

After implementing and configuring the QML app, you must build the app.

### Add the Recipe File

webOS OSE uses OpenEmbedded of Yocto Project to build its components. OpenEmbedded needs a recipe file that configures the build environment. For more details about the recipe, see [Yocto Project Reference Manual](https://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

You must move the recipe file into webOS OSE project directory.

- **Recipe file:** `samples/qml-apps/build-config/com.example.app.qml.bb`
- **Destination Directory:** `build-webos/meta-webosose/meta-webos/recipes-webos/<qml app name>`

where `<qml app name>` is the name of the qml app. For the sample qml app, `<qml app name>` must be replaced by "com.example.app.qml".

{{< code "com.example.app.qml.bb">}}
``` bash {linenos=table}
SUMMARY = "QML App"
SECTION = "webos/apps"
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/Apache-2.0;md5=89aea4e17d99a7cacdbeed46a0096b10"

DEPENDS = "qtbase qt-features-webos qtdeclarative pmloglib"
RDEPENDS_${PN} += "qml-webos-framework qml-webos-bridge"

WEBOS_VERSION="1.0.0"
PR = "r0"

inherit webos_qmake5
inherit webos_submissions
inherit webos_app

FILES_${PN} += "${webos_applicationsdir}"
```
{{< /code >}}

A brief explanation of the above file:

- Line(1~4) : Basic descriptions of the component.
- Line(6) : A list of a package's build dependencies. Add `qtbase`, `qt-features-webos`, `qtdeclarative`, and `pmloglib`.
- Line(7) : A list of a package's runtime dependencies (other packages) that must be installed in order for the built package to run correctly. Add `qml-webos-bridge` and `qml-webos-framework`.
- Line(9) : Version of the component. For the webOS OSE component, this field is mandatory.
- Line(10) : Revision version of the recipe. Each recipe requires a counter to track its modification history. Make sure that you increment the version when you edit the recipe, unless you only change the value of the `WEBOS_VERSION` field or comments.
- Line(12) : Instruct OpenEmbedded that the component uses QMake for configuration, which is the preferred choice for webOS components.
- Line(13) : Instruct OpenEmbedded to use the `WEBOS_VERSION` value as the component version number. If you develop your component on a local repository, this entry is required.
- Line(14) : Inherit `webos_app`, because the component is an app.
- Line(16) : `${webos_applicationsdir}` indicates `/usr/palm/applications`. `${PN}` is the package name, which is set to **com.example.app.qml**.

### Configure the Local Source Directory

To build a component that is located on the local system, you must specify the directory information.

You must move the configuration file into webOS OSE project directory.

- **Configuration file:** `samples/qml-apps/build-config/webos-local.conf`
- **Destination Directory:** `build-webos`

For the sample QML app (`com.example.app.qml`), you must provide the local path where the source exists.

{{< code "webos-local.conf" >}}
``` bash {linenos=table}
INHERIT += "externalsrc"
EXTERNALSRC_pn-com.example.app.qml = "/home/username/project/com.example.app.qml/"
EXTERNALSRC_BUILD_pn-com.example.app.qml = "/home/username/project/com.example.app.qml/build/"
PR_append_pn-com.example.app.qml =".local0"
```
{{< /code >}}

A brief explanation of the above file:

- Line(1) : Inherit `externalsrc` bbclass file.
- Line(2) : The local source directory. The syntax of the property is `EXTERNALSRC_pn-<component>`. For the value, input `"<absolute path of the project directory>"`
- Line(3) : The local build directory. The syntax of the property is `EXTERNALSRC_BUILD_pn-<component>`. For the value, input `"<absolute path of the project directory>/build/"`
- Line(4) : The appended revision version (PR) for building local source files. The syntax of the property is `PR_append_pn-<component>`. This property is optional.

{{< note >}}
We recommend that you add a trailing slash (/) at the end of all local directory paths, as in Line(2) and Line(3).
{{< /note >}}

### Build the App

To build the component on the OpenEmbedded environment, enter the following commands on the shell:

``` bash
build-webos$ source oe-init-build-env
build-webos$ bitbake com.example.app.qml
```

## Step 4: Run and Verify the QML App

After building the app, you must verify its functionality.

1.  **Copy the IPK to the target.**

    When the build is successful, oe-related directories are created under the project root directory. These directories are linked to the directory where the build output is generated from the actual **`build-webos`** sub-directory.

    ``` bash
    com.example.app.qml
    ├── README.md
    ├── appinfo.json
    ├── build
    ├── com.example.app.qml.pro
    ├── icon.png
    ├── main.qml
    ├── oe-logs -> /home/username/build/build-webos/BUILD/work/raspberrypi4-webos-linux-gnueabi/com.example.app.qml/1.0.0-r0.local0/temp
    └── oe-workdir -> /home/username/build/build-webos/BUILD/work/raspberrypi4-webos-linux-gnueabi/com.example.app.qml/1.0.0-r0.local0
    ```

    If you go to `oe-workdir/deploy-ipks/raspberrypi4`, you can see `com.example.app.qml_1.0.0-r0.local0_raspberrypi4.ipk` file.

    ``` bash
    com.example.app.qml/oe-workdir/deploy-ipks/raspberrypi4$
    └── com.example.app.qml_1.0.0-r0.local0_raspberrypi4.ipk
    ```

    Copy the IPK file to the target device using the `scp` command.

    ``` bash
    ~/project/com.example.app.qml/oe-workdir/deploy-ipks/raspberrypi4$ scp com.example.app.qml_1.0.0-r0.local0_raspberrypi4.ipk root@<target IP address>:/media/internal/downloads/
    ```

2.  **Install the app on the target.**

    Connect to the target using the `ssh` command and install `com.example.app.qml_1.0.0-r0.local0_raspberrypi4.ipk`.

    ``` bash
    $ ssh root@<target IP address>
    root@raspberrypi4:/sysroot/home/root# cd /media/internal/downloads/
    root@raspberrypi4:/media/internal/downloads# opkg install com.example.app.qml_1.0.0-r0.local0_raspberrypi4.ipk
    Installing com.example.app.qml (1.0.0) on root.
    Configuring com.example.app.qml.
    ```

3.  **Discover the LS2 configuration files.**

    To make LS2 daemon scan the LS2 configuration files of the app, use the `ls-control` command as follows.

    ``` bash
    root@raspberrypi4:/media/internal/downloads# ls-control scan-services
      telling hub to reload setting and rescan all directories
    ```

    {{< note >}}
    For the QML app, LS2 configuration files are generated during the build process. To run the app properly, you must make the system scan the newly generated configuration files.
    {{< /note >}}

4.  **Scan the app.**

    To make System and Application Manager (SAM) scan the app, restart SAM using the `systemctl` command. This step is required so that the app can be added to the app list, which in turn makes the app appear on the Home Launcher.

    ``` bash
    root@raspberrypi4:/# systemctl restart sam
    ```

    {{< note >}}
    Rebooting the target after installing the app will have the same effect as running the `ls-control` and `systemctl` commands. However, using the commands allows you to continue testing without rebooting.
    {{< /note >}}

5.  **Run the QML app.**

    To display the Home Launcher, drag the mouse cursor upward from the bottom of the screen (or swipe up from the bottom of the screen if you're using a touch display).

    {{< note >}}
    On webOS OSE 1.x, press the Windows key on your keyboard to display the Home Launcher.
    {{< /note >}}

    Click the app icon to see the window titled "QML app" with the following page:

    {{< figure src="/images/docs/tutorials/qml-apps/qml-app-screen.jpg" alt="QML app screen" width="50%" height="50%" >}}

6.  **Verify the execution of the QML app.**

    - Using SAM

        You can check whether the app is running by using SAM. For more SAM methods, see [com.webos.service.applicationmanager]({{< relref "com-webos-service-applicationmanager" >}}).

        ``` bash
        root@raspberrypi4:/# luna-send -i -f luna://com.webos.service.applicationmanager/running '{"subscribe":true}'
        {
            "subscribed": true,
            "running": [
                {
                    "webprocessid": "",
                    "instanceId": "d641285a-5289-43d7-ac87-df2a509446290",
                    "displayId": 0,
                    "defaultWindowType": "card",
                    "appType": "native_qml",
                    "id": "com.example.app.qml",
                    "processid": "1485",
                    "launchPointId": "com.example.app.qml_default"
                }
            ],
            "returnValue": true
        }
        ```

    - Using the app

        Click on the screen, and the UTC time is printed on the screen.

        {{< figure src="/images/docs/tutorials/qml-apps/qml-app-utc.png" alt="QML app UTC time displayed" width="50%" height="50%" >}}

    - Using the log file

        You can use the `journalctl` command on the target for debugging the QML app. For details on how to use the command, see [Viewing Logs]({{< relref "viewing-logs-journald#using-journalctl-to-view-logs" >}}).

        - When the app is first launched on launcher

            The app is launched and registered to SAM by qml-runner. The app gets the `params` value from qml-runner. As the app is in the foreground, windowState value is "4".

            ``` plaintext
            Nov 13 21:44:56 raspberrypi4 qml-runner[1406]: [] [pmlog] QMLApp LAUNCH_PARAMS {"params": {}}
            Nov 13 21:44:56 raspberrypi4 qml-runner[1406]: [] [pmlog] QMLApp WINDOW_CHANGED {"status": 4}
            ```

        - When the app gs to the background by launching another app, windowState is changed to "1".

            ``` plaintext
            Nov 13 21:49:24 raspberrypi4 qml-runner[1406]: [] [pmlog] QMLApp WINDOW_CHANGED {"status": 1}
            ```

        - When relaunching the app while the app is in the foreground and running

            Specify the `params` parameter to pass specific values to the app via SAM, as follows:

            ``` bash
            root@raspberrypi4:/# luna-send -n 1 luna://com.webos.service.applicationmanager/launch '{"id":"com.example.app.qml", "params" : {"test":"key1"}}'
            ```

            See the log.

            ``` plaintext
            Nov 13 21:54:06 raspberrypi4 qml-runner[1406]: [] [pmlog] QMLApp LAUNCH_PARAMS {"params": {"test": "key1"}}
            Nov 13 21:54:06 raspberrypi4 qml-runner[1406]: [] [pmlog] QMLApp WINDOW_CHANGED {"status": 4}
            ```

## Step 5: Deploy the QML App

You are now ready to build the webOS image including the QML app and flash it to the target device.

Perform the following steps:

1.  Add the QML app to the build recipe file.

    - **Filename:** `packagegroup-webos-extended.bb`

    - **Directory:** `build-webos/meta-webosose/meta-webos/recipes-core/packagegroups`

    - **Updates to be made:** Add the QML app name to **`RDEPENDS_${PN} =`**

    ``` bash {hl_lines=[6]}
    ...
    RDEPENDS_${PN} = " \
        activitymanager \
        audiod \
        ...
        com.example.app.qml \
        ${VIRTUAL-RUNTIME_appinstalld} \
        ...
    ```

    For more details, see [Yocto Project Reference Manual](http://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

2.  Build the webOS image using the following commands:

    ``` bash
    build-webos$ source -init-build-env
    build-webos$ bitbake webos-image
    ```

3.  Flash the generated webOS image to the SD card.

    - **Path to image:** `build-webos/BUILD/deploy/images/raspberrypi4/webos-image-raspberrypi4-master-yyyymmddhhmmss.wic`

    ``` bash
    build-webos/BUILD/deploy/images/raspberrypi4$ sudo dd bs=4M if=webos-image-raspberrypi4-master-yyyymmddhhmmss.wic of=/dev/sdc
    ```

    For more details, see the [Flashing webOS OSE]({{< relref "flashing-webos-ose#linux" >}}) page.

After rebooting, the QML app becomes available on the Home Launcher.
