---
title: webOS OSE 2.16.0 Release
date: 2022-05-11
slug: webos-ose-2-16-0-release
posttype: release
toc: false
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.16.0.

The highlights of this release are as follows:

  - [Qt 6.3 Update](#qt-6-3-update)
  - [Streaming Playback Support](#streaming-playback-support)
  - [HDMI-CEC Support](#hdmi-cec-support)
  - [Allow/Block URL List and Cookie Management in Enact Browser](#allow-block-url-list-and-cookie-management-in-enact-browser)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-16-0-release-notes).

## Qt 6.3 Update

webOS OSE has updated its Qt version to 6.3. For more information about Qt 6.3 release, see [Qt 6.3 Released](https://www.qt.io/blog/qt-6.3-released) on the Qt website.

## Streaming Playback Support

Streaming is now available in webOS OSE. The streaming playback feature allows media content to be played without actually downloading the entire content. This feature enhances user experience by improving streaming performance and reducing the buffer preparation time to start playback. The streaming playback feature of webOS OSE supports UDP, RTP and RTSP protocols.

## HDMI-CEC Support

webOS OSE has included support for HDMI-CEC. High-Definition Multimedia Interface (HDMI) Consumer Electronics Control or HDMI-CEC is a feature of HDMI that enables CEC supported devices to be controlled by a single remote controller. With this feature enabled in the Raspberry Pi 4 images, developers can control connected HDMI-CEC devices with the provided com.webos.service.cec API.

## Allow/Block URL list and Cookie Management in Enact Browser

The cookie management feature for Enact browser has been implemented. This feature includes the following implementations: enable/disable cookies to allow sites to save and read cookie data and enable/disable allowing third party cookies. Enact Browser now also provides the settings menu to control the list of allowed/blocked URLs.
