---
title: webOS OSE 2.3.0 Release Notes
date: 2020-01-23
weight: 17
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #144 to build #154.

## New and Changed Features

### Core Applications

#### System Apps

  - Enact Browser
      - Migrated to Enact framework 3.2.5.
      - Displays a loading indicator instead of favicon while a web page is loading.
      - Updates the date and time in the History view to localized format according to the system language setting, instead of US locale format.

### Application Framework

#### Web App Framework

  - Enact framework
      - Upgraded to 3.2.5.

### Managers & Services

#### Application Management

  - SAM (System & Application Manager)
      - The codebase to support multiple instances has been merged.
  - Memory Manager
      - Changed to be aware of multiple instances.
  - appinstalld2
      - Creates client permission file and role file when installing native apps.

### Base Components

#### Web Engine

  - Chromium
      - Supports multi-VKB for web apps.
      - Fully supports multi-touch on web apps.

## Fixed Issues

  - YouTube app
      - Fixed an issue where the settings pop-up menu flickers when the progress bar is hovered over or some setting value is changed.

## Known Issues

  - While booting, a light-purple background is displayed briefly before Home Launcher shows up.
  - In VirtualBox Emulator, the audio from YouTube app is not output for a non-Bluetooth audio device.
