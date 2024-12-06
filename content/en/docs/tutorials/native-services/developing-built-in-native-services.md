---
title: Built-in Native Services
display_title: Developing Built-in Native Services
date: 2024-11-29
weight: 20
toc: true
---

A **built-in native service** is a native service that is installed with the webOS OSE platform at build time.

{{< note "Downloadable vs. Built-In" >}}
In webOS OSE, apps and services can be classified into two types based on how they are installed on the target device.

- **Downloadable** apps/services are installed by the appinstalld service. The appinstalld service creates webOS configurations based on files created by developers. (such as trust level) Developers can modify only certain parts of the app/service settings.
- **Built-in** apps/services are built and installed by developers. Developers can **customize** app/service's configurations to suit their needs.
{{< /note >}}

This tutorial shows a step-by-step guide for creating a built-in native service from scratch.

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
samples/native-services/built-in/
├── build-config/
│   ├── com.example.service.native/
    │   └── com.example.service.native.service
│   ├── com.example.service.native.bb
│   └── webos-local.conf
└── com.example.service.native/
    ├── files/
    │   └── sysbus/
    │       ├── com.example.service.native.api.json.in
    │       ├── com.example.service.native.groups.json.in
    │       ├── com.example.service.native.perm.json.in
    │       ├── com.example.service.native.role.json.in
    │       └── com.example.service.native.service.in
    ├── CMakeLists.txt
    ├── main.cpp
    └── README.md
```

### Platform Source Code

Since the built-in native service is built using the [webOS OSE source code](https://github.com/webosose/build-webos), you need to download and set up the source code.

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

## Step 01. Configuring a Service

Copy the following files to the source code directory (default: `build-webos`):

- `samples/native-services/built-in/build-config/com.example.service.native/` (copy the whole directory)
- `samples/native-services/built-in/build-config/com.example.service.native.bb`
- `samples/native-services/built-in/build-config/webos-local.conf`

### com.example.service.native/ & com.example.service.native.bb

1. Create a new directory.

    ``` bash
    mkdir build-webos/meta-webosose/meta-webos/recipes-webos/com.example.service.native/
    ```

2. Copy the file.

    - **From**:
        - `samples/native-services/built-in/build-config/com.example.service.native/`
        - `samples/native-services/built-in/build-config/com.example.service.native.bb`
    - **To**: `build-webos/meta-webosose/meta-webos/recipes-webos/com.example.service.native/`

After moving the files and folders, the directory hierarchy will be as follows:

```
build-webos/meta-webosose/meta-webos/recipes-webos/com.example.service.native/
├── com.example.service.native/
|   └── com.example.service.native.service
└── com.example.service.native.bb
```

### webos-local.conf

1. Copy the file.

    - **From**: `samples/native-services/built-in/build-config/webos-local.conf`
    - **To**: `build-webos/webos-local.conf`

2. Edit the copied `webos-local.conf`.

    ```plain
    INHERIT += "externalsrc"
    EXTERNALSRC:pn-com.example.service.native = "<PATH TO samples/native-services/built-in/com.example.service.native>/"
    EXTERNALSRC_BUILD:pn-com.example.service.native = "<PATH TO samples/native-services/built-in/com.example.service.native>/build/"
    PR:append:pn-com.example.service.native =".local0"
    ``` 

    1. Change `<PATH TO samples/native-services/built-in/com.example.service.native>` with your own path.
    2. We recommend adding a trailing slash (/) at the end of all directory paths, as in Lines 2 and 3.

## Step 02. Building the Service

There are two options to build a native service: **Service alone** or **with the platform**.

**Choose your build option** depending on your target device.

| Option | Description |
| ------ | ----------- |
| Service Alone | This option generates an `.ipk` package by building an app using the platform source code, and then installs the generated package on the target device. <br /><br />This option is **only available for Raspberry Pi 4**. For other type of devices, use the **with the platform** option. |
| With the Platform | This option embeds the app into the platform source code and build it at once. |

### Service Alone

1. (Optional) Remove the existing `build` directory. (If you've ever built a built-in native service.)

    ``` bash
    rm -rf <PATH TO samples/native-services/built-in/com.example.service.native>/build
    ```

2. Move to the root directory (`build-webos`), and build the native app.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake com.example.service.native
    ```

    If the build succeeds, an `.ipk` file will be generated under the samples directory:

    ```
    samples/native-services/built-in/com.example.service.native/oe-workdir/deploy-ipks/raspberrypi4_64
    └── com.example.service.native_1.0.0-r0.local0_raspberrypi4_64.ipk
    ```

    Now it's time to install the generated `.ipk` on your target device. Go to [Step 03. Installing the App](#step-03-installing-the-app).

