---
title: webOS OSE 2.2.0
display_title: webOS OSE 2.2.0 Release Notes
date: 2019-12-23
weight: 16
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #139 to build #143.

## New and Changed Features

### Core Applications

  - System apps
      - Settings app has been upgraded to use Enact framework 2.5.3.

### Application Framework

  - Web app framework
      - Enact framework has been upgraded to 3.2.4.
  - SDK
      - Camera service (`com.webos.service.camera2`) has been enabled on VirtualBox Emulator.

### Managers & Services

  - SW update
      - SW Updater service (`com.webos.service.swupdater`) has been added.

## Fixed Issues

  - Fixed an issue where, after installing an app, the app icon is not displayed on Home Launcher.
  - Fixed an issue where, when a Bluetooth headset or speaker is connected, the audio from YouTube app is not output in VirtualBox Emulator.

## Known Issues

  - In VirtualBox Emulator, the audio from YouTube app is not output for a non-Bluetooth audio device.
