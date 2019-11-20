---
title: Introduction to Viewing Logs
date: 2019-11-14
weight: 10
toc: true
---

This page provides information that you need to know before learning how to view logs in webOS Open Source Edition (OSE).

## Comparison between journald and pmlogd

webOS OSE supports two logging daemons: **journald** (default) and **pmlogd** (optional). The table below shows a comparison between journald and pmlogd.

| Target                       | journald                                                                | pmlogd                                                                |
| :--------------------------- | ----------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| Log files                    | `/run/log/journal/*/*`                                                  | `/var/log/messages*`                                                  |
| How to follow logs           | `journalctl -f`                                                         | `tail -f /var/log/messages`                                           |
| Previous log files           | `/var/spool/rdxd/previous_boot_logs.tar.gz`                             | `/var/spool/rdxd/previous_boot_logs.tar.gz`                           |
| How to restore previous logs | `unzip /var/spool/rdxd/previous_boot_logs.tar.gz file> journald-* file` | `unzip /var/spool/rdxd/previous_boot_logs.tar.gz file> messages file` |

## Check the Running Status of Logging Daemons

Before you begin, check to see which logging daemon is enabled on the platform version that you're using. The following shows examples of checking the running status of logging daemons by platform version.

On webOS OSE 2.1.0 or higher, journald is enabled by default, whereas pmlogd is disabled.

{{< code "Running status of logging daemons on webOS OSE 2.1.0 or higher" true >}}
``` shell
root@raspberrypi4:/# systemctl status systemd-journald.service | tee
systemd-journald.service - Journal Service
   Loaded: loaded (/usr/lib/systemd/system/systemd-journald.service; static; vendor preset: enabled)
   Active: active (running) since Mon 2019-08-26 18:11:58 PDT; 2 weeks 1 days ago
     Docs: man:systemd-journald.service(8)
           man:journald.conf(5)
 Main PID: 170 (systemd-journal)
   Status: "Processing requests..."
    Tasks: 1 (limit: 3493)
   Memory: 10.1M
   CGroup: /system.slice/systemd-journald.service
           └─170 /usr/lib/systemd/systemd-journald
Aug 26 18:11:58 raspberrypi4 systemd-journald[170]: Journal started
Aug 26 18:11:58 raspberrypi4 systemd-journald[170]: Runtime journal (/run/log/journal/cfa135c8575446e0993c51480a4ca837) is 8.0M, max 85.7M, 77.7M free.
Aug 26 18:11:58 raspberrypi4 systemd-journald[170]: Runtime journal (/run/log/journal/cfa135c8575446e0993c51480a4ca837) is 8.0M, max 85.7M, 77.7M free.
Warning: Journal has been rotated since unit was started. Log output is incomplete or unavailable.

root@raspberrypi4:/# systemctl status pm-log-daemon.service | tee
Unit pm-log-daemon.service could not be found.
```
{{< /code >}}

On the other hand, up to webOS OSE 2.0.0, pmlogd is enabled and journald is disabled by default.

{{< code "Running status of logging daemons up to webOS OSE 2.0.0" true >}}
``` shell
root@raspberrypi4:/# systemctl status pm-log-daemon.service | tee
pm-log-daemon.service - default - "pm-log-daemon.service"
   Loaded: loaded (/etc/systemd/system/pm-log-daemon.service; static; vendor preset: enabled)
   Active: active (running) since Fri 2019-08-23 13:22:28 GMT; 2 weeks 4 days ago
  Process: 2218 ExecStartPost=/bin/touch /tmp/pmlogdaemon/hub-ready (code=exited, status=0/SUCCESS)
  Process: 2191 ExecStartPre=/bin/mkdir -p /tmp/pmlogdaemon (code=exited, status=0/SUCCESS)
 Main PID: 2215 (PmLogDaemon)
   CGroup: /system.slice/pm-log-daemon.service
           └─2215 /usr/sbin/PmLogDaemon -z -f 6 -m

root@raspberrypi4:/# systemctl status systemd-journald.service | tee
systemd-journald.service
   Loaded: masked (Reason: Unit systemd-journald.service is masked.)
   Active: inactive (dead)
```
{{< /code >}}
