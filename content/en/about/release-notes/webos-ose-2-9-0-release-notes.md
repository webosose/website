---
title: webOS OSE 2.9.0
display_title: webOS OSE 2.9.0 Release Notes
date: 2021-01-22
weight: 22
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #264 to build #295.

## New and Changed Features

### Core Applications

#### System

-   Enact Browser
    -   Enabled built-in error page
    -   Fixed movement of volume bar smoothly

### Application Framework

#### SDK

-   Released Command-Line Interface (CLI) 2.0.3

### Managers & Services

#### App

-   SAM
    -   Added unifiedsearch service
    -   Added rootfs directory to webos-initscripts repository
-   Memory Manager
    -   Removed legacy APIs which are not used by other components
    -   Added new sysInfo API
    -   Modified sysInfo format
    -   Moved service creation from initialization to sysInfo call

#### Connectivity

-   Bluetooth Manager
    -   Fixed hfp service crash when index string is empty
    -   Fixed delay reporting event while device disconnect
-   Included iotivity native sample for webos-iot packagegroup
-   Implemented a Nyx Module to integrate the GPS HW
-   Implemented the config based port usage of GPS HW
-   Updated to handle GPS Nyx module error scenarios
-   Added SelectRole dbus method to change a2dp roles
-   Corrected error code for mock GPS HW
-   Modified API groups as per ACG guidelines

#### Display

-   LSM
    -   Aligned input position by mirror item's offset
    -   Fixed LSM issues with webOS foreign protocol and some others
    -   Added qtbase-plugins-webos which provides webOS EGLFS platform plugin
    -   Fixed the keyboard modifier issue

#### Intelligence

-   AI
    -   Modified API groups as per ACG guidelines
-    TTS
    -   Modified API groups as per ACG guidelines

#### Media

-   audiod
    -   Fixed multi-instance audio mute and unmute issue for URI player
    -   Modified API groups as per ACG guidelines

#### System Service

-   Provided internal category permission for settings service API permission file
-   Added fix for deviceNum for camera
-   Modified API groups as per ACG guidelines

#### Web App Framework

-   Enact Framework
    -   Updated for new moonstone repo structure

#### Web Engine

-   Blink
    -   Implemented a feature to shift the cursor position when overlapped by the VKB input field
    -   Upgraded Chromium to v84
    -   Added mksnapshot-cross recipe to build mksnapshot only

### Base Components

#### Connectivity

-   BlueZ  
    -   AVRCP Fix filter argument in search API

#### i18n

-   Updated the latest version of loctool and plugins to OSE
-   Updated iLib to version 14.6.2

### BSP

  

### Build System & SCM

#### Yocto

-   Updated to the latest revision from Yocto Dunfell 3.1

#### Initscript

-   Added intent symbolic link

#### SCM

-   Fixed various issues leading to host-user-contaminated QA errors in Qt
-   Fixed linking error with ld-gold

#### coreOS

-   Added backward compatibility layer
-   Modified to loop through all the trust level providers for searching wildcard services

## Fixed Issues

  - Fixed the issue when a user sets mute on the primary display the audio on the secondary display is also muted.

## Known Issues

-   Enact Browser's popup test for opening parent pages doesn't display parent pages properly.
-   Long tap on a recently visited site from the Enact Browser occasionally doesn't invoke a remove button to pop up.
