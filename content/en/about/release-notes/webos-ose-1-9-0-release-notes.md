---
title: webOS OSE 1.9.0
display_title: webOS OSE 1.9.0 Release Notes
date: 2019-06-26
weight: 11
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #80 to build #84.

## New and Changed Features

* Yocto has been upgraded from 2.2 to 2.6.
* Details of each [build-webos releases](https://github.com/webosose/build-webos/releases) are as follows:
    * Build 80
        - The last build based on Yocto 2.2. An entry point to "morty" branch.
        - This build includes changes needed for layerindex to properly parse "morty" branch of meta-webosose.
    * Build 81
        - Yocto 2.3 upgrade build. An entry point to "pyro" branch.
        - [Yocto Project 2.3 release notes](https://lists.yoctoproject.org/pipermail/yocto-announce/2017-May/000112.html)
    * Build 82
        - Yocto 2.4 upgrade build. An entry point to "rocko" branch.
        - [Yocto Project 2.4 release notes](https://lists.yoctoproject.org/pipermail/yocto-announce/2017-October/000125.html)
    * Build 83
        - Yocto 2.5 upgrade build. An entry point to "sumo" branch.
        - [Yocto Project 2.5 release notes](https://lists.yoctoproject.org/pipermail/yocto-announce/2018-May/000136.html)
    * Build 84
        - Yocto 2.6 upgrade build. An entry point to "thud" branch.
        - [Yocto Project 2.6 release notes](https://lists.yoctoproject.org/pipermail/yocto-announce/2018-November/000147.html)

### Base Components

* Base components have been upgraded in accordance with the Yocto upgrade.
* For details, refer to recipe upgrades in the Yocto Project release notes above.

### BSP

* BSP components have been upgraded in accordance with the Yocto upgrade, except for Wayland and Mesa (see Known Issues below).
* For details, refer to recipe upgrades in the Yocto Project release notes above.

### Kernel

* Kernel components have been upgraded in accordance with the Yocto upgrade.
* For details, refer to recipe upgrades in the Yocto Project release notes above.

## Known Issues

* BlueZ has been upgraded from 5.48 to 5.50. Due to this change, some features of GATT BT profiles are failing.
    * An RPi device with bluez upgraded to 5.50 is not getting discovered from another RPi device that runs on bluez 5.48 or bluez 5.50.
    * This RPi device can be discovered from an Android phone. So, failure is in RPi to RPi discovery.
    * Further steps for GATT connection, discovering services, reading or writing characteristics between RPi and RPi are blocked due to this.
* Wayland version is kept to 1.11 instead of the version specified in the recipe of Yocto 2.6 Thud.
* Mesa version is kept to 17.1.7 instead of the version specified in the recipe of Yocto 2.6 Thud.
    * The preferred version of Wayland and Mesa in Yocto 2.6 Thud are 1.16 and 18.1.9, but the build 84 is using 1.11 and 17.1.7 due to a dependency in a prebuilt binary gpu-libs.
