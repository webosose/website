---
title: webOS OSE 1.10.0
display_title: webOS OSE 1.10.0 Release Notes
date: 2019-07-29
weight: 12
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #85 to build #90.

## New Features

### Application Framework

* SDK
    * VirtualBox-based Emulator has been added.

### BSP & Kernel

* Boot script
    * resize-rootfs script has been added.

## Changed Features

### Base Components

* curl
    * curl has been upgraded from 7.63.0 to 7.64.1.

## Fixed Issues

  * Resolved the Bluetooth device discovery issue caused by BlueZ upgrade to 5.50.
  * Fixed the Camera Service and g-camera-pipeline crash that appeared after Yocto upgrade.
