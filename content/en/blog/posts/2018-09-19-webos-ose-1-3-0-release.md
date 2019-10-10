---
title: webOS OSE 1.3.0 Release
date: 2018-09-19
slug: webos-ose-1-3-0-release
posttype: release
toc: false
---

We are pleased to announce the release of the following two major features.

* [Enact browser](#enact-browser)
* [H/W Accelerated URI/MSE Playback](#h-w-accelerated-uri-mse-playback)

## Enact browser

**Enact browser** is a web browser for webOS OSE. The browser is composed of two parts:

1. Platform agnostic browser UI written on top of [Enact](https://enactjs.com) framework
2. A separate JS library to support webview component, data binding, tab management policy, and platform-specific integration

Key features of Enact browser are as follows:

* Basic navigation using address bar and backward/forward button
* History
* Bookmark
* Most visited sites
* Recently closed sites
* Preferences
* Startup page selection
* Search engine selection
* Some customized layout options

For detailed information, check the [README](https://github.com/webosose/com.webos.app.enactbrowser/blob/master/README.md) of Enact browser on GitHub.

## H/W Accelerated URI/MSE Playback

This release includes **g-media-pipeline**, a new media pipeline for webOS OSE. g-media-pipeline is a [GStreamer](https://gstreamer.freedesktop.org/)-based media pipeline which supports URI playback and [Media Source Extensions](https://www.w3.org/TR/media-source/) (MSE) playback on webOS OSE.

The capabilities of g-media-pipeline are as follows:

* Supports H/W accelerated media playback for video encoded with H.264 codec
* Supports multiple media playback instances, if hardware resources are available
* Supports adaptive streaming both for URI playback and MSE playback
