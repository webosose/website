---
title: Enabling and Disabling pmlogd
date: 2019-11-20
weight: 40
toc: true
---

From webOS OSE 2.1.0, journald is the default logging system on systemd, which means journald is enabled instead of pmlogd. To enable pmlogd, you must go through manual process to create required files and disable journald.

This page describes the following:

* [How to check the status of the logging system](#checking-which-logging-system-you-are-using)
* [How to enable pmlogd instead of journald](#how-to-enable-pmlogd)
* [How to re-enable journald](#how-to-re-enable-journald)

## Checking which logging system you are using

You can figure out which logging system is enabled by checking the status of the logging daemon and the logging file.

### journald (default)

  - Check the status of `systemd-journald.service`

    ``` shell
    root@raspberrypi4:/# systemctl status systemd-journald.service | tee
    ● systemd-journald.service - Journal Service
       Loaded: loaded (/usr/lib/systemd/system/systemd-journald.service; static; vendor preset: enabled)
       Active: active (running) since Sat 2019-11-02 21:26:26 PDT; 1 weeks 3 days ago
         Docs: man:systemd-journald.service(8)
               man:journald.conf(5)
     Main PID: 169 (systemd-journal)
       Status: "Processing requests..."
        Tasks: 1 (limit: 3493)
       Memory: 10.1M
       CGroup: /system.slice/systemd-journald.service
               └─169 /usr/lib/systemd/systemd-journald
    ```

  - Check the logging file: `/run/log/journal` directory

    ``` shell
    root@raspberrypi4:/# ls /run/log/journal/
    f85b5eef84bf41f886bc544d5419d3ea
    ```

### pmlogd (optional)

  - Check the status of `pm-log-daemon.service`

    ``` shell
    root@raspberrypi4:/# systemctl status pm-log-daemon.service | tee
    ● pm-log-daemon.service - webos - "pm-log-daemon.service"
       Loaded: loaded (/etc/systemd/system/pm-log-daemon.service; enabled; vendor preset: enabled)
       Active: active (running) since Sat 2019-11-02 21:26:28 PDT; 1 weeks 3 days ago
      Process: 302 ExecStartPost=/bin/touch /tmp/pmlogdaemon/hub-ready (code=exited, status=0/SUCCESS)
      Process: 295 ExecStartPre=/bin/mkdir -p /tmp/pmlogdaemon (code=exited, status=0/SUCCESS)
     Main PID: 301 (PmLogDaemon)
        Tasks: 2 (limit: 3493)
       Memory: 1.0M
       CGroup: /system.slice/pm-log-daemon.service
               └─301 /usr/sbin/PmLogDaemon -z -f 6 -m
    ```

  - Check the logging file : `/var/log/messages*` file

    ``` shell
    root@raspberrypi4:/# ls /var/log/messages*
    /var/log/messages
    ```

## How to enable pmlogd

This section describes the steps required to enable pmlogd instead of journald.

### Step 1. Create systemd files for pmlogd

First, create systemd files for pmlogd:

  - `pm-log-daemon.service`
  - `pm-klog-daemon.service`
  - `pm-log-daemon-stop.sh`

#### pm-log-daemon.service

``` shell
root@raspberrypi4:/# vi /etc/systemd/system/pm-log-daemon.service
```

{{< code "/etc/systemd/system/pm-log-daemon.service" true >}}
``` shell
[Unit]
Description=webos - "%n"
Requires=ls-hubd.service
After=ls-hubd.service

[Service]
Type=simple
OOMScoreAdjust=-1000
EnvironmentFile=-/var/systemd/system/env/pm-log-daemon.env
ExecStartPre=-/bin/mkdir -p /tmp/pmlogdaemon
ExecStart=/usr/sbin/PmLogDaemon -z -f 6 -m
ExecStartPost=/bin/touch /tmp/pmlogdaemon/hub-ready
ExecStop=/etc/systemd/system/scripts/pm-log-daemon-stop.sh
Restart=on-failure
```
{{< /code >}}

#### pm-klog-daemon.service

``` shell
root@raspberrypi4:/# vi /etc/systemd/system/pm-klog-daemon.service
```

{{< code "/etc/systemd/system/pm-klog-daemon.service" true >}}
``` shell
[Unit]
Description=webos - "%n"

[Service]
Type=simple
OOMScoreAdjust=-1000
EnvironmentFile=-/var/systemd/system/env/pm-klog-daemon.env
ExecStart=/usr/sbin/PmKLogDaemon -n -d 1
Restart=on-failure
```
{{< /code >}}

#### pm-log-daemon-stop.sh

``` shell
root@raspberrypi4:/# vi /etc/systemd/system/scripts/pm-log-daemon-stop.sh
root@raspberrypi4:/# chmod +x /etc/systemd/system/scripts/pm-log-daemon-stop.sh
```

{{< code "/etc/systemd/system/scripts/pm-log-daemon-stop.sh" true >}}
``` shell
#!/bin/sh

rm -rf /tmp/pmlogdaemon

systemctl list-jobs | egrep -q 'shutdown.target.*start' && SHUTDOWN=yes || SHUTDOWN=no
systemctl list-jobs | egrep -q 'reboot.target.*start' && REBOOT=yes || REBOOT=no
systemctl list-jobs | egrep -q 'halt.target.*start' && HALT=yes || HALT=no
systemctl list-jobs | egrep -q 'poweroff.target.*start' && POWEROFF=yes || POWEROFF=no
pwroff_reason=$(cat /tmp/poweroff_reason 2>/dev/null | awk 'BEGIN { FS="=";} /poweroff_reason/ {print $2} END{}')
if [ -z $pwroff_reason ] ; then
    if [ "$LS_HUBD_CRASH" != "" ] ; then
        # There was a crash - do not care which ls-hubd right here
        pwroff_reason="watchdog"
    else
        pwroff_reason="unknown"
    fi
fi
PIDL=`pidof PmLogDaemon` || true
PIDR=`pidof rdxd` || true
PIDU=`pidof uploadd` || true
if [ $SHUTDOWN == "yes" ] && [ $REBOOT == "yes" ] ; then
    # REBOOT
    if [ "$LS_HUBD_CRASH" != "ls-hubd_private" -a "$PIDL" != "" ] ; then
        # leave a note to tell why we rebooted
        PmLogCtl logkv . info REBOOT_REASON reason=\"$pwroff_reason\" "from reboot.conf" || true
        PmLogCtl flush || true
        if [ "$PIDR" != "" -a "$PIDU" != "" ] ; then
            # pmlogdaemon, rdxd and uploadd MUST be alive at this point when command is executed.
            echo "[REBOOT] - before analytics log support"
            echo "[REBOOT] - before analytics log support" > $KLOG
            luna-send -n 1 -w 300 luna://com.webos.pmlogd/forcerotate '{}'
        fi
        echo "[REBOOT] - save log files to /var/spool/rdxd/previous_boot_logs.tar.gz"
        echo "[REBOOT] - save log files to /var/spool/rdxd/previous_boot_logs.tar.gz" > $KLOG
        # prepare for log backup by removing old backup file.  We will verify that the new
        # file has been created (or wait a bit longer for it) down below.
        rm -f /var/spool/rdxd/previous_boot_logs.tar.gz || true
        luna-send -n 1 -w 300 -f luna://com.webos.pmlogd/backuplogs '{}'
        # if PIDL is empty, then we didn't start creating the backup, so no point waiting for it
        # if pmlogdaemon backup is not done yet wait 2 more seconds for it to finish
        COUNT=0
        while [ ! -e /var/spool/rdxd/previous_boot_logs.tar.gz -a $COUNT -le 8 ] ; do
            echo "[REBOOT] - pmlog backup wait 250msec" > $KLOG
            usleep 250000      # 0.25 second
            COUNT=$((COUNT + 1))
        done
    fi
elif [ $SHUTDOWN == "yes" ] && [ $POWEROFF == "yes" ] ; then
    # SHUTDWN (POWEROFF)
    if [ "$PIDL" != "" ] ; then
        # leave a note to explain why we're shutting down
        PmLogCtl logkv . info SHUTDOWN_REASON reason=\"$pwroff_reason\" "from shutdown.conf" || true
        PmLogCtl flush || true
        if [ "$PIDR" != "" -a "$PIDU" != "" ] ; then
            # pmlogdaemon, rdxd and uploadd MUST be alive at this point when command is executed.
            echo "[SHUTDOWN] - before analytics log support"
            echo "[SHUTDOWN] - before analytics log support" > $KLOG
            # must guarantee time for making log report
            luna-send -n 1 -w 150 luna://com.webos.pmlogd/forcerotate '{}'
        fi
        echo "[SHUTDOWN] - save log files to /var/spool/rdxd/previous_boot_logs.tar.gz"
        echo "[SHUTDOWN] - save log files to /var/spool/rdxd/previous_boot_logs.tar.gz" > $KLOG
        # prepare for log backup by removing old backup file.  We will verify that the new
        # file has been created (or wait a bit longer for it) down below.
        rm -f /var/spool/rdxd/previous_boot_logs.tar.gz || true
        luna-send -n 1 -w 150 -f luna://com.webos.pmlogd/backuplogs '{}'
        # if pmlogdaemon backup is not done yet wait 2 more seconds for it to finish
        COUNT=0
        while [ ! -e /var/spool/rdxd/previous_boot_logs.tar.gz -a $COUNT -le 8 ] ; do
            echo "[SHUTDOWN] - pmlog backup wait 250msec" > $KLOG
            usleep 250000      # 0.25 second
            COUNT=$((COUNT + 1))
        done
    fi
else
    echo "stop pmlogdaemon"
    exit 0
fi
```
{{< /code >}}

### Step 2. Create symbolic link files

Create symbolic link files to the pmlogd logging daemons.

``` shell
root@raspberrypi4:/# cd /etc/systemd/system/multi-user.target.wants
root@raspberrypi4:/# ln -sf ../pm-log-daemon.service pm-log-daemon.service
root@raspberrypi4:/# ln -sf ../pm-klog-daemon.service pm-klog-daemon.service
```

### Step 3. Disable journald

To disable journald, execute the following commands:

``` shell
root@raspberrypi4:/# ln -sf /dev/null /etc/systemd/system/systemd-journal-catalog-update.service
root@raspberrypi4:/# ln -sf /dev/null /etc/systemd/system/systemd-journal-flush.service
root@raspberrypi4:/# ln -sf /dev/null /etc/systemd/system/systemd-journald.service
root@raspberrypi4:/# rm /lib/systemd/system/multi-user.target.wants/backup-log.service
```

### Step 4. Reboot

Reboot the target.

``` shell
root@raspberrypi4:/# reboot
```

## How to re-enable journald

This section describes the steps required to re-enable journald after pmlogd has been enabled.

### Step 1. Remove pmlogd files

First, remove files that are related to pmlogd.

``` shell
root@raspberrypi4:/# rm /etc/systemd/system/multi-user.target.wants/pm-*
```

### Step 2. Enable journald

To enable journald, execute the following commands.

``` shell
root@raspberrypi4:/# rm /etc/systemd/system/systemd-journal*
root@raspberrypi4:/# ln -sf /lib/systemd/system/backup-log.service /lib/systemd/system/multi-user.target.wants/backup-log.service
```

### Step 3. Reboot

Reboot the target.

``` shell
root@raspberrypi4:/# reboot
```
