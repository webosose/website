---
title: webOS OSE 2.23.0
display_title: webOS OSE 2.23.0 Release Notes
date: 2023-09-07
weight: 42
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #609 to build #636.

## New and Changed Features

### Core Applications

#### System

- Enact Browser
  - Fixed an issue where the last tab would not be closed

### Application Framework

#### SDK

- Telegraf
  - Added a procstat plugin to monitor process memory
  - Added a feature to monitor CPU usage and the list of PIDs

#### Web

- Enact
  - Upgraded Enact CLI from v6.0.0 to v6.0.1
  - Upgraded the Sandstone library from v2.7.0 to v2.7.3

### Managers & Services

#### Display

- LSM
  - Support graphic DRM
  - Update ACG configuration

#### Media

- audiod
  - Added Audio Post Processing framework to support various audio-related features

### Base components

#### Display

- Qt
  - Upgraded Qt from v6.5.1 to v6.5.2

#### Media

- g-media-pipeline
  - Fixed an issue where video was stopped on emulator if playback speed was changed
  - Converted unifiedsinkbin in Rust language
- g-camera-pipeline
  - Support RPi3 and qemu for g-camera-pipeline

#### i18n / l10n

- iLib
  - Upgraded the latest version of loctool and its plugins ([v1.14.0](https://github.com/iLib-js/ilib-loctool-webos-dist/releases/tag/v1.14.0))
  - Upgraded the iLib version from v14.17.0 to [v14.18.0](https://github.com/iLib-js/iLib/releases/tag/v14.18.0).

#### Web Engine

- Blink
  - Fixed an issue where touching an empty area didn't show an address list after entering another address in the address bar
  - Fixed an issue where the screen layout didn't responsively adjust while VKB was activated
  - Fixed an issue where tooltips for WebEx menus didn't show up on RPi 4
  - Support AVIF image format
  - Update ACG configuration
  - Improved design architecture of Web Risk API

### Build System & SCM

- Fixed an issue where `curl` was failed due to DNS errors

## Known Issues

- Black screens appear in displays when closing mirrored YouTube app.
- When the user tries to play YouTube video in one display, the other display's screen is displayed on the YouTube player.
