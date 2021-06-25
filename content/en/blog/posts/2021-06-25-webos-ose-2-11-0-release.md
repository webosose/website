---
title: webOS OSE 2.11.0 Release
date: 2021-06-25
slug: webos-ose-2-11-0-release
posttype: release
toc: false
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.11.0.

The highlights of this release are as follows:

- [Media Gallery Application](#media-gallery-application)
  - [Video Player](#video-player)
  - [Image Viewer](#image-viewer)
- [Enhancing WebRTC Support](#enhancing-webrtc-support)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-11-0-release-notes).

## Media Gallery Application

In this release, **Media Gallery Application** has been added. The application enables users to browse media files in USB Memory, local storage, and other USB devices using [com.webos.service.mediaindexer]({{< relref "com-webos-service-mediaindexer" >}}) API.

Key features of Media Gallery Application are as follows:

- Can list media files provided by MediaIndexer service
- Can scroll, check thumbnail provided by MediaIndexer service
- Can launch [Image Viewer](#image-viewer) or [Video Player](#video-player) by deeplink or intent manager
- Can launched by launcher/home

{{< caution >}}
This application must use the webOS OSE MediaIndexer service.
{{< /caution >}}

{{< figure src="/images/blog/news/media-gallery-application.jpg" alt="Media Gallery Application" caption="" >}}

### Video Player

**Video Player** application enables users to play video files in USB Memory, local storage, and other USB devices. 

Key features are as follows:

- Open and show videos.
- Navigate to next/previous videos.
- URI Playback (optional)
- Can called by MediaGallery application by deeplink or intent manager, or just launch independently from launcher.

### Image Viewer

**Image Viewer** application enables users to see image files in USB Memory, local storage, and other USB devices. 

Key features are as follows:

- Open and show images.
- Provide a slide-show view.
- Provide the detail information about images (with EXIF).
- Navigate to next/previous images.
- Can called by MediaGallery application by deeplink or intent manager, or just launch independently from launcher.

## Enhancing WebRTC Support

This release brings you a couple of enhancements in terms of the WebRTC capability.

- Enhance to the existing h/w accelerated encoding and decoding pipelines.
- Add support for accepting/denying permissions to access media devices such as camera and microphone.
