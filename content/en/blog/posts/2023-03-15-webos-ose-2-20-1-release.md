---
title: webOS OSE 2.20.1 Release
date: 2023-03-15
slug: webos-ose-2-20-1-release
posttype: release
toc: false
thumbnail: th-release.png
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.20.1.

See also the [release notes](/about/release-notes/webos-ose-2-20-1-release-notes).

## Fixing an NDK Installer Issue

In the previous release, several build failures were reported during [Native Development Kit (NDK) Setup]({{< relref "setting-up-native-development-kit" >}}).

This error occurred due to the option changes in NDK package generation, and we have fixed it in this release. To apply the hotfix patch, use the latest branch (`2.20`) when you build webOS OSE using the [`build-webos` repository](https://github.com/webosose/build-webos).
