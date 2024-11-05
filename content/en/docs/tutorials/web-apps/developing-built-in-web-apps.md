---
title: Built-in Web Apps
display_title: Developing Built-in Web Apps
date: 2024-10-02
weight: 20
toc: true
---

A **built-in web app** is a web app that is installed with the webOS OSE platform at build time.

{{< note "Downloadable vs. Built-In" >}}
In webOS OSE, apps and services can be classified into two types based on how they are installed on the target device.

- **Downloadable** apps/services are installed by the appinstalld service. The appinstalld service creates webOS configurations based on files created by developers. (such as trust level) Developers can modify only certain parts of the app/service settings.
- **Built-in** apps/services are built and installed by developers. Developers can **customize** app/service's configurations to suit their needs.
{{< /note >}}

This tutorial shows a step-by-step guide for creating a built-in web app from scratch.

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

The directory structure of the sample web app will be as follows:

```
samples/web-apps/
├── build-config/
|     ├── com.example.app.web.bb
|     └── webos-local.conf
└── com.example.app.web/
    ├── appinfo.json
    ├── CMakeLists.txt
    ├── icon.png
    ├── index.html
    └── README.md
```

### Platform Source Code

Since the built-in web app is built using the [webOS OSE source code](https://github.com/webosose/build-webos), you need to download and set up the source code.

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

- `samples/web-apps/build-config/com.example.app.web.bb`
- `samples/web-apps/build-config/webos-local.conf`

### com.example.app.web.bb

1. Create a new directory.

    ``` bash
    mkdir build-webos/meta-webosose/meta-webos/recipes-webos/com.example.app.web/
    ```

2. Copy the file.

    - **From**: `samples/web-apps/build-config/com.example.app.web.bb`
    - **To**: `build-webos/meta-webosose/meta-webos/recipes-webos/com.example.app.web/com.example.app.web.bb`

### webos-local.conf

1. Copy the file.

    - **From**: `samples/web-apps/build-config/webos-local.conf`
    - **To**: `build-webos/webos-local.conf`

2. Edit the copied `webos-local.conf`.

    ```plain {linenos=table}
    INHERIT += "externalsrc"
    EXTERNALSRC:pn-com.example.app.web = "<PATH TO samples/web-apps/com.example.app.web>/"
    EXTERNALSRC_BUILD:pn-com.example.app.web = "<PATH TO samples/web-apps/com.example.app.web>/build/"
    PR:append:pn-com.example.app.web =".local0"
    ``` 

    1. Change `<PATH TO samples/web-apps/com.example.app.web>` with your own path.
    2. We recommend adding a trailing slash (/) at the end of all directory paths, as in Lines 2 and 3.

## Step 02. Building the App

There are two options to build a web app: **App alone** or **with the platform**.

**Choose your build option** depending on your target device.

| Option | Description |
| ------ | ----------- |
| App Alone | This option generates an `.ipk` package by building an app using the platform source code, and then installs the generated package on the target device. <br /><br />This option is **only available for Raspberry Pi 4**. For other type of devices, use the **with the platform** option. |
| With the Platform | This option embeds the app into the platform source code and build it at once. |

### App Alone

1. (Optional) Remove the existing `build` directory. (If you've ever built a built-in web app.)

    ``` bash
    rm -rf <PATH TO samples/web-apps/com.example.app.web>/build
    ```

2. Move to the root directory (`build-webos`), and build the web app.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake com.example.app.web
    ```

    If the build succeeds, an `.ipk` file will be generated under the samples directory:

    ```
    samples/web-apps/com.example.app.web/oe-workdir/deploy-ipks/all/
    └── com.example.app.web_1.0.0-r0.local0_raspberrypi4_64.ipk
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
        com.example.app.web \       # Add the app ID
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
    root@raspberrypi4-64:/media/internal/downloads# opkg install com.example.app.web_1.0.0-r0.local0_raspberrypi4_64.ipk

    Installing com.example.app.web (1.0.0) on root.
    Configuring com.example.app.web.
    No image conversions needed for com.example.app.web
    ```

4. Reboot the device. 

    ``` bash
    reboot -f
    ```

    After rebooting the device, you can see the app icon in the Launchpad.

    {{< figure src="/images/docs/tutorials/web-apps/installed-built-in-web-app.jpg" >}}

## Appendix. Code Explanation

This section briefly explains the sample codes used in this tutorial.

### com.example.app.web.bb

{{< code "com.example.app.web.bb" >}}
``` bb {linenos=table}
SECTION = "webos/apps"
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/Apache-2.0;md5=89aea4e17d99a7cacdbeed46a0096b10"
 
WEBOS_VERSION = "1.0.0"
PR = "r0"
 
inherit webos_component
inherit webos_submissions
inherit webos_cmake
inherit webos_app
inherit webos_arch_indep
 
FILES:${PN} += "${webos_applicationsdir}"
```
{{< /code >}}

A brief explanation of the above file:

- Line (1): The section where packages should be categorized.
- Line (2~3): License information for the app.
- Line (5): The version of the component. Every webOS component must contain this.
- Line (6): The revision of the recipe. Unless you're changing the `WEBOS_VERSION` or just adding a comment, you should increment this value each time you modify the recipe.
- Line (8~12): Inherits from other classes.
    - Line (8): Common webOS functions. Every webOS component must contain this.
    - Line (9): Inherits `webos_submissions` to check the version information set correctly. This field is required if you develop your component on a local repository.
    - Line (10): Uses CMake for component's configuration.
    - Line (11): For apps, this field is required.
    - Line (12): Inherits this class if the component is independent of CPU architecture (such as a web app). Make sure that the project field in the CMake is set as NONE (e.g., `project(com.example.app.web NONE)`). If not, CMake will try to find the C and C++ compilers. This might cause build failure because your component will be built before the toolchain.
- Line (14): Defines files included in the package. `${webos_applicationsdir}` indicates `/usr/palm/applications`. `${PN}` is the package name (`com.example.app.web`).

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
    "id": "com.example.app.web",            # ID of the app. This ID will be used as a unique identifier for the app.
    "version": "0.0.1",
    "vendor": "My Company",
    "type": "web",                          # Type of the app
    "main": "index.html",                   # The HTML file that contains the contents of your app
    "title": "Web app sample",              # This string will be displayed on the app bar
    "icon": "icon.png",                     # A path to an image for your app icon
    "requiredPermissions" : ["time.query"]  # ACG values for the app
}
```

{{< note >}}
See also [appinfo.json]({{< relref "appinfo-json" >}}).
{{< /note >}}

### CMakeLists.txt

[CMake](https://cmake.org/) is a tool for supporting cross-platform build. Developers configure prerequisites and build steps in `CMakeLists.txt`, and then CMake reads this file, creates the build system, and builds the project.

{{< code "CMakeLists.txt" >}}
``` cmake {linenos=table}
cmake_minimum_required(VERSION 2.8.7)
project(com.example.app.web NONE)
include(webOS/webOS)
webos_modules_init(1 0 0 QUALIFIER RC4)
 
set(INSTALL_DIR ${WEBOS_INSTALL_WEBOS_APPLICATIONSDIR}/${CMAKE_PROJECT_NAME})
#install necessary files to destination directory
install(DIRECTORY . DESTINATION ${INSTALL_DIR}
        PATTERN "*~" EXCLUDE
        PATTERN "CMake*" EXCLUDE
        PATTERN "build*" EXCLUDE
        PATTERN "README.md" EXCLUDE
        PATTERN "oe-*" EXCLUDE
        PATTERN "*.lock" EXCLUDE)
```
{{< /code >}}

A brief explanation of the above file:

- Line (1): Sets the minimum required version of CMake for a project.
- Line (2): Sets a name for the project. The second value (`NONE`) disables all checks for any programming language.
- Line (3): Includes webOS modules for the build.
- Line (4): Specifies the “**cmake-modules-webos**” version.
- Line (6): Sets a path to install the app. `WEBOS_INSTALL_WEBOS_APPLICATIONSDIR` is set to `/usr/palm/applications/` by default.
- Line (8~14): Installs required files to `INSTALL_DIR` on the target device. Excludes the files that do not need to be installed on the target device.

{{< note >}}
See also [CMake Documentation](https://cmake.org/documentation/).
{{< /note >}}

### index.html

This file defines your web app's behavior.

{{< code "index.html" >}}
``` html {linenos=table}
<!DOCTYPE html>
<html>
<head>
<title>Example Web App</title>
<style type="text/css">
 
   ...
 
</style>
<script type="text/javascript">
    var bridge = new WebOSServiceBridge();
    var url = 'luna://com.webos.service.systemservice/clock/getTime';
    var params = '{}';
 
    function callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            webOSSystem.PmLogString(6, "GETTIME_SUCCESS", '{"APP_NAME": "example web app"}', "UTC : " + arg.utc);
        }
        else {
            webOSSystem.PmLogString(3, "GETTIME_FAILED", '{"APP_NAME": "example web app"}', "errorText : " + arg.errorText);
        }
    }
 
    bridge.url = url;
    bridge.onservicecallback = callback;
    bridge.call(url, params);
</script>
</head>
<body>
    <div>
        <h1>Hello, Web Application!!</h1>
    </div>
</body>
</html>
```
{{< /code >}}

A brief explanation of the above file:

- Line (11): Creates a WebOSServiceBridge object. This object has methods and properties to use LS2 APIs. For more details, see [WebOSServiceBridge API Reference]({{< relref "webosservicebridge-api-reference" >}}).
- Line (12): Stores an LS2 method URL. For the full list of LS2 APIs, see [LS2 API List]({{< relref "ls2-api-index#ls2-api-list" >}}).
- Line (15~23): The callback function for the LS2 API call. In this tutorial, the callback function prints the return value of the API call (current time) using PmLogLib. See [Using PmLogLib in JavaScript]({{< relref "using-pmloglib-in-javascript" >}}).
- Line (26): Sets the callback function for the LS2 API call.
- Line (27):  Calls the LS2 API specified in the url and params variables.

### README.md

This file provides overall information about the app.

{{< caution >}}
- If the README.md file is missing, a build error occurs.
- Make sure the ‘Summary’ section is a single line. Even any whitespace at the line above the ‘Description’ section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}


``` markdown
Summary
-------
web app sample

Description
-----------

web app sample

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
    $ bitbake com.example.app.web

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
