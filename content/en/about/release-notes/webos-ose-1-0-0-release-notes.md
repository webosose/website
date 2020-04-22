---
title: webOS OSE 1.0.0
display_title: webOS OSE 1.0.0 Release Notes
date: 2018-03-18
weight: 1
toc: true
layout: release-notes
---

This is the initial release of webOS Open Source Edition (OSE).

## New Features

### Applications

* System UI (Home Launcher, Notification)
* Settings
* Bare App
* YouTube

### Application Framework

* Enact
* Internationalization and Localization
* Software Development Kit (SDK)

### Managers & Services

* System and Application Manager (SAM)
* Web Application Manager (WAM)
* Activity Manager
* Luna Surface Manager (LSM)
* uMediaServer (webOS media framework)
* DB8 (embedded JSON database)

### Base Components

* LS2 (Luna Bus)
* Web Engine (Chromium)
* Node.js

### BSP/Kernel

* BSP/Kernel layer to support Raspberry Pi 3
* Wi-Fi and wired LAN

### Build System

* webOS build system based on Yocto 2.2

## Known Issues

* The memory manager is not implemented in the initial version. It will be added to the next version.
* While processing multimedia content, errors may occur. Debugging is in progress.
* The initial version has been tested in English only and it does not support virtual keyboard (VKB).
