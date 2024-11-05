---
title: webOS OSE 2.27.0 Release
date: 2024-11-05
slug: webos-ose-2-27-0-release
posttype: release
toc: true
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.27.0.

The highlights of this release are as follows:

- [Migrating to a Browser Shell-Based Browser](#migrating-to-a-browser-shell-based-browser)
- [Enhancing PWA Usability](#enhancing-pwa-usability)
- [Changing the File Extension of Build Images](#changing-the-file-extension-of-build-images)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-27-0-release-notes).

## Migrating to a Browser Shell-Based Browser

With the support for Chromium version 120 in OSE, we have transitioned from an app shell-based browser to a browser shell-based browser. This change enhances the overall functionality and flexibility of the browser.

## Enhancing PWA Usability

In the previous release, Progressive Web Application (PWA) was introduced to OSE, allowing users to install their favorite websites in the form of an app. In this release, we have added several useful features to PWA, making it more convenient for users:

- Implemented back and forward navigation
- Improved user-friendly scrolling
- Implemented push notification feature

## Changing the File Extension of Build Images

The file extension for emulator images are changed: `.wic.vmdk` -> `wic.vmdk.gz`.

This change make the build process more efficient.