---
title: webOS OSE 2.11.0
display_title: webOS OSE 2.11.0 Release Notes
date: 2021-06-25
weight: 25
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #326 to build #361.

## New and Changed Features

### ACG Migration

- Updated ACG permissions account service and settings service.

### Core Applications

#### System UI

- Notification
  - Fixed issue that toast message is not appearing.

#### System

- Settings
  - Updated resources folder.
#### Sample Apps

- Added Image Viewer.
- Media Gallery
  - Updated to show empty image when preview cannot be loaded.
  - Added functionalities to launch video player with selected video info.
- Video Player
  - Fixed static issues.
  - Fixed issues related to calling parameters used when Video Player is called in Media Gallery Application.
- Added functionality to generate api.json and group.json files for External JS Service dynamically.

### Application Framework

#### SDK

- Emulator
  - Updated restrict cdc_ether not to load for qemu machines.
- CLI
  - Deleted `start-devmode.sh` call from `devmode.sh`.

#### Web

- Enact
  - Added the required permission for mediacontroller to Enact browser app.
  - Replaced `enact-typedef.js` with `jsdoc-to-ts` module.
  - Replaced `enact-override.js` with Enact CLI commands.
  - Fixed issues that Enact browser is automatically closed while changing the language.
  - Added defensive codes for `npm install` in Enact CLI.

### Managers & Services

#### App

- SAM
  - Supported architecture registration with a given priority in the `arch.conf` file.

#### Media

- Added status notification for the media indexer.
- Enabled qt5-multimedia-plugin.
- Fixed passing bitrate to encoder pipeline in mcil and resolution issue when using HW Encoder for WebRTC.
- audiod
  - Fixed Bluetooth audio issues.

#### Connectivity

- Bluetooth
  - Added new methods to `com.webos.service.bluetooth2` API: `onOff/set`, `getMeshInfo`, `config/getCompositionData`.

#### External Devices

- Updated copy & move operations Storage Access Framework (SAF).
- Supported for SAMBA and UPnP in SAF.
- Support SAF feature in Emulator.
- Added UART communication, UWB native service, and Luna APIs for UWB.

### Base Components

#### Bus

- LS2
  - Supported LS2 for 64-bit arch.
  - Added functionalities to check Null for the `LSMessageGetSenderServiceName` return.

#### i18n/l10n

- Removed Icelandic from `locale.json`.

#### Diagnostics

- Upgraded Fluent Bit from v.1.3.5 to v1.7.4.
- crashd
  - Handled the launch of main Panel after Removing USB (crash-report)
- rdxd
  - Restored RDX services.

#### Connectivity

- ConnMan
  - Fixed crash issues
- BlueZ
  - Updated kernel configuration and enabled mesh profile in bluez 5.55.

### Build System & SCM

#### Yocto

  - Upgraded to the latest revision from Yocto Dunfell 3.1

## Fixed Issues

- Fixed UI issues related to language setting.
- Fixed an issue related to playing video on web pages.
- Fixed build issue related to `com.sample.waylandegl`.

## Known Issues.

- n/a
