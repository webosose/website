---
title: Developing External Native Services
date: 2023-06-14
weight: 10
toc: true
---

External native services are 3rd party native services that must be installed on the webOS target device. External native services must be packaged in a dummy app. Therefore, before creating the native service, make sure you have a dummy app to package with the external native service.

This page describes the steps to develop an external native service using [Sample Code Repository](https://github.com/webosose/samples) and CLI. For detailed information on the CLI commands used in this tutorial, see [CLI commands]({{< relref "cli-user-guide#cli-commands" >}}).

The directory structure of the sample service must be as follows:

```
native-services/external/
├── com.sample.echo/
│   ├── appinfo.json
│   ├── icon.png
│   ├── index.html
│   └── script.js
├── com.sample.echo.service/
│   ├── src/
│   │   └── main.c
│   ├── CMakeLists.txt
│   └── services.json
└── README.md
```

Developing an external native service requires the following steps:

* [Before You Begin](#before-you-begin)
* [Step 1: Implement a Native Service](#step-1-implement-a-native-service)
* [Step 2: Configure the Native Service](#step-2-configure-the-native-service)
* [Step 3: Build the Native Service](#step-3-build-the-native-service)
* [Step 4: Package the Native Service](#step-4-package-the-native-service)
* [Step 5: Install the Native Service](#step-5-install-the-native-service)
* [Step 6: Run the Native Service](#step-6-run-the-native-service)

## Before you begin

- Make sure you have completed the steps in [Native Development Kit Setup]({{< relref "setting-up-native-development-kit" >}}).
- Download the sample repository, move into `samples/native-services/external/com.sample.echo.service` directory.

    ``` bash
    $ git clone https://github.com/webosose/samples
    $ cd samples/native-services/external/com.sample.echo.service
    ```

## Step 1: Implement a Native Service

### Source Code

First, define the functionality of the native service on the source code.

In this section, we will briefly explain webOS specific parts in `com.sample.echo.service/src/main.c`.

{{< code "main.c" >}}
``` c {linenos=table}
#include <luna-service2/lunaservice.h>
...
bool echo(LSHandle *sh, LSMessage *message, void *data);

LSMethod sampleMethods[] = {
    {"echo", echo},   // luna://com.sample.echo.service/echo
};
...
bool echo(LSHandle *sh, LSMessage *message, void *data)
{
  ...
}
...
sh = LSMessageGetConnection(message);

LSRegisterCategory(handle,"/",sampleMethods, NULL, NULL, &lserror);

LSGmainAttach(handle, gmainLoop, &lserror);
...
```
{{< /code >}}

A brief explanation of the above file:

- Line(1~2) : Include `lunaservice.h` header file to use luna service. For detailed information about luna service, see [luna-service2 Library API Reference]({{< relref "luna-service2-library-api-reference" >}}) and [Introduction to LS2 API]({{< relref "introduction-to-ls2-api" >}}).
- Line(6~10) : Declare `echo` method.
- Line(14) : Implement `echo` method. This method will return the input as you typed.
- Line(23) : Return a handle to the connection-to-bus through which message was sent.
- Line(25) : Append a method to the category.
- Line(27) : Attach a service to a glib mainloop.

## Step 2: Configure the Native Service

This section describes how to prepare the configuration files required to build and test the native service.

### services.json

Services are required to have metadata before they can be packaged. This metadata is stored in a file called `services.json`, which is used by the webOS device to identify the service, its executable file, and other information that is needed to run the service.

{{< code "services.json" >}}
``` json {linenos=table}
{
  "id" : "com.sample.echo.service",
  "description":"Native echo service",
  "engine":"native",
  "executable":"echo_service",
  "services": [{
    "name": "com.sample.echo.service",
    "description": "Native echo service"
  }]
}
```
{{< /code >}}

A brief explanation of the above file:

- Line(2) : The ID of the service. This value must begin with the app ID. For example, if an app ID is `com.sample.echo`, then the service ID must be `com.sample.echo.myservice`.
- Line(4) : The type of the native service.
- Line(5) : The executable file name.
- Line(6) : An array of the services that the dummy app provides. Multiple services can be included in this property.
- Line(7) : The name of service on the webOS Luna Bus.

For more details, see [services.json]({{< relref "services-json" >}}).

### CMakeLists.txt

`CMakeLists.txt` file is used by CMake to generate the Makefile to build the project. This file specifies the source, header, and UI files included in the project.

{{< note >}}
In this tutorial, we use the CMake to build the project. But you can use any other tools for the build.
{{< /note >}}

{{< code "CMakeLists.txt" >}}
``` cmake {linenos=table}
cmake_minimum_required(VERSION 2.8.7)
project(nativeService C)

# set link directory
#link_directories(${CMAKE_SOURCE_DIR}/pkg_$ENV{ARCH}/lib)

# ---
# add include files
include_directories(${CMAKE_SOURCE_DIR})
include_directories(${CMAKE_SOURCE_DIR}/src)
include_directories(${CMAKE_SOURCE_DIR}/include)

# ---
# find required packages
include(FindPkgConfig)

pkg_check_modules(GTHREAD2 REQUIRED gthread-2.0)
include_directories(${GTHREAD2_INCLUDE_DIRS})

pkg_check_modules(PBNJSON REQUIRED pbnjson_c)
include_directories(${PBNJSON_INCLUDE_DIRS})

# -- check for glib 2.0
pkg_check_modules(GLIB2 REQUIRED glib-2.0)
include_directories(${GLIB2_INCLUDE_DIRS})

pkg_check_modules(LS2 REQUIRED luna-service2)
include_directories(${LS2_INCLUDE_DIRS})

pkg_check_modules(PMLOG REQUIRED PmLogLib)
include_directories(${PMLOG_INCLUDE_DIRS})

# ---
# create executable file
set(BIN_NAME echo_service)

set(SRC_LIST
    ${CMAKE_SOURCE_DIR}/src/main.c
)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/pkg_$ENV{OECORE_TARGET_ARCH}/")
add_executable(${BIN_NAME} ${SRC_LIST})

# ignore shared library
set(CMAKE_EXE_LINKER_FLAGS "-Wl,--allow-shlib-undefined")
set_target_properties(${BIN_NAME} PROPERTIES LINKER_LANGUAGE C)

target_link_libraries (${BIN_NAME}
    ${GTHREAD2_LDFLAGS}
    ${PBNJSON_LDFLAGS}
    ${LS2_LDFLAGS}
    ${GLIB2_LDFLAGS}
    ${PMLOG_LDFLAGS}
)

file(COPY ${CMAKE_SOURCE_DIR}/services.json DESTINATION "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}")
```
{{< /code >}}

A brief explanation of the above file:

- Line(1) : Set the minimum CMake version.
- Line(2) : Set the project name and programming language.
- Line(9~31) : Add the directories that contain the header files.
- Line(35~42) : Set the name of result binary file and source files to be built.
- Line(46) : Set the language for linker.
- Line(48~54) : Specifies the libraries to be used.
- Line(56) : Copies the `services.json` file to the output folder.

For more details, see [CMake Reference Documentation](https://cmake.org/documentation/).

## Step 3: Build the Native Service

You are now ready to build the native service. Perform the following steps:

1. Go to your project directory (`com.sample.echo.service`).

2. Create a build directory and go to the directory.

    ``` bash
    $ mkdir BUILD
    $ cd BUILD
    ```

3. Execute the `cmake` command. Then execute the `make` command. A `pkg_<YOUR_ARCHITECTURE>` directory will be created in your project folder (`com.sample.echo.service`).

    ``` bash
    $ cmake ..
    $ make
    ```

    {{< note >}}
    In the name of the created directory, `<YOUR_ARCHITECTURE>` depends on your build machine's architecture.
    {{< /note >}}

## Step 4: Package the Native Service

After building the native service, it must be packaged as an IPK file. Make sure the `services.json` file is available because it is required when packaging an external native service for webOS OSE.

To package the native service, use the `ares-package` command. The packaged file is generated in the current directory.

``` bash
$ cd ..
$ ares-package ../com.sample.echo ./pkg_arm64
```

In the above command, `../com.sample.echo` is the dummy app directory and `./pkg_arm64` is the native service directory which contains `services.json` file. You can use an absolute or relative path. For more details on using `ares-package`, see [ares-package]({{< relref "cli-user-guide#ares-package" >}}).

{{< note >}}
You can use any type of dummy app (web, QML, native) for packaging an external native service.
{{< /note >}}

## Step 5: Install the Native Service

The native service must be installed along with a dummy app.

For details on installing the dummy app, see [Installing the Web App]({{< relref "developing-external-web-apps#step-5-install-the-web-app" >}}).

## Step 6: Run the Native Service

If the native service is successfully installed, you can try running the native service on the target device.

To run the native service, use the following command on the target device's terminal:

``` bash
root@raspberrypi4-64:/sysroot/home/root# luna-send -f -n 1 luna://com.sample.echo.service/echo '{"input":"Hello, webOS OSE!"}'
```

The response will be:

``` bash
{
    "echoMessage": "Hello, webOS OSE!",
    "returnValue": true
}
```

When `echo` method of `com.sample.echo.service` is called, the service returns `input`, the delivered parameter, as `echoMessage`.