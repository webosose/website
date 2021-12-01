---
title: webOS OSE 2.14.0
display_title: webOS OSE 2.14.0 Release Notes
date: 2021-11-30
weight: 24
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #397 to build #411.

## New and Changed Features

### Core Applications

#### Samples Apps

  - Added the Camera app to Sample Apps

### Managers & Services

#### Connectivity

  - Network Manager
    - Fixed the wpa-supplicant service to get started on RPi4

#### EXternal Device

  - PDM
    - Fixed the `productName` property of `nonStorageDeviceList` to return proper device names

### Base Components

#### Media

  - g-camera-pipeline
    - Enhanced recording functionality with audio in appsrc 

#### Connectivity

  - Added occlientbasicops and ocserverbasicops binaries in qemux86 image
  - Updated udev rules for LGE UWB Module

### Build System & SCM

#### Build System

  - Added platform support for target machine rpi4-64
  - Added support for qemux86 64bit in OSE emulator

#### Yocto

  - Upgraded to latest revisions from Yocto 3.1 Dunfell

### Kernel

#### Memory Manager

  - Enabled systemd-oomd in OSE
  - Added systemd-oomd service link
  - Added Dbus signal handling

### Visual Studio Code Extension

  - Released Visual Studio Code Extension for webOS OSE

## Fixed Issues

  - Fixed the issue that Google Assistant API doesn't work on some occasions.
  - Fixed the issue that the information about the operating system (osInfo) cannot be obtained.

## Known Issues

  - Broken icon images are observed with 64bit OSE image with 2G board under dual display scenario.
