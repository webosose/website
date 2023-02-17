---
title: webOS OSE 2.20.0 Release
date: 2023-02-17
slug: webos-ose-2-20-0-release
posttype: release
toc: false
thumbnail: th-release-2-20-0-sandstone-library.png
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.20.0.

The highlights of this release are as follows:

- [Pre-built Image Available on GitHub](#pre-built-image-available-on-github)
- [Updating System UI](#updating-system-ui)
- [Adding Shortcuts for Screenshot](#adding-shortcuts-for-screenshot)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-20-0-release-notes). 

## Pre-built Image Available on GitHub

Starting from this release, we provides pre-built images of webOS OSE platform (RPi4 64-bit, RPi4 64-bit devel, Emulator 64-bit, Emulator 64-bit devel) for every release.

We had published images with the help of [WebOS-Ports community](https://webos-ports.org/). (Thanks, WebOS-Ports!) But this was no longer feasible for our team. So we explored a new approach, and decided to publish using [GitHub Releases](https://github.com/webosose/build-webos/releases).

Pre-built images will be uploaded 2~3 days after the source codes are released on [our GitHub](https://github.com/webosose/build-webos/).

## Updating System UI

UI framework for System UI is changed from [Moonstone](https://enactjs.com/docs/modules/moonstone/BodyText/) to [Sandstone](https://enactjs.com/docs/modules/sandstone/ActionGuide/).

And from this version, you can check the list of known Wi-Fi ever connected. Check the Network menu of the Settings app.

{{< figure src="/images/blog/news/known-wifi-list.png" alt="A screenshot for known Wi-Fi list" >}}

## Adding Shortcuts for Screenshot

In this release, shortcuts for screenshot features are added.

- Take a screenshot: `Ctrl` + `Alt` + `F9` (Stored in `/tmp/screenshots`)
- Delete all screenshots: `Ctrl` + `Alt` + `F10`

You can also use the existing way using the `luna-send` command. See also the [captureCompositorOutput]({{< relref "com-webos-surfacemanager#capturecompositoroutput" >}}) method.

``` bash
luna-send -f -n 1 luna://com.webos.surfacemanager/captureCompositorOutput '{
  "format":"JPG",
  "displayId":0,
  "output":"/tmp/screenshots/example-screenshot.jpg"
}'
```
