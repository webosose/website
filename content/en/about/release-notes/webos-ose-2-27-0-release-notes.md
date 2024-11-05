---
title: webOS OSE 2.27.0
display_title: webOS OSE 2.27.0 Release Notes
date: 2024-11-05
weight: 46
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #738 to build #799.

## New and Changed Features

### Core Applications

#### System

- Settings
  - Introduce `custom.js` for customizing color theme of the Settings app.
- Enact browser
  - Stabilize the code and fix minor bugs.

#### Sample Apps

- Fixed a bug where the video call app launched WebEx URLs on another display.

### Application Framework

#### Web

- Enact
  - Upgrade Enact CLI to v6.1.2.
  - Upgrade jsdoc-to-ts to v1.0.6.
  - Upgrade Sandstone v2.9.1.

### Managers & Services

#### App

- WAM
  - Apply C++20.

#### Display

- LSM
  - Fix the frame drop issue.

#### Media

- mediacontroller
  - Add a new method: `setSupportedAction`

#### Connectivity

- nettools
  - Refactor build process.

#### Misc.

- Sys Service
  - Remove Qt dependency from luna-sysservice.
- Peripheral Service
  - Remove the virtual UART Device.

#### External Device

- Fix crash issues in the storage access service.

### Base Components 

#### Display

- Qt
  - Upgrade Qt from v6.7.2.

#### Web Engine

- Replace the App Shell-based Enact browser with a Browser Shell-based browser.

#### performance

- Introduce polkit.

### BSP

#### Media

- Change PCM operation to non-atomic to prevent scheduling bug.

### Build System & SCM

- Fix a bug where a fetch process was failed (from https://freedesktop.org).
- Apply a memory leak patch for OpenSSL.
- Change the file extension of emulator images: `.wic.vmdk` > `.wic.vmdk.gz`

## Known Issues

N/A
