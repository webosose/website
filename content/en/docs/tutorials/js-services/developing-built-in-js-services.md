---
title: Built-in JS Services
display_title: Developing Built-in JS Services
date: 2024-11-29
weight: 20
toc: true
---

A **built-in JavaScript (JS) service** is a JS service that is installed with the webOS OSE platform at build time.

{{< note "Downloadable vs. Built-In" >}}
In webOS OSE, apps and services can be classified into two types based on how they are installed on the target device.

- **Downloadable** apps/services are installed by the appinstalld service. The appinstalld service creates webOS configurations based on files created by developers. (such as trust level) Developers can modify only certain parts of the app/service settings.
- **Built-in** apps/services are built and installed by developers. Developers can **customize** app/service's configurations to suit their needs.
{{< /note >}}

This tutorial shows a step-by-step guide for creating a built-in JS service from scratch.

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
samples/js-services/
├── build-config/
│   ├── com.example.service.js.bb
│   └── webos-local.conf
└── com.example.service.js/
    ├── files/
    │   └── sysbus/
    │       ├── com.example.service.js.api.json.in
    │       ├── com.example.service.js.groups.json.in
    │       ├── com.example.service.js.perm.json.in
    │       ├── com.example.service.js.role.json.in
    │       └── com.example.service.js.service.in
    ├── CMakeLists.txt
    ├── README.md
    ├── com_example_service_js.js
    └── package.json
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

- `samples/js-services/build-config/com.example.service.js.bb`
- `samples/js-services/build-config/webos-local.conf`

### com.example.service.js/ & com.example.service.js.bb

1. Create a new directory.

    ``` bash
    mkdir build-webos/meta-webosose/meta-webos/recipes-webos/com.example.service.js/
    ```

2. Copy the file.

    - **From**: `samples/js-services/build-config/com.example.service.js.bb`
    - **To**: `build-webos/meta-webosose/meta-webos/recipes-webos/com.example.service.js/`

After moving the files and folders, the directory hierarchy will be as follows:

```
build-webos/meta-webosose/meta-webos/recipes-webos/com.example.service.js/
└── com.example.service.js.bb
```

### webos-local.conf

1. Copy the file.

    - **From**: `samples/js-services/build-config/webos-local.conf`
    - **To**: `build-webos/webos-local.conf`

2. Edit the copied `webos-local.conf`.

    ```plain
    INHERIT += "externalsrc"
    EXTERNALSRC:pn-com.example.service.js = "<PATH TO samples/js-services/com.example.service.js>/"
    EXTERNALSRC_BUILD:pn-com.example.service.js = "<PATH TO samples/js-services/com.example.service.js>/build/"
    PR:append:pn-com.example.service.js =".local0"
    ``` 

    1. Change `<PATH TO samples/js-services/com.example.service.js>` with your own path.
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
    rm -rf <PATH TO samples/js-services/com.example.service.js>/build
    ```

2. Move to the root directory (`build-webos`), and build the native app.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake com.example.service.js
    ```

    If the build succeeds, an `.ipk` file will be generated under the samples directory:

    ```
    samples/js-services/com.example.service.js/oe-workdir/deploy-ipks/raspberrypi4_64
    └── com.example.service.js_0.0.1-r0.local0_raspberrypi4_64.ipk
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
        com.example.service.js \       # Add the service ID
    "
        ...
    ```

2. Build the webOS OSE platform.

    ``` bash
    build-webos$ bitbake webos-image
    ```

    Once the build is done, a webOS image will be generated as follows: 
    
    - `build-webos/BUILD/deploy/images/raspberrypi4-64/webos-image-raspberrypi4-64.rootfs.wic`

3. Flash the generated image. See [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).

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
    opkg install com.example.service.js_0.0.1-r0.local0_raspberrypi4_64.ipk

    Installing com.example.service.js (0.0.1) on root.
    Configuring com.example.service.js.
    ```

4. Reboot the device. 

    ``` bash
    reboot -f
    ```

    After rebooting the device, you can see the app icon in the Launchpad.

    {{< figure src="/images/docs/tutorials/web-apps/installed-built-in-web-app.jpg" >}}

## Step 04. Testing the Service

You can check whether the service is running or not.

Call any method defined in the JS service.

``` bash
luna-send -n 1 -f luna://com.example.service.js/hello '{}'
# Return
{
    "returnValue": true,
    "answer": "Hello, JS Service!!"
}
```

## Appendix. Code Explanation

This section briefly explains the sample codes used in this tutorial.

### com.example.service.js.bb

{{< code "com.example.service.js.bb" >}}
``` bb {linenos=table}
# Copyright (c) 2020-2022 LG Electronics, Inc.

SUMMARY = "JS Service Sample"
AUTHOR = "Author's name <Author's e-mail>"
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/Apache-2.0;md5=89aea4e17d99a7cacdbeed46a0096b10"

WEBOS_VERSION = "0.0.1"
PR = "r0"

