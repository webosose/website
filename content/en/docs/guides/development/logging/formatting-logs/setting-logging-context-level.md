---
title: "Setting the Logging Context and Level"
date: 2019-11-14
weight: 60
toc: true
---

To check or control the system-wide logging context and level, you can use the **`PmLogCtl`** command on the target. With this command, you can see the logging level of contexts or limit the log output according to your needs by adjusting the logging level of specific contexts.

This page explains how to use the `PmLogCtl` command with examples.

## Logging Levels

The table below shows a list of logging levels that can be set by `PmLogCtl`. The default level is "info".

| Level              | Remarks                  |
| :----------------- | ------------------------ |
| `0` or `"emerg"`   | Emergency                |
| `1` or `"alert"`   | Alert                    |
| `2` or `"crit"`    | Critical                 |
| `3` or `"err"`     | Error                    |
| `4` or `"warning"` | Warning                  |
| `5` or `"notice"`  | Notice                   |
| `6` or `"info"`    | Info. The default level. |
| `7` or `"debug"`   | Debug                    |

## Retrieving the Context Information

To get the information of one or more contexts, use `PmLogCtl` with the `show` option.

{{< code "Syntax" true >}}
``` shell
PmLogCtl show [<context>] # show logging context(s)
```
{{< /code >}}

The `<context>` can be a specific context name or GLOB.

  - Without any context specified, information of all available contexts is returned.

    {{< code "Example" true >}}
    ``` shell
    root@raspberrypi4:/# PmLogCtl show
    PmLogCtl: Context '<default-lib>' = info
    PmLogCtl: Context '<default>' = info
    PmLogCtl: Context 'ActivityManager' = info
    PmLogCtl: Context 'aiservice' = info
    PmLogCtl: Context 'AppInstallD' = info
    PmLogCtl: Context 'audiooutputd' = info
    ...
    PmLogCtl: Context 'wam.log' = info
    PmLogCtl: Context 'webos-bluetooth-service' = info
    PmLogCtl: Context 'webos-connman-adapter' = info
    PmLogCtl: Context 'webos-service' = info
    ```
    {{< /code >}}

  - With a specific context name or GLOB specified, the information of the corresponding context(s) is returned.

    {{< code "Example" true >}}
    ``` shell
    root@raspberrypi4:/# PmLogCtl show wam.log
    PmLogCtl: Context 'wam.log' = info

    root@raspberrypi4:/# PmLogCtl show webos*
    PmLogCtl: Context 'webos-bluetooth-service' = info
    PmLogCtl: Context 'webos-connman-adapter' = info
    PmLogCtl: Context 'webos-service' = info
    ```
    {{< /code >}}

## Setting the Logging Level of Contexts

To set the logging level of one or more contexts, use `PmLogCtl` with the `set` option.

{{< code "Syntax" true >}}
``` shell
PmLogCtl set <context> <level> # set logging level of context(s)
```
{{< /code >}}

The `<context>` can be a specific context name or GLOB.

  - Suppose you want to set the logging level of the `wam.log` context to `debug`. This will let you see all the messages that have been logged for `wam.log`.

    {{< code "Example" true >}}
    ``` shell
    root@raspberrypi4:/# PmLogCtl set wam.log debug
    PmLogCtl: Setting context level for 'wam.log'.

    root@raspberrypi4:/# PmLogCtl show wam.log
    PmLogCtl: Context 'wam.log' = debug
    ```
    {{< /code >}}

  - On the other hand, if you want to suppress the logging level of uMediaServer(ums)-related contexts to `crit` (Critical), you can use the following command.

    {{< code "Example" true >}}
    ``` shell
    root@raspberrypi4:/# PmLogCtl set ums* crit
    PmLogCtl: Setting context level for 'ums.connector'.
    PmLogCtl: Setting context level for 'ums.media_display_controller'.
    PmLogCtl: Setting context level for 'ums.pipeline_ctrl'.
    PmLogCtl: Setting context level for 'ums.pipeline_mgr'.
    PmLogCtl: Setting context level for 'ums.process_ctrl'.
    PmLogCtl: Setting context level for 'ums.resource_mgr'.
    PmLogCtl: Setting context level for 'ums.server'.
    PmLogCtl: Setting context level for 'ums.videooutput'.

    root@raspberrypi4:/# PmLogCtl show ums*
    PmLogCtl: Context 'ums.connector' = crit
    PmLogCtl: Context 'ums.media_display_controller' = crit
    PmLogCtl: Context 'ums.pipeline_ctrl' = crit
    PmLogCtl: Context 'ums.pipeline_mgr' = crit
    PmLogCtl: Context 'ums.process_ctrl' = crit
    PmLogCtl: Context 'ums.resource_mgr' = crit
    PmLogCtl: Context 'ums.server' = crit
    PmLogCtl: Context 'ums.videooutput' = crit
    ```
    {{< /code >}}
