---
title: PmLogLib Overview
date: 2019-11-20
weight: 10
toc: true
---

**PmLogLib** is a library for formatting log data that are generated from webOS apps and services. To extract precise information for tracing the program flow and troubleshooting problems, the logs need to be highly structured. Therefore, PmLogLib provides APIs that you can use to log information in a structured manner by setting the scope such as context (app or service of interest) and level (importance or severity of the information).

To use the PmLogLib API, you need to import an adequate PmLogLib library in your code depending on the programming language. Currently, webOS Open Source Edition (OSE) supports PmLogLib for C/C++, JavaScript, Node.js, and QML.

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

  - An app failed to load (User may have to restart the app).
  - DNS server not responding (User cannot use networking but can continue to use other capabilities).

### Warnings

A warning is an unexpected condition that is recoverable. There is no significant degradation of user experience. However, the condition may lead to future errors. Examples include the following:

  - Excessive network packet loss detected.
  - The system took longer to boot than expected.

### Information

Informative messages can contain data to measure performance. Examples include the following:

  - Boot-up time (in milliseconds).
  - Shutdown time (in milliseconds) from pressing the button to power off.

### Debug Information

Debugging information enables developers to debug the concerned component. Examples include the following:

  - Virtual keyboard button pressed.
  - JavaScript file loaded.
  - List of Wi-Fi access points found in scanning.

{{< note >}}
Frequently displayed messages should not be logged at the debug level, because it might affect performance.
{{< /note >}}

## Guidelines for Logging

  - Log information at the right log level. Refer to the [What to Log](#what-to-log) section to understand the various log levels and ask yourself which level the information you want to log belongs to. For example, when there is a possibility that the entire system may become unusable, the information should be logged as a critical error. However, if the situation will only make your component unusable, then you need to log the information as an error.

  - It is critical to follow the syntax of each PmLogLib API. This is required to enable proper parsing of the logging information. If the syntax is not followed, the extracted logging information may be worthless.

  - Logging too much information will increase the log size and processing time. Therefore, log significant information only and do not go overboard.

### Handling Log Messages of Third Party Library

The library messages of third parties such as GLib, Qt, and JavaScript should be logged at a debug level, as they do not depict any critical issue. (All JavaScript messages are used for debugging purposes.) These messages usually indicate coding errors. If the log level information is highly important, then message handlers need to use one of the following methods:

1.  Generate a unique message ID or
2.  Use a single message ID for all the library messages.

However, this does not excuse a component from changing its logs to use PmLogLib APIs. Therefore, the components should move out of using third party library logging functions such as `g_message`, `q_warning`, or `console.log`.

## Log Output Format

### When journald is enabled

When journald is enabled, the log data is stored in binary format under the `/run/log/journal/` directory. You can query or follow logs from the stored log data.

Below is the format of the logging information that is displayed when you query or follow logs.

  - Format:

    The general log output format for journald is as follows.

    ``` shell
    DATE TIME HOSTNAME {KERNEL/USER}[PID]: MSG
    ```

    For log messages formatted by PmLogLib, the `MSG` part can be further broken down into elements as follows.

    ```
    DATE TIME HOSTNAME {KERNEL/USER}[PID]: [] [pmlog] context <msgid|DBGMSG> {"key1":"value1", "key2":"value2", ...... ,"keyn":"valuen"} free_text_string
    ```

    Note that the `DBGMSG` message ID is included only when the log level is set to debug.

  - Example:

    ``` shell
    Nov 02 21:26:32 raspberrypi4 sam[367]: [] [pmlog] SAM NL_APP_LAUNCH_BEGIN {"app_id":"com.webos.app.home","caller_id":"com.webos.bootManager","mode":"normal"}
    Nov 02 21:26:34 raspberrypi4 bootd[375]: [] [pmlog] bootManager BootSequencer {} Bootd's job is done
    Nov 02 21:26:26 raspberrypi4 kernel: [[0;1;39m[[0;1;31m[[0;1;39mrandom: systemd: uninitialized urandom read (16 bytes read)[[0m
    Nov 02 21:26:26 raspberrypi4 systemd[1]: Started Dispatch Password Requests to Console Directory Watch.
    ```

### When pmlogd is enabled

When pmlogd is enabled, the main default log file is located at `/var/log/messages`. As the log is rotated, the older history will be present at `/var/log/messages.0`, `/var/log/messages.1`, and so on.

As the log file is in text format, it can be viewed by any text file viewer or by using the standard command line commands to list the content of log files.

Below is the format of the logging information that is generated when pmlogd is enabled.

  - Format:

    ``` shell
    DATEandTIME [monotonic_time] facility.log_level process [PID:TID] context msgid {"key1":"value1", "key2":"value2", ...... ,"keyn":"valuen"} free_text_string
    ```

  - Example:

    ``` shell
    2019-11-13T09:24:09.612655Z [10151.514313337] user.info sam [] SAM NL_APP_LAUNCH_BEGIN {"app_id":"com.webos.app.home","caller_id":"com.webos.surfacemanager","mode":"normal"}
    2019-11-13T09:25:14.838045Z [48.134501355] user.info bootd [] bootManager BootSequencer {} Bootd's job is done
    ```

As seen in the example above, each message which is logged by pmlogd contains a standard set of elements. Depending on the development stack and API used, the PmLogLib API tries to automatically provide many of the details. The date and time are always provided by pmlogd automatically when the message is logged, without the developer having to provide it. User can enable the PID (process id) and TID (thread id) by setting `logProcessIds` and `logThreadIds` flags to true from the `/etc/pmlog.d/default.conf` file. However, some of these elements like the `free_text_string` parameter need to be explicitly provided by the user.
