---
title: webOS OSE 2.5.0
display_title: webOS OSE 2.5.0 Release Notes
date: 2020-05-12
weight: 18
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #175 to build #197.

## New and Changed Features

### Application Framework

#### SDK

  - Released Command-Line Interface (CLI) 1.11.1.

### Managers & Services

#### Media

  - uMS
      - Enabled hardware acceleration based media pipeline for RPi4.
  - audiod
      - Enabled dual audio output through USB devices.

#### i18n/l10n

  - Added Georgian locale.

### Base Components

#### i18n/l10n

  - Upgraded the iLib library from v14.4.0 to v14.6.0.

### BSP

#### Connectivity

  - Added NYX GPS module.

## Fixed Issues

  - Fixed the issue that video frames are not visible in RPi4 .
  - Speeded up the ostree image booting time.
  - Changed `luna-init` to use Python 3 APIs instead, as Python 2.7 APIs are not supported anymore.
  - In qml-webos-framework, replaced `appId` with `LS2_NAME` and `displayAffinity` with `DISPLAY_ID` when launching qml-runner.

## Known Issues

  - `com.webos.service.ai.voice/getResponse` transits to the `answering` state twice when using Google Assistant API.
  - As the RPi4 kernel doesn't recognize a hard-disk of size 2TiB with NTFS filesystem, `com.webos.service.pdm/getAttachedStorageDeviceList` returns `"isMounted": false`.
  - The target device reboots if available memory is less than 7MB.
