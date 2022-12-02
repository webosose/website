---
title: webOS OSE 2.6.0 Release
date: 2020-07-20
slug: webos-ose-2-6-0-release
posttype: release
toc: false
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.6.0.

The highlights of this release are as follows:

  - [Camera framework update for adopting generic AV architecture](#camera-framework-update-for-adopting-generic-av-architecture)
  - [Qt upgrade to 5.12.8](#qt-version-upgrade)
  - [JavaScript based localization tool](#javascript-based-localization-tool)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-6-0-release-notes).

## Camera framework update for adopting generic AV architecture

The camera pipeline (g-camera-pipeline) of webOS OSE has been updated to adopt the generic AV (GAV) architecture in its operation. As the media framework (uMediaServer or uMS) was already adapted to GAV, this update makes the camera pipeline to be fully functional under the GAV architecture.

The updated camera pipeline supports the following features:

  - Using camera preview, capture and record functions
    - Preview stream format: MJPEG, H.264
    - Captured image format: JPEG
    - Recorded video format: TS (H.264)
  - Using USB cameras with [v4l2](https://www.kernel.org/doc/html/v4.10/media/kapi/v4l2-core.html) on Raspberry Pi 4

## Qt version upgrade

One of the major open source components of webOS OSE, Qt, has been upgraded from 5.12.6 to 5.12.8 to improve graphics performance and stability.

## JavaScript based localization tool

webOS OSE's localization tool has been replaced with a new JavaScript based tool. The new localization tool is based on [loctool](https://github.com/iLib-js/loctool/blob/development/README.md) and is available at the [ilib-loctool-webos-dist](https://github.com/iLib-js/ilib-loctool-webos-dist) repository. This tool can be used to generate translated resources by running the tool manually, during build time or as a background process in your CI pipeline.
