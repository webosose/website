---
title: webOS OSE 2.22.0
display_title: webOS OSE 2.22.0 Release Notes
date: 2023-06-21
weight: 41
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #588 to build #608.

## New and Changed Features

### Core Applications

#### System

- Enact Browser
  - Added geolocation feature

### Application Framework

#### SDK

- Added webOS-specific data in sdkagent

#### Web

- Enact
  - Upgraded Enact CLI from v5.1.2 to v6.0.0
  - Upgraded the Sandstone library from v2.6.2 to v2.7.0
  - Upgraded the Enact framework from v4.5.1 to v4.7.0
  - Upgraded the Moonstone library from v4.5.0 to v4.5.3

### Managers & Services

#### App

- WAM
  - Unified error codes for several methods in `com.webos.service.webappmanager`
  - Replace `getCloseAppId` with `getManagerEvent`
- Changed access permissions of the following services to non-root:
  - `com.webos.service.activitymanager`

#### Media

- audiod
  - Add a new method: `com.webos.service.audio/getAudioEffectsStatus`
- Changed access permissions of the following services to non-root:
  - `com.webos.service.mediacontroller`
  - `com.webos.service.mediaindexer`
  - `com.webos.service.umediaserver`

#### Intelligence

- TTS Service
  - Fixed an issue where the previous TTS request still plays on the current TTS request

### Base Components

#### Display

- Qt
  - Upgraded Qt to v6.5.1

#### Media

- g-media-pipeline
  - Fixed an issue where YouTube videos are not playing in g-media-pipeline
- g-camera-pipeline
  - Fixed an issue where audio & video doesn't play properly on the emulator

#### Boot

- systemd
  - Changes the permission for `/media` (from `770` to `775`)

#### Web Engine

- Blink
  - Fixed an issue where the list scrolls even after the button is released
- Chromium
  - Upgrades webruntime to Chromium 108

### BSP

- Changes rootfs mount option not to load journal of ext4 file system

## Known Issues

- [The launchpad]({{< relref "webos-ose-ui-guide#launchpad" >}}) disappears after an app is added to [the app bar]({{< relref "webos-ose-ui-guide#app-bar" >}}). 
