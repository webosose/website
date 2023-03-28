---
title: Developing External Native Apps
date: 2023-03-27
weight: 10
toc: true
---

External native apps are 3rd party native apps that must be installed on the webOS target device.

This page describes the steps to develop an external native app using [Sample Code Repository](https://github.com/webosose/samples) and CLI. For detailed information on the CLI commands used in this tutorial, see [CLI commands]({{< relref "cli-user-guide#cli-commands" >}}).

Developing an external native app requires the following steps:

* [Before You Begin](#before-you-begin)
* [Step 1: Implement a Native App](#step-1-implement-a-native-app)
* [Step 2: Configure the Native App](#step-2-configure-the-native-app)
* [Step 3: Build the Native App](#step-3-build-the-native-app)
* [Step 4: Package the Native App](#step-4-package-the-native-app)
* [Step 5: Install the Native App](#step-5-install-the-native-app)
* [Step 6: Launch the Native App](#step-6-launch-the-native-app)

## Before you begin

- Make sure you have completed the steps in [Native Development Kit Setup]({{< relref "setting-up-native-development-kit" >}}).
- Download the sample repository, and move into `samples/native-apps/external/com.sample.waylandegl` directory.

   ``` bash
   $ git clone https://github.com/webosose/samples
   $ cd samples/native-apps/external/com.sample.waylandegl
   ```

The directory structure of `com.sample.waylandegl` must be as follows:

``` bash
native-apps/external/com.sample.waylandegl/
├── src/
│   └── wayland_egl.c
├── appinfo.json
├── CMakeLists.txt
├── icon.png
└── README.md
```

## Step 1: Implement a Native App

### Source Code

Design and implement the source code for native app.

The sample codes will display a yellow screen on your target device. In this section, we will briefly explain webOS specific parts in `src/wayland_egl.c`.

{{< code "wayland_egl.c" >}}
``` c {linenos=table}
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
{{< /code >}}

A brief explanation of the above file:

- Line(1) : Include `wayland-webos-shell-client-protocol.h` header file which has `wl_webos_shell` and `wl_webos_shell_surface` structure.
- Line(5~6) : Declare `wl_webos_shell` and `wl_webos_shell_surface` structure which are the webOS specific extension of `wl_shell` and `wl_shell_surface`.
- Line(11~18) : Create a webOS shell surface for an existing surface and add the listener to receive events.
- Line(20) : Set the property related to display. If you set the last parameter to `1`, the sample app will be displayed on a secondary display. To set up the secondary display, see [Dual-Display Setup]({{< relref "setting-up-dual-displays" >}}).

For detailed information on the webOS-specific protocol extension, visit [webOS OSE GitHub](https://github.com/webosose/webos-wayland-extensions).

## Step 2: Configure the Native App

This section describes how to prepare the configuration files required to build and test the native app.

### appinfo.json

Apps are required to have metadata before they can be packaged. This metadata is stored in a file called `appinfo.json`, which is used by the webOS device to identify the app, its icon, and other information that is needed to launch the app.

{{< code "appinfo.json" >}}
``` json {linenos=table}
{
    "id": "com.sample.waylandegl",
    "version": "0.0.1",
    "vendor": "My Company",
    "type": "native",
    "main": "wayland_egl",
    "title": "wayland_egl",
    "icon": "icon.png"
}
```
{{< /code >}}

A brief explanation of the above file:

- Line(2) : The ID for the app.
- Line(5) : The type of the native app.
- Line(6) : The executable file name.
- Line(7) : The title to be shown on the Launchpad and App Bar.
- Line(8) : The icon to be shown on the Launchpad. Make sure the icon file is available in the project root directory. You can use your own icon.png (80*80) file or attached [icon.png](/images/docs/tutorials/icon.png).

For more details, see [appinfo.json]({{< relref "appinfo-json" >}}).

### CMakeLists.txt

`CMakeLists.txt` file is used by CMake to generate the Makefile to build the project. This file specifies the source, header, and UI files included in the project.

{{< note >}}
In this tutorial, we use the CMake to build the project. But you can use any other tools for the build.
{{< /note >}}

{{< code "CMakeLists.txt" >}}
``` cmake {linenos=table}
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

pkg_check_modules(EGL REQUIRED egl)
include_directories(${EGL_INCLUDE_DIRS})

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
        ${EGL_LDFLAGS}
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
{{< /code >}}

A brief explanation of the above file:

- Line(1) : Set the minimum CMake version.
- Line(2) : Set the project name and programming language.
- Line(4~20) : Add the directories that contain the header files.
- Line(22~29) : Set the name of result binary file and source files to be built.
- Line(30) : Set the language for linker.
- Line(32~37) : Specify the libraries to be used.
- Line(40~51) : Copy the `appinfo.json` and `icon.png` files to the output folder.

For more details, see [CMake Reference Documentation](https://cmake.org/documentation/).

## Step 3: Build the Native App

You are now ready to build the native app. Perform the following steps:

1. Go to your project directory (`com.sample.waylandegl`).

2. Create a build directory and go to the directory.

    ``` bash
    $ mkdir BUILD
    $ cd BUILD
    ```

3. Execute the `cmake` command. Then execute the `make` command. A `pkg_<YOUR_ARCHITECTURE>` directory will be created in your project folder (`com.sample.waylandegl`).

    ``` bash
    $ cmake ..
    $ make
    ```

    {{< note >}}
    In the name of the created directory, `<YOUR_ARCHITECTURE>` depends on your build machine's architecture.
    {{< /note >}}

## Step 4: Package the Native App

After building the native app, it must be packaged as an IPK file. Make sure the `appinfo.json` file is available, because it is required when packaging an external native app for webOS OSE.

To package the native app, use the `ares-package` command. The packaged file is generated in the current directory.

``` bash
$ cd ..
$ ares-package pkg_arm64
```

In the above command, `pkg_arm64` is the native app directory. You can use an absolute or relative path. Also, you can package the app with a service. For more details on using `ares-package`, see [ares-package]({{< relref "cli-user-guide#ares-package" >}}).

## Step 5: Install the Native App

{{< note >}}
- Before installing the app, ensure that the webOS OSE target device is registered on the CLI using the `ares-setup-device` command. For details, see [ares-setup-device]({{< relref "cli-user-guide#ares-setup-device" >}}).
- Make sure that the target device is running during the installation.
{{< /note >}}

To install the native app on the target device, execute the following command:

``` bash
$ ares-install ./com.sample.waylandegl_0.0.1_aarch64.ipk -d <TARGET_DEVICE>
```

In the above command:

- `<TARGET_DEVICE>` is the name of the target device.
- `./com.sample.waylandegl_0.0.1_aarch64.ipk` is the name of the IPK file that is generated after packaging the app in the previous step.

If the installation is successful, a `Success` message will appear.

To verify the installation, check if the native app ID (in this case, `com.sample.waylandegl`) is available in the output of the following command:

``` bash
$ ares-install --device <TARGET_DEVICE> --list
```

To remove the app from the device, use the `ares-install` command as follows:

``` bash
$ ares-install --device <TARGET_DEVICE> --remove com.sample.waylandegl
```

## Step 6: Launch the Native App

### Using the CLI

To launch the native app using the CLI, execute the following command:

``` bash
$ ares-launch --device <TARGET_DEVICE> com.sample.waylandegl
```

In the above command:

- `<TARGET_DEVICE>` is the name of the target device. This is the same device on which the app was installed in the previous step.
- `com.sample.waylandegl` is the app ID that is available after installing the app.

After executing the above command, check the target device to see if the app is running.

To close the app, use the `ares-launch` command as follows:

``` bash
$ ares-launch --device <TARGET_DEVICE> --close com.sample.waylandegl
```

### Using the Target Device

To launch the native app using the target device, you need to display the Launchpad first.

1. Drag the mouse cursor upward from the bottom of the screen (or swipe up from the bottom of the screen if you’re using a touch display).
2. Click the Launchpad icon.

    {{< figure src="/images/docs/tutorials/launchpad-icon.jpg" width="450px" alt="Launchpad icon" caption="" >}}

3. After the Launchpad is displayed, click the app icon.