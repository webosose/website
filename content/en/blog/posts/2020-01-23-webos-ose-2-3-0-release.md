---
title: webOS OSE 2.3.0 Release
date: 2020-01-23
slug: webos-ose-2-3-0-release
posttype: release
toc: false
---

We're delighted to announce the release of webOS Open Source Edition (OSE) 2.3.0.

The highlights of this release are as follows:

  - [Enact framework and Enact Browser upgrade](#enact-framework-and-enact-browser-upgrade)
  - [Web engine update for multi-input support](#web-engine-update-for-multi-input-support)
  - [Other enhancements](#other-enhancements)

For more details on this release, see the [release notes]({{< relref "webos-ose-2-3-0-release-notes" >}}).

## Enact framework and Enact Browser upgrade

Enact framework has been upgraded to 3.2.5. See the [release page](https://github.com/enactjs/enact/releases/tag/3.2.5) for details.

Along with that, Enact Browser has been migrated to Enact 3.2.5, which is a huge upgrade from the previous version that used Enact 2.0.0-rc1. Other feature updates for Enact Browser include the following:

  - Support HTTP authentication
  - Show a loading indicator while a web page is loading
  - Support multi-resolution
  - Fix reported bugs

## Web engine update for multi-input support

To allow for better use of dual-display environment, Chromium web engine has been updated with the following features:

  - Multi-VKB (Virtual Keyboard) support for web apps, which means VKB can be displayed on each display.
  - Full support for multi-touch on web apps, which would enable a user to control web apps on each display individually with touch events.

## Other enhancements

This release also includes many bug fixes as well as improvements for performance and stability. Check the [release notes]({{< relref "webos-ose-2-3-0-release-notes" >}}) to find out more about the changes.
