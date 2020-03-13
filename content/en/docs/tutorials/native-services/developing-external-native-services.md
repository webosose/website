---
title: Developing External Native Services
date: 2020-02-25
weight: 10
toc: true
---

External native services are 3rd party native services that must be installed on the webOS target device. External native services must be packaged in a dummy app. Therefore, before creating the native service, make sure you have a dummy app to package with the external native service.

Unlike JS service, a sample template is not provided for an external native service. So you have to create, implement, and build the source code and required configuration files. Once the files are ready, you can package, install, and launch an external native service using the Command-Line Interface (CLI) tool that is provided by the webOS Open Source Edition (OSE) SDK. For detailed information on the commands used in this tutorial, see [CLI commands]({{< relref "cli-user-guide#cli-commands" >}}).

Developing an external native service requires the following steps:

* [Before You Begin](#before-you-begin)
* [Step 1: Implement a Native Service](#step-1-implement-a-native-service)
* [Step 2: Configure the Native Service](#step-2-configure-the-native-service)
* [Step 3: Build the Native Service](#step-3-build-the-native-service)
* [Step 4: Package the Native Service](#step-4-package-the-native-service)
* [Step 5: Install the Native Service](#step-5-install-the-native-service)
* [Step 6: Run the Native Service](#step-6-run-the-native-service)

## Before you begin

- Make sure you have completed the steps in [Native Development Kit Setup]({{< relref "native-development-kit-setup" >}}).
- Create a directory (`com.sample.echo`) for a dummy app. This app will be packaged with a sample native service.

    ``` bash
    $ mkdir com.sample.echo
    ```

  The directory structure of `com.sample.echo` must be as follows:

    ```
    com.sample.echo
    ├── appinfo.json
    ├── icon.png
    ├── index.html
    └── script.js
    ```

    {{< note >}}
    You can use any type of dummy app (web, QML, native) for packaging an external native service.
    {{< /note >}}

- Create a project directory (`com.sample.echo.service`) for the sample native service, and move into the directory.

    ``` bash
    $ mkdir com.sample.echo.service
    $ cd com.sample.echo.service
    ```

    The directory structure of `com.sample.echo.service` must be as follows:

    ``` bash
    com.sample.echo.service
    ├── src
    │   └── main.c
    ├── services.json
    └── CMakeLists.txt
    ```

## Step 1: Implement a Native Service

### Native Service

First, define the functionality of the native service on the source code.

For the sample native service (`com.sample.echo.service`), you must:

- **Create and update the file:** `main.c`
- **Directory:** `com.sample.echo.service/src`

``` c {linenos=table}
#include <stdlib.h>
#include <string.h>
#include <glib.h>
#include <stdio.h>
#include <glib-object.h>
#include <lunaservice.h>
#include <luna-service2/lunaservice.h>
#include <pbnjson.h>

// This service name
#define SERVICE_NAME "com.sample.echo.service"
#define BUF_SIZE 64

// Main loop for aliving background service
GMainLoop *gmainLoop;

LSHandle  *sh = NULL;
LSMessage *message;

// Declare of each method
// All method format must be : bool function(LSHandle*, LSMessage*, void*)
bool echo(LSHandle *sh, LSMessage *message, void *data);

LSMethod sampleMethods[] = {
    {"echo", echo},   // luna://com.sample.echo.service/echo
};


/*
 * Define luna://com.sample.echo.service/echo
 *  - A method that always returns the same value
 *
 * +----------------------------+            +--------------------------------+
 * |   com.sample.echo          |            | com.sample.echo.service        |
 * |   Foreground Application   |            |        Background Service      |
 * +----------------------------+            +--------------------------------+
 *   |                                                                        |
 *   |                                                                        |
 *   | 1. Request to luna://com.sample.echo.service/echo                      |
 *   |    with parameters { input: "Hello, World!" }                          |
 *   |                                                                        |
 *   | ---------------------------------------------------------------------> |
 *   |                                                                        |
 *   |                                                                        |
 *   |            2. Response to com.sample.echo                              |
 *   |               with result '{ "echoMessage" : "Hello, World!" }'        |
 *   |                                                                        |
 *   | <--------------------------------------------------------------------- |
 *   |                                                                        |
 *  \|/                                                                      \|/
 *   '                                                                        '
 */
bool echo(LSHandle *sh, LSMessage *message, void *data)
{
    LSError lserror;
    JSchemaInfo schemaInfo;
    jvalue_ref parsed = {0}, value = {0};
    jvalue_ref jobj = {0}, jreturnValue = {0};
    const char *input = NULL;
    char buf[BUF_SIZE] = {0, };

    LSErrorInit(&lserror);

    // Initialize schema
    jschema_info_init (&schemaInfo, jschema_all(), NULL, NULL);

    // get message from LS2 and parsing to make object
    parsed = jdom_parse(j_cstr_to_buffer(LSMessageGetPayload(message)), DOMOPT_NOOPT, &schemaInfo);

    if (jis_null(parsed)) {
        j_release(&parsed);
        return true;
    }

    // Get value from payload.input
    value = jobject_get(parsed, j_cstr_to_buffer("input"));

    // JSON Object to string without schema validation check
    input = jvalue_tostring_simple(value);

    /**
     * JSON create test
     */
    jobj = jobject_create();
    if (jis_null(jobj)) {
        j_release(&jobj);
        return true;
    }

    jreturnValue = jboolean_create(TRUE);
    jobject_set(jobj, j_cstr_to_buffer("returnValue"), jreturnValue);
    jobject_set(jobj, j_cstr_to_buffer("echoMessage"), value);

    LSMessageReply(sh, message, jvalue_tostring_simple(jobj), &lserror);

    j_release(&parsed);
    return true;
}

// Register background service and initialize
int main(int argc, char* argv[])
{
    LSError lserror;
    LSHandle  *handle = NULL;
    bool bRetVal = FALSE;

    LSErrorInit(&lserror);

    // create a GMainLoop
    gmainLoop = g_main_loop_new(NULL, FALSE);

    bRetVal = LSRegister(SERVICE_NAME, &handle, &lserror);
    if (FALSE== bRetVal) {
        LSErrorFree( &lserror );
        return 0;
    }
    sh = LSMessageGetConnection(message);

    LSRegisterCategory(handle,"/",sampleMethods, NULL, NULL, &lserror);

    LSGmainAttach(handle, gmainLoop, &lserror);

    // run to check continuously for new events from each of the event sources
    g_main_loop_run(gmainLoop);
    // Decreases the reference count on a GMainLoop object by one
    g_main_loop_unref(gmainLoop);

    return 0;
}
```

A brief explanation of the above file:

- Line(7~8) : Include `lunaservice.h` header file to use luna service. For detailed information about luna service, visit [luna-service2 repository](https://github.com/webosose/luna-service2).
- Line(22~26) : Declare `echo` method.
- Line(53~98) : Implement `echo` method. This method will return the input as you typed.
- Line(117) : Return a handle to the connection-to-bus through which message was sent.
- Line(119) : Append a method to the category.
- Line(121) : Attach a service to a glib mainloop.

### Dummy App

The native service must be packaged along with a dummy app. The dummy app can be any type of a webOS app.

In this sample, the dummy app will call the `com.sample.echo.service/echo` method which is provided by the native service (`com.sample.echo.service`). To implement the dummy app, go to `com.sample.echo` directory.

``` bash
$ cd ../com.sample.echo
```

{{< note >}}
In this tutorial, a web app is used for the dummy app. For detailed information for the dummy web app, see [Developing External Web Apps]({{< relref "developing-external-web-apps" >}}).
{{< /note >}}

#### appinfo.json

``` json {linenos=table}
{
  "id": "com.sample.echo",
  "version": "0.0.1",
  "vendor": "LG Electronics, Inc.",
  "type": "web",
  "main": "index.html",
  "title": "Native Service Test Application",
  "icon": "icon.png",
  "iconColor": "#FFFFFF"
}
```

A brief explanation of the above file:

- Line(2) : The ID for the app.
- Line(5) : The type of the web app.
- Line(7) : The title to be shown on the Home Launcher.
- Line(8) : The icon to be shown on the Home Launcher. Make sure the icon file is available in the project root directory. You can use your own icon.png (80*80) file or attached [icon.png](/images/docs/tutorials/icon.png).

#### index.html

``` html {linenos=table}
<html>

<head>
    <title>Native Background Service Test App</title>
    <script type="text/javascript" src="./script.js"></script>
    <style>
        body {
            font-size: 50px;
        }
    </style>
</head>

<body bgcolor='#FFFFFF'>
    <p id='result'></p>
</body>

</html>
```

#### script.js

``` javascript {linenos=table}
// Private function
var Debug = {
    log: function (str) {
        console.log(str);
        document.getElementById('result').innerHTML = str;
    },
    error: function (str) {
        document.getElementById('result').innerHTML = '<font color="#FF0000">' + str + '</font>';
        console.error(str);
    }
}

// Template code for calling Luna APIs
function LSCall(service, method, parameters, callback) {
    var lunaURL = 'luna://' + service + '/' + method;
    var params = JSON.stringify(parameters);
    var bridge = new WebOSServiceBridge();
    bridge.url = lunaURL;
    bridge.onservicecallback = callback;
    bridge.call(lunaURL, params);
}

/***
* Usage Example. Call luna://com.sample.echo.service/getDataByKey with
* { key : ["name", "age", "gender"] }
* Object parameter
***/
LSCall('com.sample.echo.service', 'echo',
    { input: "WebOSServiceBridge test string" },
    function (returnString) {
        // Response data is JSON-formatted string value. So before use it, it must be parsed
        var returnObject = JSON.parse(returnString);
        // If returnValue is true, then its API operation is successfully done
        // Response data is based on service API implementation
        if (returnObject.returnValue === true) {
            // Assume that its Luna API response with 'result' data
            Debug.log('Data : ' + JSON.stringify(returnObject));
        }
        // If returnValue is false, then its API operation is failure during running.
        // You can see errorCode and errorText
        else {
            Debug.error('errorCode : ' + returnObject.errorCode);
            Debug.error('errorText : ' + returnObject.errorText);
        }
    }
);
```

{{< note >}}
`script.js` is implemented using WebOSServiceBridge API. For more details on using WebOSServiceBridge API, see [WebOSServiceBridge API Reference]({{< relref "webosservicebridge-api-reference" >}}).
{{< /note >}}

## Step 2: Configure the Native Service

This section describes how to prepare the configuration files required to build and test the native service.

### services.json

Services are required to have metadata before they can be packaged. This metadata is stored in a file called `services.json`, which is used by the webOS device to identify the service, its executable file, and other information that is needed to run the service. For the sample native service (`com.sample.echo.service`), you must:

- **Create and update the file:** `services.json`
- **Directory:** `com.sample.echo.service`

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

A brief explanation of the above file:

- Line(2) : The ID of the service. This value must begin with the app ID. For example, if an app ID is `com.sample.echo`, then the service ID must be `com.sample.echo.myservice`.
- Line(4) : The type of the native service.
- Line(5) : The executable file name.
- Line(6) : An array of the services that the dummy app provides. Multiple services can be included in this property.
- Line(7) : The name of service on the webOS Luna Bus.

For more details, see [services.json]({{< relref "services-json" >}}).

### CMakeLists.txt

`CMakeLists.txt` file is used by CMake to generate the Makefile to build the project. This file specifies the source, header, and UI files included in the project. For the sample native service (`com.sample.echo.service`), you must:

- **Create and update the file:** `CMakeLists.txt`
- **Directory:** `com.sample.echo.service`

{{< note >}}
In this tutorial, we use the CMake to build the project. But you can use any other tools for the build.
{{< /note >}}

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

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/pkg_$ENV{ARCH}/")
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
$ ares-package ../com.sample.echo ./pkg_arm
```

In the above command, `../com.sample.echo` is the dummy app directory and `./pkg_arm` is the native service directory which contains `services.json` file. You can use an absolute or relative path. For more details on using `ares-package`, see [ares-package]({{< relref "cli-user-guide#ares-package" >}}).

## Step 5: Install the Native Service

The native service must be installed along with a dummy app.

For details on installing the dummy app, see [Installing the Web App]({{< relref "developing-external-web-apps#step-5-install-the-web-app" >}}).

## Step 6: Run the Native Service

If the native service is successfully installed, you can try running the native service on the target device.

To run the native service, use the following command on the target device's terminal:

``` bash
root@raspberrypi4:/sysroot/home/root# luna-send -f -n 1 luna://com.sample.echo.service/echo '{"input":"Hello, webOS OSE!"}'
```

The response will be:

``` bash
{
    "echoMessage": "Hello, webOS OSE!",
    "returnValue": true
}
```

When `echo` method of `com.sample.echo.service` is called, the service returns `input`, the delivered parameter, as `echoMessage`.