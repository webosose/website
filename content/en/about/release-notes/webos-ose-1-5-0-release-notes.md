---
title: webOS OSE 1.5.0 Release Notes
date: 2019-01-11
weight: 7
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #42 to build #49.

## New and Changed Features

### Managers & Services

* Bluetooth Manager
    * Added support for Bluetooth profiles (OPP, A2DP)
* audiod
    * Added support for Bluetooth audio

### Base Components

* BlueZ
    * Added support for Bluetooth profiles (OPP, A2DP)
* PulseAudio
    * Added support for Bluetooth audio

### BSP

* Bluetooth
    * Added support for Bluetooth profiles (OPP, A2DP)

## Fixed Issues

* Fixed an issue where Wi-Fi network does not switch to the selected network.
* Fixed an issue where, when trying to reconnect while using Wi-Fi, "Unable to connect to the network" pop-up appears instead of a password prompt.

## Known Issues

Regarding the Bluetooth audio support, the following issues exist.

* Dynamic routing (switching back and forth between speakers and A2DP-enabled Bluetooth device) is not supported while audio is being rendered.
* Audio rendering might stop randomly in Raspberry Pi while listening through a Bluetooth device. For technical details related to this issue, refer to the [known issue](https://github.com/webosose/pulseaudio-webos/wiki) on GitHub wiki.
