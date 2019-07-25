---
title: GDB Debugging Setup
date: 2019-03-05
weight: 50
toc: true
---

This guide describes how to set up the environment to debug webOS Open Source Edition (OSE) with GDB.

## Prerequisites

Before you begin setting up the environment for GDB debugging, you must:

* Build the webOS OSE image as `webos-image-devel`. For more information, see [Building webOS OSE]({{< relref "building-webos-ose#building-webos-image-devel" >}}).
* Flash the built image (`.rpi-sdimg`) to a microSD card and insert the microSD card in the target device. For more information, see [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).

## Booting up the Target

First, boot up the target device and make sure that processes run normally.

## Downloading and Decompressing dbg Package

Even if the image has been built as `webos-image-devel`, it does not contain symbol or source code of each module that will be used for debugging. You must download the dbg package (`.ipk`) and decompress the package.

In this guide, we will use a process called `event-monitor` as an example. The target device is Raspberry Pi 3.

1. Copy the dbg package containing debug symbol of `event-monitor`, located under `BUILD` directory, to the target device.

    ```bash
    $ cd ./BUILD/work/raspberrypi3-webos-linux-gnueabi/event-monitor/1.1.0-23-r2/deploy-ipks/raspberrypi3$
    $ ls
    event-monitor_1.1.0-23-r2_raspberrypi3.ipk
    event-monitor-dbg_1.1.0-23-r2_raspberrypi3.ipk
    ...
    $ scp event-monitor-dbg_1.1.0-23-r2_raspberrypi3.ipk root@[DEVICE_IP]:~/
    ```

2. On the target device, decompress the dbg package.

    ```bash
    root@raspberrypi3:~# ls
    event-monitor-dbg_1.1.0-23-r2_raspberrypi3.ipk
    root@raspberrypi3:~# ar x event-monitor-dbg_1.1.0-23-r2_raspberrypi3.ipk
    root@raspberrypi3:~# tar xf data.tar.gz
    ```

3. After decompressing the dbg package, you can find the binary including debug symbols and the source code.

    ```bash
    root@raspberrypi3:~# find usr
    ...
    usr/sbin/.debug/event-monitor
    ...
    usr/src/debug/event-monitor/1.1.0-23-r2/git/src/service/main.cpp
    ```

## Running GDB

1. Run GDB by attaching to the running process.

    ```bash
    root@raspberrypi3:~# pidof event-monitor
    953
    root@raspberrypi3:~# gdb /home/root/usr/sbin/.debug/event-monitor 953
    GNU gdb (gdb) 7.11.1
    ...
    ---Type <return> to continue, or q <return> to quit---
    0x76c85c0c in poll () from /lib/libc.so.6
    ```

2. Once attached, you can look up the thread in use and print out the call stack.

    {{< highlight bash >}}
    (gdb) info threads
    Id Target Id Frame
    * 1 Thread 0x76a0f0a0 (LWP 953) "event-monitor" 0x76c87c1c in poll () at ../sysdeps/unix/syscall-template.S:84
    {{< /highlight >}}

    ```bash
    (gdb) bt
    #0 0x76c87c1c in poll () at ../sysdeps/unix/syscall-template.S:84
    #1 0x76ee1148 in ?? () from /usr/lib/libglib-2.0.so.0
    Backtrace stopped: previous frame identical to this frame (corrupt stack?)
    ```

3. By specifying the location of source code, you become fully prepared to debug webOS OSE with GDB.

    ```bash
    (gdb) dir /home/root
    Source directories searched: /home/root:$cdir:$cwd
    ```
