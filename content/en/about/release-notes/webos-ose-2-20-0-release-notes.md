---
title: webOS OSE 2.20.0
display_title: webOS OSE 2.20.0 Release Notes
date: 2023-02-17
weight: 38
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #528 to build #560.

## New and Changed Features

### Core Applications

#### System UI

- Home
  - Fixed an issue where the Enter key didn't work if the user activated the virtual keyboard multiple times

- Status Bar
  - Changed icons
  - Added a feature that connects Wi-Fi through the status bar

#### System

- Settings
  - You can now check a list of Wi-Fi ever connected.
  - Changed the UI framework to [Sandstone](https://enactjs.com/docs/modules/sandstone/ActionGuide/)

#### Sample Apps

- Displays a red indicator on WebEX browser tab to inform the user that the audio or video is in use
  
### Application Framework

#### SDK

- Added [telegraf](https://www.influxdata.com/time-series-platform/telegraf/) for resource monitoring
  - Added a new API to support telegraf service: `com.webos.service.sdkagent`

#### Web

- Enact
  - Updated Enact CLI from v5.0.2 to v5.1.0
  - Updated Enact framework from v4.5.0 to v4.5.1

### Managers & Services

#### App

- WAM
  - Fixed an issue where the primary display didn't show properly if the screen resolution of the primary display was larger than that of the secondary display
  - Fixed an issue where using a mouse in the secondary display made the Home app disappear
  - Fixed an issue where skipping videos using shortcuts (number keys + Enter keys) didn't work

- appinstalld2
  - Fixed an issue where the `com.webos.applicationService/remove` method didn't delete apps completely

#### Display

- LSM
  - Retired method: `com.webos.surfacemanager/closeByAppId`

#### Connectivity

- Network Mgr
  - Fixed an issue where the `com.webos.service.wifi/setstate` method didn't enable Wi-Fi
  - Fixed an issue where the `com.webos.service.wifi/tethering/getMaxStationCount` method didn't pass its return values
  - Retired API: `com.webos.service.uwb`

#### Misc.

- Sys Service
  - Reduced an initial delay when webOS OSE operates as a CEC (Consumer Electronics Control) client 

#### Intelligence

- AI Service
  - Updated tensorflow-lite to v2.9.3
  - Added an Auto Delegation library

#### External Device

- PDM
  - Fixed an issue where the `com.webos.service.pdm/getAttachedNonStorageDeviceList` method didn't pass its return values (`videoDeviceList` > `subDeviceList`)
  - Supports toast notifications when connecting/disconnecting HID and USB storage devices

### Base Components

#### i18n / l10n

- Updated localization tools' version

#### Connectivity

- ConnMan
  - Fixed an issue where mock GPS didn't work properly on the webOS OSE emulator
  - Fixed an issue where Wi-Fi was not connected using WEP (Wired Equivalent Privacy) protocol
  - Fixed an issue where the `com.webos.service.connectionmanager/getStatus` method didn't pass its return values (`proxyinfo`, `gateway`, `netmask`)

#### Web Engine

- Blink
  - Changed the default build option for webruntime and WAM to [Clang](https://clang.llvm.org/).

### Emulator

- Fixed an issue where HTML5 videos were not played in the emulator

### Build System & SCM

- Pre-built images are available. See [GitHub Releases](https://github.com/webosose/build-webos/releases).

### Others

- New shortcuts: 
  - Take a screenshot: `Ctrl` + `Alt` + `F9` (Stored in `/tmp/screenshots`)
  - Delete all screenshots: `Ctrl` + `Alt` + `F10`

## Known Issues

- The volume icon in the Status bar is not displayed as a muted icon when the volume level is zero.
- The volume level in the Status bar shows a wrong value after flashing a webOS OSE image.
- Videos and audio cannot be paused when the pause button is pressed through Bluetooth.
- White screen displays when the Web Browser app is launched.
