---
title: webOS OSE 2.24.0
display_title: webOS OSE 2.24.0 Release Notes
date: 2023-11-08
weight: 43
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #637 to build #659.

## New and Changed Features

### Core Applications

#### System

- Enact Browser
  - Fixed a bug that the URL of the address bar wasn't updated when navigating on Webview.

### Application Framework

#### SDK

- Emulator
  - Fixed a bug that caused build errors in Qt native application.

### Managers & Services

#### Service General

- Added missing API references for services that have been already implemented on the platform: [`com.palm.service.tellurium`]({{< relref "com-palm-service-tellurium" >}})

#### Display

- LSM
  - Fixed a bug where black screens appear when closing mirrored YouTube app.
  - Fixed a bug where cursor customizing won't work.

#### Media

- uMS
  - Fixed error code messages.
- audiod
  - Changed ACG names: `setSoundOutput`, `setSoundInput`.
- Camera Service
  - Fixed a bug where the camera component caused errors during the build time (32-bit).
  - Fixed a bug where webcams didn't provide stream data.
- Deleted the dependency between the camera service and uMediaServer service.
- Added a new service: [`com.webos.service.mediarecorder`](/docs/reference/ls2-api/com-webos-service-mediarecorder)

#### Misc.

- Sys. Service
  - Updated ACG of `com.webos.service.preference`.
  - Fixed a bug where the `Europe/Kyiv` timezone information is missing.

### Base Components 

#### Media

- GStreamer
  - Fixed a bug where the WebEx screen of the host was displayed as a gray box.
- g-camera-pipeline
  - Improved memory management.

#### i18n / l10n

- iLib
  - Upgraded the latest version of loctool and its plugins ([v1.15.1](https://github.com/iLib-js/ilib-loctool-webos-dist/releases/tag/v1.15.1)).
- Font
  - Updated system fonts for Dingbat and Bengali.

#### Diagnostics

- PmLog
  - Fixed a bug that caused permission errors.

#### Web Engine

- Chromium
  - Upgraded to v108.
- Blink
  - Fixed a bug that caused loading error in Web Browser app.

### Build System & SCM

- Fixed an issue on Qt 6.7.0 build.

## Known Issues

- Unresponsive popup is displaying when the user stop videos in WebEx.
- VKB is dismissed when the user touches VKB in feedback window.