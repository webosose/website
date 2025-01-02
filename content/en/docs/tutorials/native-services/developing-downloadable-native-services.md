---
title: Downloadable Native Services
display_title: Developing Downloadable Native Services
date: 2025-01-02
weight: 10
toc: true
---

A **downloadable native service** is a 3rd party native service that can be installed on the webOS target device.

{{< note "Downloadable vs. Built-In" >}}
In webOS OSE, apps and services can be classified into two types based on how they are installed on the target device.

- **Downloadable** apps/services are installed by the appinstalld service. The appinstalld service creates webOS configurations based on files created by developers. (such as trust level) Developers can modify only certain parts of the app/service settings.
- **Built-in** apps/services are built and installed by developers. Developers can **customize** app/service's configurations to suit their needs.
{{< /note >}}

This tutorial shows a step-by-step guide for creating a downloadable native service from scratch.

## Prerequisites

Before you begin, prepare the following:

- [Samples repository](https://github.com/webosose/samples)
- [Command-Line Interface (CLI)](https://github.com/webos-tools/cli)
- [Native development kit (NDK)]({{< relref "setting-up-native-development-kit" >}})

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
samples/native-services/downloadable/
├── com.sample.echo/
│   ├── appinfo.json
│   ├── icon.png
│   ├── index.html
│   └── script.js
├── com.sample.echo.service/
│   ├── src/
│   │    └── main.c
│   ├── CMakeLists.txt
│   └── services.json
└── README.md
```

Descriptions for each file are as follows:

| File | Description |
| ---- | ----------- |
| appinfo.json | Metadata for the web app. For more details, see [appinfo.json]({{< relref "appinfo-json" >}}). |
| icon.png | An image for the app icon displayed on the app bar |
| index.html | This file defines the UI of the app. |
| script.js | This file calls the sample method defined in `com.sample.echo.service`. |
| main.c | A sample service that provides a sample method. | |
| CMakeLists.txt | Build scripts for the app |
| services.json | Metadata for the service |
| README.md | This file introduces the app (such as summary, dependencies, and license information). |

### Command-Line Interface

The [Command-Line Interface (CLI)](https://github.com/webos-tools/cli) enables you to create, install, and launch apps or services using in a command-line environment.

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

### Native Development Kit

**Native Development Kit (NDK)** is a set of tools that include toolchains, libraries, and header files. NDK enables you to build a native app on your computer.

Follow the guides in [Native Development Kit Setup]({{< relref "setting-up-native-development-kit" >}}).

## Step 01. Building a Services

1. Go to your app directory. (`samples/native-services/downloadable/com.sample.echo.service/)`)
2. Create a build directory and go into the directory.

    ``` bash
    $ mkdir BUILD
    $ cd BUILD
    ```

3. Execute the build commands.

    ``` bash
    $ cmake ..
    $ make
    ```

    If the commands succeed, an `output` directory will be generated.

    ```
    BUILD/output/
    ├── echo_service
    └── services.json
    ```

## Step 02. Packaging the Service

To install the service, you have to package the service with an app first.

Enter the following command:

``` bash
# Command format
# ares-package <APP DIRECTORY> <SERVICE DIRECTORY>
ares-package ./com.sample.echo ./com.sample.echo.service/BUILD/output
```

If the command succeeds, an `.ipk` file will be generated under the current directory.

``` bash
# Generated .ipk file
# com.sample.echo is an ID of the dummy app
com.sample.echo_0.0.1_all.ipk
```

## Step 03. Installing the Service

It's time to install your package to the target device.

Enter the following command:

``` bash
# Command format
# ares-install --device <TARGET DEVICE> <PACKAGED APP>
ares-install --device webos com.sample.echo_0.0.1_all.ipk
```

## Step 04. Testing the Service

You can check whether the service is running or not.

Enter the following command:

``` bash
# Command format
# ares-shell -r "luna-send -n 1 -f luna://<SERVICE NAME>/<METHOD NAME> '<PARAMETERS>'" --device <TARGET DEVICE>
ares-shell -r "luna-send -f -n 1 luna://com.sample.echo.service/echo '{"input":"Hello, webOS OSE!"}'" --device webos
```

In the above command, 

- `<SERVICE NAME>` is the service name defined in `services.json` and `package.json`.
- `<METHOD NAME>` is one of the method's names defined in the main service file.
- `<PARAMETERS>` is a JSON string containing the method's input parameters.
- `<TARGET DEVICE>` is the nickname of the target device set by `ares-setup-device`.

If the command succeeds, the target device returns the following message:

``` bash
# Return
{
    "returnValue": true,
    "echoMessage": "Hello, webOS OSE!"
}
```

When the `com.sample.echo.service/echo` returns the input, the delivered parameter, as `echoMessage`.

## Appendix. Code Explanation

This section explains the sample source codes in this tutorial.

### main.c

{{< code "main.c" >}}
``` c {linenos=table}
...
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

- Line (2): Includes `lunaservice.h` header file to use luna service. For detailed information about luna service, see [Introduction to LS2 API]({{< relref "introduction-to-ls2-api" >}}).
- Line (4-8): Declares the echo method.
- Line (11-14): Implements echo method. This method will return the input as you entered.
- Line (16): Returns a handle to the connection-to-bus through which the message was sent.
- Line (18): Appends a method to the category.
- Line (20): Attaches a service to a glib mainloop.

### services.json

`services.json` stores the metadata of the service.

``` json
{
  "id": "com.sample.echo.service",         // An ID of the "services" array. Typically, this value is the "name" of the first object of the "services" array.
  "description": "Native echo service",
  "engine":"native",
  "services": [
    {
      "name": "com.sample.echo.service",   // A unique identifier of the service.
                                           // This value MUST START with the app ID, which is packaged with the service.
                                           // For example, if the app ID is com.domain.app, the service ID must start with com.domain.app.xxx. (e.g., com.domain.app.service)
      "description": "Native echo service" 
    }
  ]
}
```

{{< note >}}
See also [services.json]({{< relref "services-json" >}}).
{{< /note >}}

### CMakeLists.txt

[CMake](https://cmake.org/) is a tool for supporting cross-platform build. Developers configure prerequisites and build steps in `CMakeLists.txt`, and then CMake reads this file, creates the build system, and builds the project.

{{< code "CMakeLists.txt" >}}
``` cmake {linenos=table}
cmake_minimum_required(VERSION 2.8.7)
project(nativeService C)
 
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
 
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/output)
add_executable(${BIN_NAME} ${SRC_LIST})
 
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

- Line (1): Sets the minimum CMake version.
- Line (2): Sets the project name and programming language.
- Line (9~31): Adds the directories that contain the header files.
- Line (35~42): Sets the name of result binary file and source files to be built.
- Line (46): Sets the language for linker.
- Line (48~54): Specifies the libraries to be used.
- Line (56): Copies the services.json file to the output folder.

{{< note >}}
For more details, see [CMake Reference Documentation](https://cmake.org/documentation/).
{{< /note >}}