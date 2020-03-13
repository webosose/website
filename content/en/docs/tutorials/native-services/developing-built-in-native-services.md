---
title: Developing Built-in Native Services
date: 2020-02-14
weight: 20
toc: true
---

To create a built-in native service, you must write the source code and prepare the required configuration files.

For easier understanding, the process to create a built-in native service is explained using the example of a service named **`com.example.service.native`** that has the following features:

* Has a method named **`hello`** that responds with the string "Hello, Native Service!!".
* Calls `com.webos.service.systemservice/clock/getTime` method and prints the UTC time on the log.

The directory structure of `com.example.service.native` must be as follows:

``` bash
com.example.service.native
├── CMakeLists.txt
├── README.md
├── files
│   ├── sysbus
│   │   ├── com.example.service.native.api.json.in
│   │   ├── com.example.service.native.perm.json.in
│   │   ├── com.example.service.native.role.json.in
│   │   └── com.example.service.native.service.in
│   └── systemd
│       └── com.example.service.native.service.in
├── main.cpp
```

Developing a built-in native service requires the following steps:

* [Prerequisites](#before-you-begin)
* [Step 1: Implementation](#step-1-implement-the-native-service)
* [Step 2: Configuration](#step-2-configure-the-native-service)
* [Step 3: Build](#step-3-build-the-native-service)
* [Step 4: Verification](#step-4-run-and-verify-the-native-service)
* [Step 5: Deployment](#step-5-deploy-the-native-service)

## Before you begin

- Build and flash the webOS OSE image. For detailed information, see [Building webOS OSE]({{< relref "building-webos-ose" >}}) and [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).

- Create a project directory (`com.example.service.native`) for the sample native service, and move into the directory.

    ``` bash
    $ mkdir com.example.service.native
    $ cd com.example.service.native
    ```

## Step 1: Implement the Native Service

### Source Code

First, define the functionality of the native service on the source code.

For the sample native service (`com.example.service.native`), you must:

- **Create and update the file:** `main.cpp`
- **Directory:** `com.example.service.native`

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
        uint64_t utc= response["utc"].asNumber<int64_t>();
        PmLogInfo(getPmLogContext(), "GETTIME_CALLBACK", 1, PMLOGKFV("UTC : ", "%d", utc),  " ");
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

A brief explanation of the above file:

* Line(3~5) : Include header files to use LS2, PmLog, and pbnjson.
* Line(7~15) : A function that calls `PmLogGetContext()` in PmLog library to print logs. For more details, see [Using PmLogLib in C/C++]({{< relref "using-pmloglib-in-c-cpp" >}}).
* Line(17~32) : Create pbnjson utility functions, which convert String to Json and Json to String based on pbnjson library. pbnjson is a JSON engine, implemented as a pair of libraries with APIs for easier C and C++ abstraction.
* Line(34~56) : Implement the `onHello()` callback function that is invoked when `com.example.service.native/hello` is called. The third argument of `LSMessageReply()` should be in JSON format.
* Line(58~74) : Implement the `cbGetTime()` callback function for systemservice's `getTime` method call. When the UTC time is received in response, this function prints the time on the log.
* Line(76~78) : Register the `hello` method and the `onHello()` callback function in the LSMethod array.
* Line(84~85) : Declare and initialize LSError.
* Line(87~88) : Declare GMainLoop and LSHandle variables.
* Line(90~96) : Register the `com.example.service.native` service using `LSRegister()`.
* Line(98~104) : Register the `hello` method and the `onHello()` callback function in `LSHandle (m_handle)`.
* Line(106~112) : Attach the `com.example.service.native` service to GMainLoop.
* Line(114~124) : Call systemservice's `getTime` method using `LSCall()`.
* Line(126) : Run an iteration loop.
* Line(128~134) : After the iteration loop is stopped, unregister the service.
* Line(136~137) : Release GMainLoop.

### README.md

This file provides general information of the native service. For the sample native service (`com.example.service.native`), you must:

- **Create and update the file:** `README.md`
- **Directory:** `com.example.service.native`

{{< caution >}}
* If the `README.md` file is missing, a build error occurs.
* Make sure the 'Summary' section is a single line. Even **any whitespace** at the line above the 'Description' section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}

**Sample README.md**

``` plaintext
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

## Step 2: Configure the Native Service

This section describes how to prepare the configuration files required to build and test the native service.

### LS2 Configuration Files

To register and execute a service through LS2, it is necessary to create a Service Configuration file, a Role file, and Permission files. You must create a `files/sysbus` directory in your project so that the configuration files are installed in the right place on the target.

#### Service Configuration File

This file contains description of the service type and launch command.

- **Create and update the file:** `<native service name>.service.in`
- **Directory:** `<native service name>/files/sysbus`

where `<native service name>` is the name of the native service. For the sample native service, `<native service name>` is to be replaced by 'com.example.service.native'.

``` bash {linenos=table}
[D-BUS Service]
Name=com.example.service.native
Exec=@WEBOS_INSTALL_SBINDIR@/com.example.service.native
Type=static
```

A brief explanation of the above file:

- Line(1) : Write "[D-BUS Service]" on the first line.

- Line(2) : Set `com.example.service.native` to service name.

- Line(3) : Write the full path of the executable file. `@WEBOS_INSTALL_SBINDIR@` stands for '/usr/sbin' directory.

- Line(4) : Type can be set to 'static' or 'dynamic'. In this example, it is set as a static service.

#### Role File

This file contains allowed service names for each component and individual security settings for each service name.

- **Create and update the file:** `<native service name>.role.json.in`
- **Directory:** `<native service name>/files/sysbus`

where `<native service name>` is the name of the native service. For the sample native service, `<native service name>` is to be replaced by 'com.example.service.native'.

``` json {linenos=table}
{
    "exeName":"@WEBOS_INSTALL_SBINDIR@/com.example.service.native",
    "type": "regular",
    "allowedNames": [
        "com.example.service.native"
    ],
    "permissions": [
        {
            "service":"com.example.service.native",
            "outbound":[
                "*"
            ]
        }
    ]
}
```

A brief explanation of the above file:

- Line(2) : `exeName` - Specifies the full path to the binary for a native service. Must be of the form: "/path/to/binary"
- Line(3) : `type` - Indicates whether the app is privileged (can change its role) or regular. Possible values are privileged or regular.
- Line(4~6) : `allowedNames` - Names that this service is allowed to register. It can be an array of any valid service name strings, empty array [] for none, and empty string "" for an unnamed service.
- Line(7~14) : The permissions for the service.
    - `outbound` - Array of services that this service is allowed to send requests to. It can include strings of any valid service names. Use "\*" for all, empty array [] for none, and empty string "" for unnamed services. It's possible to use a wildcard (*) at the end of a string.

#### Client Permission File

This file defines what groups are required for this component to function properly.

- **Create and update the file:** `<native service name>.perm.json.in`
- **Directory:** `<native service name>/files/sysbus`

where `<native service name>` is the name of the native service. For the sample native service, `<native service name>` is to be replaced by 'com.example.service.native'.

``` json {linenos=table}
{
    "com.example.service.native": [
        "time"
    ]
}
```

A brief explanation of the above file:

* Line(3) : Since `com.example.service.native` calls systemservice's `getTime` method, add the method's group name "time" to the client permission file.

#### API Permission File

This file defines what methods are included into security groups this component provides.

- **Create and update the file:** `<native service name>.api.json.in`
- **Directory:** `<native service name>/files/sysbus`

where `<native service name>` is the name of the native service. For the sample native service, `<native service name>` is to be replaced by 'com.example.service.native'.

``` json {linenos=table}
{
    "com.example.service.native.group": [
        "com.example.service.native/hello"
    ]
}
```

A brief explanation of the above file:

* Line(3) : Set this service's group name and specify the methods that belong to the group. In this example, the group name is set to "com.example.service.native.group", and the `hello` method of `com.example.service.native` is added to this group.

### Systemd Configuration File

This file is required to run the services provided by systemd.

- **Create and update the file:** `<native service name>.service.in`
- **Directory:** `<native service name>/files/systemd`

where `<native service name>` is the name of the native service. For the sample native service, `<native service name>` is to be replaced by 'com.example.service.native'.

This file will be installed to the target as **`com.example.service.native.service`**.

{{< note >}}
Normally, this config file is in `webos-initscripts`. However, for ease-of-use we have defined it in the local source directory.
{{< /note >}}

``` bash {linenos=table}
[Unit]
Description=webos - "%n"
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

A brief explanation of the above file:

- Line(3) : Describe the dependency of service execution. If the dependent unit is normal, the unit is started. The example allows the ls-hubd.service unit to run and then run the service.

- Line(11) : Set the path to the executable file.

For more details, see [systemd official site](http://www.freedesktop.org/wiki/Software/systemd/).

### CMakeLists.txt

This file is required to build the source code using CMake.

For the sample native service (`com.example.service.native`), you must:

- **Create and update the file:** `CMakeLists.txt`
- **Directory:** `com.example.service.native`

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
webos_build_configured_file(files/systemd/com.example.service.native.service SYSCONFDIR systemd/system)
```

A brief explanation of the above file:

- Line(2) : Specify the project name and the file extension type. In this tutorial, we use "com.example.service.native" as the project name for indicating various filenames and pathnames. The file extension type allows CMake to skip unnecessary compiler checks.
- Line(5) : Include webOS OSE modules for the build.
- Line(6) : Specify the "**cmake-modules-webos**" version.
- Line(7) : Specify `webos_component` with the component version to use webOS variables for the standard system paths. It commonly follows three digit versioning scheme.
- Line(9~39) : Add GLib, LS2, PmLogLib, and pbnjson dependencies, and add options to use C++11.
- Line(41) : Install the executable in `/usr/sbin`.
- Line(43) : Install the LS2 configuration files (/`files/sysbus`) to the target.
- Line(44) : Install the systemd configuration file on the target (`etc/systemd/system`).

## Step 3: Build the Native Service

After implementing and configuring the Native service, you must build the service.

### Add the Recipe File

webOS OSE uses OpenEmbedded of Yocto Project to build its components. You must write a recipe that configures the build environment. For more details about the recipe, see [Yocto Project Reference Manual](http://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

- **Create and update the file:** `<native service name>.bb`
- **Directory:** `build-webos/meta-webosose/meta-webos/recipes-webos/<native service name>`

where `<native service name>` is the name of the native service. For the sample native service, `<native service name>` must be replaced by 'com.example.service.native'.

``` bash {linenos=table}
SUMMARY = "Native service sample"
AUTHOR = "Author's name <Author's e-mail>"
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/Apache-2.0;md5=89aea4e17d99a7cacdbeed46a0096b10"

DEPENDS= "glib-2.0 luna-service2 pmloglib libpbnjson"

WEBOS_VERSION = "0.0.1"
PR = "r0"

inherit webos_component
inherit webos_submissions
inherit webos_cmake
inherit webos_system_bus
```

A brief explanation of the above file:

- Lines(1~4) : Basic descriptions of the component.

- Line(6) : Add GLib, LS2, PmLog, and pbnjson as dependencies.

- Line(8) : Version of the component. For the webOS OSE component, this field is mandatory.

- Line(9) : Revision version of the recipe. Each recipe requires a counter to track its modification history. Make sure that you increment the version when you edit the recipe, unless you only change the value of the `WEBOS_VERSION` field or comments.

- Line(11) : Inherit common functions of webOS OSE. For all components of webOS OSE, this entry is required.

- Line(12) : Instruct OpenEmbedded to use the `WEBOS_VERSION` value as the component version number. If you develop your component on a local repository, this entry is required.

- Line(13) : Instruct OpenEmbedded that the component uses CMake for configuration, which is the preferred choice for webOS components.

- Line(14) : To register component as a service and install LS2 configuration files, inherit `webos_system_bus`.

### Configure the Local Source Directory

To build a component that is located on the local system, you must specify the directory information.

- **Create and update the file:** `webos-local.conf`
- **Directory:** `build-webos`

For the sample native service (`com.example.service.native`), you must provide the local path where the source exists.

``` bash {linenos=table}
INHERIT += "externalsrc"
EXTERNALSRC_pn-com.example.service.native = "/home/username/project/com.example.service.native/"
EXTERNALSRC_BUILD_pn-com.example.service.native = "/home/username/project/com.example.service.native/build/"
PR_append_pn-com.example.service.native =".local0"
```

A brief explanation of the above file:

- Line(1) : Inherit "externalsrc" bbclass file.

- Line(2) : The local source directory. The syntax of the property is `EXTERNALSRC_pn-<component>`. For the value, input `"<full path of the project directory>"`

- Line(3) : The local build directory. The syntax of the property is `EXTERNALSRC_BUILD_pn-<component>`. For the value, input `"<full path of the project directory>/build/"`

- Line(4) : The appended revision version (PR) for building local source files. The syntax of the property is `PR_append_pn-<component>`. This property is optional.

{{< note >}}
We recommend that you add a trailing slash (/) at the end of all local directory paths, as in Line(2) and Line(3).
{{< /note >}}

### Build the Service

To build the component on the OpenEmbedded environment, enter the following commands on the shell.

``` bash
build-webos$ source oe-init-build-env
build-webos$ bitbake com.example.service.native
```

## Step 4: Run and Verify the Native Service

After building the service, you must verify its functionality.

1.  **Copy the IPK to the target.**

    When the build is successful, oe-related directories are created under the project root directory. These directories are linked to the directory where the build output is generated from the actual **`build-webos`** sub-directory.

    ``` bash
    com.example.service.native
    ├── CMakeLists.txt
    ├── README.md
    ├── files
    │   ├── sysbus
    │   │   ├── com.example.service.native.api.json.in
    │   │   ├── com.example.service.native.perm.json.in
    │   │   ├── com.example.service.native.role.json.in
    │   │   └── com.example.service.native.service.in
    │   └── systemd
    │       └── com.example.service.native.service.in
    ├── main.cpp
    ├── oe-logs -> /home/username/build/build-webos/BUILD/work/raspberrypi4-webos-linux/com.example.service.native/0.0.1-r0.local0/temp
    ├── oe-workdir -> /home/username/build/build-webos/BUILD/work/raspberrypi4-webos-linux/com.example.service.native/0.0.1-r0.local0
    ```

    If you go to `oe-workdir/deploy-ipks/raspberrypi4`, you can see `com.example.service.native_0.0.1-r0.local0_raspberrypi4.ipk` file.

    ``` bash
    com.example.service.native/oe-workdir/deploy-ipks/raspberrypi4
    └── com.example.service.native_0.0.1-r0.local0_raspberrypi4.ipk
    ```

    Copy the IPK file to the target device using the `scp` command.

    ``` bash
    com.example.service.native/oe-workdir/deploy-ipks/raspberrypi4$ scp com.example.service.native_0.0.1-r0.local0_raspberrypi4.ipk root@<target IP address>:/media/internal/downloads
    ```

2.  **Install the service on the target.**

    Connect to the target using the `ssh` command and install `com.example.service.native_0.0.1-r0.local0_raspberrypi4.ipk`.

    ``` bash
    $ ssh root@<target IP address>
    root@raspberrypi4:/sysroot/home/root# cd /media/internal/downloads/
    root@raspberrypi4:/media/internal/downloads# opkg install com.example.service.native_0.0.1-r0.local0_raspberrypi4.ipk

    Installing com.example.service.native (0.0.1) on root.
    Configuring com.example.service.native.
    ```

3.  **Discover the LS2 configuration files.**

    To make LS2 daemon scan the LS2 configuration files of the service, use the `ls-control` command as follows.

    ``` bash
    root@raspberrypi4:/media/internal/downloads# ls-control scan-services

    telling hub to reload setting and rescan all directories
    ```

4.  **Run the service.**

    You can run the **`com.example.service.native`** using the `systemctl` command.

    ``` bash
    root@raspberrypi4:/# systemctl start com.example.service.native
    ```

5.  **Verify the execution of the service.**

    - Using `systemctl`

        You can check the PID and attribute of the executed process using the command `systemctl status`.

        ``` bash
        [[0;1;32m●[[0m com.example.service.native.service - webos - "com.example.service.native.service"
           Loaded: loaded (/etc/systemd/system/com.example.service.native.service; static; vendor preset: enabled)
           Active: [[0;1;32mactive (running)[[0m since Sun 2019-05-26 19:19:38 PDT; 2min 35s ago
        Main PID: 3264 (com.example.ser)
           CGroup: /system.slice/com.example.service.native.service
                   └─3264 /usr/sbin/com.example.service.native
        ```

    - Using `ls-monitor`

        You can use `ls-monitor` to check whether the service is successfully registered. It also shows the methods available in the service. For more detail about ls-monitor, see [ls-monitor]({{< relref "ls-monitor" >}}).

        ``` bash
        root@raspberrypi4:/#ls-monitor -i com.example.service.native

          "/":
              "hello": {"provides":["all","com.example.service.native.group"]}
        ```

    - Using the log file

        You can use the `journalctl` command on the target for debugging the native service. For details on how to use the command, see [Viewing Logs]({{< relref "viewing-logs-journald#using-journalctl-to-view-logs" >}}).

        ``` bash
        root@raspberrypi4:/# journalctl -f | grep NativeService

        Nov 13 23:26:28 raspberrypi4 com.example.service.native[1306]: [] [pmlog] NativeService SERVICE_MAIN {} start com.example.service.native
        Nov 13 23:26:28 raspberrypi4 com.example.service.native[1306]: [] [pmlog] NativeService GETTIME_CALLBACK {"payload":{"source":"system","offset":{"source":"system","value":0},"timestamp":{"source":"monotonic","sec":394,"nsec":730441134},"utc":1573716388,"returnValue":true,"systemTimeSource":"ntp"}}
        Nov 13 23:26:28 raspberrypi4 com.example.service.native[1306]: [] [pmlog] NativeService GETTIME_CALLBACK {"UTC : ":1573716388}
        ```

6.  **Verify the Output.**

    Verify the output of the `hello` Method. You can call a method by using the `luna-send` command:

    ``` bash
    root@raspberrypi4:/# luna-send -n 1 -f luna://com.example.service.native/hello '{}'
    {
        "answer": "Hello, Native Service!!",
        "returnValue": true
    }
    ```

    For more details, see [Introduction to LS2 API]({{< relref "introduction-to-ls2-api" >}}).

    {{< note >}}
    If `com.example.service.native` is not registered successfully, you will see a return message as below.

    ``` bash
    root@raspberrypi4:/# luna-send -n 1 -f luna://com.example.service.native/hello '{}'
    {
        "errorCode": -1,
        "returnValue": false,
        "errorText": "Service does not exist: com.example.service.native."
    }
    ```
    {{< /note >}}

7.  **Specify the Order of Execution on the Target**

    To verify that the service can run automatically after rebooting, add the service to the systemd's start execution list. This ensures that the service runs automatically without the `systemctl start` command.

    - **Update the file:** `webos-bd.target`
    - **Directory:** `/etc/systemd/system` (on the target device)

    <!-- end list -->

    ``` bash
    [Unit]
    Description="%n"
    Wants=nyx-utils.service \
          second-screen-gateway.service \
          com.example.service.native.service
    ```

## Step 5: Deploy the Native Service

Now you are ready to package the native service in the webOS image.

### Add the Service to Build Recipe

Add the service to the package recipe file.

- **Update the file:** `packagegroup-webos-extended.bb`

- **Directory:** `build-webos/meta-webosose/meta-webos/recipes-core/packagegroups`

- **Updates to be made:** Add the service name to **`RDEPENDS _ $ {PN} =`**

``` bash
...
RDEPENDS_${PN} = " \
    activitymanager \
    audiod \
    ...
    com.example.service.native \
    ${VIRTUAL-RUNTIME_appinstalld} \
    ...
```

For more details, see [Yocto Project Reference Manual](https://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

### Modify Systemd Execution List on webos-initscripts

Modify the **`webos-initscripts`** component which is responsible for systemd configuration in webOS. Through this process, you can learn how to modify a built-in component in webOS.

1.  Download the `webos-initscripts` component source from [GitHub repository](https://github.com/webosose/webos-initscripts.git) to your local system.

    In this document, we download the `webos-initscripts` component to `~/project/webOS/webos-initscripts`.

    ``` bash
    ~/project/webOS$ git clone https://github.com/webosose/webos-initscripts.git
    ```

2.  Specify the order of execution of the newly created native service.

    In this example, adding the service to the last line ensures that it is executed last.

    - **Update the file:** `webos-bd.target`

    - **Directory:** `~/project/webOS/webos-initscripts/files/systemd/targets`

    - **Updates:** Add the service name (`com.example.service.native.service`) to the last line.

    ``` bash
    [Unit]
    Description="%n"
    Wants=nyx-utils.service \
                second-screen-gateway.service \
                com.example.service.native.service
    ```

3.  Specify the path of the `webos-initscripts` local source directory in the build.

    - **Update the file:** `webos-local.conf`

    - **Directory:** `build-webos`

    ``` bash
    INHERIT += "externalsrc"
    EXTERNALSRC_pn-com.example.service.native = "/home/username/project/webOS/com.example.service.native/"
    EXTERNALSRC_BUILD_pn-com.example.service.native = "/home/username/project/webOS/com.example.service.native/build/"
    PR_append_pn-com.example.service.native =".local0"
    EXTERNALSRC_pn-webos-initscripts = "/home/username/project/webOS/webos-initscripts/"
    EXTERNALSRC_BUILD_pn-webos-initscripts = "/home/username/project/webOS/webos-initscripts/build"
    PR_append_pn-webos-initscripts =".local0"
    ```

4.  Build webos-initscripts on build-webos.

    We can check webos-initscripts on local directory if built successfully.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake webos-initscripts
    ```

### Build the webOS OSE Image and Flash to the Target

1.  Build the webos-image.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake webos-image
    ```

2.  Flash the generated webos-image to SD card.

    ``` bash
    build-webos/BUILD/deploy/images/raspberrypi4$ sudo dd bs=4M if=webos-image-raspberrypi4-master-yyyymmddhhmmss.wic of=/dev/sdc
    ```

    For more details, see the [Flashing webOS OSE]({{< relref "flashing-webos-ose#linux" >}}) page.

3.  After booting, connect to the target with SSH.

    If you check the service list with `ls-monitor`, you can see `com.example.service.native` is executed as static type.

    ``` bash
    $ ssh root@<target IP address>
    root@raspberrypi4:/sysroot/home/root# ls-monitor -l | grep example
    542           com.example.service.native        /usr/sbin/com.example.service.native    static                  4dTPKKQI
    ```
