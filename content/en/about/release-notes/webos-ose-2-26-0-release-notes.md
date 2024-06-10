---
title: webOS OSE 2.26.0
display_title: webOS OSE 2.26.0 Release Notes
date: 2024-06-05
weight: 45
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #686 to build #737.

## New and Changed Features

### Managers & Services

#### App

- SAM
  - Fixed inconsistencies between platform and API documentation.
- appinstalld2
  - Support Progressive Web App (PWA) installation.

#### Display

- LSM
  - Support secure rendering for dmabuf.

#### Media

- audiod
  - Fixed subscription returns of `controlPlayback` and `getPlaybackStatus` methods.

#### i18n/l10n

- Update Noto fonts for Unicode v15.1.

#### Misc.

- Power
  - Fixed inconsistencies between platform and API documentation.

#### External Device

- Storage access manager
  - Fixed a bug that caused mounting errors with the Samba server.

### Base Components

#### Media

- Support pause and audio-only recording.
- Support audio control features for short sound and system sound: stop, pause, resume, setup volume, mute, and unmute.
- GStreamer
  - Stop supporting GStreamer-based Neva MSE playback.
  - Implement UnifiedDecodebin in Rust language.

#### i18n/l10n

- iLib
  - Upgraded loctool from v1.15.4 to [v1.16.0](https://github.com/iLib-js/ilib-loctool-webos-dist/releases/tag/v1.16.0).
  - Upgraded iLib from v14.18.0 to [v14.20.0](https://github.com/iLib-js/iLib/releases/tag/v14.20.0).
  - Added a new [ilib-loctool-webos-dart plugin](https://www.npmjs.com/package/ilib-loctool-webos-dart/v/1.0.1) for the Dart file format localization.

#### Web Engine

- Blink
  - Support web push using the Google Firebase Cloud Messaging (FCM) server.
  - Support proxy feature for the Enact browser.

### Build System & SCM

- Upgrade lemon to v3.44.2 to fix an [issue reported from GitHub](https://github.com/webosose/meta-webosose/issues/27).
- Backport upstream changes for Yocto 5.0.
- Prohibit the use of DISTRO-related strings at component build.
- Limit the use of MACHINE-related strings to only when necessary.

## Known Issues

- When the user opens a WebEx URL in the secondary display, the URL is opened in the primary display.
