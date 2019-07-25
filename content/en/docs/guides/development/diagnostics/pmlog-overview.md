---
title: PmLog Overview
date: 2019-03-15
weight: 20
toc: true
---

**PmLogLib** is an API which needs to be included in any program which requires logging. It also has been created to manage logging information in a structured way. In order to be able to extract rich metrics from the logs and precise information for troubleshooting problems, the logs need to be highly structured. Therefore, PmLogLib API has been designed to provide functions to log information in a structured way.

Currently, webOS OSE supports the collection of log information from all APIs and services, used in C/C++, QML apps, Node.js, Enact, and web applications.

## What to Log

Every component needs to log various types of information. The following logging levels explain the types of information that a component needs to log. Some of the most common log information includes: what users are doing, transactions, and timing information. You can log anything that can add value when aggregated, charted, or further analyzed.

{{< note >}}
A logging level is a unit for dividing logs into critical, error, warning, info and debug level based on their importance.
{{< /note >}}

{{< caution >}}
It is not advisable to log any sensitive information which can be misused by a malicious user/program or violate the user's privacy such as user credentials, profile information, credit card numbers, IP address, or Wi-Fi information.
{{< /caution >}}

### Critical Errors

Critical errors make the system unusable and may require a reboot for the system to return to normalcy. Examples include the following:

  - Segmentation fault in Luna Surface Manager (User cannot see anything on the screen).
  - Kernel panic resulting in an unresponsive system.

### Errors

While critical errors impact the whole system, errors only impact one component, allowing a majority of the system to continue functioning normally. The component that experienced the error will not function normally and may require user action to recover the component. Examples include the following:

  - Facebook app failed to load (User may have to restart the application).
  - DNS server not responding (User cannot use networking but can continue to watch TV).

### Warnings

A warning is an unexpected condition that is recoverable. There is no significant degradation of user experience. However, the condition may lead to future errors. Examples include the following:

  - Failed to connect to network (User may fail to stream Netflix in the future which leads to an error condition).
  - Excessive network packet loss detected.
  - The system took longer to boot than expected.

### Device Usage Metric Information

Device usage metrics provide information about how the product was used. These metrics are very important. They reflect product usage under normal working conditions. These messages provide enough information to reconstruct how the product was used. See the [Metrics](#metrics) to see examples of the type of information you need to log. All informational and higher level of messages will be sent for data crunching. Hence, the number of messages at these levels should not be high. Examples of metrics include the following:

  - Bootup time (ms).
  - Shutdown time (ms) from pressing the button to power off.

### Debug Information

Debugging information enables developers to debug the concerned component. Examples include the following:

  - Virtual keyboard button pressed (`<key>`).
  - JavaScript file loaded.
  - List of Wi-Fi access points found in scanning.

{{< note >}}
Frequently displayed debug messages should not be logged at this level.
{{< /note >}}

## Guidelines for Logging

  - You must establish what important usage metrics your component can provide.

  - Log information at the right log level. Refer to the [What to Log](#what-to-log) section to understand the various log levels and ask yourself which level the information you want to log belongs to. For example, when there is a possibility that the entire system may become unusable, the information should be logged as a critical error. However, if the situation will only make your component unusable, then you need to log the information as an error.

  - It is critical to follow the logging formats. This is required to enable proper parsing of the logging information. If the right formats are not followed, the extracted logging information may be worthless.

  - Logging too much information will increase the log size, upload time, and processing times. Therefore, log significant information only and do not go overboard.

  - When logging usage metrics, you must use your discretion to determine how much information is most optimal for your target purpose.

### Handling Log Messages of Third Party Library

The library messages of third parties such as GLib, Qt, and JavaScript should be logged at a debug level, as they do not depict any critical issue. (All JavaScript messages are used for debugging purposes.) These messages usually indicate coding errors. If the log level information is highly important, then message handlers need to use one of the following methods:

1.  Generate a unique message ID or
2.  Use a single message ID for all the library messages.

However, this does not excuse a component from changing its application logs to use PmLogLib APIs. Therefore, the components should move out of using third party library logging functions such as `g_message`, `q_warning`, or `console.log`.

## Log File

Whenever you call a PmLogLib function, it writes logs to the log file. By default, the main log file is located at `/var/log/messages`. As the log is rotated, the older history is present at `/var/log/messages.0`.

### Log Output Format

As the log file is in text format, it can be viewed by any text file viewer or using the standard command line commands to list the content of log files.

Below is the format of the logging information. This is automatically generated when you use **PmLogMsg** functions.

  - Format:
    ``` bash
    DATEandTIME [monotonic_time] facility.log_level process [PID:TID] context msgid {"key1":"value1", "key2":"value2", ...... ,"keyn":"valuen"} free_text_string
    ```

<!-- end list -->

  - Example:

    ``` javascript
    2013-05-09T12:07:31.930544Z [80083] user.info PmLogCtl [6448:252] my_context APPLAUNCH {"APP_ID":ID1, "APP_NAME":"Facebook", "APP_STATUS":"launched"} App launched successfully
    ```



As seen in the example above, each message which is logged by PmLog contains a standard set of components. Depending on the development stack and API used, the PmLogLib API tries to automatically provide many of the details. The date, time, PID (process id), TID (thread id) components are always provided by PmLog automatically when the message is logged without the developer having to provide it. However, some of these components like the `free_text_string` parameter need to be explicitly provided by the user.

## Metrics

The following describes some of the metrics expected to be collected from the system, along with an example of log statement.

### App launch

Application launch time.

``` bash
APP_STATUS=invoked, running for each APP_NAME and APP_INSTANCE_ID
```

Application session duration (how long an app is used).

``` bash
APP_STATUS=opened, closed, APP_INSTANCE_ID=id
```

### Bootup

Bootup time (ms).

``` bash
DEVICE_STATE=powered_on, ready
```

### Shutdown

Shutdown time (ms), from pressing the button to power off.

``` bash
DEVICE_STATE=shutdown_initiated, shutdown_complete
```

### Carded/sent to Recents

Track which app users switch between, by device.

``` bash
SWITCH_FROM=app1, SWITCH_TO=app2
```
