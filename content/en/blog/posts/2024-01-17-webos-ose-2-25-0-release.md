---
title: webOS OSE 2.25.0 Release
date: 2024-01-17
slug: webos-ose-2-25-0-release
posttype: release
toc: false
thumbnail: th-release-2-25-0-base-enhancement.png
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.25.0.

The highlights of this release are as follows:

- [Improving Enact Browser UX](#improving-enact-browser-ux)
- [Enhancing Audio Environment](#enhancing-audio-environment)
  - [Audio Pre-processing Effect Chain](#audio-pre-processing-effect-chain)
  - [Bass Enhancement](#bass-enhancement)
- [Upgrading Qt](#upgrading-qt)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-25-0-release-notes).

## Improving Enact Browser UX

The user experience of a web browser is important because it directly affects how users interact with the internet and websites. In this release, we enhanced usability, performance, and efficiency of the browser.

- Support 'pinch-to-zoom' feature in the content area of a webview on touch screen.
- Add the 'Reset to Default Settings' option in the "Settings" page.
- Support custom user agent per domain to fix loading issue from the web server.

## Enhancing Audio Environment 

### Audio Pre-processing Effect Chain

From this version, webOS OSE supports multiple audio processing simultaneously. Developers can apply multiple audio pre-processing algorithms (such as beamforming, Echo Cancellation Noise Reduction (ECNR)).

### Bass Enhancement

Base enhancement algorithms and APIs are supported to provide a better audio experience. See [com.webos.service.audio]({{< relref "com-webos-service-audio" >}}).

## Upgrading Qt

Qt has been upgraded from v6.5.2 to v6.6.0 to improve graphics performance and stability. For more details about Qt, see the [official blog post](https://www.qt.io/blog/qt-6.6-released).
