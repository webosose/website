---
title: Built-in Native Apps
display_title: Developing Built-in Native Apps
date: 2024-10-02
weight: 20
toc: true
---

A **built-in native app** is a native app that is installed with the webOS OSE platform at build time.

{{< note "Downloadable vs. Built-In" >}}
In webOS OSE, apps and services can be classified into two types based on how they are installed on the target device.

- **Downloadable** apps/services are installed by the appinstalld service. The appinstalld service creates webOS configurations based on files created by developers. (such as trust level) Developers can modify only certain parts of the app/service settings.
- **Built-in** apps/services are built and installed by developers. Developers can **customize** app/service's configurations to suit their needs.
{{< /note >}}

This tutorial shows a step-by-step guide for creating a built-in native app from scratch.

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

The directory structure of the sample native app will be as follows:

```
samples/native-apps/built-in/
├── webos-local.conf
|
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

### Platform Source Code

Since the built-in native app is built using the [webOS OSE source code](https://github.com/webosose/build-webos), you need to download and set up the source code.

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
    `<num of CPUs>` determines how many CPU cores you will use in the build process. For more details, refer to [Appendix A. How to Find the Optimum Parallelism Values]({{< relref "building-webos-ose#appendix-a-how-to-find-the-optimum-parallelism-" >}}).
    {{< /note >}}

    After you execute the `mcf` command, various webOS-related components are downloaded in the `build-webos` directory. Then, you are ready to start.

## Step 01. Configuring an App

Copy the following files to the source code directory (default: `build-webos`):

### com.example.app.nativeqt.bb

1. Create a new directory.

    ``` bash
    mkdir build-webos/meta-webosose/meta-webos/recipes-webos/com.example.app.nativeqt/
    ```

2. Copy the file.


### webos-local.conf

1. Copy the file.


2. Edit the copied `webos-local.conf`.

    ```plain {linenos=table}
    INHERIT += "externalsrc"
    EXTERNALSRC:pn-com.example.app.nativeqt = "<PATH TO samples/native-apps/built-in/com.example.app.nativeqt>/"
    EXTERNALSRC_BUILD:pn-com.example.app.nativeqt = "<PATH TO samples/native-apps/built-in/com.example.app.nativeqt>/build/"
    PR:append:pn-com.example.app.nativeqt =".local0"
    ``` 

    1. Change `<PATH TO samples/native-apps/built-in/com.example.app.nativeqt>` with your own path.
    2. We recommend adding a trailing slash (/) at the end of all directory paths, as in Lines 2 and 3.

## Step 02. Building the App

There are two options to build a native app: **App alone** or **with the platform**.

**Choose your build option** depending on your target device.

| Option | Description |
| ------ | ----------- |
| App Alone | This option generates an `.ipk` package by building an app using the platform source code, and then installs the generated package on the target device. <br /><br />This option is **only available for Raspberry Pi 4**. For other type of devices, use the **with the platform** option. |
| With the Platform | This option embeds the app into the platform source code and build it at once. |

### App Alone

1. (Optional) Remove the existing `build` directory. (If you've ever built a built-in native app.)

    ``` bash
    rm -rf <PATH TO samples/native-apps/built-in/com.example.app.nativeqt>/build
    ```

2. Move to the root directory (`build-webos`), and build the native app.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake com.example.app.nativeqt
    ```

    If the build succeeds, an `.ipk` file will be generated under the samples directory:

    ```
    samples/native-apps/built-in/com.example.app.nativeqt/oe-workdir/deploy-ipks/raspberrypi4_64/
    └── com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4_64.ipk
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
        com.example.app.nativeqt \       # Add the app ID
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
    root@raspberrypi4-64:/media/internal/downloads# opkg install com.example.app.nativeqt_1.0.0-r0.local0_raspberrypi4_64.ipk

    Installing com.example.app.nativeqt (1.0.0) on root.
    Configuring com.example.app.nativeqt.
    No image conversions needed for com.example.app.nativeqt
    ```

4. Reboot the device. 

    ``` bash
    reboot -f
    ```

    After rebooting the device, you can see the app icon in the Launchpad.

    {{< figure src="/images/docs/tutorials/native-apps/installed-built-in-native-app.jpg" >}}

## Appendix. Code Explanation

This section briefly explains the sample codes used in this tutorial.

### com.example.app.nativeqt.bb

{{< code "com.example.app.nativeqt.bb" >}}
``` bb {linenos=table}
SUMMARY = "Native Qt App"
SECTION = "webos/apps"
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/Apache-2.0;md5=89aea4e17d99a7cacdbeed46a0096b10"
 
WEBOS_VERSION = "1.0.0"
PR = "r0"
 
DEPENDS = "qtbase luna-service2 glib-2.0 libpbnjson"
 
inherit webos_submissions
inherit webos_qmake6
inherit webos_app
inherit webos_pkgconfig
 
OE_QMAKE_PATH_HEADERS = "${OE_QMAKE_PATH_QT_HEADERS}"
 
FILES:${PN} += "${webos_applicationsdir}"
```
{{< /code >}}

