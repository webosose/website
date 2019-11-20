---
title: Viewing Logs when journald is Enabled
date: 2019-11-20
weight: 20
toc: true
---

This page outlines journald and describes how to view logs when journald is enabled in webOS Open Source Edition (OSE).

{{< note >}}
On webOS OSE 2.1.0 or higher, journald is enabled by default.
{{< /note >}}

## Overview of journald

journald is a system service for collecting and storing log data, introduced with systemd. journald runs as the `systemd-journald` daemon.

journald makes it easier for developers to find interesting and relevant information among an ever-increasing amount of log messages. It creates and maintains structured, indexed journals based on logging information that is received from a variety of sources so that you can check all the logs in sequence at once. The types of log data collected by journald are as follows:

  - Kernel log messages, via kmsg
  - Simple system log messages, via the libc [syslog(3)](http://man7.org/linux/man-pages/man3/syslog.3.html) call. In webOS OSE, these include the log messages formatted by PmLogLib.
  - Structured system log messages via the native Journal API, see [sd_journal_print(3)](https://www.freedesktop.org/software/systemd/man/sd_journal_print.html)
  - Standard output and standard error of service units
  - Audit records, originating from the kernel audit subsystem

For more information, see the [official documentation](https://www.freedesktop.org/software/systemd/man/systemd-journald.service.html).

## Using journalctl to View Logs

To view logs when journald is enabled, use the **`journalctl`** command.

### See All Messages

When run without any options, the `journalctl` command will show all journal entries.

``` shell
root@raspberrypi4:/# journalctl

-- Logs begin at Mon 2019-08-26 18:11:58 PDT, end at Tue 2019-09-10 23:35:52 PDT. --
Aug 26 18:11:58 raspberrypi4 kernel: Booting Linux on physical CPU 0x0
Aug 26 18:11:58 raspberrypi4 kernel: [[0;1;39m[[0;1;31m[[0;1;39mLinux version 4.19.58 (oe-user@oe-host) (gcc version 8.2.0 (GCC)) #1 SMP Wed Jul 17 12:36:18 UTC 2019
Aug 26 18:11:58 raspberrypi4 kernel: CPU: ARMv7 Processor [410fd083] revision 3 (ARMv7), cr=30c5383d
Aug 26 18:11:58 raspberrypi4 kernel: CPU: div instructions available: patching division code
Aug 26 18:11:58 raspberrypi4 kernel: CPU: PIPT / VIPT nonaliasing data cache, PIPT instruction cache
Aug 26 18:11:58 raspberrypi4 kernel: OF: fdt: Machine model: Raspberry Pi 4 Model B Rev 1.1
Aug 26 18:11:58 raspberrypi4 kernel: Memory policy: Data cache writealloc
Aug 26 18:11:58 raspberrypi4 kernel: cma: Reserved 256 MiB at 0x000000001d000000
Aug 26 18:11:58 raspberrypi4 kernel: On node 0 totalpages: 447488
Aug 26 18:11:58 raspberrypi4 kernel:   DMA zone: 1629 pages used for memmap
Aug 26 18:11:58 raspberrypi4 kernel:   DMA zone: 0 pages reserved
Aug 26 18:11:58 raspberrypi4 kernel:   DMA zone: 185344 pages, LIFO batch:63
Aug 26 18:11:58 raspberrypi4 kernel:   HighMem zone: 262144 pages, LIFO batch:63
```

### Check the Boot Messages

journald tracks each log to a specific system boot. To limit the logs shown to the current boot, use the `journalctl` command with `-b` option.

``` shell
root@raspberrypi4:/# journalctl -b

-- Logs begin at Mon 2019-08-26 18:11:58 PDT, end at Tue 2019-09-10 23:35:52 PDT. --
Aug 26 18:11:58 raspberrypi4 kernel: Booting Linux on physical CPU 0x0
Aug 26 18:11:58 raspberrypi4 kernel: [[0;1;39m[[0;1;31m[[0;1;39mLinux version 4.19.58 (oe-user@oe-host) (gcc version 8.2.0 (GCC)) #1 SMP Wed Jul 17 12:36:18 UTC 2019
Aug 26 18:11:58 raspberrypi4 kernel: CPU: ARMv7 Processor [410fd083] revision 3 (ARMv7), cr=30c5383d
Aug 26 18:11:58 raspberrypi4 kernel: CPU: div instructions available: patching division code
Aug 26 18:11:58 raspberrypi4 kernel: CPU: PIPT / VIPT nonaliasing data cache, PIPT instruction cache
Aug 26 18:11:58 raspberrypi4 kernel: OF: fdt: Machine model: Raspberry Pi 4 Model B Rev 1.1
Aug 26 18:11:58 raspberrypi4 kernel: Memory policy: Data cache writealloc
Aug 26 18:11:58 raspberrypi4 kernel: cma: Reserved 256 MiB at 0x000000001d000000
Aug 26 18:11:58 raspberrypi4 kernel: On node 0 totalpages: 447488
Aug 26 18:11:58 raspberrypi4 kernel:   DMA zone: 1629 pages used for memmap
Aug 26 18:11:58 raspberrypi4 kernel:   DMA zone: 0 pages reserved
Aug 26 18:11:58 raspberrypi4 kernel:   DMA zone: 185344 pages, LIFO batch:63
Aug 26 18:11:58 raspberrypi4 kernel:   HighMem zone: 262144 pages, LIFO batch:63
```

### View Messages in a Time Range

To see messages logged within a specific time window, you can use the `--since` and `--until` options. The following command shows journal messages logged within the last one hour.

``` shell
root@raspberrypi4:/# journalctl --since "1 hour ago"

-- Logs begin at Mon 2019-08-26 18:11:58 PDT, end at Tue 2019-09-10 23:40:52 PDT. --
Sep 10 22:58:08 raspberrypi4 LunaSysService[832]: [] [pmlog] LunaSysService TIMEZONE_TRANSITION {"Abbr":"PST","DST":"End","Year":2019,"Time":1572771600,"Offset":-28800}
 TimeZone offset will be changed
Sep 10 22:58:08 raspberrypi4 LunaSysService[832]: [] [pmlog] LunaSysService TIMEZONE_TRANSITION {"Next":1572771600} TimeZone transition after 4590112 seconds
Sep 10 22:58:08 raspberrypi4 LunaSysService[832]: [] [pmlog] LunaSysService SYSTEM_TIME_UPDATED {"SOURCE":"ntp","PRIORITY":5,"NEXT_SYNC":1568181487} Updated system time
Sep 10 22:58:08 raspberrypi4 notificationmgr[984]: [] [pmlog] NOTIFICATION SYSTEMTIME_SYNC {"TIMESOURCE":"ntp","TIME":1568181488}
Sep 10 22:58:08 raspberrypi4 sleepd[700]: [[0;1;39m[[0;1;31m[[0;1;39mCould not open rtc driver. 2 2[[0m
```

The following command shows journal messages logged within the given time range.

``` shell
root@raspberrypi4:/# journalctl --since "2019-09-10 23:40:00" --until "2019-09-10 23:43:00"

-- Logs begin at Mon 2019-08-26 18:11:58 PDT, end at Tue 2019-09-10 23:40:52 PDT. --
Sep 10 23:40:52 raspberrypi4 sleepd[700]: Could not open rtc driver. 2 2
Sep 10 23:40:52 raspberrypi4 sleepd[700]: Could not open rtc driver. 2 2
Sep 10 23:40:52 raspberrypi4 sleepd[700]: [] [pmlog] <default-lib> LS_REQUIRES_SECURITY {"SERVICE":"com.webos.service.power","CATEGORY":"/suspend","METHOD":"activitySt.
Sep 10 23:40:52 raspberrypi4 sleepd[700]: Could not open rtc driver. 2 2
```

### View a Specific Number of Recent Logs

Like the `tail` command, the `-n` option will print the specified number of most recent journal entries.

``` shell
root@raspberrypi4:/# journalctl -n 10 --since "1 hour ago"

-- Logs begin at Mon 2019-08-26 18:11:58 PDT, end at Tue 2019-09-10 23:45:52 PDT. --
Sep 10 22:58:08 raspberrypi4 LunaSysService[832]: [] [pmlog] LunaSysService TIMEZONE_TRANSITION {"Abbr":"PST","DST":"End","Year":2019,"Time":1572771600,"Offset":-28800d
Sep 10 22:58:08 raspberrypi4 LunaSysService[832]: [] [pmlog] LunaSysService TIMEZONE_TRANSITION {"Next":1572771600} TimeZone transition after 4590112 seconds
Sep 10 22:58:08 raspberrypi4 LunaSysService[832]: [] [pmlog] LunaSysService SYSTEM_TIME_UPDATED {"SOURCE":"ntp","PRIORITY":5,"NEXT_SYNC":1568181487} Updated system time
Sep 10 22:58:08 raspberrypi4 notificationmgr[984]: [] [pmlog] NOTIFICATION SYSTEMTIME_SYNC {"TIMESOURCE":"ntp","TIME":1568181488}
Sep 10 22:58:08 raspberrypi4 sleepd[700]: Could not open rtc driver. 2 2
Sep 10 22:58:08 raspberrypi4 ls-hubd[163]: [] [pmlog] ls-hubd LSHUB_NO_NAME_PERMS {} Can not find match for 'com.webos.notification' in pattern queue '["com.webos.sett'
Sep 10 22:59:39 raspberrypi4 login[281]: ROOT LOGIN  on '/dev/ttyS0'
Sep 10 23:00:52 raspberrypi4 sleepd[700]: Could not open rtc driver. 2 2
Sep 10 23:00:52 raspberrypi4 sleepd[700]: [] [pmlog] <default-lib> LS_REQUIRES_SECURITY {"SERVICE":"com.webos.service.power","CATEGORY":"/suspend","METHOD":"activitySt.
Sep 10 23:00:52 raspberrypi4 sleepd[700]: Could not open rtc driver. 2 2
```

### Filter Messages by Unit

To see messages logged by any systemd unit, use the `-u` option.

``` shell
root@raspberrypi4:/# journalctl -u bootd.service

-- Logs begin at Mon 2019-08-26 18:11:58 PDT, end at Tue 2019-09-10 23:45:52 PDT. --
Aug 26 18:12:12 raspberrypi4 systemd[1]: Starting webos - "bootd.service"...
Aug 26 18:12:12 raspberrypi4 sysctl[618]: kernel.randomize_va_space = 2
Aug 26 18:12:12 raspberrypi4 systemd[1]: Started webos - "bootd.service".
Aug 26 18:12:12 raspberrypi4 bootd[622]: [] [pmlog] bootManager Boot {"CLOCK":17.382,"PerfType":"Boot","PerfGroup":"Platform"} BOOTD_START
Aug 26 18:12:12 raspberrypi4 bootd[622]: [] [pmlog] bootManager Settings {} --DeviceType=raspberrypi4
Aug 26 18:12:12 raspberrypi4 bootd[622]: [] [pmlog] bootManager Settings {} --Distro=webos
Aug 26 18:12:12 raspberrypi4 bootd[622]: [] [pmlog] bootManager Settings {} --DistroVariant=normal
Aug 26 18:12:12 raspberrypi4 bootd[622]: [] [pmlog] bootManager Settings {} --NFSBoot=NO
Aug 26 18:12:12 raspberrypi4 bootd[622]: [] [pmlog] bootManager Settings {} --TimeDiff=0.0(s)
Aug 26 18:12:14 raspberrypi4 bootd[622]: [] [pmlog] bootManager BootSequencer {} Launch first app (bareapp)
```

### Filter Messages by Priority

Use the `-p` option to filter messages based on their priority level.

The table below shows a list of priority levels. The default level is "info".

| Priority Level     | Remarks                       |
| :----------------- | ----------------------------- |
| `0` or `"emerg"`   | Emergency. The maximum level. |
| `1` or `"alert"`   | Alert                         |
| `2` or `"crit"`    | Critical                      |
| `3` or `"err"`     | Error                         |
| `4` or `"warning"` | Warning                       |
| `5` or `"notice"`  | Notice                        |
| `6` or `"info"`    | Info. The default level.      |
| `7` or `"debug"`   | Debug                         |

If a single priority level is specified, all messages with that priority level and below are returned. For example, when `2` or `"crit"` is specified, the messages from `0` to `2` (`"emerg"`, `"alert"`, `"crit"`) are returned.

``` shell
root@raspberrypi4:/# journalctl -p "crit"
```

To use a range of priority levels, provide the start and end levels in the form of `FROM..TO`. As an example, the command below will output all messages with priority between alert and critical.

``` shell
root@raspberrypi4:/# journalctl -p "alert".."crit"
```

### Follow Logs

`journalctl` can print log messages to the console as they are added, similar to the Linux `tail` command. To do this, add the `-f` option.

``` shell
root@raspberrypi4:/# journalctl -f
```

This can be also used with the `-u` option to filter the messages from a specific unit.

``` shell
root@raspberrypi4:/# journalctl -u sam.service -f
```

### Read from Specific journald Log Files

To read logs on one or more journald log files with a specific naming pattern, use the `--file` option with `GLOB` as an argument. If specified, `journalctl` will operate on the journal files matching *`GLOB`* instead of the default runtime and system journal paths.

``` shell
root@raspberrypi4:/# journalctl --file /file/path/system.journal
```
