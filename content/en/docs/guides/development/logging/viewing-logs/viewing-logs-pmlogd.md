---
title: Viewing Logs when pmlogd is Enabled
date: 2019-11-14
weight: 30
toc: true
---

This page outlines pmlogd and describes how to view logs when pmlogd is enabled in webOS Open Source Edition (OSE).

{{< note "How to enable pmlogd on webOS OSE 2.1.0 or higher" >}}
On webOS OSE 2.1.0 or higher, pmlogd is disabled by default. To enable pmlogd, see [Enabling and Disabling pmlogd]({{< relref "enabling-disabling-pmlogd" >}}).
{{< /note >}}

## Overview of pmlogd

pmlogd is a subset of syslogd implementation as per RFC 3164 (The BSD syslog Protocol). pmlogd is intended to efficiently address the needs for webOS embedded devices.

Some of the additional features are as follows:

  - Support for RFC 3339-style timestamps;
  - Support for advanced file buffering + rotation configuration;
  - Support for custom filtering/redirection.

It has the following restrictions:

  - It does not support remote logging;
  - It only supports the standard datagram socket on port 514;
  - It does not support `/etc/syslog.conf` or standard filtering/redirection.

## Viewing the Logs in /var/log/messages

When pmlogd is enabled, the log messages are stored in **`/var/log/messages`**.

### Search for a Keyword

To view lines that include a specific keyword, you can use the `cat` or `vi` command on `/var/log/messages` and search for the keyword.

``` shell
root@raspberrypi4:/# cat /var/log/messages | grep <keyword>
root@raspberrypi4:/# vi /var/log/messages
< search for the keyword >
```

### Follow the logs

To follow the logs, use the `tail -f` command on `/var/log/messages`.

``` shell
root@raspberrypi4:/# tail -f /var/log/messages
```

To follow the logs specific to your app or service, use the `tail` and `grep` command in the form shown below.

``` shell
root@raspberrypi4:/# tail -f /var/log/messages | grep <Context Name of Your App or Service>
```