A brief explanation of the above file:

- Line (2): The section where packages should be categorized.
- Line (3~4): License information for the app.
- Line (6): The version of the component. Every webOS component must contain this.
- Line (7): The revision of the recipe. Unless you’re changing the `WEBOS_VERSION` or just adding a comment, you should increment this value each time you modify the recipe.
- Line (9): A list of build-time dependencies.
- Line (11~14): Inherits other classes.
    - Line (11): Inherits `webos_submissions` to check the version information set correctly. This field is required if you develop your component on a local repository.
    - Line (12): Sets QMake for configuration.
    - Line (13): For apps, this field is required.
- Line (18): Defines files included in the package. `${webos_applicationsdir}` indicates `/usr/palm/applications`. `${PN}` is the package name (`com.example.app.nativeqt`).

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
    "id": "com.example.app.nativeqt",   # ID of the app. This ID will be used as a unique identifier for the app.
    "version": "0.0.1",
    "vendor": "My Company",
    "type": "native",                   # Type of the app
    "main": "nativeqt",                 # The HTML file that contains the contents of your app
    "title": "Native qt App",           # This string will be displayed on the app bar
    "icon": "icon.png",                 # A path to an image for your app icon
    "requiredPermissions" : ["application.operation"],  # ACG values for the app
    "nativeLifeCycleInterfaceVersion": 2
}
```

{{< note >}}
See also [appinfo.json]({{< relref "appinfo-json" >}}).
{{< /note >}}

### com.example.app.nativeqt.pro

This file defines the application name and the [qmake](https://doc.qt.io/qt-6/qmake-manual.html) template to be used for generating the project, as well as the source, header, and UI files included in the project.

{{< code "com.example.app.nativeqt.pro" >}}
``` cmake {linenos=table}
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

- Line (1): Sets `TARGET` name. It must be an executable file name of the app.
- Line (3): The `CONFIG` variable is a special variable that ‘qmake’ uses when generating a Makefile. qt is added to the list of existing values contained in CONFIG.
- Line (4): Links against the QtCore Module. Add `gui-private` to use private GUI include directories.
- Line (15): A list of filenames of header (`.h`) files used when building the project.
- Line (17): Sets installed directory on the target board. `INSTALL_APPDIR` would be `/usr/palm/applications/com.example.app.nativeqt` on the target.
- Line (19~25): `*.files` specifies a path in project directory and `*.path` specifies the path to the file system to be installed on the target.
- Line (27): Adds targets, icons, and appinfo files from the `INSTALLS` list.

{{< note >}}
For more details, see [qmake Project Files](http://doc.qt.io/archives/qt-4.8/qmake-project-files.html).
{{< /note >}}

### main.cpp

This file defines your native app's behavior.

{{< code "main.cpp" >}}
``` cpp {linenos=table}
#include "MyOpenGLWindow.h"
#include "ServiceRequest.h"
#include <QGuiApplication>
#include <QWindow>
#include <QScreen>
#include <qpa/qplatformnativeinterface.h>
 
int main(int argc, char **argv)
{
    QGuiApplication app(argc, argv);
    PmLogInfo(getPmLogContext(), "MAIN_ARGV1", 1, PMLOGKFV("argv", "%s", argv[1]),  " ");
 
    QString displayId = (getenv("DISPLAY_ID") ? getenv("DISPLAY_ID"): "0");
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

- Line (1): Includes `MyOpenGLWindow.h` header file which has `OpenGLSurface` type window class.
- Line (2): Includes `ServiceRequest.h` header file which has member functions that can call services based on luna-service2.
- Line (3~6): Includes Qt header files.
- Line (11): `argv[1]` holds the value that SAM gives to the native app when the app is first launched. The value passed as “params” in SAM’s `launch` method call can be received as “parameters”, and the lifecycle “event” of the native app comes up as “launch”.
- Line (13~14): Gets the `DISPLAY_ID` property from the environment variable so that the app can be launched on the display corresponding to the `displayAffinity` value passed as a launch parameter.
- Line (16~20): Creates a `MyOpenGLWindow` object. Set the window’s size and display the text on the screen.
- Line (22~23): Creates a `ServiceRequest` object and call the `registerApp()` function.
- Line (25~26): Uses `QWindow::Handle()` to get `QPlatformWindow` from `MyOpenGLWindow`. Set `appId` and `displayAffinity` to the window.
- Line (28): Enters the main event loop and waits until `exit()` is called, then returns the value that was set to `exit(): 0` if `exit()` is called via `quit()`.

{{< note >}}
For detailed information on Qt, see [Qt documentation](http://doc.qt.io/).
{{< /note >}}

### MyOpenGLWindow.cpp

This file defines your native app's behavior.

{{< code "MyOpenGLWindow.cpp" >}}
``` cpp {linenos=table}
#include "MyOpenGLWindow.h"
#include <QOpenGLContext>
#include <QOpenGLPaintDevice>
#include <QPainter>
 
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
 
MyOpenGLWindow::~MyOpenGLWindow()
{
    delete m_device;
}
 
void MyOpenGLWindow::render()
{
    m_context->makeCurrent(this);
 
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);
 
    m_device = new QOpenGLPaintDevice;
    m_device->setSize(size() * devicePixelRatio());
    m_device->setDevicePixelRatio(devicePixelRatio());
 
    QRect rect = QRect(0, 0, m_windowRect.width(), m_windowRect.height());
    QPainter painter(m_device);
 
    QFont font = painter.font();
    font.setPointSize(50);
    font.setStyleHint(QFont::Helvetica, QFont::PreferAntialias);
 
    painter.setFont(font);
    painter.setRenderHint(QPainter::Antialiasing);
    painter.setPen(Qt::yellow);
    painter.drawText(rect, Qt::AlignCenter, "Hello, Native Qt Application!!");
 
    m_context->swapBuffers(this);
}
 
