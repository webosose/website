---
title: webOS OSE 2.7.0
display_title: webOS OSE 2.7.0 Release Notes
date: 2020-09-29
weight: 20
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #219 to build #250.

## New and Changed Features

### Core Applications

#### System

  - Enact Browser
    - Fixed the suggestion popup to be invisible when there's no input value in the virtual keyboard (VKB)
    - Updated dependencies to Enact 3.4.0

#### System UI

  - Notification
      - Provided permission to subscribe to toast notification
      - The legacy notification in LSM is dropped and the swipe-down gesture from the top edge of the screen will launch the volume app

### Application Framework

#### SDK

  - Released Command-Line Interface (CLI) 1.13.0
  - Released Beanviser 2.0.3

### Managers & Services

#### App

  - SAM
      - Fixed to always append locale in headers
      - Added initial locale value
      - Updated the am-monitor pipe path
      - Updated to launch the bare app and home apps on both displays
      - Updated to use sd_notify directly when using systemd as init manager

#### Connectivity
  - Updated location API to support vertical accuracy for getLocationUpdates method

#### Display

  - LSM
    - Updated to support custom scan based on deviceType
    - Allowed simultaneous mirroring between displays
    - Introduced Hybrid System UI (server-side add-on)
    - Applied Adaptive update
    - Added SurfaceItemMirror for Enhanced App Mirroring
    - Improved update interval using page flip events
    - Added support for multiple display clusters

#### External Device

  - PDM
    - Removed support for I/O performance from PDM
    - Implemented subscription response on display change for a device

#### Intelligence

  - TTS
    - Provided multiple display support for TTS service

#### Media

  - audiod
    - Added support for dynamic loading of module-alsa-sink on the default sound card
    - Added support for identification of the default BT adapter
    - Implemented dynamic audio policy based on priority and category
    - Implemented module based functionalities in audiod
    - Added setInputVolume, getInputVolume and getStreamStatus methods to audiod API
    - Implemented support for A2DP and HFP in audiod
    - Supported new ALSA card master controls in UMI for mute and volume
    - Supported new physical sink for headphone
    - Fixed media/setVolume API's  error response for "sessionId param not in range"
    - Added support for radio (FM, AM,  fm, am and hdradio streams

#### Notification

  - Notification Manager
    - Updated APIs to manage Toast.

#### System Services

  - Category "Session0" added for handling settings for display0
  - Category "Session1" added for handling settings for display1

#### Web Engine

  - Blink
    - Added app-shell multi-instance patches
    - Implemented MediaPlatformAPIWebOSGmp
    - Implemented crop and zoom for photo/video app

### Base Components

#### Connectivity

  - Connection Manager
    - Implemented to perform Wi-Fi scanning while tethering is enabled
    - Implemented getter/setter functions for max station count
    - Implemented additional Wi-Fi scan options

  - BlueZ
    - Upgraded to 5.54
    - Added cache delay reporting capability of remote SEID

#### Display

  - Qt
    - Upgraded to version 5.12.9

#### JS Service

  - Node.js
    - Node.js has been upgraded from v8.12.0 to v12.14.1

#### Media

  - Enabled hardware acceleration in Raspberry Pi 4
  - GStreamer
    - Ported and modified the patch files for gstreamer-omx, gstreamer-plugins-good, gstreamer-plugins-bad for GStreamer version 1.16.2
  - g-camera-pipeline
    - Enabled hardware encoding acceleration for webrtc streaming

### BSP

#### Connectivity

  - Bluetooth
    - Updated Bluetooth profiles - AVRCP, A2DP, GAP, PBAP and MAP clients
    - Added support for APIs
      - map: getMessageFilters, getStatus
      - avrcp: getNumberOfItems
      - gatt: openServer, closeServer, addService, removeService
    - Added new paramameter interfaceName for adapter/getStatus
    - Added multi session support for Bluetooth service
    - Integrated oFono and HFP services
    - Added multi-adapter support for AVRCP TG API and AVRCP CT search API
    - Added multi-adapter support in OPP and GATT profile

### Build System & SCM

#### Yocto

  - Yocto has been upgraded from 2.6 to 3.1.
  - Details of each build-webos releases are as follows:
    - Build 229
      - Yocto 2.7 Warrior upgrade build
    - Build 230
      - Yocto 3.0 Zeus upgrade build
    - Build 231
      - Yocto 3.1 Dunfell upgrade build

#### SCM

  - Generalized the naming of the bootfiles deploy directory
  - Added Gator as performance analyzer for webOS platform

## Fixed Issues

  - n/a

## Known Issues

  - The Enact browser won't be launched by using intent.
  - A popup for Volume app doesn't appear by a single swipe down action; the popup appears when users swipe down twice.
  - Creating a system alert notification fails if the *buttons* parameter is specified in the `createAlert` method of `com.webos.notification`.
  - The "SEND" button, which appears by clicking the "post resource" button in the client side of the IOTIVITY sample app, appears in an inappropriate position and the scroll bar doesn't move to the button by touch input.
