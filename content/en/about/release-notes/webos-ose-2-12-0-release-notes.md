---
title: webOS OSE 2.12.0
display_title: webOS OSE 2.12.0 Release Notes
date: 2021-07-16
weight: 22
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) build #366.

## New and Changed Features

### Base Components

#### Display

- Qt
  - Upgraded Qt to 6.2 Alpha.

### Build System & SCM

#### Yocto

  - Upgraded to the latest revision from Yocto Dunfell 3.1.

## Fixed Issues

### Core Applications

#### Sample Apps

- Image Viewer
    - Fixed a typo in the app title.

### Base Components

#### Connectivity

- ConnMan
    - Fixed bug related to `p2p/findservice`.

## Known Issues

- "Google page" icon is not displayed in omnibox.
- VKB disappears when ENG button touches input.
- The Launcher App doesn't appear on the screen when running the Launcher by using a USB mouse.
