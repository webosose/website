---
title: webOS OSE 2.25.0
display_title: webOS OSE 2.25.0 Release Notes
date: 2024-01-17
weight: 44
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #660 to build #685.

## New and Changed Features

- Update the copyright information.

### Core Applications

#### System UI

- Home
  - Fixed a bug that caused VKB missing when the user is trying to submit a feedback.

#### System

- Enact Browser
  - Fixed a bug where VKB wasn't closed properly.
  - Fixed a bug where the webview wasn't focused properly.

#### Sample Apps

- Camera
  - Fixed a bug that caused duplicated resolutions in the dropdown menu.

### Managers & Services

#### App

- Memory Mgr.
  - Fixed a bug related to getMemoryStatus.

#### Display

- LSM
  - Removed a revert for supporting QT_IM_MODULE.
  - Fixed a bug where luna-send-pub was not working.
  - Fixed a bug where the backspace key in VKB worked as the back key.

#### Settings

- configd
  - Retired methods: `dump`, `fullDump`, `reloadConfigs`.

#### External Device

- PDM
  - Fixed a bug that caused sound issues.

### Base Components 

#### Display

- Qt
  - Upgraded Qt from v6.5.2 to v6.6.0.

#### Media

- g-media-pipeline
  - Fixed a bug that caused frame drop issue in WebEx with HW decoding.
- PulseAudio
  - Enabled to use multiple pre-processing effects for audio.
  - Added a new audio feature: bass boost.

#### i18n/l10n

- iLib
  - Upgraded loctool from v1.15.1 to [v1.15.4](https://github.com/iLib-js/ilib-loctool-webos-dist/releases/tag/v1.15.4).
  - Upgraded iLib from v14.18.0 to [v14.19.0](https://github.com/iLib-js/iLib/releases/tag/v14.19.0).

#### Web Engine

- Blink
  - Added the 'Reset Settings' feature.
  - Added the 'Pinch-to-zoom' feature in the content area.
  - Fixed a bug that caused an unresponsive popup to appear when a WebEx call was stopped.
  - Fixed minor bugs in WebCodecs in Chromium v108.
  - Change backend for WebRTC to VDA.

## Known issues

N/A