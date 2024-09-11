---
title: Downloadable Native Apps
display_title: Developing Downloadable Native Apps
date: 2024-09-10
weight: 10
toc: true
---

A **downloadable native app** is a 3rd party native app that can be installed on the webOS target device.

{{< note "Downloadable vs. Built-In" >}}
In webOS OSE, apps and services are divided into two categories: downloadable and built-in.

- **Downloadable** apps/services are installed by appinstalld service. This service automatically generates several configurations for the apps/services. (such as trust level)
- **Built-in** apps/services are built and installed by developers. Developers can **customize** configurations to suit their needs.
{{< /note >}}

This tutorial shows a step-by-step guide for creating a downloadable native app from scratch.

## Prerequisites

Before you begin, prepare the followings:

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
samples/native-apps/downloadable/com.sample.waylandegl/
├── src/
│   └── wayland_egl.c
├── appinfo.json
├── CMakeLists.txt
├── icon.png
└── README.md
```

Descriptions for each file are as follows:

| File | Description |
| ---- | ----------- |
| wayland_egl.c | The main source code of the native app |
| appinfo.json | Metadata for the web app. For more details, see [appinfo.json]({{< relref "appinfo-json" >}}). |
| CMakeLists.txt | Build scripts for the app |
| icon.png | An image for the app icon displayed on the app bar |
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

## Step 01. Building an App

1. Go to your app directory. (`samples/native-apps/downloadable/com.sample.waylandegl/`)
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

    If the commands succeed, a `pkg_<YOUR_ARCHITECTURE>` directory will be generated in your app directory. `<YOUR_ARCHITECTURE>` depends on your build machine’s architecture.
    
    In the following example, the `pkg_aarch64` directory is generated.

    ```
    pkg_aarch64/
    ├── appinfo.json
    ├── icon.png
    └── wayland_egl
    ```

## Step 02. Packaging the App

To install the app, you have to package the app first.

Enter the following command:

``` bash
# Command format
# ares-package <APP DIRECTORY>
ares-package pkg_aarch64
```

If the command succeeds, an `.ipk` file will be generated under the current directory.

``` bash
# Generated .ipk file
com.sample.waylandegl_0.0.1_aarch64.ipk
```

## Step 03. Installing the App

It's time to install your package to the target device.

Enter the following command:

``` bash
# Command format
# ares-install --device <TARGET DEVICE> <PACKAGED APP>
ares-install --device webos com.sample.waylandegl_0.0.1_aarch64.ipk
```

## Step 04. Launching the App

To launch the installed app, enter the following command:

``` bash
# Command format
# ares-launch --device <TARGET_DEVICE> <APP ID>
ares-launch --device webos com.sample.waylandegl
```

If the command succeeds, a yellow screen will be displayed.

## Appendix. Code Explanation

This section explains the samples source codes in this tutorial.

### appinfo.json

`appinfo.json` stores the app's metadata.

``` json
{
    "id": "com.sample.waylandegl",  # ID of the app. This ID will be used as a unique identifier for the app.
    "version": "0.0.1",
    "vendor": "My Company",
    "type": "native",               # Type of the app
    "main": "wayland_egl",          # The executable file (.c)
    "title": "wayland_egl",         # This string will be displayed on the app bar
    "icon": "icon.png"              # A path to an image for your app icon
}
```

### wayland_egl.c

This sample code will display a yellow screen on your target device.

The sample uses Wayland and webOS-specific extensions. For more details about functions in the code, see the following pages:

- [Wayland official website](https://wayland.freedesktop.org/)
- [webos-wayland-extensions | webOS OSE GitHub](https://github.com/webosose/webos-wayland-extensions)

``` cpp {linenos=table}
#include <wayland-egl.h>
...
struct wl_webos_shell *g_pstWebOSShell = NULL;
struct wl_webos_shell_surface *g_pstWebosShellSurface = NULL;
...
 
