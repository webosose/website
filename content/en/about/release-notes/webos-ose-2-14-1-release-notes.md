---
title: webOS OSE 2.14.1
display_title: webOS OSE 2.14.1 Release Notes
date: 2021-12-24
weight: 31
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #412 to build #419.

## New and Changed Features


### Application Framework

#### Web
  - Enact
	  - Updated to Enact 4.1.6

### Managers & Services

#### App
  - Memory Manager
	  - Modified the ratio calculation for swap space usage

#### Display
  - LSM
	  - Introduced an LSM testing framework
	  - Added support for the extra l10n file path for QML apps
	  
#### Media
  - audiod
	  - Added fixes for USB sound cards on the emulator

#### Notification
  - Notification Manager
	  - Updated `closeAlert` and `closeToast` methods of `notificationmgr` API to better handle storage device reconnections
	  
#### Misc.
  - System Service
	  - Added `softwareInfo` and `query` methods to `systemservice` API
	  - Updated `i2c/list` and `uart/read` methods of `peripheralmanager` API
	  
### Base Components

#### Display
  - Qt
	  - Updated to Qt 6.2.2

#### Media
  - g-camera-pipeline
	  - Fixed the preview flickering issue
	  - Updated to handle resolutions higher than 4k

#### i18n/l10n
  - iLib
	  - Updated the iLib version to 14.11.1
	  
#### Connectivity
  - Added occlientbasicops and ocserverbasicops binaries in Raspberry Pi 4 64-bit image
  - BlueZ
	  - Fixed the BLE mesh provision failure

## Fixed Issues

  - n/a

## Known Issues

  - n/a
