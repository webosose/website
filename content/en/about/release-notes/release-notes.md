---
title: Release Notes
date: 2019-07-30
weight: 10
toc: true
---

## 6th Release in 2019 (July 30, 2019)

### New Features

#### Application Framework

  - SDK
      - VirtualBox-based Emulator has been added.

#### **BSP & Kernel**

  - Boot script
      - resize-rootfs script has been added.

### Changed Features

#### Base Components

  - curl
      - curl has been upgraded from 7.63.0 to 7.64.1.

### Fixed Issues

  - Resolved the Bluetooth device discovery issue caused by BlueZ upgrade to 5.50.
  - Fixed the Camera Service and g-camera-pipeline crash that appeared after Yocto upgrade.

## 5th Release in 2019 (June 25, 2019)

### New and Changed Features

* Yocto has been upgraded from 2.2 to 2.6.
* Details of each [build-webos releases](https://github.com/webosose/build-webos/releases) are as follows:
    * Build 80
        - The last build based on Yocto 2.2. An entry point to "morty" branch.
        - This build includes changes needed for layerindex to properly parse "morty" branch of meta-webosose.
    * Build 81
        - Yocto 2.3 upgrade build. An entry point to "pyro" branch.
        - [Yocto Project 2.3 release notes](https://lists.yoctoproject.org/pipermail/yocto-announce/2017-May/000112.html)
    * Build 82
        - Yocto 2.4 upgrade build. An entry point to "rocko" branch.
        - [Yocto Project 2.4 release notes](https://lists.yoctoproject.org/pipermail/yocto-announce/2017-October/000125.html)
    * Build 83
        - Yocto 2.5 upgrade build. An entry point to "sumo" branch.
        - [Yocto Project 2.5 release notes](https://lists.yoctoproject.org/pipermail/yocto-announce/2018-May/000136.html)
    * Build 84
        - Yocto 2.6 upgrade build. An entry point to "thud" branch.
        - [Yocto Project 2.6 release notes](https://lists.yoctoproject.org/pipermail/yocto-announce/2018-November/000147.html)

#### Base Components

* Base components have been upgraded in accordance with the Yocto upgrade.
* For details, refer to recipe upgrades in the Yocto Project release notes above.

#### BSP

* BSP components have been upgraded in accordance with the Yocto upgrade, except for Wayland and Mesa (see Known Issues below).
* For details, refer to recipe upgrades in the Yocto Project release notes above.

#### Kernel

* Kernel components have been upgraded in accordance with the Yocto upgrade.
* For details, refer to recipe upgrades in the Yocto Project release notes above.

### Known Issues

* BlueZ has been upgraded from 5.48 to 5.50. Due to this change, some features of GATT BT profiles are failing.
    * An RPi device with bluez upgraded to 5.50 is not getting discovered from another RPi device that runs on bluez 5.48 or bluez 5.50.
    * This RPi device can be discovered from an Android phone. So, failure is in RPi to RPi discovery.
    * Further steps for GATT connection, discovering services, reading or writing characteristics between RPi and RPi are blocked due to this.
* Wayland version is kept to 1.11 instead of the version specified in the recipe of Yocto 2.6 Thud.
* Mesa version is kept to 17.1.7 instead of the version specified in the recipe of Yocto 2.6 Thud.
    * The preferred version of Wayland and Mesa in Yocto 2.6 Thud are 1.16 and 18.1.9, but the build 84 is using 1.11 and 17.1.7 due to a dependency in a prebuilt binary gpu-libs.

## 4th Release in 2019 (June 14, 2019)

### New Features

#### Managers & Services

* Robot
    * Flow Manager has been added.

### Changed Features

#### Managers & Services

* All managers and services
    * ACG (Access Control Groups) migration has been completed.
* Display
    * Luna Surface Manager (LSM) has been modified in order to allow applications to run in the background.

#### Base Components

* JS Service
    * Node.js has been upgraded from v6.11.2 to v8.12.0.
* Media
    * GStreamer has been upgraded from v1.14.0 to v1.14.4.

## 3rd Release in 2019 (April 2019)

### New Features

#### Application Framework

* SDK
    * Workflow Designer has been added.

#### Managers & Services

* Media
    * Camera Service has been added.
* Internationalization/Localization (i18n/l10n)
    * Virtual Keyboard (VKB) has been added.
* Intelligence
    * Context Intent Manager (CIM) has been added.
* External Device
    * Physical Device Manager (PDM) has been added.

#### Base Components

* Media
    * g-camera-pipeline has been added.

### Changed Features

#### Core Applications

* Enact Browser
    * Added translation of tab titles for ‘New Tab’, ‘Bookmarks’, ‘History’, and ‘Setting’.
    * Implemented support for window.open() function.
    * Implemented a feature to fetch favicons based on link tags provided by sites.
    * Implemented a feature to show error pages for unresponsive sites.

#### Base Components

* Web Engine
    * Web engine has been upgraded from Chromium 53 to Chromium 68.

### Fixed Issues

* Enact Browser
    * Fixed an issue where default bookmarks are reset when the browser restarts after clearing all bookmarks.
    * Fixed an issue where bookmarks are deleted incorrectly.
    * Fixed an issue where thumbnails are displayed abnormally for sites visited via Google search.
    * Fixed an issue where the last open tab is closed when the browser receives close event from a web page. (in order to keep at least one tab opened)

## 2nd Release in 2019 (March 2019)

### Breaking Changes

#### Managers & Services

* Media
    * videooutputd has been added.
    * avoutputd has been retired.
    * uMediaServer (uMS) has been modified to use videooutputd instead of avoutputd for video control functionalities.

### New and Changed Features

#### Managers & Services

* Text-to-Speech (TTS) Service
    * TTS Service has been added.
* Bluetooth Manager
    * AVRCP profile support (Target role only) has been added.

#### Development Tool

* Internalization/Localization
    * The localization tool has been added.

## 1st Release in 2019 (January 2019)

### New and Changed Features

#### Managers & Services

* Bluetooth Manager
    * Added support for Bluetooth profiles (OPP, A2DP)
* audiod
    * Added support for Bluetooth audio

#### Base Components

* BlueZ
    * Added support for Bluetooth profiles (OPP, A2DP)
* PulseAudio
    * Added support for Bluetooth audio

#### BSP

* Bluetooth
    * Added support for Bluetooth profiles (OPP, A2DP)

### Fixed Issues

* Fixed an issue where Wi-Fi network does not switch to the selected network.
* Fixed an issue where, when trying to reconnect while using Wi-Fi, "Unable to connect to the network" pop-up appears instead of a password prompt.

### Known Issues

Regarding the Bluetooth audio support, the following issues exist.

* Dynamic routing (switching back and forth between speakers and A2DP-enabled Bluetooth device) is not supported while audio is being rendered.
* Audio rendering might stop randomly in Raspberry Pi while listening through a Bluetooth device. For technical details related to this issue, refer to the [known issue](https://github.com/webosose/pulseaudio-webos/wiki) on GitHub wiki.

## 6th Release in 2018 (November 2018)

### Changed Features

#### Core Applications

* Enact Browser
    * Added a notification message which is displayed after a job is done
    * Refactored message sending code to send different messages to the guest page
    * Enabled a newtab option for launch param
    * Wrapped all strings with $L to make iLib work
    * Fixed the issue where the browser did not return to full-screen mode
    * Implemented wrapper for `<webview>` 'dialog' event
    * Added Dialog UI for alert, confirm, and prompt
    * Added json files for enact browser Access Control Groups (ACG) prior to applying Chromium patch

#### Managers & Services

* Web App Manager (WAM)
    * Fixed wam and app-shell ACG for umediaclient
* mojoservicelauncher
    * Applied a fix for starting services with a "run" method

#### Base Components

* Maliit framework
    * Removed qtdeclarative-plugins
* pmtrace
    * Inactivated journald

## 5th Release in 2018 (October 2018)

### New Features

#### BSP/Kernel

* zram

### Changed Features

#### Application Framework

* Web app framework
    * Updated Enact framework from v2.0.1 to v2.2.1.

#### Base Components

* ROS2
    * Updated meta-ros2 to the latest revision.

### Fixed Issues

#### Core Applications

* Enact Browser
    * Fixed an issue where the browser freezes with a black screen when loading websites.

#### Managers & Services

* Luna Surface Manager (LSM)
    * Fixed an issue where Web App Manager (WAM) crashes after LSM is restarted.
* DB8
    * Updated memory management policy to fix the rebooting issue.

## 4th Release in 2018 (September 2018)

### New Features

#### Applications

* Enact browser

#### Base Components

* g-media-pipeline

## 3rd Release in 2018 (August 2018)

### New Features

#### Applications

* IoTivity sampler

#### Application Framework

* Beanviser

#### Managers & Services

* Bluetooth profiles support (SPP, GATT)
* AI assistant service
* ROS bridge
* audioouputd

### Changed Features

#### Managers & Services

* audiod

## 2nd Release in 2018 (June 2018)

### New Features

#### Application Framework

* QEMUx86 Emulator

#### Managers & Services

* Memory Manager

### Fixed Issues

* The memory manager is implemented and released.

## Initial Release (March 2018)

### New Features

#### Applications

* System UI (Home Launcher, Notification)
* Settings
* Bare App
* YouTube

#### Application Framework

* Enact
* Internationalization and Localization
* Software Development Kit (SDK)

#### Managers & Services

* System and Application Manager (SAM)
* Web Application Manager (WAM)
* Activity Manager
* Luna Surface Manager (LSM)
* uMediaServer (webOS media framework)
* DB8 (embedded JSON database)

#### Base Components

* LS2 (Luna Bus)
* Web Engine (Chromium)
* Node.js

#### BSP/Kernel

* BSP/Kernel layer to support Raspberry Pi 3
* Wi-Fi and wired LAN

#### Build System

* webOS build system based on yocto 2.2

### Known Issues

* The memory manager is not implemented in the initial version. It will be added to the next version.
* While processing multimedia content, errors may occur. Debugging is in progress.
* The initial version has been tested in English only and it does not support virtual keyboard (VKB).
