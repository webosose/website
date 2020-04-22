---
title: webOS OSE 1.4.0
display_title: webOS OSE 1.4.0 Release Notes
date: 2018-10-31
weight: 5
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #28 to build #35.

## New Features

### BSP/Kernel

* zram

## Changed Features

### Application Framework

* Web app framework
    * Updated Enact framework from v2.0.1 to v2.2.1.

### Base Components

* ROS2
    * Updated meta-ros2 to the latest revision.

## Fixed Issues

### Core Applications

* Enact Browser
    * Fixed an issue where the browser freezes with a black screen when loading websites.

### Managers & Services

* Luna Surface Manager (LSM)
    * Fixed an issue where Web App Manager (WAM) crashes after LSM is restarted.
* DB8
    * Updated memory management policy to fix the rebooting issue.
