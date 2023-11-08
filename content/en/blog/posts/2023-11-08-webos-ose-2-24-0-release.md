---
title: webOS OSE 2.24.0 Release
date: 2023-11-08
slug: webos-ose-2-24-0-release
posttype: release
toc: false
thumbnail: th-release-2-24-0-camera-preview.png
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.24.0.

The highlights of this release are as follows:

- [Eliminating Dependencies Between Media Services](#eliminating-dependencies-between-media-services)
  - [New Recording Service](#new-recording-service)
  - [Standalone Preview Functionality](#standalone-preview-functionality)
- [Upgrading Chromium to v108](#upgrading-chromium-to-v108)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-24-0-release-notes).

## Eliminating Dependencies Between Media Services

In this release, we eliminated dependencies between media services.

Until the previous version, developers have to call methods from multiples APIs to implement some media functionalities. This usage scenario was not quite user-friendly. So we refactored our media services, especially focused on eliminating dependencies between media services.

As a first step, we've added a new recording service and standalone preview functionality. See also related API references:

- [`com.webos.service.camera2`]({{< relref "com-webos-service-camera2" >}})
- [`com.webos.media`]({{< relref "com-webos-media" >}})
- [`com.webos.service.mediarecorder`]({{< relref "com-webos-service-mediarecorder" >}}) 

### New Recording Service

In this release, we've introduced a new API for media recording. [`com.webos.service.mediarecorder`]({{< relref "com-webos-service-mediarecorder" >}}) provides an interface to record in webOS devices.

### Standalone Preview Functionality

So far, developers have to use both [`com.webos.service.camera2`]({{< relref "com-webos-service-camera2" >}}) and [`com.webos.media`]({{< relref "com-webos-media" >}}) to implement camera preview functionality.

We refactored the media-related services, now developers only need one API (`com.webos.service.camera2`) to implement the preview functionality.

## Upgrading Chromium to v108

The web engine of webOS OSE has been upgraded from Chromium 94 to Chromium 108. See [Chromium branches](https://chromiumdash.appspot.com/branches) for more information.
