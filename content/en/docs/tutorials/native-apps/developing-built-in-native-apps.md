---
title: Built-in Native Apps
display_title: Developing Built-in Native Apps
date: 2024-09-11
weight: 20
toc: true
---

To create a built-in native app, you must write the source code and prepare the required configuration files.

For easier understanding, the process to create a built-in native app is explained using a sample app in [Sample Code Repository](https://github.com/webosose/samples). The sample app has the following features:

- Displays a "Hello, Native Qt Application!!" message on screen.
- Calls **`com.webos.service.applicationmanager/registerApp`** method.
- Prints logs when it is first launched.
- Prints logs with the updated parameter and status whenever the app is relaunched.

The directory structure of the sample app must be as follows:

``` bash
native-apps/built-in/
├── build-config/
│   ├── com.example.app.nativeqt.bb
│   └── webos-local.conf
└── com.example.app.nativeqt/
    ├── appinfo.json
    ├── com.example.app.nativeqt.pro
    ├── icon.png
    ├── main.cpp
    ├── MyOpenGLWindow.cpp
    ├── MyOpenGLWindow.h
    ├── README.md
    ├── ServiceRequest.cpp
    └── ServiceRequest.h
```

Developing a built-in native app requires the following steps:

* [Prerequisites](#before-you-begin)
* [Step 1: Implementation](#step-1-implement-the-native-app)
* [Step 2: Configuration](#step-2-configure-the-native-app)
* [Step 3: Build](#step-3-build-the-native-app)
* [Step 4: Verification](#step-4-run-and-verify-the-native-app)
* [Step 5: Deployment](#step-5-deploy-the-native-app)

## Before you begin

- Build and flash the webOS OSE image. For detailed information, see [Building webOS OSE]({{< relref "building-webos-ose" >}}) and [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).
- Download the sample repository, and move into `samples/native-apps/built-in` directory.

    ``` bash
    $ git clone https://github.com/webosose/samples
    $ cd samples/native-apps/built-in
    ```

## Step 1: Implement the Native App

### Source Code

First, define the functionality of the native app on the source code.

{{< note >}}
In this guide, we will only explain essential parts of the sample codes. For full list of codes, refer to the sample repository.
{{< /note >}}

#### MyOpenGLWindow.cpp

Define `MyOpenGLWindow` class member functions.

{{< code "MyOpenGLWindow.cpp" >}}
``` cpp {linenos=table}
...
MyOpenGLWindow::MyOpenGLWindow(QRect rect)
    : m_windowRect(rect)
    , m_device(nullptr)
{
    setSurfaceType(QWindow::OpenGLSurface);
    create();

    m_context = new QOpenGLContext(this);
    m_context->create();

    m_context->makeCurrent(this);
    initializeOpenGLFunctions();
}
...
```
{{< /code >}}

A brief explanation of the above file:

- Line(7) : Set the surface type of `MyOpenGLWindow` to `OpenGLSurface`. The type can be `OpenGLSurface` or `RasterGLSurface`.

#### ServiceRequest.h

Define a class that can register to luna-service2 and call `registerApp` method of System and Application Manager (SAM). This header file has the function declaration.

{{< code "ServiceRequest.h" >}}
``` cpp {linenos=table}
...
static PmLogContext getPmLogContext()
{
    static PmLogContext s_context = 0;
    if (0 == s_context)
    {
        PmLogGetContext("NativeQtApp", &s_context);
    }
    return s_context;
}
...
```
{{< /code >}}

A brief explanation of the above file:

- Line(3~11) : A function that calls `PmLogGetContext()` in PmLog library to print logs. For more details, see [Using PmLogLib in C/C++]({{< relref "using-pmloglib-in-c-cpp" >}}).

#### ServiceRequest.cpp

Define `ServiceRequest` class member functions. In addition, add helper functions related to PbnJson to use the library conveniently.

{{< code "ServiceRequest.cpp" >}}
``` cpp {linenos=table}
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

ServiceRequest::ServiceRequest(std::string appId, QWindow &window)
    : m_mainLoop(g_main_loop_new(nullptr, false))
    , m_serviceHandle(nullptr)
{
    m_appId = appId;
    m_window = &window;
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

static bool registerAppCallback(LSHandle* sh, LSMessage* msg, void* context)
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
            //relaunch screen
            if (context != nullptr)
            {
                ((ServiceRequest*)context)->m_window->showFullScreen();
            }
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
                this,
                NULL,
                &lserror))
    {
        LSErrorPrint(&lserror, stderr);
    }
}
```
{{< /code >}}

A brief explanation of the above file:

- Line(3~18) : Create pbnjson utility functions, which convert String to Json and Json to String based on pbnjson library. pbnjson is a JSON engine, implemented as a pair of libraries with APIs for easier C and C++ abstraction.
- Line(20~38) : Define constructor and destructor of `ServiceRequest` class.
- Line(40~69) : Define functions to register and unregister `com.example.app.nativeqt` to and from luna-service. For more details about luna-service functions, see the [luna-service2 Library API Reference]({{< relref "luna-service2-library-api-reference" >}}).
- Line(71~112) : Implement the callback function of `registerApp`.
    - Line(82~85) : When the app first calls the method, the value of event in response is "registered".
    - Line(86~100) : When the app is already running and SAM’s `launch` method is called, the value of event comes up as "relaunch". 
        - Line(89~92) : Call the `showFullScreen` function to change the app's state from background to foreground.
        - Line(94~99) : If the user gives a parameter of params when calling `launch`, the app can get the value of params with the property "parameters" in response.
    - Line(101~104) : When the app is closed by SAM's `closeByAppId` method, the value of event comes up as "close".
- Line(114~135) : Call the `registerApp` method of SAM.

#### main.cpp

{{< code "main.cpp" >}}
``` cpp {linenos=table}
#include "MyOpenGLWindow.h"
#include "ServiceRequest.h"
#include <QtGui/QGuiApplication>
#include <QtGui/QWindow>
#include <QtGui/QScreen>
#include <qpa/qplatformnativeinterface.h>

int main(int argc, char **argv)
{
    QGuiApplication app(argc, argv);
    PmLogInfo(getPmLogContext(), "MAIN_ARGV1", 1, PMLOGKFV("argv", "%s", argv[1]),  " ");

    QString displayId = (getenv("DISPLAY_ID") ? getenv("DISPLAY_ID") : "0");
    PmLogInfo(getPmLogContext(), "DISPLAY", 1, PMLOGKFV("Id", "%s", displayId.toStdString().c_str()),  " ");

    QScreen *screen = QGuiApplication::primaryScreen();
    QRect screenGeometry = screen->geometry();
    MyOpenGLWindow window(screenGeometry);
    window.resize(screenGeometry.width(), screenGeometry.height());
    window.show();

    ServiceRequest s_request("com.example.app.nativeqt", window);
    s_request.registerApp();

    QGuiApplication::platformNativeInterface()->setWindowProperty(window.handle(), "appId", "com.example.app.nativeqt");
    QGuiApplication::platformNativeInterface()->setWindowProperty(window.handle(), "displayAffinity", displayId);

    return app.exec();
}
```
{{< /code >}}

A brief explanation of the above file:

- Line(1) : Include `MyOpenGLWindow.h` header file which has `OpenGLSurface` type window class.
- Line(2) : Include `ServiceRequest.h` header file which has member functions that can call services based on luna-service2.
- Line(3~6) : Include Qt header files.
- Line(11) : `argv[1]` holds the value that SAM gives to the native app when the app is first launched. The value passed as "params" in SAM's `launch` method call can be received as "parameters", and the lifecycle "event" of the native app comes up as "launch".
- Line(13~14) : Get the `DISPLAY_ID` property from the environment variable so that the app can be launched on the display corresponding to the `displayAffinity` value passed as a launch parameter.
- Line(16~20) : Create a MyOpenGLWindow object. Set the window's size and display the text on the screen.
- Line(22~23) : Create a ServiceRequest object and call the `registerApp()` function.
- Line(25~26) : Use `QWindow::Handle()` to get QPlatformWindow from MyOpenGLWindow. Set "appId" and "displayAffinity" to the window.
- Line(28) : Enters the main event loop and waits until `exit()` is called, then returns the value that was set to `exit(): 0` if `exit()` is called via `quit()`.

For detailed information on Qt, see [Qt documentation](http://doc.qt.io/).

## README.md

This file provides general information of the native app.

{{< caution >}}
- If the README.md file is missing, a build error occurs.
- Make sure the ‘Summary’ section is a single line. Even any whitespace at the line above the ‘Description’ section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}

{{< code "Sample README.md">}}
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

## Step 2: Configure the Native App

This section describes how to prepare the configuration files required to build and test the native app.

### appinfo.json

Apps are required to have metadata before they can be packaged. This metadata is stored in a file called `appinfo.json`, which is used by the webOS device to identify the app, its icon, and other information that is needed to launch the app.

{{< code "appinfo.json" >}}
``` json {linenos=table}
{
    "id": "com.example.app.nativeqt",
    "version": "0.1.0",
    "vendor": "My Company",
    "type": "native",
    "main": "nativeqt",
    "title": "Native qt App",
    "icon": "icon.png",
    "requiredPermissions" : ["application.operation"],
    "nativeLifeCycleInterfaceVersion": 2
}
```
{{< /code >}}

A brief explanation of the above file:

- Line(2) : The ID for the app.
- Line(5) : The type of the native app.
- Line(6) : The executable file name.
- Line(7) : The title to be shown on the Launchpad.
- Line(8) : The icon to be shown on the Launchpad and App Bar. Make sure the icon file is available in the project root directory. You can use your own icon.png (80*80) file or attached [icon.png](/images/docs/tutorials/icon.png).
- Line(9) : Specify the group to which the external service's method called by the app belongs. Because SAM's `registerApp` method belongs to "application.operation" group, put "application.operation" in this property. To check the group of each method, use [`ls-monitor`]({{< relref "ls-monitor" >}}) command with "-i" option.
- Line(10) : This field is required to use SAM's `registerApp` method.

For more details, see [appinfo.json]({{< relref "appinfo-json" >}}).

### qmake Project File

This file specifies the application name and the qmake template to be used for generating the project, as well as the source, header, and UI files included in the project.

{{< code "com.example.app.nativeqt.pro" >}}
``` bash {linenos=table}
TARGET = nativeqt

CONFIG += qt
QT += core gui-private
# if you use QT 6.x , you should include opengl. because opengl is not included by default.
# but if you use QT 5.x under, opengl is included by default so you do not include opengl.
greaterThan(QT_MAJOR_VERSION, 5) {
    QT += opengl
}

CONFIG += link_pkgconfig
PKGCONFIG += luna-service2 glib-2.0 pbnjson_cpp PmLogLib

SOURCES += ServiceRequest.cpp MyOpenGLWindow.cpp main.cpp
HEADERS += ServiceRequest.h MyOpenGLWindow.h

INSTALL_APPDIR = $${WEBOS_INSTALL_WEBOS_APPLICATIONSDIR}/com.example.app.nativeqt

target.path = $${INSTALL_APPDIR}

icon.path = $${INSTALL_APPDIR}
icon.files = icon.png

appinfo.path = $${INSTALL_APPDIR}
appinfo.files = appinfo.json

INSTALLS += target icon appinfo
```
{{< /code >}}

A brief explanation of the above file:

- Line(1) : Set `TARGET` name. It must be an executable file name of the app.
- Line(3) : The `CONFIG` variable is a special variable that 'qmake' uses when generating a Makefile. qt is added to the list of existing values contained in `CONFIG`.
- Line(4) : Link against the QtCore Module. Add '`gui-private`' to use private GUI include directories.
- Line(11~12) : 'qmake' can configure the build process to make use of external libraries that are supported by [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/), such as the luna-service2, glib, pbnjson, and PmLog libraries.
- Line(14) : A list of source code files to be used when building the project.
- Line(15) : A list of filenames of header (`.h`) files used when building the project.
- Line(17) : Set installed directory on the target board. `INSTALL_APPDIR` would be `/usr/palm/applications/com.example.app.nativeqt ` on the target.
- Line(19~25) : `*.files` specifies a path in project directory and `*.path` specifies the path to the file system to be installed on the target.
- Line(27) : Add targets, icons, and appinfo files from the `INSTALLS` list.

For more details, see [qmake Project Files](http://doc.qt.io/archives/qt-4.8/qmake-project-files.html).

## Step 3: Build the Native App

After implementing and configuring the native app, you must build the app.

### Add the Recipe File

webOS OSE uses OpenEmbedded of Yocto Project to build its components. OpenEmbedded needs a recipe file that configures the build environment. For more details about the recipe, see [Yocto Project Reference Manual](http://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

You must move the recipe file into webOS OSE project directory.

- **Recipe file:** `samples/native-apps/built-in/build-config/com.example.app.nativeqt.bb`
- **Destination Directory:** `build-webos/meta-webosose/meta-webos/recipes-webos/<native app name>`

where `<native app name>` is the name of the native app. For the sample native app, `<native app name>` must be replaced by 'com.example.app.nativeqt'.

{{< code "com.example.app.nativeqt.bb" >}}
``` bash {linenos=table}
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
inherit webos_pkgconfig

OE_QMAKE_PATH_HEADERS = "${OE_QMAKE_PATH_QT_HEADERS}"

FILES:${PN} += "${webos_applicationsdir}"
```
{{< /code >}}

A brief explanation of the above file:

- Line(1~4) : Basic descriptions of the component.
- Line(6) : Version of the component. For the webOS OSE component, this field is mandatory.
- Line(7) : Revision version of the recipe. Each recipe requires a counter to track its modification history. Make sure that you increment the version when you edit the recipe, unless you only change the value of the `WEBOS_VERSION` field or comments.
- Line(9) : A list of a recipe's build-time dependencies.
- Line(11) : Instruct OpenEmbedded to use the `WEBOS_VERSION` value as the component version number. If you develop your component on a local repository, this entry is required.
- Line(12) : Instruct OpenEmbedded that the component uses QMake for configuration, which is the preferred choice for webOS components.
- Line(13) : Inherit `webos_app`, because the component is an app.
- Line(14) : For the component that uses [pkg-config](https://en.wikipedia.org/wiki/Pkg-config) at build time or installs a pkg-config file (`.pc`), this entry is required.
- Line(16) : Put `OE_QMAKE_PATH_HEADERS = "${OE_QMAKE_PATH_QT_HEADERS}"` so that Qt header files can be included at compile time.
- Line(18) : `${webos_applicationsdir}` indicates `/usr/palm/applications`. `${PN}` is the package name, which is set to **webos.example.app.nativeqt**.

### Configure the Local Source Directory

To build a component that is located on the local system, you must specify the directory information.

You must move the configuration file into webOS OSE project directory.

- **Configuration file:** `samples/native-apps/built-in/build-config/webos-local.conf`
- **Destination directory:** `build-webos`

For the sample native app (`com.example.app.nativqt`), you must provide the local path where the source exists.

{{< code "webos-local.conf" >}}
``` bash {linenos=table}
INHERIT += "externalsrc"
EXTERNALSRC:pn-com.example.app.nativeqt = "/home/username/project/com.example.app.nativeqt/"
EXTERNALSRC_BUILD:pn-com.example.app.nativeqt = "/home/username/project/com.example.app.nativeqt/build/"
PR:append:pn-com.example.app.nativeqt =".local0"
```
{{< /code >}}

A brief explanation of the above file:

- Line(1) : Inherit `externalsrc` bbclass file.
- Line(2) : The local source directory. The syntax of the property is `EXTERNALSRC:pn-<component>`. For the value, input `"<absolute path of the project directory>"`
- Line(3) : The local build directory. The syntax of the property is `EXTERNALSRC_BUILD:pn-<component>`. For the value, input `"<absolute path of the project directory>/build/"`
- Line(4) : The appended revision version (PR) for building local source files. The syntax of the property is `PR:append:pn-<component>`. This property is optional.

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
    com.example.app.nativeqt
    ├── appinfo.json
    ├── build
    ├── com.example.app.nativeqt.pro
    ├── icon.png
    ├── main.cpp
    ├── MyOpenGLWindow.cpp
    ├── MyOpenGLWindow.h
    ├── oe-logs -> /home/username/build/build-webos/BUILD/work/raspberrypi4_64-webos-linux-gnueabi/com.example.app.nativeqt/1.0.0-r0.local0/temp
    ├── oe-workdir -> /home/username/build/build-webos/BUILD/work/raspberrypi4_64-webos-linux-gnueabi/com.example.app.nativeqt/1.0.0-r0.local0
    ├── .md
    ├── ServiceRequest.cpp
    └── ServiceRequest.h
    ```

    If you go to `oe-workdir/deploy-ipks/raspberrypi4_64`, you can see `com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4_64.ipk` file.

    ``` bash
    com.example.app.nativeqt/oe-workdir/deploy-ipks/raspberrypi4_64$
    └── com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4_64.ipk
    ```

    Copy the IPK file to the target device using the `scp` command.

    ``` bash
    com.example.app.nativeqt/oe-workdir/deploy-ipks/raspberrypi4_64$ scp com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4_64.ipk root@<target IP address>:/media/internal/downloads/
    ```

2.  **Install the app on the target.**

    Connect to the target using the `ssh` command and install `com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4_64.ipk`.

    ``` bash
    $ ssh root@<target IP address>
        root@raspberrypi4-64:/sysroot/home/root# cd /media/internal/downloads/
        root@raspberrypi4-64:/media/internal/downloads# opkg install com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4_64.ipk
        Installing com.example.app.nativeqt (1.0.0) on root.
        Configuring com.example.app.nativeqt.
    ```

3.  **Discover the LS2 configuration files.**

    To make LS2 daemon scan the LS2 configuration files of the app, use the `ls-control` command as follows.

    ``` bash
    root@raspberrypi4-64:/media/internal/downloads# ls-control scan-services

        telling hub to reload setting and rescan all directories
    ```

    {{< note >}}
    For the native app, LS2 configuration files are generated during the build process. To run the app properly, you must make the system scan the newly generated configuration files.
    {{< /note >}}

4.  **Scan the app.**

    To make System and Application Manager (SAM) scan the app, restart SAM using the `systemctl` command. This step is required so that the app can be added to the app list, which in turn makes the app appear on the Launchpad.

    ``` bash
    root@raspberrypi4-64:/# systemctl restart sam
    ```

    {{< note >}}
    Rebooting the target after installing the app will have the same effect as running the `ls-control` and `systemctl` commands. However, using the commands allows you to continue testing without rebooting.
    {{< /note >}}

5.  **Run the native app.**

    Drag the mouse cursor upward from the bottom of the screen (or swipe up from the bottom of the screen if you’re using a touch display).

    {{< note >}}
    On webOS OSE 1.x, press the Windows key.
    {{< /note >}}

    Click the Launchpad icon.

    {{< figure src="/images/docs/tutorials/launchpad-icon.jpg" width="450px" alt="Launchpad icon" caption="" >}}

    Click the app icon to see the window titled "Native qt app" with the following page:

    {{< figure src="/images/docs/tutorials/native-apps/native-app-screen.png" alt="native app screen" width="60%" height="60%" >}}

6.  **Verify the execution of the native app.**

    - Using SAM's `running` method

        You can check whether the app is running by using SAM. For more SAM methods, see [com.webos.service.applicationmanager]({{< relref "com-webos-service-applicationmanager" >}}).

        ``` bash
        root@raspberrypi4-64:/# luna-send -i -f luna://com.webos.service.applicationmanager/running '{"subscribe":true}'
        {
            "subscribed": true,
            "running": [
                {
                    "webprocessid": "",
                    "instanceId": "0d67ed57-6585-4de5-b1cb-6f63ea04716d0",
                    "displayId": 0,
                    "defaultWindowType": "card",
                    "appType": "native",
                    "id": "com.example.app.nativeqt",
                    "processid": "1337",
                    "launchPointId": "com.example.app.nativeqt_default"
                }
            ],
            "returnValue": true
        }
        ```

    - Using the log file

        You can use the `journalctl` command on the target for debugging the native app.

        Launch the app when the app is in the foreground, and the “relaunch” event is received.
        
        ``` bash
        root@raspberrypi4-64:/# luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '{"id":"com.example.app.nativeqt", "params":{"test":"key2"}}
        ```

        See the log file.

        ``` bash
        root@raspberrypi4-64:/#journalctl | grep NativeQtApp

        Dec 31 16:00:35 raspberrypi4-64 nativeqt[1538]: [] [pmlog] NativeQtApp REGISTER_CALLBACK {"payload":{"event":"relaunch","returnValue":true,"appId":"com.example.app.nativeqt","message":"relaunch","parameters":{"test":"key2","displayAffinity":0},"reason":"com.webos.lunasend-1552"}}
        Dec 31 16:00:35 raspberrypi4-64 nativeqt[1538]: [] [pmlog] NativeQtApp REGISTER_CALLBACK {"event":"relaunch"}
        Dec 31 16:00:35 raspberrypi4-64 nativeqt[1538]: [] [pmlog] NativeQtApp REGISTER_CALLBACK {"parameters":{"test":"key2","displayAffinity":0}}
        ```

## Step 5: Deploy the Native App

You are now ready to build the webOS image including the native app and flash it to the target device.

Perform the following steps:

1.  Add the native app to the build recipe file.

    - **Filename:** `packagegroup-webos-extended.bb`
    - **Directory:** `build-webos/meta-webosose/meta-webos/recipes-core/packagegroups`
    - **Updates to be made:** Add the native app name to **`RDEPENDS:${PN} =`**

    ``` bash {hl_lines=[6]}
    ...
    RDEPENDS:${PN} = " \
        activitymanager \
        audiod \
        ...
        com.example.app.nativeqt \
        ${VIRTUAL-RUNTIME_appinstalld}
        ...
    ```

    For more details, see [Yocto Project Reference Manual](https://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

2.  Build the webOS image using the following commands.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake webos-image
    ```

3.  Flash the generated webOS image to the SD card.

    **Path to image:** `build-webos/BUILD/deploy/images/raspberrypi4-64/webos-image-raspberrypi4-64.rootfs.wic`

    ``` bash
    build-webos/BUILD/deploy/images/raspberrypi4-64$ sudo dd bs=4M if=webos-image-raspberrypi4-64.rootfs.wic of=/dev/sdc
    ```

    For more details, see the [Flashing webOS OSE]({{< relref "flashing-webos-ose#linux" >}}) page.

After rebooting, the native app becomes available on the Launchpad.
