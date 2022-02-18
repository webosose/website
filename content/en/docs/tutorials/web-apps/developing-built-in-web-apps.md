---
title: Developing Built-in Web Apps
date: 2022-02-11
weight: 20
toc: true
---

A built-in web app is a web app that is packaged with webOS OSE platform at a build time. Built-in web apps have the following features:

- Can be built into the webOS OSE image to be packaged together with the platform image.
- Can provide enhanced functionalities with external libraries by building them all together with the app.

In this tutorial, you will explore source codes and required configurations to create a sample built-in web app. We will start with sample codes ([GitHub repository](https://github.com/webosose/samples)) for convenience. After all the steps are done, the sample app will show the message: "Hello, Web Application!!".

{{< note >}}
The content of this page is based on webOS OSE 2.0 or later. If you are developing on webOS OSE 1.x, you might notice differences in the project directory structure, log messages, etc. Notes indicating such differences are provided where necessary.
{{< /note >}}

The directory structure of the sample app is as follows:

``` bash
samples
├── ...
├── web-apps/
│   ├── build-config/
│   │   ├── com.example.app.web.bb
│   │   └── webos-local.conf
│   └── com.example.app.web/
│       ├── appinfo.json
│       ├── CMakeLists.txt
│       ├── icon.png
│       ├── index.html
│       └── README.md
├── ...
```

## Before You Begin

- Prepare a webOS OSE target device. For detailed information, see [Building webOS OSE]({{< relref "building-webos-ose" >}}) and [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).

- Download the sample codes, and move into `samples/web-apps` directory.

    ``` bash
    $ git clone https://github.com/webosose/samples
    $ cd samples/web-apps
    ```

## Step 1: Implement the Web App

This section describes how to implement `index.html` and `README.md` files for the web app.

{{< note >}}
If you want to use the sample codes and webOS OSE 2.0 or later, you can skip this step.
{{< /note >}}

### index.html

The following two sections present code examples by platform version.

* [webOS OSE 2.0 or Later](#webos-ose-2-0-or-later)
* [webOS OSE 1.x](#webos-ose-1-x)

#### webOS OSE 2.0 or Later

For the sample web app (`com.example.app.web`), `index.html` file exists in the `com.example.app.web` directory.

`index.html` prints a hello message on the monitor and also prints the current time on the log. To call [LS2 API]({{< relref "ls2-api-index" >}}), webOS OSE 2.0 or later uses [WebOSServiceBridge]({{< relref "webosservicebridge-api-reference" >}}), a JavaScript API for web apps to access Luna Bus.

{{< code "index.html - webOS OSE 2.0 or Later">}}
``` html {linenos=table}
<!DOCTYPE html>
<html>
<head>
<title>Example Web App</title>
<style type="text/css">
    body {
        width: 100%;
        height: 100%;
        background-color:#202020;
    }
    div {
        position:absolute;
        height:100%;
        width:100%;
        display: table;
    }
    h1 {
        display: table-cell;
        vertical-align: middle;
        text-align:center;
        color:#FFFFFF;
    }
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

  - Line(25) : Create a WebOSServiceBridge object.
  - Line(26~27) : Set the URL of the method to call and the parameters in JSON string format.
      - `url`: URL of the LS2 API method
      - `params`: parameter for the method to invoke
  - Line(29~37) : Define a callback function that can handle the response. If the response is successful, "UTC" value is printed on the logging file. For details on logging, refer to [Using PmLogLib in JavaScript]({{< relref "using-pmloglib-in-javascript" >}}).
  - Line(39~41) : Set the callback to the WebOSServiceBridge object, and invoke the method with Luna call.

#### webOS OSE 1.x

The sample `index.html` file is not provided for webOS OSE 1.x version. So you must replace the `index.html` file with your own file.

The following shows sample codes that do the same jobs as the previous `index.html` file. To call [LS2 API]({{< relref "ls2-api-index" >}}), webOS OSE 1.x uses the webOS library.

{{< note "Prerequisite for webOS OSE 1.x only (when calling LS2 API in the web app)" >}}
Download the webOS library file from [webOSjs-0.1.0.zip](https://webosose.s3.ap-northeast-2.amazonaws.com/tools/webOSjs-0.1.0.zip) and decompress it to the project root directory.
{{< /note >}}

{{< code "index.html - webOS OSE 1.x" >}}
``` html {linenos=table}
<!DOCTYPE html>
<html>
<head>
<style type="text/css">

 /* same as webOS OSE 2.0 or later */

</style>
<script src="webOSjs-0.1.0/webOS.js" charset="utf-8"></script>
<script type="text/javascript">
//sample code for calling LS2 API
var lunaReq= webOS.service.request("luna://com.webos.service.systemservice",
{
    method:"clock/getTime",
    parameters:{},
    onSuccess: function (args) {
        webOS.info("GETTIME_SUCCESS", {"APP_NAME": "example web app"}, "UTC : " + args.utc);
    },
    onFailure: function (args) {
        webOS.error("GETTIME_FAILED", {"APP_NAME": "example web app"}, "errorText : " + args.errorText);
    }
});
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

- Line(9) : Include the webOS library.
- Line(12~22) : Call `com.webos.service.systemservice/clock/getTime` method. If the response is successful, "UTC" value is printed on the logging file. To print log messages when using the webOS library, you can use the following methods provided by the webOS library (in descending order of importance):
    - `webOS.critical(String msgid, Object keyvalue_pairs, String msg)`
    - `webOS.error(String msgid, Object keyvalue_pairs, String msg)`
    - `webOS.warning(String msgid, Object keyvalue_pairs, String msg)`
    - `webOS.info(String msgid, Object keyvalue_pairs, String msg)`
    - `webOS.debug(String msg)`

### README.md

This file provides general information of the web app.

{{< caution >}}
* If the `README.md` file is missing, a build error occurs.
* Make sure the 'Summary' section is a single line. Even **any whitespace** at the line above the 'Description' section is considered a part of the summary and can cause the build to fail.
{{< /caution >}}

{{< code "Sample README.md">}}
``` plaintext
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
{{< /code >}}

## Step 2: Configure the Web App

This section describes how to prepare the configuration files required to build and test the built-in web app.

{{< note >}}
If you want to use the sample codes and webOS OSE 2.0 or later, you can skip this step.
{{< /note >}}

### appinfo.json

Apps are required to have metadata before they can be packaged. This metadata is stored in a file called `appinfo.json`, which is used by the webOS device to identify the app, its icon, and other information that is needed to launch the app.

{{< code "appinfo.json" >}}
``` json {linenos=table}
{
    "id": "com.example.app.web",
    "version": "0.0.1",
    "vendor": "My Company",
    "type": "web",
    "main": "index.html",
    "title": "Web app sample",
    "icon": "icon.png",
    "requiredPermissions" : ["time.query"]
}

```
{{< /code >}}

A brief explanation of the above file:

- Line(2) : The ID for the sample app.
- Line(5) : The type of the sample app.
- Line(7) : The title to be shown on the Home Launcher, which is a dock UI of webOS OSE.
- Line(8) : The icon file to be shown on Home Launcher. Make sure the icon file is located in the project root directory. You can use your own icon file (size: 80 px * 80 px) or [icon.png](/images/docs/tutorials/icon.png).
- Line(9) : The [Access Control Group (ACG)]({{< relref "acg-usage-guide" >}}) name associated with the LS2 API methods used in the app. For example, this sample app uses the `clock/getTime` method of the [com.webos.service.systemservice]({{< relref "com-webos-service-systemservice" >}}) API, whose ACG is "time.query". To identify the ACG names associated with a method, see the "ACG" field of the method in its API reference. You can also use the [`ls-monitor`]({{< relref "ls-monitor" >}}) command with the `-i` option to identify the ACGs of the method.

For more details, see [appinfo.json]({{< relref "appinfo-json" >}}).

### CMakeLists.txt

This file is required to generate the standard build files.

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

- Line(2) : Specify the project name and the file extension type. In this tutorial, we use "com.example.app.web" as the project name. The file extension type "NONE" allows CMake to skip unnecessary compiler checks.
- Line(3) : Include webOS OSE modules for the build.
- Line(4) : Specify the "**cmake-modules-webos**" version.
- Line(6) : Set a directory path to install the app. `WEBOS_INSTALL_WEBOS_APPLICATIONSDIR` is set to `/usr/palm/applications/` by default.
- Line(8~14) : Install the required files to `INSTALL_DIR` on the target. Exclude the files that do not need to be installed to the target device.

## Step 3: Build the Web App

After implementing and configuring the web app, you must build the app.

### Add the Recipe File

webOS OSE uses OpenEmbedded of Yocto Project to build its components. OpenEmbedded needs a **recipe** file that configures the build environment. For more details about the recipe, see [Yocto Project Reference Manual](https://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

You must move the recipe file (`com.example.app.web.bb`) into the webOS project directory (`build-webos`). 

{{< note >}}
`build-webos` is the directory that is used in [Building webOS OSE]({{< relref "building-webos-ose" >}}).
{{< /note >}}

- **From:** `samples/web-apps/build-config/com.example.app.web.bb`
- **To:** `build-webos/meta-webosose/meta-webos/recipes-webos/com.example.app.web/com.example.app.web.bb`

`com.example.app.web` is the ID of the web app that is defined in [appinfo.json](#appinfo-json).

{{< code "com.example.app.web.bb" >}}
``` bash {linenos=table}
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

FILES_${PN} += "${webos_applicationsdir}"
```
{{< /code >}}

A brief explanation of the above file:

- Line(1~3) : Basic descriptions of the component.
- Line(5) : Version of the component. For the webOS OSE component, this field is mandatory.
- Line(6) : Revision version of the recipe. Each recipe requires a counter to track its modification history. Make sure that you increment the version when you edit the recipe, unless you only change the value of the `WEBOS_VERSION` field or comments.
- Line(8) : Inherit common functions of webOS OSE. For all components of webOS OSE, this entry is required.
- Line(9) : Instruct OpenEmbedded to use the `WEBOS_VERSION` value as the component version number. If you develop your component on a local repository, this entry is required.
- Line(10) : Instruct OpenEmbedded that the component uses CMake for configuration, which is the preferred choice for webOS components.
- Line(11) : Inherit `webos_app`, because the component is an app.
- Line(12) : Inherit `webos_arch_indep`, because the web app is CPU architecture independent. When inheriting from `webos_arch_indep`, ensure that your project command in the CMake script specifies `NONE` as the language, i.e. `project(<component> NONE)`. Otherwise, CMake will attempt to find the C and C++ compilers. Your component may well be built before the toolchain, resulting in a failure to build.
- Line(14) : `${webos_applicationsdir}` indicates `/usr/palm/applications`. `${PN}` is a package name, which is set to **com.example.app.web**.

### Configure the Local Source Directory

To build a component that is located on the local system, you must specify the directory information.

You must move the configuration file (`webos-local.conf`) into the webOS OSE project directory.

- **From:** `samples/web-apps/build-config/webos-local.conf`
- **To:** `build-webos/webos-local.conf`

For the sample web app (`com.example.app.web`), you must provide the local path where the source exists. See the explanation of `webos-local.conf`.

{{< code "webos-local.conf" >}}
``` bash {linenos=table}
INHERIT += "externalsrc"
EXTERNALSRC_pn-com.example.app.web = "/home/username/project/com.example.app.web/"
EXTERNALSRC_BUILD_pn-com.example.app.web = "/home/username/project/com.example.app.web/build/"
PR_append_pn-com.example.app.web =".local0"
```
{{< /code >}}

A brief explanation of the above file:

- Line(1) : Inherit the `externalsrc.bbclass` file.
- Line(2) : The path to the local source directory. **You must replace this value with your own value as follows:**
  - For the property name, enter `EXTERNALSRC_pn-<web app ID>`. 
  - For the value, enter an absolute path to your web app directory. If you use the sample codes, enter an absolute path to `/samples/web-apps/com.example.app.web/`. 
- Line(3) : The path to the local build directory. **You must replace this value with your own value as follows:**
  - For the property name, enter `EXTERNALSRC_BUILD_pn-<component>`. 
  - For the value, enter `<local source directory>/build/`. 
- Line(4) : The appended revision version (PR) for building local source files. The syntax of the property is `PR_append_pn-<component>`. This property is optional.

{{< note >}}
We recommend that you add a trailing slash (/) at the end of all local directory paths, as in Line(2) and Line(3).
{{< /note >}}

### Build the App

To build the component on the OpenEmbedded environment, enter the following commands on the shell.

``` bash
build-webos$ source oe-init-build-env
build-webos$ bitbake com.example.app.web
```

## Step 4: Run and Verify the Web App

After building the app, you must verify its functionalities.

When the build is successful, OpenEmbedded-related directories (`oe-*`) are created under the project root directory. These directories are linked to the actual `build-webos` sub-directories where the build output is generated.

``` bash
com.example.app.web
├── CMakeLists.txt
├── README.md
├── appinfo.json
├── build
├── icon.png
├── index.html
├── oe-logs -> /home/username/build/build-webos/BUILD/work/all-webos-linux/com.example.app.web/1.0.0-r0.local0/temp
└── oe-workdir -> /home/username/build/build-webos/BUILD/work/all-webos-linux/com.example.app.web/1.0.0-r0.local0
```

### Copy the IPK File to the Target Device

Go to `oe-workdir/deploy-ipks/all`, then you can find the `com.example.app.web_1.0.0-r0.local0_all.ipk` file.

``` bash
com.example.app.web/oe-workdir/deploy-ipks/all
└── com.example.app.web_1.0.0-r0.local0_all.ipk
```

Copy the IPK file to the target device using the `scp` command.

``` bash
com.example.app.web/oe-workdir/deploy-ipks/all$ scp com.example.app.web_1.0.0-r0.local0_all.ipk root@<target device IP address>:/media/internal/downloads/
```

### Install the App on the Target Device

Connect to the target using the `ssh` command and install `com.example.app.web_1.0.0-r0.local0_all.ipk`.

``` bash
$ ssh root@<target device IP address>
root@raspberrypi4-64:/sysroot/home/root# cd /media/internal/downloads/
root@raspberrypi4-64:/media/internal/downloads# opkg install com.example.app.web_1.0.0-r0.local0_all.ipk

Installing com.example.app.web (1.0.0) on root.
Configuring com.example.app.web.
No image conversions needed for com.example.app.web
```

### Discover the LS2 Configuration Files

To make the LS2 daemon scan the LS2 configuration files of the app, use the `ls-control` command as follows:

``` bash
root@raspberrypi4-64:/media/internal/downloads# ls-control scan-services

telling hub to reload setting and rescan all directories
```

{{< note >}}
For built-in web apps, LS2 configuration files are generated during the build process. To run the app properly, you must make the system scan the newly generated configuration files.
{{< /note >}}

### Scan the App

To make System and Application Manager (SAM) scan the app, restart SAM using the `systemctl` command. This step is required so that the app can be added to the app list, which in turn makes the app appear on the Home Launcher.

``` bash
root@raspberrypi4-64:/# systemctl restart sam
```

{{< note >}}
Rebooting the target after installing the app will have the same effect as running the `ls-control` and `systemctl` commands. However, using the commands allows you to continue testing without rebooting.
{{< /note >}}

### Run the Web App

To display the Home Launcher, drag the mouse cursor upward from the bottom of the screen (or swipe up from the bottom of the screen if you're using a touch display).

{{< figure src="/images/docs/tutorials/web-apps/installed-built-in-web-app.jpg" alt="Built-in web app in Home Launcher" width="80%" height="80%" >}}

{{< note >}}
On webOS OSE 1.x, press the Windows key on your keyboard to display the Home Launcher.
{{< /note >}}

Click the app icon to run the app. The message, "Hello, Web Application!!", will be displayed as follows:

{{< figure src="/images/docs/tutorials/web-apps/web-app-screen.png" alt="Web app screen" width="80%" height="80%" >}}

### Verify the Execution of the Web App

- Using SAM

    You can check whether the app is running by SAM. For more information about SAM methods, see [com.webos.service.applicationmanager]({{< relref "com-webos-service-applicationmanager" >}}).

    ``` bash
    root@raspberrypi4-64:/# luna-send -i -f luna://com.webos.service.applicationmanager/running '{"subscribe":true}'
    {
        "subscribed": true,
        "running": [
            {
                "webprocessid": "1530",
                "instanceId": "7979072b-9c5b-402f-b859-da7169ce8d980",
                "displayId": 0,
                "defaultWindowType": "card",
                "appType": "web",
                "id": "com.example.app.web",
                "processid": "378",
                "launchPointId": "com.example.app.web_default"
            }
        ],
        "returnValue": true
    }
    ```

- Using a log file

    You can use the `journalctl` command on the target device to debug the app. For details on how to use the command, see [Viewing Logs]({{< relref "viewing-logs-journald#using-journalctl-to-view-logs" >}}).

    ``` bash
    root@raspberrypi4-64:/# journalctl | grep UTC

    Nov 21 20:07:14 raspberrypi4-64 WebAppMgr[915]: [] [pmlog] com.example.app.web GETTIME_SUCCESS {"APP_NAME": "example web app"} UTC : 1637554034
    ```

## Step 5: Build the webOS OSE Platform with the Web App

You are now ready to build the webOS OSE image including the built-in web app and flash it to the target device.

1. Add the web app to the build recipe file (`packagegroup-webos-extended.bb`).

    - **File path:** `build-webos/meta-webosose/meta-webos/recipes-core/packagegroups/packagegroup-webos-extended.bb`
    - **Updates to be made:** Add the web app name to **`RDEPENDS_${PN} =`**

    ``` bash {hl_lines=[6]}
    ...
    RDEPENDS_${PN} = " \
        activitymanager \
        audiod \
        ...
        com.example.app.web \
        ${VIRTUAL-RUNTIME_appinstalld} \
        ...
    ```

    For more details, see [Yocto Project Reference Manual](https://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html).

2. Move to the `build-webos` directory, and then build the webOS OSE image using the following commands.

    ``` bash
    build-webos$ source oe-init-build-env
    build-webos$ bitbake webos-image
    ```

3. Flash the generated webOS image to the MicroSD card.

    **Path to image:** `build-webos/BUILD/deploy/images/raspberrypi4-64/webos-image-raspberrypi4-64.rootfs.wic`

    ``` bash
    build-webos/BUILD/deploy/images/raspberrypi4-64$ sudo dd bs=4M if=webos-image-raspberrypi4-64.rootfs.wic of=/dev/sdc
    ```

    For more details, see the [Flashing webOS OSE]({{< relref "flashing-webos-ose#linux" >}}) page.

After rebooting the target device, the web app becomes available on the Home Launcher.
