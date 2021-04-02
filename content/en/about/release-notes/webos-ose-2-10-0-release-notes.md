---
title: webOS OSE 2.10.0
display_title: webOS OSE 2.10.0 Release Notes
date: 2021-04-02
weight: 22
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #296 to build #325.

## New and Changed Features

### ACG Migration

- Fixed crash issues related to GSlice memory problem.
- Modified trustLevel syntax.
- Modified `.perm.json` files syntax.
- Migrated bugreportd to ACG model.
- Added ACG permission for the Test WebRTC app.

### Core Applications

#### Sample Apps

- Added a MediaGallery app. 

### Application Framework

#### SDK

- Released Command-Line Interface (CLI) 2.0.3.

### Manager & Services

#### App

- SAM
    - Added `.yaml` file for configd-data.

#### Display 

- LSM
    - Clean up unused files in maliit-framework-webos.
    - Fixed incorrect VKB position when the app sets it.
    - KeyboardView animation.
- Upgraded Qt version to v5.12.10.
- Updated initscripts for Qt and MaliitServer.

#### Media

- Camera Service
    - Added DMA buffer and POSIX support to camera framework.
- Audio
    - Added an API (`com.webos.service.audiofocusmanager`) that allows the user to control audio resources.
- Added common architecture framework in h/w accelerated encoding for WebRTC. 
- Added media codec interface for webRTC encoding.
- Fixed an issue that video loop in web browser only play once.

#### I18N

- Updated the latest version of loctool and plugins.
- Updated the system fonts.
- Fixed timezone issues.

#### Connectivity

- A2DP profile is now always connected with enabled UUID.
- Fixed issues related to A2DP ⬌ mobile connection.
- Added kernel config for VLAN and ethernet adapter.
- Supported multiple wired-ethernet interfaces

#### DB

- Migrated client permission of db8 to power2 service.
   
#### External Devices

- PDM
    - Fixed the user-based mount path.
    - Added access restriction to storage and non-storage devices based on the user.
    - Updated the separate PDM service files. 
- Added an API (`com.webos.service.storageaccess`) to support a unified interface for various storage systems.
- Added an API (`com.webos.service.peripheralmanager`) to support peripheral device connection. 

### Base Components

#### Boot

- bootd
    - Removed old API groups.

#### Web Engine

- Blink
    - Fixed a video info issue passing to `natural_video_size` callback. 
    - Removed dependency to `MACHINE` variable from mksnapshot-cross.
#### Connectivity

- ConnMan
    - Added P2P support.

#### JS Service

- Fixed crash issue when `index.js` is not placed in root folder.

### Build System & SCM

#### Yocto

- Updated to the latest revision from Yocto Dunfell 3.1.

## Fixed Issues

* n/a

## Known Issues

* n/a
