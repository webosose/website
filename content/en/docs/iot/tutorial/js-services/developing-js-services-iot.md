---
title: Developing JS Services
date: 2022-12-02
weight: 20
toc: true
---

{{< caution >}}
webOS IoT is **ONLY** supported from webOS OSE 2.4.0 to webOS OSE 2.18.0. We plan to replace webOS IoT with [Matter](https://csa-iot.org/all-solutions/matter/) in the future release.
{{< /caution >}}

To create a JS service, you must write the source code and prepare the required configuration files.

For easier understanding, the process to create a JS service is explained using the example of a service named **`com.example.service.js`** that has the following methods:

- **`hello`** - Calling this method on the target gives response as "Hello, JS Service!!".

- **`locale`** - Calls methods of another service and gets a value from it.

The directory structure of `com.example.service.js` must be as follows:

``` bash
com.example.service.js
├── CMakeLists.txt
├── README.md
├── files
│   └── sysbus
│       ├── com.example.service.js.api.json.in
│       ├── com.example.service.js.perm.json.in
│       ├── com.example.service.js.role.json.in
│       └── com.example.service.js.service.in
├── com_example_service_js.js
├── package.json
```

{{< note >}}
`com.example.service.js` is created as a dynamic service. Therefore, we do not have to create a Systemd configuration file.
{{< /note >}}

Developing a JS service requires the following steps:

* [Prerequisites](#before-you-begin)
* [Step 1: Implementation](#step-1-implement-the-js-service)
* [Step 2: Configuration](#step-2-configure-the-js-service)
* [Step 3: Build](#step-3-build-the-js-service)
* [Step 4: Verification](#step-4-run-and-verify-the-js-service)
* [Step 5: Deployment](#step-5-deploy-the-js-service)

## Before you begin

- Build and flash the webOS IoT image. For detailed information, see [Building webOS IoT]({{< relref "building-webos-iot" >}}) and [Flashing webOS IoT]({{< relref "flashing-webos-iot" >}}).

- Create a project directory (`com.example.service.js`) for the sample JS service, and move into the directory.

    ``` bash
    $ mkdir com.example.service.js
    $ cd com.example.service.js
    ```

## Step 1: Implement the JS Service

### Source Code

First, define the functionality of the JS service on the source code.

For the sample JS service (`com.example.service.js`), you must:

- **Create and update the file:** `com_example_service_js.js`
- **Directory:** `com.example.service.js`

``` javascript {linenos=table}
var Service = require('webos-service');
var pmloglib = require('pmloglib');
var context = new pmloglib.Context("exampleJSService");

// Register com.example.service.js
var service = new Service("com.example.service.js");

// A method that always returns the same value
service.register("hello", function(message) {
    message.respond({
        answer: "Hello, JS Service!!"
    });
});

// Call another service
service.register("locale", function(message) {
    service.call("luna://com.webos.settingsservice/getSystemSettings", {"key":"localeInfo"}, function(m2) {
        context.log(pmloglib.LOG_INFO, "LOCALE_CALLBACK", {"SERVICE_NAME": "exampleJSService"}, "get locale response");
        var response = "You appear to have your locale set to: " + m2.payload.settings.localeInfo.locales.UI;
        message.respond({
            message: response
        });
    });
});
```

A brief explanation of the above file:

- Line(1) : Load the webos-service module. For more details about webos-service, see [webos-service Library API Reference.]({{< relref "webos-service-library-api-reference-iot" >}})

- Line(2~3) : Load the pmloglib module. For more details about pmloglib, see [Using PmLogLib in Node.js]({{< relref "using-pmloglib-in-nodejs" >}}).

- Line(6) : Register the JS Service.

- Line(9~13) : Register the `hello` method which responds to a request with a "Hello, JS Service!!" message

- Line(16~24) : Register the `locale` method. This method gets the value of locale information from the response received by calling settingsservice's `getSystemSettings` method.

### README.md

This file provides general information of the JS service and it must be located in the root directory. For the sample JS service (`com.example.service.js`), you must:

- **Create and update the file:** `README.md`
- **Directory:** `com.example.service.js`

{{< caution >}}
* If the `README.md` file is missing, a build error occurs.
* Make sure the 'Summary' section is a single line. Even **any whitespace** at the line above the 'Description' section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}

**Sample README.md**

``` plaintext
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

## Step 2: Configure the JS Service

This section describes how to prepare the configuration files required to build and test the JS service.

### package.json

This file configures the service metadata and points to the main service file. It is required for packaging (related with Node.js) and must be located in the project root directory. For more details, see the [NPM documentation](https://docs.npmjs.com/getting-started/using-a-package.json).

For the sample JS service (`com.example.service.js`), you must:

- **Create and update the file:** `package.json`
- **Directory:** `com.example.service.js`

``` json
{
  "name": "com.example.service.js",
  "version": "1.0.0",
  "description": "Hello JS Service Sample",
  "main": "com_example_service_js.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "LG Electronics",
  "license": "Apache 2.0"
}
```

### LS2 Configuration Files

To register and execute a service through LS2, it is necessary to create a Service Configuration file, a Role file, and Permission files. You must create a `files/sysbus` directory in your project so that the configuration files are installed in the right place on the target.

#### Service Configuration File

This file contains description of the service type and launch command.

- **Create and update the file:** `<js service name>.service.in`
- **Directory:** `<js service name>/files/sysbus`

where `<js service name>` is the name of the JS service. For the sample JS service, `<js service name>` is to be replaced by 'com.example.service.js'.

``` bash {linenos=table}
[D-BUS Service]
Name=com.example.service.js
Exec=@WEBOS_INSTALL_BINDIR@/run-js-service -n @WEBOS_INSTALL_WEBOS_SERVICESDIR@/com.example.service.js
Type=dynamic
```

A brief explanation of the above file:

- Line(3) : The service can be run with JS service launcher script `run-js-service`.  The `-n` option means to use Node.js engine.(Currently, `-n` option is used by default). Set the name of the service along with the service path as parameters to the command.

- Line(4) : Set as a dynamic service.

#### Role File

This file contains allowed service names for each component and individual security settings for each service name.

- **Create and update the file:** `<js service name>.role.json.in`
- **Directory:** `<js service name>/files/sysbus`

where `<js service name>` is the name of the JS service. For the sample JS service, `<js service name>` is to be replaced by 'com.example.service.js'.

``` json {linenos=table}
{
    "appId":"com.example.service.js",
    "type": "regular",
    "allowedNames": [
        "com.example.service.js"
    ],
    "permissions": [
        {
            "service":"com.example.service.js",
            "outbound":[
                "*"
            ]
        }
    ]
}
```

A brief explanation of the above file:

* Line(4~6) : `allowedNames` - Names that this service is allowed to register. It can be an array of any valid service name strings, empty array [] for none, and empty string "" for an unnamed service.
* Line(7~14) : The permissions for the service.
    * `outbound` - Array of services that this service is allowed to send requests to. It can include strings of any valid service names. Use "\*" for all, empty array [] for none, and empty string "" for unnamed services. It's possible to use a wildcard (*) at the end of a string.

#### Client Permission File

This file defines what groups are required for this component to function properly.

- **Create and update the file:** `<js service name>.perm.json.in`
- **Directory:** `<js service name>/files/sysbus`

where `<js service name>` is the name of the JS service. For the sample JS service, `<js service name>` is to be replaced by 'com.example.service.js'.​

``` json {linenos=table}
{
    "com.example.service.js": [
        "settings.read", "activities.manage"
    ]
}
```

A brief explanation of the above file:

* Line(3) : Since `com.example.service.js` calls settingsservice's `getSystemSettings` method, add the method's group name "settings.read" to the client permission file. When "webos-service" module is used, it calls activitymanager's `create` and `complete` methods to keep the dynamic service running for 5 seconds. So, add "activities.manage".

#### API Permission File

This file defines what methods are included into security groups this component provides.

- **Create and update the file:** `<js service name>.api.json.in`
- **Directory:** `<js service name>/files/sysbus`

where `<js service name>` is the name of the JS service. For the sample JS service, `<js service name>` is to be replaced by 'com.example.service.js'.​​

``` json {linenos=table}
{
    "com.example.service.js.group": [
        "com.example.service.js/*"
    ]
}
```

A brief explanation of the above file:

* Line(3) : Set this service's group name and specify the methods that belong to the group. In this example, the group name is set to "com.example.service.js.group", and all methods of `com.example.service.js` are added to this group.

### CMakeLists.txt

This file is required to build the source code using CMake and it must be located in the root directory.

For the sample JS service (`com.example.service.js`), you must:

- **Create and update the file:** `CMakeLists.txt`
- **Directory:** `com.example.service.js`

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

A brief explanation of the above file:

- Line(2) : Specify the project name and the file extension type. In this tutorial, we use "com.example.service.js" as the project name for indicating various filenames and pathnames. The file extension type allows CMake to skip unnecessary compiler checks.

- Line(5) : Include webOS IoT modules for the build.

- Line(7) : Specify the "**cmake-modules-webos**" version.

- Line(8) : Specify `webos_component` with the component version to use webOS variables for the standard system paths. It commonly follows three digit versioning scheme.

- Line(10) : The js services must have source code, package.json, and services.json files for each service name in `/usr/palm/services/` under the target. To install the files to the target, set `/usr/palm/services/com.example.service.js` as the path.

- Line(12~21) : Install the required file to `/usr/palm/services/com.example.service.js`. Exclude the files that do not need to be installed to target device.

- Line(23) : Install the LS2 configuration files (`/files/sysbus`) to target.

## Step 3: Build the JS Service

After implementing and configuring the JS service, you must build the service.

### Add the Recipe File

webOS IoT uses OpenEmbedded of Yocto Project to build its components. You must write a recipe that configures the build environment. For more details about the recipe, see [Yocto Project Reference Manual](http://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

- **Create and update the file:** `<js service name>.bb`

- **Directory:** `build-webos/meta-webosose/meta-webos/recipes-webos/<js service name>`

where `<js service name>` is the name of the JS service. For the sample JS service, `<js service name>` must be replaced by 'com.example.service.js'.

``` bash {linenos=table}
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

FILES_${PN} += "${webos_servicesdir}/${PN}/*"
```

A brief explanation of the above file:

- Lines(1~4) : Basic descriptions of the component.

- Line(6) : Version of the component. For the webOS IoT component, this field is mandatory.

- Line(7) : Revision version of the recipe. Each recipe requires a counter to track its modification history. Make sure that you increment the version when you edit the recipe, unless you only change the value of the `WEBOS_VERSION` field or comments.

- Line(9) : Inherit common functions of webOS IoT. For all components of webOS IoT, this entry is required.

- Line(10) : Instruct OpenEmbedded to use the `WEBOS_VERSION` value as the component version number. If you develop your component on a local repository, this entry is required.

- Line(11) : Instruct OpenEmbedded that the component uses CMake for configuration, which is the preferred choice for webOS components.

- Line(12) : To register component as a service and install LS2 configuration files, inherit `webos_system_bus`.

- Line(14) : Append the list of files and directories that are placed in a package. Add the files under `/usr/palm/service/com.example.service.js` directory for packaging.

### Configure the Local Source Directory

To build a component that is located on the local system, you must specify the directory information.

- **Create and update the file:** `webos-local.conf`
- **Directory :** `build-webos`

For the sample JS service (`com.example.service.js`), you must provide the local path where the source exists.

``` bash {linenos=table}
INHERIT += "externalsrc"
EXTERNALSRC_pn-com.example.service.js = "/home/username/project/com.example.service.js/"
EXTERNALSRC_BUILD_pn-com.example.service.js = "/home/username/project/com.example.service.js/build/"
PR_append_pn-com.example.service.js =".local0"
```

A brief explanation of the above file:

- Line(1) : Inherit `externalsrc` bbclass file.

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
build-webos$ bitbake com.example.service.js
```

## Step 4: Run and Verify the JS Service

After building the service, you must verify its functionality.

1.  **Copy the IPK to the target.**

    When the build is successful, oe-related directories are created under the project root directory. These directories are linked to the directory where the build output is generated from the actual **`build-webos`** sub-directory.

    ``` bash
    com.example.service.js
    ├── CMakeLists.txt
    ├── README.md
    ├── files
    │   └── sysbus
    │       ├── com.example.service.js.api.json.in
    │       ├── com.example.service.js.perm.json.in
    │       ├── com.example.service.js.role.json.in
    │       └── com.example.service.js.service.in
    ├── com_example_service_js.js
    ├── package.json
    ├── oe-logs -> /home/username/build/build-webos/BUILD/work/raspberrypi4-webos-linux/com.example.service.js/0.0.1-r0.local0/temp
    ├── oe-workdir -> /home/username/build/build-webos/BUILD/work/raspberrypi4-webos-linux/com.example.service.js/0.0.1-r0.local0
    ```

    If you go to `oe-workdir/deploy-ipks/raspberrypi4`, you can see `com.example.service.js_0.0.1-r0.local0_raspberrypi4.ipk` file.

    ``` bash
    com.example.service.js/oe-workdir/deploy-ipks/raspberrypi4
    └── com.example.service.js_0.0.1-r0.local0_raspberrypi4.ipk
    ```

    Copy the IPK file to the target device using the `scp` command.

    ``` bash
    com.example.service.js/oe-workdir/deploy-ipks/raspberrypi4$ scp com.example.service.js_0.0.1-r0.local0_raspberrypi4.ipk root@<target IP address>:/media/internal/downloads
    ```

2.  **Install the service on the target.**

    Connect to the target using the `ssh` command and install `com.example.service.js_0.0.1-r0.local0_raspberrypi4.ipk`.

    ``` bash
    $ ssh root@<target IP address>
    root@raspberrypi4:/sysroot/home/root# cd /media/internal/downloads/
    root@raspberrypi4:/media/internal/downloads# opkg install com.example.service.js_0.0.1-r0.local0_raspberrypi4.ipk

    Installing com.example.service.js (0.0.1) on root.
    Configuring com.example.service.js.
    ```

3.  **Discover the LS2 configuration files.**

    To make LS2 daemon scan the LS2 configuration files of the service, use the `ls-control` command as follows.

    ``` bash
    root@raspberrypi4:/media/internal/downloads# ls-control scan-services

    telling hub to reload setting and rescan all directories
    ```

    {{< note >}}
    Rebooting the target after installing the service will have the same effect as running the `ls-control` command. However, using the command allows you to continue testing without rebooting.
    {{< /note >}}

4.  **Run the service.**

    Since the service is a dynamic service, it is executed when its method is called.

    Calling the **`hello`** method:

    ``` bash
    root@raspberrypi4:/# luna-send -n 1 -f luna://com.example.service.js/hello '{}'
    {
        "answer": "Hello, JS Service!!",
        "returnValue": true
    }
    ```

    Calling the **`locale`** method:

    ``` bash
    root@raspberrypi4:/# luna-send -n 1 -f luna://com.example.service.js/locale '{}'
    {
        "message": "You appear to have your locale set to: en-US",
        "returnValue": true
    }
    ```

5.  **Verify the execution of the service.**

    You can use the `journalctl` command on the target for debugging the js service. For details on how to use the command, see [Viewing Logs]({{< relref "viewing-logs-journald#using-journalctl-to-view-logs" >}}).

    ``` bash
    root@raspberrypi4:/# journalctl | grep exampleJSService

    Nov 13 21:05:59 raspberrypi4 le.service.js[1300]: [] [pmlog] exampleJSService LOCALE_CALLBACK {"SERVICE_NAME":"exampleJSService"} get locale response
    ```

    If you check the result of `ls-monitor` immediately after calling the **`com.example.service.js/hello`** method, you can see that the service is executed dynamically.

    ``` bash
    root@raspberrypi4:/# ls-monitor -l | grep example
    868           com.example.service.js            /usr/bin/node                          dynamic                 K4Nuvsrx
    ```

    If the service is not used for 5 seconds, it is terminated. Run the `ls-monitor` command again after about 5 seconds, and you will see that the service has been terminated.

    ``` bash
    root@raspberrypi4:/# ls-monitor -l | grep example
    ```

## Step 5: Deploy the JS Service

Now that you have developed the service and verified its execution, you are ready to add it to the webOS image and then flash it to the target device.

### Add the Service to Build Recipe

Add the JS service to the packagegroup recipe file.

- **Update the file:** `packagegroup-webos-extended.bb`
- **Directory:** `build-webos/meta-webosose/meta-webos/recipes-core/packagegroups`
- **Updates to be made:** Add the JS service name to **`RDEPENDS_${PN} =`**

``` bash {hl_lines=[6]}
...
RDEPENDS_${PN} = " \
    activitymanager \
    audiod \
    ...
    com.example.service.js \
    ${VIRTUAL-RUNTIME_appinstalld} \
    ...
```

For more details, see [Yocto Project Reference Manual](https://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

### Build webOS Image

Build the webOS image so that it includes the JS service.

``` bash
build-webos$ source oe-init-build-env
build-webos$ bitbake webos-image
```

### Flash Image to Target Device

Flash the updated webOS image to the SD card.

**Path of webOS image :** `build-webos/BUILD/deploy/images/raspberrypi4/webos-image-raspberrypi4-master-yyyymmddhhmmss.wic`

``` bash
build-webos/BUILD/deploy/images/raspberrypi4$ sudo dd bs=4M if=webos-image-raspberrypi4-master-yyyymmddhhmmss.wic of=/dev/sdc
```

For more details, see the [Flashing webOS IoT]({{< relref "flashing-webos-iot" >}}) page.

After booting the target device, connect to target with SSH and call `com.example.service.js` and check `ls-monitor`. You will see that the service is executed as a dynamic type.

``` bash
root@raspberrypi4:/# luna-send -n 1 -f luna://com.example.service.js/hello '{}'
{
    "answer": "Hello, JS Service!!",
    "returnValue": true
}
root@raspberrypi4:/# ls-monitor -l | grep example
931           com.example.service.js            /usr/bin/node                          dynamic                 MUe02Jj1
```
