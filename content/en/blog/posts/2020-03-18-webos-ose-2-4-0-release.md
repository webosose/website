---
title: webOS OSE 2.4.0 Release
date: 2020-03-18
slug: webos-ose-2-4-0-release
posttype: release
toc: false
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.4.0.

The highlights of this release are as follows:

  - [IoT profile support](#iot-profile-support)
  - [Chromium and QtWayland upgrade](#chromium-and-qtwayland-upgrade)
  - [Other enhancements](#other-enhancements)

For more details on this release, see the [release notes]({{< relref "webos-ose-2-4-0-release-notes" >}}).

## IoT profile support

This release adds support for **webOS IoT**, the IoT profile of webOS OSE. webOS IoT lets you test your services on Raspberry Pi 4 even without a display, whereas the full build of webOS OSE requires a display connection.

In this version, webOS IoT supports execution of JS services written in Node.js. You can use webOS IoT image as a lightweight base image in small devices for testing purposes.

For more information, visit the [IoT Profile section](/docs/iot) in the documentation.

## Chromium and QtWayland upgrade

The major components of webOS OSE, Chromium and QtWayland, have been upgraded to more up-to-date versions.

  - Chromium, the default web engine, has been upgraded from 72 to 79 for enhancement in web functionality and compatibility.
  - QtWayland has been upgraded to 5.12.4 in order to improve graphics performance and stability.

## Other enhancements

This release also includes upgrade of linux-raspberrypi to 4.19.93 as well as fixes for known issues. Check the [release notes]({{< relref "webos-ose-2-4-0-release-notes" >}}) to find out more about the changes.
