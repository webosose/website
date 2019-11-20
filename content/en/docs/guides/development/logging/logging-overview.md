---
title: Overview
date: 2019-11-14
weight: 10
toc: true
---

webOS Open Source Edition (OSE) provides a collection of libraries and tools that help you trace and debug your apps and services. This section describes how to use these libraries and tools for the following tasks that are required to make the most of the webOS OSE logging framework.

  - [Format logs](#format-logs)
  - [View logs](#view-logs)

## Format Logs

To format log messages in a pre-defined structure, the **PmLogLib** library is used. PmLogLib formats the log messages that are generated during runtime of your app or service, making it easier to identify and use the relevant log information. To enable that, you must use the PmLogLib API to insert log messages. PmLogLib is supported for C/C++, JavaScript, Node.js, and QML. For more information, see the pages in the [Formatting Logs]({{< relref "formatting-logs" >}}) section.

In addition, you can set the system-wide logging context and level by using the **`PmLogCtl`** command. For details, see [Setting the Logging Context and Level]({{< relref "setting-logging-context-level" >}}).

## View Logs

To view logs, different methods are used depending on which logging daemon is enabled in the platform. The two logging daemons that are available in the webOS OSE platform are journald and pmlogd.

  - **journald** is a sub-component of systemd, which is responsible for event logging and runs as the `systemd-journald` daemon. journald collects log data that are logged via stdout/stderr and kmsg as well as log messages formatted by PmLogLib.
  - **pmlogd** is a logging daemon that implements a subset of RFC 3164 (The BSD syslog Protocol), intended to efficiently address the needs for webOS OSE embedded devices. pmlogd only handles the log messages formatted by PmLogLib.

{{< note >}}
The default status of logging daemons vary by platform version:

  - On webOS OSE 2.1.0 or higher, journald is enabled and pmlogd is disabled by default.
  - Up to webOS OSE 2.0.0, pmlogd is enabled and journald is disabled by default.

To find out how to enable pmlogd instead of journald on webOS OSE 2.1.0 or higher, see [Enabling and Disabling pmlogd]({{< relref "enabling-disabling-pmlogd" >}}).
{{< /note >}}

For each logging daemon, a different method is used for viewing logs:

  - When journald is enabled, you can use the **`journalctl`** command to follow or query logs.
  - When pmlogd is enabled, the log messages are stored in **`/var/log/messages`.** So you can use the `tail -f` command on the file to follow the log or search for keywords in the file.

For more information, see the pages in the [Viewing Logs]({{< relref "viewing-logs" >}}) section.
