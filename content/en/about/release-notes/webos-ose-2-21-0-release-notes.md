---
title: webOS OSE 2.21.0
display_title: webOS OSE 2.21.0 Release Notes
date: 2023-04-27
weight: 40
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #561 to build #587.

## New and Changed Features

### Core Applications

#### System UI

- Status Bar
  - Fixed issues where the volume level and icon were not working properly
- App Bar
  - Fixed an issue where the white dot indicating the app is running was misaligned when using the Arabic language setting
  - Fixed an issue where the search bar was misaligned when using the Arabic language setting

#### System

- Settings
  - Fixed an issue where the month in the Time & Date menu was not changed properly
  - Fixed an issue where changed region was not updated on the secondary display
- Enact Browser
  - Supports PDF format viewer

#### Sample Apps

- MS Teams
  - Fixed an issue where the camera wasn't working properly

### Application Framework

#### SDK

- Fixed an issue where the `com.webos.service.sdkagent/collector/startOnBoot` method was not working properly

#### Web

- Enact
  - Updated Enact CLI from v5.1.0 to v5.1.2
  - Updated the Sandstone library from v2.5.2 to v2.6.2

### Managers & Services

#### App

- SAM
  - Added methods in the `com.webos.serivce.applicationmanager` API:
    - `/dev/close`
    - `/dev/managerInfo`
- Activity Manager
  - Resolved inconsistencies in the `com.webos.service.activitymanager` API

#### Media

- uMS
  - Resolved inconsistencies in the `com.webos.media` API
  - Resolved inconsistencies in the `com.webos.service.mediacontroller` API

#### Connectivity

- Location Manager
  - Fixed a crash in the mock location
- Bluetooth Manager
  - Resolved inconsistencies in the `com.webos.service.bluetooth2` API

#### Noficication

- Fixed an issue where alert pop-ups were not closed

#### Misc.

- System Service
  - luna-service2
    - Fixed an issue where debug dump files were stored in the `/tmp/` directory
  - Deprecated the `com.webos.service.power` API

#### External Device

- Added the `com.webos.service.pdm/mountandFullFsck` method

### Base Components

#### Media

- g-media-pipeline
  - Adds UnifiedSinkBin to support video rendering on multiple SoCs
- PulseAudio
  - Supports automatic gain control for microphone input
- g-camera-pipeline
  - Supports dynamic zoom and auto PTZ features for cameras

#### i18n / l10n

- iLib
  - Updated the version from v14.15.1 to v14.17.0

#### Web Engine

- Blink
  - Fixed an issue where a white screen was displayed when the user launched the Enact browser

## Known Issues

- In the YouTube app, the main page is loaded with invalid IP addresses.
- In the YouTube app, the playback doesn't start from the last keyframe position.
- Playing the following audio does not stop the previous audio.
