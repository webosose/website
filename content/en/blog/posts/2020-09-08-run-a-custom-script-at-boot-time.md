---
title: Run a custom script at boot time
date: 2020-09-08
slug: run-a-custom-script-at-boot-time
posttype: article
toc: true
---

**Author: Jaeduck Oh**

webOS OSE uses `systemd` as an initialization system.

Wikipedia describes `systemd` as follows:

> `systemd` is a software suite that provides an array of system components for Linux operating systems. Its main aim is to unify service configuration and behavior across Linux distributions; `systemd`'s primary component is a "system and service manager"—an init system used to bootstrap user space and manage user processes.

- [Wikipedia's description of `systemd`](https://en.wikipedia.org/wiki/Systemd)
- [`systemd`'s official site](https://www.freedesktop.org/wiki/Software/systemd/)

`systemd` provides a standard process for controlling programs that run when the Linux computer boots.

webOS is based on Linux kernel. So if you want to run a script at boot time in webOS OSE, you have to create and use a service file.

This article explains how to run the Enact Browser-one of the pre-installed application in webOS OSE-at boot time as an example.

## Create a service file

Create a service file in the `/lib/systemd/system/` directory.

- The name of the service file : **\<service name\>.service**

``` bash
root@raspberrypi4:/sysroot/home/root# cd /lib/systemd/system/
root@raspberrypi4:/lib/systemd/system# vi runscript.serivce
```

Add the content below to the file.

``` bash
[Unit]
Description=webos - "%n"
 
[Service]
Type=oneshot
ExecStart=/usr/bin/luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '{ "id" : "com.webos.app.enactbrowser"}'
```

### Unit Section
- Description - The option adds a detailed description of the service.

### Service Section
- Type - The option sets the type of the service. For this option, you can set one of the following values: simple | working | oneshot | notify | dbus
- ExecStart - The option sets the command (script) to run.

{{< note >}}
See [the official manual](https://www.freedesktop.org/software/systemd/man/systemd.service.html) for the detailed description of sections and options for a service file.
{{< /note >}}

## Create a symbolic link
Create a symbolic link that points to `/lib/systemd/system/webos-bd.target.wants/` directory to allow scripts to run after Home Launcher runs.

``` bash
root@raspberrypi4:/lib/systemd/system# ln -s runscript.service ./webos-bd.target.wants/
```

## Reboot
Reboot with the command below:

``` bash
root@raspberrypi4:/lib/systemd/system# reboot -f
```

After rebooting, you can check with the systemdctl command to see if the service has run.

``` bash
root@raspberrypi4:/sysroot/home/root# systemctl status runscript
```

You get the following result if the service has been executed successfully.

``` bash
● runscript.service - webos - "runscript.service"
   Loaded: loaded (/usr/lib/systemd/system/runscript.service; static; vendor preset: enabled)
   Active: inactive (dead) since Tue 2020-07-21 18:15:38 PDT; 1 months 12 days ago
  Process: 809 ExecStart=/usr/bin/luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch { "id" :
 "com.webos.app.enactbrowser"} (code=exited, status=0/SUCCESS)
 Main PID: 809 (code=exited, status=0/SUCCESS)
 
Jul 21 18:15:38 raspberrypi4 systemd[1]: Starting webos - "runscript.service"...
Jul 21 18:15:38 raspberrypi4 luna-send[809]: {
Jul 21 18:15:38 raspberrypi4 luna-send[809]:     "launchPointId": "com.webos.app.enactbrowser_default",
Jul 21 18:15:38 raspberrypi4 luna-send[809]:     "appId": "com.webos.app.enactbrowser",
Jul 21 18:15:38 raspberrypi4 luna-send[809]:     "returnValue": true,
Jul 21 18:15:38 raspberrypi4 luna-send[809]:     "displayId": 0,
Jul 21 18:15:38 raspberrypi4 luna-send[809]:     "instanceId": "1b614df1-a090-45e3-aa90-c046649dbcc70"
Jul 21 18:15:38 raspberrypi4 luna-send[809]: }
Jul 21 18:15:38 raspberrypi4 systemd[1]: Started webos - "runscript.service".
```