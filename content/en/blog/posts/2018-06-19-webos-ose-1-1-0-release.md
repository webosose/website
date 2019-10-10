---
title: webOS OSE 1.1.0 Release
date: 2018-06-19
slug: webos-ose-1-1-0-release
posttype: release
toc: false
---

Key highlights of this release are as follows.

* [Memory Manager](#memory-manager)
* [QEMU Emulator](#qemu-emulator)

For a complete listing of changes, refer to the [release notes]({{< relref "webos-ose-1-1-0-release-notes" >}}).

## Memory Manager

Memory Manager monitors the memory status of the system and manages applications to ensure that the system does not run into an out-of-memory (OOM) situation. This is achieved by killing applications that are in the background when we get into a low-memory condition.

The goals of Memory Manager are as follows:

* Maintain the status of memory usage across the apps
* Prevent the system kernel from running into OOM situation
* Correct the memory leak situation

## QEMU Emulator

webOS OSE provides an emulator for Linux, based on open-source QEMU project. The emulator enables you to test the webOS OSE apps and services on a virtual environment on your Linux PC. This allows you to test most of the features before deploying the apps or services to physical device.

For more information, see the [emulator user guide]({{< relref "qemu-emulator-user-guide" >}}).
