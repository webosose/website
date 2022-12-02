---
title: webOS OSE 2.15.0
display_title: webOS OSE 2.15.0 Release Notes
date: 2022-02-18
weight: 32
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #420 to build #437.

## New and Changed Features

### Core Applications

#### System UI

  - Home Launcher
      - Added component/resource customization features for QML apps

#### System

  - Enact Browser
      - Fixed the issue where browsed websites being displayed multiple times in the history

### Application Framework

#### SDK

  - CLI
    - Updated to [v2.3.1](/docs/tools/sdk/cli/cli-release-notes/)

#### Web

  - Enact
      - Merged the fixed version of the sampler focusing

### Managers & Services

#### App

  - SAM
      - Included `com.webos.applicationManager` to allowed group names
      - Removed the `com.webos.lunasend` check step
  - Activity Manager
      - Added proxy call support
      - Adjusted the ACG permission of Activity Manager
  - WAM
      - Refactored WAM error pages
  - Memory Manager
      - Added memory check in the requireMemory

#### Display

  - LSM
      - Implemented the presentation time protocol in LSM
      - Removed DRM buffer support from Waylandsink
      - Improved Qt app rendering performance
      - Added mouse/keyboard support

#### Media

  - audiod
      - Added support for track volume

#### Intelligence

  - Context Intent Manager
      - Fixed Google Assistance's custom action that the fact generator node isn't able to launch YouTube app

#### Miscellaneous

  - bugreport
      - Updated the webosreporter password policy

### Base Components

#### i18n/l10n

  - iLib
      - Applied iLib v14.12.0

#### Web Engine

  - Chromium
      - Upgraded to v91
      - Modified Blink to show error pages only when errors are in the main frame
  - Implemented GPU vsync provider for Wayland
  - Fixed the issue where camera preview is not displayed on the screen

### Emulator

  - Enabled [oomd](http://manpages.ubuntu.com/manpages/impish/man1/oomd.1.html) in the kernel for OSE emulator
  - Enabled swap and zram for OSE emulator

## Fixed Issues

  - n/a

## Known Issues

  - The inclusion of keyboard and mouse support might have some side effects, which will be resolved in the future releases.
  