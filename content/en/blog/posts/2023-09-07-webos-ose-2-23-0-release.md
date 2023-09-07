---
title: webOS OSE 2.23.0 Release
date: 2023-09-07
slug: webos-ose-2-23-0-release
posttype: release
toc: false
thumbnail: th-release-2-23-0-audio-equalizer.png
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.23.0.

The highlights of this release are as follows:

- [Supporting Audio Equalizer](#supporting-audio-equalizer)
- [Improving Web Risk API Design](#improving-web-risk-api-design)
- [Enact Upgrade](#enact-upgrade)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-23-0-release-notes).

## Supporting Audio Equalizer

In this release, an audio post-processing framweork is added. This framework supports the interactive audio, and audio post-processing algorithms. (e.g., equalizer)

For more information, see `setAudioEqualizerBandLevel` and `setAudioEqualizerPreset` methods in the [com.webos.service.audio API]({{< relref "com-webos-service-audio" >}}).

## Improving Web Risk API Design

The current design keeps [Web Risk](https://cloud.google.com/web-risk) hash prefixes of malicious sites in a file. This might lead to more memory consumption. From this release, the hash prefixes are stored in a local database to prevent the memory issue.

This update focuses on an internal platform usuability, and has no direct impact on user experience.

## Enact Upgrade

Enact libraries have been upgraded. See the following release pages for details:

- [Sandstone v2.7.3](https://github.com/enactjs/sandstone/releases/tag/2.7.3)
- [Enact CLI v6.0.1](https://github.com/enactjs/cli/releases/tag/6.0.1)
