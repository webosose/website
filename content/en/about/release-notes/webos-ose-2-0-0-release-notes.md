---
title: webOS OSE 2.0.0
display_title: webOS OSE 2.0.0 Release Notes
date: 2019-10-29
weight: 14
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #92 to build #130.

## New and Changed Features

### Core Applications

- System UI
    - New Home Launcher has been implemented.
- Sample Apps
    - URL of the YouTube app has been changed from *youtube.com/tv* to *youtube.com*.
    - Touch scroll support has been added to YouTube app.

### Application Framework

- Web app framework
    - Enact framework has been upgraded to 3.0.0.
    - Enact devtools has been updated to 2.5.1.

### Managers & Services

- Display
    - Dual-display support has been implemented.
    - Display affinity support for web apps has been added.
- Connectivity
    - SoftAP has been implemented.
- Intelligence
    - Context Intent Manager (CIM) service is now run as a privileged service, which is allowed to register apps on their behalf and apply the apps roles.
- SW Update (FOTA)
    - SW Updater has been added.

### Base Components

- Display
    - Qt has been upgraded to 5.12.3.
- Web Engine
    - Web Engine has been upgraded to Chromium 72.
- SW Update (FOTA)
    - libostree has been added.

### BSP & Kernel

- Kernel core
    - linux-raspberrypi has been upgraded to 4.19.58.
- Security
    - Smack has been integrated.
    - openssl has been upgraded to 1.1.1b.

### Build System & SCM

- Target device
    - Raspberry Pi 4 has been added to the supported machine type.
- Containerization
    - Containerization using Docker has been enabled, with the addition of *meta-webos-virtualization* metalayer.

## Fixed Issues

- VirtualBox Emulator
    - Supports audio output.
    - Supports audio recording using the internal and external mic.

## Known Issues

- After an app is installed, Home Launcher is hung up.
- HW media decoding is not working, so all the web media is played by SW decoding on Chromium.
- Camera Service is not working due to the change to SW decoding.
- When both YouTube app and the browser are playing videos and one of the apps goes to the background, audio playback is mixed.
- VirtualBox Emulator does not support dual display and touch input.