inherit webos_component
inherit webos_submissions
inherit webos_cmake
inherit webos_system_bus

FILES:${PN} += "${webos_servicesdir}/${PN}/*"
```
{{< /code >}}

A brief explanation of the above file:

- Line (1~6): Basic descriptions of the component.
- Line (8): The version of the component. Every webOS component must contain this.
- Line (9): Revision version of the recipe. Each recipe requires a counter to track its modification history. Make sure that you increment the version when you edit the recipe, unless you only change the value of the `WEBOS_VERSION` field or comments.
- Line (11~14): Inherits from other classes.
    - Line (11): Inherits common functions of webOS. For all components of webOS, this entry is required.
    - Line (12): Inherits `webos_submissions` to check the version information set correctly. This field is required if you develop your component on a local repository.
    - Line (13): Instructs OpenEmbedded that the component uses CMake for configuration, which is the preferred choice for webOS components.
    - Line (14): Inherits `webos_system_bus` to register component as a service and install LS2 configuration files.
- Line (14): Appends the list of files and directories that are placed in a package. Adds the files under `/usr/palm/service/com.example.service.js` directory for packaging.

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
project(com.example.service.js NONE)
set(CMAKE_BUILD_TYPE Debug)

include(webOS/webOS)

webos_modules_init(1 6 3)
webos_component(0 0 1)

set(INSTALL_DIR ${WEBOS_INSTALL_WEBOS_SERVICESDIR}/${CMAKE_PROJECT_NAME})
#install necessary files to destination directory
install(DIRECTORY . DESTINATION ${INSTALL_DIR}
        USE_SOURCE_PERMISSIONS
        PATTERN "*~" EXCLUDE
        PATTERN "CMake*" EXCLUDE
        PATTERN "build*" EXCLUDE
        PATTERN "oe-*" EXCLUDE
        PATTERN "*.lock" EXCLUDE
        PATTERN "*.in" EXCLUDE
        PATTERN "files" EXCLUDE
        PATTERN "README.md" EXCLUDE)

webos_build_system_bus_files()
```
{{< /code >}}

A brief explanation of the above file:

- Line (1): Sets the minimum required version of CMake for a project.
- Line (2): Sets a name for the project. The second value (NONE) disables all checks for any programming language.
- Line (5): Includes webOS modules for the build.
- Line (7): Specifies the “**cmake-modules-webos**” version.
- Line (8): Specifies webos_component with the component version to use webOS variables for the standard system paths. It commonly follows three digit versioning scheme.
- Line (10): Sets a path to install the app. `WEBOS_INSTALL_WEBOS_APPLICATIONSDIR` is set to `/usr/palm/applications/` by default.
- Line (12~21): Installs required files to `INSTALL_DIR` on the target device. Excludes the files that do not need to be installed on the target device.
- Line (23): Installs the LS2 configuration files (`/files/sysbus`) to the target.

{{< note >}}
See also [CMake Documentation](https://cmake.org/documentation/).
{{< /note >}}

### README.md

This file provides overall information about the service.

{{< caution >}}
- If the README.md file is missing, a build error occurs.
- Make sure the ‘Summary’ section is a single line. Even any whitespace at the line above the ‘Description’ section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}

{{< code "com" >}}
``` markdown {linenos=table}
Summary
-------
js service sample

Description
-----------
js service sample

How to Build on Linux
---------------------

## Dependencies

Below are the tools and libraries (and their minimum versions) required to build sample program:

* cmake (version required by cmake-modules-webos)

## Building

    $ cd build-webos
    $ source oe-init-build-env
    $ bitbake com.example.service.js

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

### com_example_service_js.js

This file defines the methods of the service.

{{< code "com_example_service_js.js" >}}
``` js {linenos=table}
var Service = require('webos-service');

// Register com.example.service.js
var service = new Service("com.example.service.js");

// A method that always returns the same value
service.register("hello", function(message) {
    console.log("[com.example.service.js]", "SERVICE_METHOD_CALLED:hello");
    message.respond({
        answer: "Hello, JS Service!!"
    });
});

// Call another service
service.register("time", function(message) {
    service.call("luna://com.webos.service.systemservice/clock/getTime", {}, function(m2) {
        console.log("[com.example.service.js]", "SERVICE_METHOD_CALLED:com.webos.service.systemservice/clock/getTime");
        const response = "You appear to have your UTC set to: " + m2.payload.utc;
        message.respond({message: response});
    });
});
```
{{< /code >}}

A brief explanation of the above file:

- Line(1): Loads the `webos-service` module.
- Line(4): Registers the service.
- Line(7~12): Registers the hello method that responds to a request with a “Hello, JS Service!!” message
- Line(15~21): Registers the time method. This method gets the value of UTC information from the response received by calling `com.webos.service.systemservice/clock/getTime` method.

{{< note >}}
For more details, see [webos-service Library API Reference]({{< relref "webos-service-library-api-reference" >}}).
{{< /note >}}