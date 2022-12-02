---
title: webOS OSE 2.18.0
display_title: webOS OSE 2.18.0 Release Notes
date: 2022-09-02
weight: 35
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/tags) from build #473 to build #496.

## New and Changed Features

### Core Applications

#### System UI

-   Added new home app delivery

#### System

-   Enact Browser
    -   Fixed the favicon fetch issue
    -   Modified not to display VKB that were displayed in previous sites in the next navigating sites
    -   Fixed popup reappears issue

#### Sample Apps

-   Camera
    -   Fixed text message issue

### Managers & Services

#### App

-   SAM
    -   Adjusted timeout for retrying to terminate running applications

#### Display

-   LSM
    -   Added support of RasterSurface type for qtwayland clients
    -   Added support of 4K resolution

#### Media

-   mediaindexer
    -   Fixed the issue that the image viewer application is not launched when a media file that doesn't exist is displayed

#### Settings

-   configd
    -   Enabled data collection pipeline

#### Misc.

-   System Service
    -   Added i2c/getPollingFd method in peripheralmanager.i2c.operation ACG group
-   unifiedsearch
    -   users/groups of some services changed to non-root
    -   Added some users and groups to support more strict DAC

### Base Components

#### Display

-   Qt
    -   Upgraded Qt to 6.3.1

#### Media

-   Enabled [Generic AV (GAV)](/blog/2020/07/16/webos-ose-2-6-0-release/#camera-framework-update-for-adopting-generic-av-architecture) support in the OSE emulator

-   Added gstreamer-bad plugin patches related to initial window size

-   Added video information message and disabled subsurface in subcompositor

-   Implemented to send prepare-seamless-seek custom event when non-flush trick 

-   Implemented changes for fixing setvolume failure and rtp playback failure

-   Added support for receiving key events

-   Modified to handle invalid argument exception thrown from stoll

-   Added GAV support in Chromium for gstreamer pipeline

-   Disabled media support in Chromium for emulator

#### i18n/l10n

-   Updated iLib and localization tool

#### Connectivity

-   Modified to use the same submission for all 3 DISTROs

#### Web Engine

-   Implemented malware site detection using Web Risk API

-   Added fix for receiving auth key in AES-CTR encrypted format

### Emulator

-   Fixed a prepare-system-dirs issue on emulator without serial setting

### Build System & SCM

-   Modified versioning policy of lsb-release

-   Modified Gator to build gator daemon only

-   Added new recipe to build gator kernel module only

-   Enabled Gator as Performance Analyzer for raspberrypi4-64

  

## Fixed Issues

-   Focus is not moved to the next page and the image list for the selected category is not shown in the gallery app.
-   On some occasions, the settings screen is abruptly closed.
-   Favicons are not displayed for some websites.

## Known Issues

-   Sound output is not available when using the gallery app.
-   VKB layout becomes smaller before closing.
-   VKB is not dismissed when the UP key is pressed multiple times.
-   Users cannot play back and search for recorded images through the camera app.
-   When playing video content with Enact Browser in a dual display environment, HTML5 video played in the first tab continuous to play and its sound is heard even after opening the second tab.
  