void MyOpenGLWindow::exposeEvent(QExposeEvent *event)
{
    Q_UNUSED(event);
    if (isExposed()){
        render();
    }
}
```
{{< /code >}}

A brief explanation of the above file:

- Line (9): Sets the surface type of `MyOpenGLWindow` to `OpenGLSurface`. The type can be `OpenGLSurface` or `RasterGLSurface`.

### MyOpenGLWindow.h

This file defines your native app's behavior.

{{< code "MyOpenGLWindow.h" >}}
``` cpp {linenos=table}
#ifndef MYOPENGLWINDOW_H
#define MYOPENGLWINDOW_H
 
#include <QtGui/QWindow>
#include <QtGui/QOpenGLFunctions>
 
QT_BEGIN_NAMESPACE
class QPainter;
class QOpenGLContext;
class QOpenGLPaintDevice;
QT_END_NAMESPACE
 
class MyOpenGLWindow : public QWindow, protected QOpenGLFunctions
{
    Q_OBJECT
public:
    MyOpenGLWindow(QRect rect);
    ~MyOpenGLWindow();
 
    virtual void render();
 
protected:
    void exposeEvent(QExposeEvent *event) override;
 
private:
    QRect m_windowRect;
    QOpenGLContext *m_context;
    QOpenGLPaintDevice *m_device;
};
#endif
```
{{< /code >}}

### README.md

This file provides overall information about the app.

{{< caution >}}
- If the README.md file is missing, a build error occurs.
- Make sure the ‘Summary’ section is a single line. Even any whitespace at the line above the ‘Description’ section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}


``` markdown
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

### ServiceRequest.cpp

Define `ServiceRequest` class member functions. In addition, add helper functions related to `PbnJson` to use the library conveniently.

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

A  brief explanation of the above file:

- Line (3~18): Creates pbnjson utility functions, which convert String to Json and Json to String based on pbnjson library. pbnjson is a JSON engine, implemented as a pair of libraries with APIs for easier C and C++ abstraction.
- Line (20~38): Defines constructor and destructor of `ServiceRequest` class.
- Line (40~69): Defines functions to register and unregister com.example.app.nativeqt to and from luna-service.
- Line (71~112): Implements the callback function of `registerApp`.
    - Line (82~85): When the app first calls the method, the value of event in response is “registered”.
    - Line (86~100): When the app is already running and SAM’s launch method is called, the value of event comes up as “relaunch”.
    - Line (89~92): Calls the `showFullScreen` function to change the app’s state from background to foreground.
    - Line (94~99): If the user gives a parameter of params when calling launch, the app can get the value of params with the property “parameters” in response.
    - Line (101~104): When the app is closed by SAM’s `closeByAppId` method, the value of event comes up as “close”.
- Line (114~135): Calls the `registerApp` method of SAM. 

### ServiceRequest.h

Define a class that can register to luna-service2 and call `registerApp` method of System and Application Manager (SAM). This header file has the function declaration.

{{< code "ServiceRequest.h" >}}
``` cpp {linenos=table}
#ifndef SERVICEREQUEST_H
#define SERVICEREQUEST_H

#include <glib.h>
#include <string>
#include <luna-service2/lunaservice.h>
#include <pbnjson.hpp>
#include <PmLog.h>
#include <QtGui/QWindow>

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
    ServiceRequest(std::string appId, QWindow &window);
    virtual ~ServiceRequest();
    LSHandle* getHandle() const { return m_serviceHandle; }
    void registerApp();
    QWindow* m_window;

protected:
    LSHandle* acquireHandle();
    void clearHandle();

private:
    GMainLoop* m_mainLoop;
    LSHandle* m_serviceHandle;
    std::string m_appId;
};
#endif
```
{{< /code >}}

A brief explanation of the above file:

- Line (11~19): A function that calls `PmLogGetContext()` in PmLog library to print logs. For more details, see [Using PmLogLib in C/C++]({{< relref "using-pmloglib-in-c-cpp" >}}).
