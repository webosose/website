---
title: webOS OSE 2.4.0 Release Notes
date: 2020-03-18
weight: 18
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #155 to build #174.

## New and Changed Features

### Managers & Services

#### Application Management

  - WAM (Web App Manager)
      - The `pauseApp` method has been added.

### Base Components

#### Display

  - Qt has been upgraded to 5.12.4.

#### Web Engine

  - Web Engine has been upgraded to Chromium 79.

### BSP & Kernel

#### Kernel core

  - linux-raspberrypi has been upgraded to 4.19.93.

### Build System & SCM

#### IoT profile

  - The script and layer to build the IoT profile (webOS IoT) have been added.

## Fixed Issues

  - Fixed an issue where, while booting, a light-purple background is displayed briefly before Home Launcher shows up.
  - Fixed an issue where, in VirtualBox Emulator, the audio from YouTube app is not output for a non-Bluetooth audio device.

## Known Issues

  - When using YouTube on the Enact Browser, after changing the subtitle language, the YouTube setting button becomes unresponsive.
  - After setting the menu language to Korean in the Settings app, the `navigator.language` property is retrieved as "en-US" instead of "ko-KR".
  - When the network setting is not properly done, the YouTube app is not launched instead of showing network error messages.
