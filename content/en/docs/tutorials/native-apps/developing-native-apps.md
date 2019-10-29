---
title: Developing Native Apps
date: 2018-10-17
weight: 10
toc: true
---

To create a native app, you must write the source code and prepare the required configuration files.

For easier understanding, the process to create a native app is explained using the example of an app named **`com.example.app.nativeqt`** that has the following features:

- Displays a "Hello, Native Qt Application" message on screen.
- Calls **`com.webos.service.applicationmanager/registerApp`** method.
- Prints logs on `/var/log/messages` file when it is first launched.
- Prints logs with the updated parameter and status whenever the app is relaunched.

The directory structure of `com.example.app.nativeqt` must be as follows:

``` bash
com.example.app.nativeqt
├── main.cpp
├── ServiceRequest.h
├── ServiceRequest.cpp
├── appinfo.json
├── icon.png
├── com.example.app.nativeqt.pro
└── README.md
```

Developing a native app requires the following steps:

* [Prerequisites](#before-you-begin)
* [Step 1: Implementation](#step-1-implement-the-native-app)
* [Step 2: Configuration](#step-2-configure-the-native-app)
* [Step 3: Build](#step-3-build-the-native-app)
* [Step 4: Verification](#step-4-run-and-verify-the-native-app)
* [Step 5: Deployment](#step-5-deploy-the-native-app)

## Before you begin

- Build and flash the webOS OSE image. For detailed information, see [Building webOS OSE]({{< relref "building-webos-ose" >}}) and [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).
- Create a project directory (`com.example.app.nativeqt`) for the sample native app, and move into the directory.

    ``` bash
    $ mkdir com.example.app.nativeqt
    $ cd com.example.app.nativeqt
    ```

## Step 1: Implement the Native App

### Source Code

First, define the functionality of the native app on the source code.

#### ServiceRequest.h

Define a class that can register to luna-service2 and call `registerApp` method of System and Application Manager (SAM). This header file has the function declaration.

- **Create and update the file:** `ServiceRequest.h`
- **Directory:** `com.example.app.nativeqt`

<!-- end list -->

{{< highlight cpp "linenos=table" >}}
#ifndef SERVICEREQUEST_H
#define SERVICEREQUEST_H

#include <glib.h>
#include <string>
#include <luna-service2/lunaservice.h>
#include <pbnjson.hpp>
#include <PmLog.h>

static PmLogContext getPmLogContext()
{
    static PmLogContext s_context = 0;
    if (0 == s_context)
    {
        PmLogGetContext("NativeQtApp", &s_context);
    }
    return s_context;
}

class ServiceRequest
{
public:
    ServiceRequest(std::string appId);
    virtual ~ServiceRequest();
    LSHandle* getHandle() const { return m_serviceHandle; }
    void registerApp();

protected:
    LSHandle* acquireHandle();
    void clearHandle();

private:
    GMainLoop* m_mainLoop;
    LSHandle* m_serviceHandle;
    std::string m_appId;
};
#endif
{{< /highlight >}}

A brief explanation of the above file:

* Line(10~18) : A function that calls `PmLogGetContext()` in PmLog library to print logs on `/var/log/messages`. For more details, see [Using PmLog in C/C++]({{< relref "using-pmlog-in-c-cpp" >}}).

#### ServiceRequest.cpp

Define `SeviceRequest` class methods. In addition, add methods related to PmLog and PbnJson to use conveniently.

- **Create and update the file:** `ServiceRequest.cpp`
- **Directory:** `com.example.app.nativeqt`

<!-- end list -->

{{< highlight cpp "linenos=table" >}}
#include "ServiceRequest.h"

static pbnjson::JValue convertStringToJson(const char *rawData)
{
    pbnjson::JInput input(rawData);
    pbnjson::JSchema schema = pbnjson::JSchemaFragment("{}");
    pbnjson::JDomParser parser;
    if (!parser.parse(input, schema))
    {
        return pbnjson::JValue();
    }
    return parser.getDom();
}

static std::string convertJsonToString(const pbnjson::JValue json)
{
    return pbnjson::JGenerator::serialize(json, pbnjson::JSchemaFragment("{}"));
}

ServiceRequest::ServiceRequest(std::string appId)
    : m_mainLoop(g_main_loop_new(nullptr, false))
    , m_serviceHandle(nullptr)
{
    m_appId = appId;
    m_serviceHandle = acquireHandle();
}

ServiceRequest::~ServiceRequest()
{
    clearHandle();
    if (m_mainLoop)
    {
        g_main_loop_quit(m_mainLoop); // optional!
        g_main_loop_unref(m_mainLoop);
        m_mainLoop = nullptr;
    }
}

LSHandle* ServiceRequest::acquireHandle()
{
    LSError lserror;
    LSErrorInit(&lserror);

    LSHandle* handle = nullptr;
    if (!LSRegister(m_appId.c_str(), &handle, &lserror))
    {
        LSErrorPrint(&lserror, stderr);
        return nullptr;
    }

    if (!LSGmainAttach(handle, m_mainLoop, &lserror))
    {
        LSErrorPrint(&lserror, stderr);
        return nullptr;
    }
    return handle;
}

void ServiceRequest::clearHandle()
{
    LSError lserror;
    LSErrorInit(&lserror);
    if (m_serviceHandle)
    {
        LSUnregister(m_serviceHandle, &lserror);
        m_serviceHandle = nullptr;
    }
}

static bool registerAppCallback(LSHandle* sh, LSMessage* msg, void* ctx)
{
    PmLogInfo(getPmLogContext(), "REGISTER_CALLBACK", 1, PMLOGJSON("payload", LSMessageGetPayload(msg)),  " ");

    pbnjson::JValue response = convertStringToJson(LSMessageGetPayload(msg));
    bool successCallback = response["returnValue"].asBool();
    if (successCallback)
    {
        std::string event = response["event"].asString();
        PmLogInfo(getPmLogContext(), "REGISTER_CALLBACK", 1, PMLOGKS("event", event.c_str()),  " ");

        if (event == "registered")
        {
            //handle "registered" event
        }
        else if (event == "relaunch")
        {
            //handle "relaunch" event
            if (response.hasKey("parameters"))
            {
                pbnjson::JValue launchParams = response["parameters"];
                PmLogInfo(getPmLogContext(), "REGISTER_CALLBACK", 1,
                            PMLOGJSON("parameters", convertJsonToString(launchParams).c_str()),  " ");
            }
        }
        else if (event == "close")
        {
            //handle "close" event
        }
    }
    else
    {
        PmLogError(getPmLogContext(), "REGISTER_CALLBACK", 0, "RegisterApp Callback error" );
        // error handling..
    }
    return true;
}

void ServiceRequest::registerApp()
{
    PmLogInfo(getPmLogContext(), "APP_REGISTER", 0, "RegisterApp called");
    LSError lserror;
    LSErrorInit(&lserror);
    LSHandle* handle = getHandle();
    if (!handle)
    {
        PmLogError(getPmLogContext(), "APP_REGISTER", 0, "LSHandle is NULL" );
    }

    if (!LSCall(handle,
                "luna://com.webos.service.applicationmanager/registerApp",
                "{}",
                registerAppCallback,
                NULL,
                NULL,
                &lserror))
    {
        LSErrorPrint(&lserror, stderr);
    }
}
{{< /highlight >}}

A brief explanation of the above file:

- Line(3~18) : Create pbnjson utility functions, which convert String to Json and Json to String based on pbnjson library. pbnjson is a JSON engine, implemented as a pair of libraries with APIs for easier C and C++ abstraction.
- Line(20~37) : Define constructor and destructor of ServiceRequest Class.
- Line(39~68) : Define functions to register and unregister `com.example.app.nativeqt` to and from luna-service. For more details about luna-service functions, see the [luna-service2 Library API Reference]({{< relref "luna-service2-library-api-reference" >}}).
- Line(70~106) : Implement the callback function of `registerApp`.
    - Line(81~84) : When the app first calls the method, the value of event in response is "registered".
    - Line(85~94) : When the app is already running and SAM’s `launch` method is called, the value of event comes up as "relaunch". If the user gives a parameter of params when calling `launch`, the app can get the value of params with the property "parameters" in response.
    - Line(95~98) : When the app is closed by SAM's `closeByAppId` method, the value of event comes up as "close".
- Line(108~129) : Call the `registerApp` method of SAM.

#### main.cpp

For the sample native app (`com.example.app.nativeqt`), you must:

- **Create and update the file:** `main.cpp`
- **Directory:** `com.example.app.nativeqt`

<!-- end list -->

{{< highlight cpp "linenos=table" >}}
#include "ServiceRequest.h"
#include <QApplication>
#include <QLabel>
#include <QDesktopWidget>
#include <QWindow>
#include <qpa/qplatformnativeinterface.h>

int main(int argc, char* argv[])
{
    PmLogInfo(getPmLogContext(), "MAIN_ARGV", 1, PMLOGJSON("argv[1]", argv[1]),  " ");

    QApplication app(argc, argv);
    QRect rec = QApplication::desktop()->screenGeometry();

    QLabel *label = new QLabel("Hello, Native Qt Application!!");
    label->setFixedSize(rec.width(), rec.height());
    label->setStyleSheet("background-color:yellow;");
    label->setAlignment(Qt::AlignCenter);

    QFont font = label->font();
    font.setPointSize(50);
    label->setFont(font);
    label->show();

    ServiceRequest s_request("com.example.app.nativeqt");
    s_request.registerApp();

    QWidget *widget = label->window();
    QWindow *window = widget->windowHandle();

    QApplication::platformNativeInterface()->setWindowProperty(window->handle(), QStringLiteral("appId"), QStringLiteral("com.example.app.nativeqt"));

    return app.exec();
}
{{< /highlight >}}

A brief explanation of the above file:

- Line(1) : Include "ServiceRequest.h" header file which has methods that can call services based on luna-service2.
- Line(2~6) : Include Qt header files.
- Line(10) : `argv[1]` holds the value that SAM gives to the native app when the app is first launched. The value passed as "params" in SAM's `launch` method call can be received as "parameters", and the lifecycle "event" of the native app comes up as "launch".
- Line(12~23) : Create QApplication and QLabel. Set label's position, font-size and style. After that, display the label.
- Line(25~26) : Declare a ServiceRequest object and call the `registerApp()` function.
- Line(29~31) : Use `QWindow::Handle()` to get QPlatformWindow from QLabel. Set "appId" to the window.
- Line(33) : Enters the main event loop and waits until `exit()` is called, then returns the value that was set to `exit(): 0` if `exit()` is called via `quit()`.

For detailed information on Qt, see [Qt Documentation](http://doc.qt.io/).

### README.md

This file provides general information of the native app. For the sample native app (`com.example.app.nativeqt`), you should:

- **Create and update the file:** `README.md`
- **Directory:** `com.example.app.nativeqt`

{{< caution >}}
* If the `README.md` file is missing, a build error occurs.
* Make sure the 'Summary' section is a single line. Even **any whitespace** at the line above the 'Description' section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}

**Sample README.md**

``` plaintext
Summary
-------
native app sample

Description
-----------
native app sample

How to Build on Linux
---------------------

## Dependencies

Below are the tools and libraries (and their minimum versions) required to build sample program:

* qmake

## Building

    $ cd build-webos
    $ source oe-init-build-env
    $ bitbake com.example.app.nativeqt

Copyright and License Information
=================================
Unless otherwise specified, all content, including all source code files and
documentation files in this repository are:

Copyright (c) 2018 LG Electronics, Inc.

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

## Step 2: Configure the Native App

This section describes how to prepare the configuration files required to build and test the native app.

### appinfo.json

Apps are required to have metadata before they can be packaged. This metadata is stored in a file called `appinfo.json`, which is used by the webOS device to identify the app, its icon, and other information that is needed to launch the app. For the sample native app (`com.example.app.nativeqt`), you must:

- **Create and update the file:** `appinfo.json`
- **Directory:** `com.example.app.nativeqt`

<!-- end list -->

{{< highlight json "linenos=table" >}}
{
    "id": "com.example.app.nativeqt",
    "version": "0.1.0",
    "vendor": "My Company",
    "type": "native",
    "main": "nativeqt",
    "title": "Native qt App",
    "icon": "icon.png",
    "requiredPermissions" : ["applications"],
    "nativeLifeCycleInterfaceVersion": 2
}
{{< /highlight >}}

A brief explanation of the above file:

- Line(2) : The ID for the app.
- Line(5) : The type of the native app.
- Line(6) : The executable file name.
- Line(7) : The title to be shown on the Home Launcher app.
- Line(8) : The icon to be shown on the Home Launcher app. Make sure the icon file is available in the project root directory. You can use your own icon.png (80*80) file or attached [icon.png](/images/docs/tutorials/icon.png).
- Line(9) : Specify the group to which the external service's method called by the app belongs. Because SAM's `registerApp` method belongs to "applications" group, put "applications" in this property. To check the group of each method, use [`ls-monitor`]({{< relref "ls-monitor" >}}) command with "-i" option.
- Line(10) : This field is required to use SAM's `registerApp` method.

For more details, see [appinfo.json]({{< relref "appinfo-json" >}}).

### qmake Project File

This file specifies the application name and the qmake template to be used for generating the project, as well as the source, header, and UI files included in the project.

- **Create and update the file:** `com.example.app.nativeqt.pro`
- **Directory:** `com.example.app.nativeqt`

<!-- end list -->

{{< highlight bash "linenos=table" >}}
TARGET = nativeqt

CONFIG += qt
QT += widgets gui-private

CONFIG += link_pkgconfig
PKGCONFIG += luna-service2 glib-2.0 pbnjson_cpp PmLogLib

SOURCES += ServiceRequest.cpp main.cpp
HEADERS += ServiceRequest.h

INSTALL_APPDIR = $${WEBOS_INSTALL_WEBOS_APPLICATIONSDIR}/com.example.app.nativeqt

target.path = $${INSTALL_APPDIR}

icon.path = $${INSTALL_APPDIR}
icon.files = icon.png

appinfo.path = $${INSTALL_APPDIR}
appinfo.files = appinfo.json

INSTALLS += target icon appinfo
{{< /highlight >}}

A brief explanation of the above file:

- Line(1) : Set `TARGET` name. It must be an executable file name of the app.

- Line(3) : The `CONFIG` variable is a special variable that 'qmake' uses when generating a Makefile. qt is added to the list of existing values contained in `CONFIG`.

- Line(4) : Link against the Qt Widgets Module. Add '`gui-private`' to use private GUI include directories.

- Line(6~7) : 'qmake' can configure the build process to make use of external libraries that are supported by [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/), such as the luna-service2, glib, pbnjson, and PmLog libraries.

- Line(9) : A list of source code files to be used when building the project.

- Line(10) : A list of filenames of header (`.h`) files used when building the project.

- Line(12) : Set installed directory on the target board. `INSTALL_APPDIR` would be `/usr/palm/applications/com.example.app.nativeqt ` on the target.

- Line(14~20) : `*.files` specifies a path in project directory and `*.path` specifies the path to the file system to be installed on the target.

- Line(22) : Add targets, icons, and appinfo files from the `INSTALLS` list.

For more details, see [qmake Project Files](http://doc.qt.io/archives/qt-4.8/qmake-project-files.html).

## Step 3: Build the Native App

After implementing and configuring the native app, you must build the app.

### Add the Recipe File

webOS OSE uses OpenEmbedded of Yocto Project to build its components. You must write a recipe that configures the build environment. For more details about the recipe, see [Yocto Project Reference Manual](http://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

- **Create and update the file:** `<native app name>.bb`
- **Directory:** `build-webos/meta-webosose/meta-webos/recipes-webos/<native app name>`

where `<native app name>` is the name of the native app. For the sample native app, `<native app name>` must be replaced by 'com.example.app.nativeqt'.

{{< highlight bash "linenos=table" >}}
SUMMARY = "Native Qt App"
SECTION = "webos/apps"
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/Apache-2.0;md5=89aea4e17d99a7cacdbeed46a0096b10"

WEBOS_VERSION = "1.0.0"
PR = "r0"

DEPENDS = "qtbase luna-service2 glib-2.0 libpbnjson"

inherit webos_submissions
inherit webos_qmake5
inherit webos_app

OE_QMAKE_PATH_HEADERS = "${OE_QMAKE_PATH_QT_HEADERS}"

FILES_${PN} += "${webos_applicationsdir}"
{{< /highlight >}}

A brief explanation of the above file:

- Line(1~4) : Basic descriptions of the component.

- Line(6) : Version of the component. For the webOS OSE component, this field is mandatory.

- Line(7) : Revision version of the recipe. Each recipe requires a counter to track its modification history. Make sure that you increment the version when you edit the recipe, unless you only change the value of the `WEBOS_VERSION` field or comments.

- Line(9) : A list of a recipe's build-time dependencies.

- Line(11) : Instruct OpenEmbedded to use the `WEBOS_VERSION` value as the component version number. If you develop your component on a local repository, this entry is required.

- Line(12) : Instruct OpenEmbedded that the component uses QMake for configuration, which is the preferred choice for webOS components.

- Line(13) : Inherit `webos_app`, because the component is an app.

- Line(15) : Put `OE_QMAKE_PATH_HEADERS = "${OE_QMAKE_PATH_QT_HEADERS}"` so that Qt header files can be included at compile time.

- Line(17) : `${webos_applicationsdir}` indicates `/usr/palm/applications`. `${PN}` is the package name, which is set to **webos.example.app.nativeqt**.

### Configure the Local Source Directory

To build a component that is located on the local system, you must specify the directory information.

- **Create and update the file:** `webos-local.conf`
- **Directory:** `build-webos`

For the sample native app (`com.example.app.nativqt`), you must provide the local path where the source exists.

{{< highlight bash "linenos=table" >}}
INHERIT += "externalsrc"
EXTERNALSRC_pn-com.example.app.nativeqt = "/home/username/project/com.example.app.nativeqt/"
EXTERNALSRC_BUILD_pn-com.example.app.nativeqt = "/home/username/project/com.example.app.nativeqt/build/"
PR_append_pn-com.example.app.nativeqt =".local0"
{{< /highlight >}}

A brief explanation of the above file:

- Line(1) : Inherit `externalsrc` bbclass file.

- Line(2) : The local source directory. The syntax of the property is `EXTERNALSRC_pn-<component>`. For the value, input `"<full path of the project directory>"`

- Line(3) : The local build directory. The syntax of the property is `EXTERNALSRC_BUILD_pn-<component>`. For the value, input `"<full path of the project directory>/build/"`

- Line(4) : The appended revision version (PR) for building local source files. The syntax of the property is `PR_append_pn-<component>`. This property is optional.

{{< note >}}
We recommend that you add a trailing slash (/) at the end of all local directory paths, as in Line(2) and Line(3).
{{< /note >}}

### Build the App

To build the component on the OpenEmbedded environment, enter the following commands on the shell.

``` bash
build-webos$ source oe-init-build-env
build-webos$ bitbake com.example.app.nativeqt
```

## Step 4: Run and Verify the Native App

After building the app, you must verify its functionality.

1.  **Copy the IPK to the target.**

    When the build is successful, oe-related directories are created under the project root directory. These directories are linked to the directory where the build output is generated from the actual **`build-webos`** sub-directory.

    ``` bash
    ~/project/com.example.app.nativeqt
    ├── README.md
    ├── ServiceRequest.cpp
    ├── ServiceRequest.h
    ├── appinfo.json
    ├── com.example.app.nativeqt.pro
    ├── icon.png
    ├── main.cpp
    ├── build
    ├── oe-logs -> /home/username/build/build-webos/BUILD/work/raspberrypi4-webos-linux-gnueabi/com.example.app.nativeqt/1.0.0-r0.local0/temp
    └── oe-workdir -> /home/username/build/build-webos/BUILD/work/raspberrypi4-webos-linux-gnueabi/com.example.app.nativeqt/1.0.0-r0.local0
    ```

    If you go to `oe-workdir/deploy-ipks/raspberrypi4`, you can see `com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4.ipk` file.

    ``` bash
    ~/project/com.example.app.nativeqt/oe-workdir/deploy-ipks/raspberrypi4$
    └── com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4.ipk
    ```

    Copy the IPK file to the target device using the `scp` command.

    ``` bash
    ~/project/com.example.app.nativeqt/oe-workdir/deploy-ipks/raspberrypi4$ scp com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4.ipk root@<target IP address>:/media/internal/downloads/
    ```

2.  **Install the app on the target.**

    Connect to the target using the `ssh` command and install `com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4.ipk`.

    ``` bash
    $ ssh root@<target IP address>
        root@raspberrypi4:/sysroot/home/root# cd /media/internal/downloads/
        root@raspberrypi4:/media/internal/downloads# opkg install com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4.ipk
        Installing com.example.app.nativeqt (1.0.0) on root.
        Configuring com.example.app.nativeqt.
    ```

3.  **Discover the LS2 configuration files.**

    To make LS2 daemon scan the LS2 configuration files of the app, use the `ls-control` command as follows.

    ``` bash
    root@raspberrypi4:/media/internal/downloads# ls-control scan-services

        telling hub to reload setting and rescan all directories
    ```

    {{< note >}}
    For the native app, LS2 configuration files are generated during the build process. To run the app properly, you must make the system scan the newly generated configuration files.
    {{< /note >}}

4.  **Scan the app.**

    To make System and Application Manager (SAM) scan the app, restart SAM using the `systemctl` command. This step is required so that the app can be added to the app list, which in turn makes the app appear on the Home Launcher.

    ``` bash
    root@raspberrypi4:/# systemctl restart sam
    ```

    {{< note >}}
    Rebooting the target after installing the app will have the same effect as running the `ls-control` and `systemctl` commands. However, using the commands allows you to continue testing without rebooting.
    {{< /note >}}

5.  **Run the native app.**

    To display the Home Launcher, drag the mouse cursor upward from the bottom of the screen (or swipe up from the bottom of the screen if you're using a touch display).

    {{< note >}}
    On webOS OSE 1.x, press the Windows key on your keyboard to display the Home Launcher.
    {{< /note >}}

    Click the app icon to see the window titled "Native qt app" with the following page:

    {{< figure src="/images/docs/tutorials/native-apps/native-app-screen.jpg" alt="native app screen" width="50%" height="50%" >}}

6.  **Verify the execution of the native app.**

    - Using SAM's `running` method

        You can check whether the app is running by using SAM. For more SAM methods, see [com.webos.service.applicationmanager]({{< relref "com-webos-service-applicationmanager" >}}).

        ``` bash
        root@raspberrypi4:/# luna-send -i -f luna://com.webos.service.applicationmanager/running '{"subscribe":true}'
        {
            "subscribed": true,
            "running": [
                {
                    "id": "com.example.app.nativeqt",
                    "webprocessid": "",
                    "defaultWindowType": "card",
                    "appType": "native",
                    "processid": "1778"
                }
            ],
            "returnValue": true
        }
        ```

    - Using the log file

        You can use "tail -f /var/log/messages | grep NativeQtApp" commands on the target for debugging the native app.

        - When the app is first launched

            When the app is first launched by SAM's `launch` method with "params", arguments passed from SAM is printed on `messages` file.

            ``` bash
            root@raspberrypi4:/# luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '{"id":"com.example.app.nativeqt", "params":{"test":"key1"}}'
            ```

            See the log file.

            ``` bash
            user.info com.example.app.nativeqt [] NativeQtApp MAIN_ARGV {"argv[1]":{"event":"launch","reason":"","appId":"com.example.app.nativeqt","interfaceVersion":2,"parameters":{"test":"key1"},"interfaceMethod":"registerApp","@system_native_app":true}}
            ```

        - When the app is registered by SAM successfully, it gets a "registered" event in response from SAM.

            See the log file.

            ``` bash
            user.info com.example.app.nativeqt [] NativeQtApp REGISTER_CALLBACK {"payload":{"event":"registered","subscribed":true,"returnValue":true}}
            user.info com.example.app.nativeqt [] NativeQtApp REGISTER_CALLBACK {"event":"registered"}
            ```

        - Launch the app when the app is in the foreground. Use the "params" parameter to pass specific values to the app via SAM.

            ``` bash
            root@raspberrypi4:/# luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '{"id":"com.example.app.nativeqt", "params":{"test":"key2"}}
            ```

            See the log file.

            ``` bash
            user.info com.example.app.nativeqt [] NativeQtApp REGISTER_CALLBACK {"payload":{"event":"relaunch","reason":"","appId":"com.example.app.nativeqt","parameters":{"test":"key2"},"returnValue":true}}
            user.info com.example.app.nativeqt [] NativeQtApp REGISTER_CALLBACK {"event":"relaunch"}
            user.info com.example.app.nativeqt [] NativeQtApp REGISTER_CALLBACK {"parameters":{"test":"key2"}}
            ```

        - Close the app via SAM's `closeByAppId` method, and "close" event is received.

            ``` bash
            root@raspberrypi4:/# luna-send -n 1 -f luna://com.webos.service.applicationmanager/closeByAppId '{"id":"com.example.app.nativeqt"}'
            ```

            See the log file.

            ``` bash
            user.info com.example.app.nativeqt [] NativeQtApp REGISTER_CALLBACK {"payload":{"event":"close","reason":"undefined","returnValue":true}}
            user.info com.example.app.nativeqt [] NativeQtApp REGISTER_CALLBACK {"event":"close"}
            ```

## Step 5: Deploy the Native App

You are now ready to build the webOS image including the native app and flash it to the target device.

Perform the following steps:

1.  Add the native app to the build recipe file.

    - **Filename:** `packagegroup-webos-extended.bb`
    - **Directory:** `build-webos/meta-webosose/meta-webos/recipes-core/packagegroups`
    - **Updates to be made:** Add the native app name to **`RDEPENDS _ $ {PN} =`**

    {{< highlight bash "hl_lines=6" >}}
    ...
    RDEPENDS_${PN} = " \
        activitymanager \
        audiod \
        ...
        com.example.app.nativeqt \
        ${VIRTUAL-RUNTIME_appinstalld}
        ...
    {{< /highlight >}}

    For more details, see [Yocto Project Reference Manual](https://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

2.  Build the webOS image using the following commands.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake webos-image
    ```

3.  Flash the generated webOS image to the SD card.

    **Path to image:** `build-webos/BUILD/deploy/images/raspberrypi4/webos-image-raspberrypi4-master-yyyymmddhhmmss.wic`

    ``` bash
    build-webos/BUILD/deploy/images/raspberrypi4$ sudo dd bs=4M if=webos-image-raspberrypi4-master-yyyymmddhhmmss.wic of=/dev/sdc
    ```

    For more details, see the [Flashing webOS OSE]({{< relref "flashing-webos-ose#linux" >}}) page.

After rebooting, the native app becomes available on the Launcher.
