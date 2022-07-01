---
title: webOS OSE 2.17.0
display_title: webOS OSE 2.17.0 Release Notes
date: 2022-07-01
weight: 24
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #457 to build #472.

## New and Changed Features

### Core Applications

#### System UI

- Home Launcher
    - Fixed app list delay in the launcher
    - Fixed Home app relaunch issue

#### System

- Settings
    - Fixed the issue that the Time and Date page is not shown
    - Fixed the time zone loading issue
- Enact Browser
    - Updated to handle virtual keyboard (VKB) Enter key in the input box

### Managers & Services

#### App
- SAM
    - Added response for multiple attempts of `registerApp` method

#### Display

- LSM
    - Added support of legacy adaptive update for the emulator
    - Fixed video rect calculation

#### Media

- audiod
    - Upgraded PulseAudio version from 9.0 to 15.0

#### Notification

- Notification Manager
    - Fixed Popup abnormal behavior

#### Intelligence

- AI Service
    - Added webOS Edge AI Framework libraries
    - Hardware-accelerated TensorflowLite-based  Deep Learning Inerference Framework
    - Arm Compute Library, ArmNN and OpenCV for DNN
    - EdgeAI Vision Library v1.0 (Face detetection, Pose detection, Object segmentation suppot)

### Base Components

#### i18n/l10n

- iLib
    - Updated the latest version of loctool and plugins

### Emulator

- Added 802.1Q in kernel configuration to support vlan for OSE emulator
- Added event-device-creator to OSE emulator

### Build System & SCM

- Removed the meta-python2 layer
- Removed the data collection pipeline
- Upgraded the docker-moby package and its dependent packages

## Fixed Issues

-   n/a

## Known Issues

- Sound output is not available when using the gallery app.
- Focus is not moved to the next page and the image list for the selected category is not shown in the gallery app.
- On some occasions, the settings screen is abruptly closed.
- Favicons are not displayed for some websites.
  