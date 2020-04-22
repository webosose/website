---
title: webOS OSE 1.6.0
display_title: webOS OSE 1.6.0 Release Notes
date: 2019-03-11
weight: 8
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #50 to build #55.

## Breaking Changes

### Managers & Services

* Media
    * videooutputd has been added.
    * avoutputd has been retired.
    * uMediaServer (uMS) has been modified to use videooutputd instead of avoutputd for video control functionalities.

## New and Changed Features

### Managers & Services

* Text-to-Speech (TTS) Service
    * TTS Service has been added.
* Bluetooth Manager
    * AVRCP profile support (Target role only) has been added.

### Development Tool

* Internalization/Localization
    * The localization tool has been added.
