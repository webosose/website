---
title: webOS OSE 2.6.0
display_title: webOS OSE 2.6.0 Release Notes
date: 2020-07-20
weight: 20
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #198 to build #218.

## New and Changed Features

### Core Applications

#### System

  - Enact Browser
      - Modified the bookmark feature that users have an option whether to add a shortcuts app to the Home Launcher when adding a bookmark by tapping the star icon
      - Updated `package.json` dependencies to the latest version

#### System UI

  - Home Launcher
      - Added the feature to show a badge on a bookmark

### Application Framework

#### SDK

  - Released Command-Line Interface (CLI) 1.12.0

### Managers & Services

#### App

  - SAM
      - Modified to make it available to run a launcher on the primary display (HDMI0) and a bareapp on the secondary display (HDMI1)

#### Connectivity

  - Added the nmeaparser library
  - Added mock NMEA related changes in location service modules
  - Added the GPS mock nyx queryProviders command and improvement of GPS location data response

#### Display

  - LSM
      - Introduced new `WebOSCompositor` import scheme
      - Added a debug option to visualize the display boundary
      - Updated qtbase patches
      - Added an option for `MaliitServer` to disable LS2 service
      - Upgraded Qt to 5.12.8

#### i18n/l10n

  - Added a color font emoji

#### Media

  - Implemented the WebRTC hardware decoding pipeline
  - Added Generic AV migrated camera pipeline

#### Web Engine

  - Blink
      - Added display affinity to network settings parameters
      - Added the `webOSLocaleChange` event
      - Implemented the web media player and video decoder for WebRTC
      - Added the local storage manager feature
      - Added support for launching web apps on multiple displays with different resolutions

### Base Components

#### i18n/l10n

  - Replaced the localization tool

### Build System & SCM

#### OpenSSL

  - Updated to v1.1.1g

## Fixed Issues

  - n/a

## Known Issues

  - If Youtube playback speed is adjusted to other than normal speed, the loader spins continuously and the video won't play.
