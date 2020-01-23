---
title: GDB Debugging Setup
date: 2019-10-25
weight: 60
toc: true
---

This guide describes how to set up the environment to debug webOS Open Source Edition (OSE) with GDB.

## Prerequisites

Before you begin setting up the environment for GDB debugging, you must:

* Build the webOS OSE image as `webos-image-devel`. For more information, see [Building webOS OSE]({{< relref "building-webos-ose#building-webos-image-devel" >}}).
* Flash the built image to a microSD card and insert the microSD card in the target device. For more information, see [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).

## Booting up the Target

First, boot up the target device and make sure that processes run normally.

## Downloading and Decompressing dbg Package

Even if the image has been built as `webos-image-devel`, it does not contain symbol or source code of each module that will be used for debugging. You must download the dbg package (`.ipk`) and decompress the package.

In this guide, we will use a process called `event-monitor` as an example. The target device is Raspberry Pi 4.

1. Copy the dbg package containing debug symbol of `event-monitor`, located under `BUILD` directory, to the target device.

    ```bash
    $ cd ./BUILD/work/raspberrypi4-webos-linux-gnueabi/event-monitor/1.1.0-2-r2/deploy-ipks/raspberrypi4/
    $ ls
    event-monitor_1.1.0-2-r2_raspberrypi4.ipk
    event-monitor-dbg_1.1.0-2-r2_raspberrypi4.ipk
    ...
    $ scp event-monitor-dbg_1.1.0-2-r2_raspberrypi4.ipk root@[DEVICE_IP]:/sysroot/home/root/
    ```

2. On the target device, decompress the dbg package.

    ```bash
    root@raspberrypi4:/sysroot/home/root# ls
    event-monitor-dbg_1.1.0-2-r2_raspberrypi4.ipk
    root@raspberrypi4:/sysroot/home/root# opkg install event-monitor-dbg_1.1.0-2-r2_raspberrypi4.ipk --nodeps
    ```

3. After decompressing the dbg package, you can find the binary including debug symbols and the source code.

    ```bash
    root@raspberrypi4:/sysroot/home/root# cd /
    root@raspberrypi4:/# find usr
    ...
    usr/sbin/.debug/event-monitor
    ...
    usr/src/debug/event-monitor/1.1.0-2-r2/git/src/service/main.cpp
    ```

## Running GDB

1. Run GDB by attaching to the running process.

    ```bash
    root@raspberrypi4:/# pidof event-monitor
    1404
    root@raspberrypi4:/# gdb /usr/sbin/.debug/event-monitor 1404
    GNU gdb (gdb) 8.2
    ...
    ---Type <return> to continue, or q <return> to quit---
    0x76c85c0c in poll () from /lib/libc.so.6
    ```

2. Once attached, you can look up the thread in use and print out the call stack.

    ``` bash
    (gdb) info threads
    Id Target Id Frame
    * 1  Thread 0xb6f62ea0 (LWP 1404) "event-monitor" __libc_do_syscall () at libc-do-syscall.S:48
    ```

    ```bash
    (gdb) bt
    #0  __libc_do_syscall () at libc-do-syscall.S:48
    #1  0xb6c5933e in __GI___poll (fds=0x2203d88, nfds=5, timeout=-1)
    at ../sysdeps/unix/sysv/linux/poll.c:29
    #2  0xb6ea789c in ?? () from /usr/lib/libglib-2.0.so.0
    Backtrace stopped: previous frame identical to this frame (corrupt stack?)
    ```

3. By specifying the location of source code, you become fully prepared to debug webOS OSE with GDB.

    ```bash
    (gdb) dir /
    Source directories searched: /:$cdir:$cwd
    ```
