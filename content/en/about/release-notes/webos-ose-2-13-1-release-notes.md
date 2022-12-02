---
title: webOS OSE 2.13.1
display_title: webOS OSE 2.13.1 Release Notes
date: 2021-09-10
weight: 28
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #374 to build #386.

## New and Changed Features

### Application Framework

#### Web

- Enact
  - Updated to Enact 4.0.3

### Managers & Services

#### Display

- LSM
  - Added support for linux-dmabuf protocol in RPi4

#### Media

- audiod
  - Enabled audio routing through second display in OSE

#### Diagnostics

- rdxd
  - `com.webos.rdxd` API has been retired.
  
#### Connectivity

- Bluetooth Manager
  - Added support for BLE mesh API

### Base Components

#### Display

- Qt
  - Updated meta-qt6 to v6.2.0-beta3

#### Media

- g-camera-pipeline
  - Added g-camera-pipeline support in OSE emulator

#### i18n

  - Updated the latest version of loctool and plugins

## Fixed Issues

  - Fixed the issue that the Virtual Keyboard disappears when the ENG button touches input.
  - Fixed the issue that the Launcher App doesn't appear on the screen when running the Launcher by using a USB mouse.

## Known Issues

  - Google Assistant API doesn't work on some occasions.