### With Platform

{{< note >}}
In this section, there are a lot of contents about modifying **recipe** files. For more about the recipe files, refer to the [Yocto Project Reference Manual](https://docs.yoctoproject.org/).
{{< /note >}}

1. Add the service ID to the build recipe file.

    **File Path**: `build-webos/meta-webosose/meta-webos/recipes-core/packagegroups/packagegroup-webos-extended.bb`

    ``` bb
    ...
    RDEPENDS:${PN} += " \
        activitymanager \
        ...
        com.example.service.native \       # Add the service ID
    "
        ...
    ```

2. Download the [webos-initscripts](https://github.com/webosose/webos-initscripts) component. You can download it anywhere you want.

    ``` bash
    git clone https://github.com/webosose/webos-initscripts.git
    cd webos-initscripts
    ```

3. Make a symbolic link of the service. This will run the service automatically after boot.

    ``` bash
    cd common/lib/systemd/system/webos-bd.target.wants/
    ln -s ../com.example.service.native.service com.example.service.native.service
    ls -al
    total 8
    ...
    lrwxrwxrwx ... com.example.service.native.service -> ../com.example.service.native.service
    ...
    ```

4. Go to the `webos-local.conf` file.

    ```
    vi build-webos/webos-local.conf
    ```

5. Add the path of the `webos-initscripts` directory. 

    Change `<PATH TO webos-initscripts>` with your own path.

    ```plain
    INHERIT += "externalsrc"
    EXTERNALSRC:pn-com.example.service.native = "<PATH TO samples/native-services/built-in/com.example.service.native>/"
    EXTERNALSRC_BUILD:pn-com.example.service.native = "<PATH TO samples/native-services/built-in/com.example.service.native>/build/"
    PR:append:pn-com.example.service.native =".local0"
    EXTERNALSRC:pn-webos-initscripts = "<PATH TO webos-initscripts>"
    EXTERNALSRC_BUILD:pn-webos-initscripts = "<PATH TO webos-initscripts>/build"
    PR:append:pn-webos-initscripts =".local0"
    ``` 

5. Move to the root directory (`build-webos`), build the `webos-initscripts`.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake webos-initscripts
    ```

6. Build the webOS OSE platform.

    ``` bash
    build-webos$ bitbake webos-image
    ```

    Once the build is done, a webOS image will be generated as follows: 
    
    - `build-webos/BUILD/deploy/images/raspberrypi4-64/webos-image-raspberrypi4-64.rootfs.wic`

7. Flash the generated image. See [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).

{{< note >}}
After you finish this step, go to the [Step 04. Testing the Service](#step-04-testing-the-service).

You've already installed the app on the webOS OSE platform at build time, so you don't need to go to the [Step 03. Installing the App](#step-03-installing-the-app).
{{< /note >}}

## Step 03. Installing the Service

This step describes how to install the `.ipk` file you've built in [Service Alone](#service-alone).

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
    cd /media/internal/downloads/
    opkg install com.example.service.native_1.0.0-r0.local0_raspberrypi4_64.ipk

    Installing com.example.service.native (1.0.0) on root.
    Configuring com.example.service.native.
    No image conversions needed for com.example.service.native
    ```

4. Reboot the device. 

    ``` bash
    reboot -f
    ```

    After rebooting the device, you can see the app icon in the Launchpad.

    {{< figure src="/images/docs/tutorials/web-apps/installed-built-in-web-app.jpg" >}}

## Step 04. Testing the Service

You can check whether the service is running or not.

1. Run the service.

    ``` bash
    systemctl start com.example.service.native
    ```

2. Check the service status.

    ``` bash
    systemctl status

        ...

        |-com.example.service.native.service
        | `- 7053 /usr/sbin/com.example.service.native

        ...
    ```

3. Call a method.

    ``` bash
    luna-send -n 1 -f luna://com.example.service.native/hello '{}'
    # Return
    {
        "returnValue": true,
        "answer": "Hello, Native Service!!"
    }
    ```

## Appendix. Code Explanation

This section briefly explains the sample codes used in this tutorial.

### com.example.service.native.service

{{< code "com.example.service.native.service" >}}
``` plain {linenos=table}
[Unit]
Description=meta-webos - "%n"
Requires=ls-hubd.service
After=ls-hubd.service

[Service]
Type=simple
OOMScoreAdjust=-500
EnvironmentFile=-/var/systemd/system/env/com.example.service.native.env
Environment=CHARSET=UTF-8
ExecStart=/usr/sbin/com.example.service.native
Restart=on-failure
```
{{< /code >}}

A brief explanation of the above file:

- Line (2): Updates Description. 
    - The `Description` value determines the meta layer where the `.service` file is saved.
    - Using this value, developers can find which recipe installed this service. (Installed path: `/lib/systemd/system/`)
- Line (3): Describes the dependency of service execution. If the dependent unit is normal, the unit is started. The example allows the `ls-hubd.service` unit to run and then run the service.
- Line (11): Sets the path to the executable file.

{{< note >}}
For more details, see [systemd | freedesktop.org](http://www.freedesktop.org/wiki/Software/systemd/).
{{< /note >}}

### com.example.service.native.bb

{{< code "com.example.service.native.bb" >}}
``` bb {linenos=table}
# Copyright (c) 2020-2024 LG Electronics, Inc.

SUMMARY = "Native service sample"
AUTHOR = "Author's name <Author's e-mail>"
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/Apache-2.0;md5=89aea4e17d99a7cacdbeed46a0096b10"

DEPENDS= "glib-2.0 luna-service2 pmloglib libpbnjson"

WEBOS_VERSION = "0.0.1"
PR = "r0"

inherit webos_component
inherit webos_submissions
inherit webos_daemon
inherit webos_cmake
inherit webos_system_bus

# systemd configuration move from component repository to meta layer
FILESEXTRAPATHS:prepend := "${THISDIR}/${BPN}:"
inherit webos_systemd
WEBOS_SYSTEMD_SERVICE = "com.example.service.native.service"

```
{{< /code >}}

A brief explanation of the above file:

- Line (1~6): Basic descriptions of the component.
- Line (8): Adds GLib, LS2, PmLog, and pbnjson as dependencies.
- Line (10): The version of the component. Every webOS component must contain this.
- Line (11): Revision version of the recipe. Each recipe requires a counter to track its modification history. Make sure that you increment the version when you edit the recipe, unless you only change the value of the `WEBOS_VERSION` field or comments.
- Line (13~17): Inherits from other classes.
    - Line (13): Inherits common functions of webOS. For all components of webOS, this entry is required.
    - Line (14): Inherits `webos_submissions` to check the version information set correctly. This field is required if you develop your component on a local repository.
    - Line (15): Inherits `webos_daemon` to install a daemon.
    - Line (16): Instructs OpenEmbedded that the component uses CMake for configuration, which is the preferred choice for webOS components.
    - Line (17): Inherits `webos_system_bus` to register component as a service and install LS2 configuration files.
- Line (19~22): Specifies the systemd configuration(`.service`) file to use `webos_systemd.bbclass`.
    - Line (21): Inherits `webos_systemd`.
    - Line (22): Sets the path of the `.service` file: `/lib/systemd/system`.

### webos-local.conf

{{< code "webos-local.conf" >}}
``` plain {linenos=table}
INHERIT += "externalsrc"
EXTERNALSRC:pn-<SERVICE ID> = "<PATH TO THE SERVICE DIRECTORY>/"
EXTERNALSRC_BUILD:pn-<SERVICE ID> = "<PATH TO THE SERVICE DIRECTORY>/build/"
PR:append:pn-<SERVICE ID> =".local0"
```
{{< /code >}}

A brief explanation of the above file:

- Line (1): Inherits the `externalsrc.bbclass` file.
- Line (2): Specifies the path to the service directory.
    - `<SERVICE ID>`: The service ID specified in the `CMakeLists.txt` file.
    - `<PATH TO THE SERVICE DIRECTORY>`: The root directory of the service where the `CMakeLists.txt` file is located. You must use the absolute path.
- Line (3): Specifies the build directory. The build directory is located under the service directory.
- Line (4): The revision for local source builds. This line is optional.

### file/sysbus/*

These files are related to Access Control Group (ACG). See [Security Guide]({{< relref "security-guide" >}}).

### CMakeLists.txt

[CMake](https://cmake.org/) is a tool for supporting cross-platform build. Developers configure prerequisites and build steps in `CMakeLists.txt`, and then CMake reads this file, creates the build system, and builds the project.

{{< code "CMakeLists.txt" >}}
``` cmake {linenos=table}
cmake_minimum_required(VERSION 2.8.7)
project(com.example.service.native CXX)
set(CMAKE_BUILD_TYPE Debug)

include(webOS/webOS)
webos_modules_init(1 6 3)
webos_component(0 0 1)

include(FindPkgConfig)

pkg_check_modules(GLIB2 REQUIRED glib-2.0)
include_directories(${GLIB2_INCLUDE_DIRS})
webos_add_compiler_flags(ALL ${GLIB2_CFLAGS_OTHER})

pkg_check_modules(LUNASERVICE2 REQUIRED luna-service2)
include_directories(${LUNASERVICE2_INCLUDE_DIRS})
webos_add_compiler_flags(ALL ${LUNASERVICE2_CFLAGS_OTHER})

pkg_check_modules(PMLOG REQUIRED PmLogLib)
include_directories(${PMLOG_INCLUDE_DIRS})
webos_add_compiler_flags(ALL ${PMLOG_CFLAGS_OTHER})

pkg_check_modules(PBNJSON_CPP REQUIRED pbnjson_cpp)
include_directories(${PBNJSON_CPP_INCLUDE_DIRS})
webos_add_compiler_flags(ALL ${PBNJSON_CPP_CFLAGS_OTHER})

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
set(SRCS main.cpp)

add_executable(${PROJECT_NAME} ${SRCS})

SET (EXT_LIBS
    ${GLIB2_LDFLAGS}
    ${LUNASERVICE2_LDFLAGS}
    ${PMLOG_LDFLAGS}
    ${PBNJSON_CPP_LDFLAGS}
)

target_link_libraries(${PROJECT_NAME} ${EXT_LIBS})

install(TARGETS ${PROJECT_NAME} DESTINATION ${WEBOS_INSTALL_SBINDIR})

webos_build_system_bus_files()

```
{{< /code >}}

A brief explanation of the above file:

- Line (1): Sets the minimum required version of CMake for a project.
- Line (2): Specifies the project name and the file extension type. In this tutorial, we use “com.example.service.native" as the project name for indicating various filenames and pathnames. The file extension type allows CMake to skip unnecessary compiler checks.
- Line (5): Includes webOS modules for the build.
- Line (6): Specifies the “cmake-modules-webos” version.
- Line (7): Specifies webos_component with the component version to use webOS variables for the standard system paths. It commonly follows three digit versioning scheme.
- Line (9~39): Adds GLib, LS2, PmLogLib, and pbnjson dependencies, and add options to use C++11.
- Line (41): Installs the executable in `/usr/sbin`.
- Line (43): Installs the LS2 configuration files (`/files/sysbus`) to the target.

{{< note >}}
See also [CMake Documentation](https://cmake.org/documentation/).
{{< /note >}}

### main.cpp

This file defines the methods of the service.

{{< code "main.cpp" >}}
``` cpp {linenos=table}
#include <glib.h>
#include <string>
#include <luna-service2/lunaservice.h>
#include <PmLog.h>
#include <pbnjson.hpp>

static PmLogContext getPmLogContext()
{
    static PmLogContext s_context = 0;
    if (0 == s_context)
    {
        PmLogGetContext("NativeService", &s_context);
    }
    return s_context;
}

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

static bool onHello(LSHandle *sh, LSMessage* message, void* ctx)
{
    PmLogInfo(getPmLogContext(), "HANDLE_HELLO", 0, "hello method called");

    pbnjson::JValue reply = pbnjson::Object();
    if (reply.isNull())
        return false;

    reply.put("returnValue", true);
    reply.put("answer", "Hello, Native Service!!");

    LSError lserror;
    LSErrorInit(&lserror);

    if (!LSMessageReply(sh, message, reply.stringify().c_str(), &lserror))
    {
        PmLogError(getPmLogContext(), "HANDLE_HELLO", 0, "Message reply error!!");
        LSErrorPrint(&lserror, stdout);

        return false;
    }
    return true;
}

static bool cbGetTime(LSHandle *sh, LSMessage *msg, void *user_data)
{
    LSError lserror;
    LSErrorInit(&lserror);

    PmLogInfo(getPmLogContext(), "GETTIME_CALLBACK", 1, PMLOGJSON("payload", LSMessageGetPayload(msg)),  " ");

    pbnjson::JValue response = convertStringToJson(LSMessageGetPayload(msg));
    bool successCallback = response["returnValue"].asBool();
    if (successCallback)
    {
        int64_t utc= response["utc"].asNumber<int64_t>();
        PmLogInfo(getPmLogContext(), "GETTIME_CALLBACK", 1, PMLOGKFV("UTC", "%lld", utc),  " ");
    }

    return true;
}

static LSMethod serviceMethods[] = {
    { "hello", onHello }
};

int main(int argc, char* argv[])
{
    PmLogInfo(getPmLogContext(), "SERVICE_MAIN", 0, "start com.example.service.native");

    LSError lserror;
    LSErrorInit(&lserror);

    GMainLoop* mainLoop = g_main_loop_new(nullptr, false);
    LSHandle *m_handle = nullptr;

    if(!LSRegister("com.example.service.native", &m_handle, &lserror))
    {
        PmLogError(getPmLogContext(), "LS_REGISTER", 0, "Unable to register to luna-bus");
        LSErrorPrint(&lserror, stdout);

        return false;
    }

    if (!LSRegisterCategory(m_handle, "/", serviceMethods, NULL, NULL, &lserror))
    {
        PmLogError(getPmLogContext(), "LS_REGISTER", 0, "Unable to register category and method");
        LSErrorPrint(&lserror, stdout);

        return false;
    }

    if(!LSGmainAttach(m_handle, mainLoop, &lserror))
    {
        PmLogError(getPmLogContext(), "LS_REGISTER", 0, "Unable to attach service");
        LSErrorPrint(&lserror, stdout);

        return false;
    }

    if (!LSCall(m_handle,
                "luna://com.webos.service.systemservice/clock/getTime",
                "{}",
                cbGetTime,
                NULL,
                NULL,
                &lserror))
    {
        PmLogError(getPmLogContext(), "LSCALL_GETTIME", 0, "Cannot call getTime");
        LSErrorPrint(&lserror, stderr);
    }

    g_main_loop_run(mainLoop);

    if(!LSUnregister(m_handle, &lserror))
    {
        PmLogError(getPmLogContext(), "LS_REGISTER", 0, "Unable to unregister service");
        LSErrorPrint(&lserror, stdout);

        return false;
    }

    g_main_loop_unref(mainLoop);
    mainLoop = nullptr;

    return 0;
}
```
{{< /code >}}

A brief explanation of the above file:

- Line (3~5): Includes header files to use LS2, PmLog, and pbnjson.
- Line (7~15): A function that calls `PmLogGetContext()` in PmLog library to print logs. For more details, see [Using PmLogLib in C/C++]({{< relref "using-pmloglib-in-c-cpp">}}).
- Line (17~32): Creates pbnjson utility functions, which convert string to JSON and JSON to string based on pbnjson library. pbnjson is a JSON engine, implemented as a pair of libraries with APIs for easier C and C++ abstraction.
- Line (34~56): Implements the `onHello()` callback function that is invoked when `com.example.service.native/hello` is called. The third argument of `LSMessageReply()` should be in JSON format.
- Line (58~74): Implements the `cbGetTime()` callback function for systemservice’s `getTime` method call. When the UTC time is received in response, this function prints the time on the log.
- Line (76~78): Registers the hello method and the `onHello()` callback function in the `LSMethod` array.
- Line (80~140): Implements the `main` function.
    - Line (84~85): Declares and initialize `LSError`.
    - Line (87~88): Declares `GMainLoop` and `LSHandle` variables.
    - Line (90~96): Registers the `com.example.service.native` service using `LSRegister()`.
    - Line (98~104): Registers the hello method and the `onHello()` callback function in `LSHandle (m_handle)`.
    - Line (106~112): Attaches the `com.example.service.native` service to `GMainLoop`.
    - Line (114~124): Calls systemservice’s `getTime` method using `LSCall()`.
    - Line (126): Runs an iteration loop.
    - Line (128~134): After the iteration loop is stopped, unregisters the service.
    - Line (136~137): Releases `GMainLoop`.

### README.md

This file provides overall information about the service.

{{< caution >}}
- If the README.md file is missing, a build error occurs.
- Make sure the ‘Summary’ section is a single line. Even any whitespace at the line above the ‘Description’ section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}

{{< code "README.md" >}}
``` md
Summary
-------
native service sample

Description
-----------
native service sample

How to Build on Linux
---------------------

## Dependencies

Below are the tools and libraries (and their minimum versions) required to build sample program:

* cmake (version required by cmake-modules-webos)
* gcc
* glib-2.0
* make
* cmake-modules-webos

## Building

    $ cd build-webos
    $ source oe-init-build-env
    $ bitbake com.example.service.native

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

### com.example.service.native.bb

{{< code "com.example.service.native.bb" >}}
``` bb {linenos=table}
# Copyright (c) 2020-2024 LG Electronics, Inc.

SUMMARY = "Native service sample"
AUTHOR = "Author's name <Author's e-mail>"
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/Apache-2.0;md5=89aea4e17d99a7cacdbeed46a0096b10"

DEPENDS= "glib-2.0 luna-service2 pmloglib libpbnjson"

WEBOS_VERSION = "0.0.1"
PR = "r0"

inherit webos_component
inherit webos_submissions
inherit webos_daemon
inherit webos_cmake
inherit webos_system_bus

# systemd configuration move from component repository to meta layer
FILESEXTRAPATHS:prepend := "${THISDIR}/${BPN}:"
inherit webos_systemd
WEBOS_SYSTEMD_SERVICE = "com.example.service.native.service"

```
{{< /code >}}

A brief explanation of the above file:

- Line (1~6): Describes basic information of this sample service.
- Line (8): Adds GLib, LS2, PmLog, and pbnjson as dependencies.
- Line (10): Describes the version of the component. For the webOS OSE component, this field is mandatory.
- Line (11): Describes the revision version of the recipe. Each recipe requires a counter to track its modification history. Make sure that you increment the version when you edit the recipe, unless you only change the value of the `WEBOS_VERSION` field or comments.
- Line (13): Inherits common functions of webOS. For all components of webOS OSE, this field is required.
- Line (14): Instructs OpenEmbedded to use the `WEBOS_VERSION` value as the component version number. If you develop your component on a local repository, this entry is required.
- Line (15): Inherits `webos_daemon` to install a demon.
- Line (16): Instructs OpenEmbedded that the component uses CMake for configuration, which is the preferred choice for webOS components.
- Line (17): Inherits `webos_system_bus` to register component as a service and install LS2 configuration files.
- Line (20~22): Performs systemd-related configuration for the webOS platform.
