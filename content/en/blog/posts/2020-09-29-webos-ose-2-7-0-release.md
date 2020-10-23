---
title: webOS OSE 2.7.0 Release
date: 2020-09-29
slug: webos-ose-2-7-0-release
posttype: release
toc: false
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.7.0.

The highlights of this release are as follows:

  - [Launching multiple instances of an app on webOS OSE](#launching-multiple-instances-of-an-app-on-webos-ose)
  - [Yocto upgrade to 3.1 Dunfell](#yocto-upgrade-to-3-1-dunfell)
  - [App mirroring support](#app-mirroring-support)
  - [Introducing volume control and notification apps](#introducing-volume-control-and-notification-apps)
  - [Bluetooth multi-adapter support](#bluetooth-multi-adapter-support)
  - [8GB Raspberry Pi support](#8gb-raspberry-pi-support)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-7-0-release-notes).

## Launching multiple instances of an app on webOS OSE
Multiple instances of the same app can be launched on webOS OSE. You can launch one instance of an app on one display, and another instance of the same app on another display. Previously, different apps could be launched on different displays, separately. 

## Yocto upgrade to 3.1 Dunfell
webOS OSE has upgraded its Yocto support from 2.6 to 3.1. The following build-webos releases of OSE contain Yocto upgrade builds.

  - Build 229: Yocto 2.7 Warrior upgrade build
  - Build 230: Yocto 3.0 Zeus upgrade build
  - Build 231: Yocto 3.1 Dunfell upgrade build

See the following list for the supported version of each component:

  - gcc - 9.3
  - glib - 2.62.6
  - glibc - 2.31
  - boost - 1.72.0
  - python3 - 3.8.2
  - openssl - 1.1.1g
  - gstreamer - 1.16.2 (included in build 235)
  - node.JS -12.14.1 (included in build 234)
  - bluez5 - 5.54 (included in build 234)
  - Raspberry Pi 4 kernel for OSE - kernel-5.4.59

## App mirroring support
App mirroring is a feature that mirrors one screen to another screen. OSE allows to implement app mirroring features such as mirroring between displays by using APIs of LSM (Luna Surface Manager).

## Introducing volume control and notification apps
System applications that were previously included in webOS Auto has been incorporated into webOS OSE, too. These are Volume Control App and Notification APP. This enables OSE to support volume control UI for dual sound devices and web-based notification UI.

## Bluetooth multi-adapter support
webOS OSE now supports multiple Bluetooth adapters. On dual displays, each display can have access to a dedicated Bluetooth adapter and perform Bluetooth operations individually.

## 8GB Raspberry Pi support
Raspberry Pi 4 8GB model has been included to the supported devices of webOS OSE.