// Please see wayland-webos-shell-client-protocol.h file for webOS specific wayland protocol
g_pstWebosShellSurface = wl_webos_shell_get_shell_surface(g_pstWebOSShell, g_pstSurface);
if (g_pstWebosShellSurface == NULL)
{
    fprintf(stderr, "Can't create webos shell surface\n");
    exit(1);
}
wl_webos_shell_surface_add_listener(g_pstWebosShellSurface, &s_pstWebosShellListener, g_pstDisplay);
wl_webos_shell_surface_set_property(g_pstWebosShellSurface, "appId", (getenv("APP_ID") ? getenv("APP_ID") : "com.sample.waylandegl"));
// for secondary display, set the last parameter as 1
wl_webos_shell_surface_set_property(g_pstWebosShellSurface, "displayAffinity", (getenv("DISPLAY_ID") ? getenv("DISPLAY_ID") : "0"));
...
```

A brief explanation of the above file:

- Line(2~3) : Declare `wl_webos_shell` and `wl_webos_shell_surface` structure which are the webOS specific extension of `wl_shell` and `wl_shell_surface`.
- Line(8~15) : Create a webOS shell surface for an existing surface and add the listener to receive events.
- Line(17) : Set the property related to display. If you set the last parameter to 1, the sample app will be displayed on a secondary display. 

For detailed information on the webOS-specific protocol extension, visit [webos-wayland-extensions | webOS OSE GitHub](https://github.com/webosose/webos-wayland-extensions).

### CMakeLists.txt

[CMake](https://cmake.org/) is a tool for supporting cross-platform build. Developers configure prerequisites and build steps in `CMakeLists.txt`, and then CMake reads this file, creates the build system, and builds the project.

In this sample code, `CMakeLists.txt` specifies the source file (`.c`), header, and UI files for the native app.

``` cmake
...

cmake_minimum_required(VERSION 2.8.7)
project(wayland_egl C CXX)



include_directories(${CMAKE_SOURCE_DIR})
include_directories(${CMAKE_SOURCE_DIR}/src)
include_directories(${CMAKE_SOURCE_DIR}/include)

include(FindPkgConfig)

pkg_check_modules(WLCLIENT REQUIRED wayland-webos-client)
include_directories(${WLCLIENT_INCLUDE_DIRS})

pkg_check_modules(WLEGL REQUIRED wayland-egl)
include_directories(${WLEGL_INCLUDE_DIRS})

pkg_check_modules(GLESV2 REQUIRED glesv2)
include_directories(${GLESV2_INCLUDE_DIRS})

set(BIN_NAME wayland_egl)

set(SRC_LIST
        ${CMAKE_SOURCE_DIR}/src/wayland_egl.c
)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/pkg_$ENV{OECORE_TARGET_ARCH}/")
add_executable(${BIN_NAME} ${SRC_LIST})
set_target_properties(${BIN_NAME} PROPERTIES LINKER_LANGUAGE C)

target_link_libraries (${BIN_NAME}
        ${WLCLIENT_LDFLAGS}
        ${WLEGL_LDFLAGS}
        -lEGL
        ${GLESV2_LDFLAGS}
)

# copy appinfo.json file to output folder
if(EXISTS "${CMAKE_SOURCE_DIR}/appinfo.json")
    file(COPY "${CMAKE_SOURCE_DIR}/appinfo.json" DESTINATION ${CMAKE_RUNTIME_OUTPUT_DIRECTORY})
else()
    MESSAGE( "'appinfo.json' file was not found !!")
endif()

# copy icon.png file to output folder
if(EXISTS "${CMAKE_SOURCE_DIR}/icon.png")
    file(COPY "${CMAKE_SOURCE_DIR}/icon.png" DESTINATION ${CMAKE_RUNTIME_OUTPUT_DIRECTORY})
else()
    MESSAGE( "'icon.png' file was not found !!")
endif()
```

{{< note >}}
See also [CMake Reference Documentation](https://cmake.org/documentation/).
{{< /note >}}