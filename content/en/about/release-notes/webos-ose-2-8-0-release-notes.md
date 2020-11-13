---
title: webOS OSE 2.8.0
display_title: webOS OSE 2.8.0 Release Notes
date: 2020-11-13
weight: 21
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #251 to build #263.

## New and Changed Features

### Core Applications

#### System

  - Enact Browser
    - Allowed the 'media' permission request
    - Handled the 'newwindow' event with the 'new_popup' disposition
    - Added the support of pop-under feature for OAuth operation

### Application Framework

#### SDK

  - Released Command-Line Interface (CLI) 1.13.1

### Managers & Services

#### App

  - Memory Manager
    - Enabled memcg for 5.4 kernel

#### Connectivity
  - Bluetooth Manager
    - Added the contact service and the vcard parser library

#### Display

  - LSM
    - Added the support for DRM multi-plane composition

#### Intelligence

  - TTS
    - Modified the stop method's way of handling the msgID parameter

#### Media

  - Added the support for calling the notifyMediaPlayback API of the Bluetooth service
  - Added methods to the mediacontroller API such as mute/unmute status and event, playing position, and media duration
  - Newly added the mediaindexer service

### Base Components

#### Boot

  - bootd
    - Updated to check whether Display 2 is connected or disconnected when running on the emulator to get the launcher and the bare app in the secondary display


#### Display

  - Qt
    - Updated qtbase/qtdeclarative patches with the latest upstream version

### BSP

### Build System & SCM

#### Yocto

  - Upgraded to the latest revision from Yocto Dunfell 3.1

## Fixed Issues

  - n/a

## Known Issues

  - When a user sets mute on the primary display, then the audio on the secondary display is also muted.
