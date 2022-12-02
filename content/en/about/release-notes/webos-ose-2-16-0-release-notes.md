---
title: webOS OSE 2.16.0
display_title: webOS OSE 2.16.0 Release Notes
date: 2022-05-11
weight: 33
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #438 to build #456.

## New and Changed Features

### Core Applications

#### System

-   Enact Browser
    -   Implemented a popup block feature
    -   Changed the UI design of the site filter
    -   Implemented cookie management for Enact browser
    -   Implemented a feature to manage allowed/blocked URLs list

#### Sample Apps

-   Media Gallery App
    -   Added keyboard/mouse support
-   Image Viewer
    -   Fixed the issue that when image slide show is playing, next and previous buttons are working even if they are disabled

### Managers & Services

#### Display

-   LSM
    -   Updated scheduler for new adaptive update
    -   Fixed the issue that the web browser not shown on the emulator

#### Media

-   audiod
    -   Implemented fix for palerts and setSourceInputVolume

#### Notification

-   Notification Manager
    -   Added fix for Alert not displayed

#### Settings

-   Settings Service
    -   Added locale info support

#### SW Update

-   SW Updater
    -   The SW Updater service has been retired

#### System Service

-   Added the HDMI-CEC feature

### Base Components

#### Display

-   Qt
    -   Rebased patches to v6.3.0
    -   Applied webOS patches with maxver instead of SRCREV

#### Media

-   Fixed the thumbnail generation issue for video in USB
-   Added rtpsrc plugin in gstreamer bad plugin
-   Added streaming support for UDP/RTP/RTSP protocols in the media pipeline

#### i18n/l10n

-   Added new locales to webOS OSE
-   iLib
    -   Synced up with iLib 14.13.0 version

#### Connectivity

-   BlueZ
    -   Updated to handle special characters for client ID

#### Web Engine

-   Blink
    -   Fixed video play for files whose name contain special character
    -   Fixed app title and icons displa
    -   Fixed Play/Pause not working on Bluetooth devices
    -   Fixed Reddit Favicon not appearing on the first tap of the web browser

### Emulator

-   Disabled mouse wheel on touch mode for emulator

### Debugging Tool

-   Implemented EBD (eBPF dynamic tracing tool) for Raspberry Pi 4 images

## Fixed Issues

-   n/a

## Known Issues

-   n/a
  