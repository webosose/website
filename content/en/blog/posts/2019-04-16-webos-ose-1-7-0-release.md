---
title: webOS OSE 1.7.0 Release
date: 2019-04-16
slug: webos-ose-1-7-0-release
posttype: release
toc: false
---

We are delighted to announce the major feature release of webOS Open Source Edition (OSE). This release includes the following new features:

* [Web engine upgrade to Chromium 68](#web-engine-upgrade-to-chromium-68)
* [Camera service & Camera pipeline](#camera-service-camera-pipeline)
* [Context Intent Manager & Workflow Designer](#context-intent-manager-workflow-designer)
* [Physical Device Manager](#physical-device-manager)
* [Virtual Keyboard](#virtual-keyboard)
* [Enhanced Enact Browser](#enhanced-enact-browser)

Please refer to the [release notes]({{< relref "webos-ose-1-7-0-release-notes" >}}) for more details on changes for this release.

{{< caution >}}
We strongly recommend that you use [build-webos](https://github.com/webosose/build-webos) of "builds/master/65" or above, because using the releases from "builds/master/56" to "builds/master/64" can cause build failure.
{{< /caution >}}

## Web engine upgrade to Chromium 68

The long-awaited web engine upgrade has finally arrived! The web engine of webOS OSE has been upgraded from Chromium 53 to Chromium 68.

With this change, webOS OSE provides enhanced performance for web functionality as well as improved web compatibility and security.

{{< note >}}
* Chromium 53 is now deprecated, so only way to use it is to use [build-webos](https://github.com/webosose/build-webos) up to "builds/master/55".
* From "builds/master/56" onward, Chromium 68 is the default web engine.
{{< /note >}}

## Camera service & Camera pipeline

From this release, webOS OSE supports camera functionality with Camera service and Camera pipeline (g-camera-pipeline).

**Camera service** includes support for various cameras and provides camera features available on the device. It also exposes APIs to the application to control camera. [`com.webos.service.camera2`]({{< relref "com-webos-service-camera2" >}}) is the LS2 API that provides an interface to interact with the hardware camera device.

Main features of Camera service are as follows:

* Providing camera preview buffers
* Capturing images
* Recording videos
* Setting camera-related properties on the device
* Setting the format of preview stream
* Retrieving the device information of connected cameras
* Data sharing to 3rd party services or apps

**g-camera-pipeline** is a GStreamer based component that supports camera preview, capture, and record functions on webOS OSE. Third party applications can access the camera preview data for further processing such as AI.

The features supported by g-camera-pipeline are as below:

* Camera preview
* Image capture
* Video record

Common specifications are as follows:

* Cameras from various manufacturers including LG Electronics, Logitech, and Microsoft are supported.
* Captured image format: JPEG
* Recorded video format: TS (H.264)
* Preview stream format: MJPEG, H.264

## Context Intent Manager & Workflow Designer

To facilitate the development of context-aware applications, webOS OSE adds Context Intent Manager and Workflow Designer, which are based on [Node-RED](https://nodered.org/).

**Context Intent Manager (CIM)** is a high-level application framework that enables developers to develop context-aware applications. CIM abstracts an application from data collection and processing. In addition, CIM provides a rule-based system to make use of AI engine data and perform an action according to the derived context. Rules or "workflow" can be defined via an interface tool called Workflow Designer. The LS2 API for CIM is [`com.webos.service.contextintentmgr`]({{< relref "com-webos-service-contextintentmgr" >}}).

**Workflow Designer** is a GUI-based utility that provides a flow-based programming environment. Workflow Designer allows you to add AI logic to your web app, without actually modifying its source code. This makes your web app context-aware and therefore provides a better experience to your customers. For example, without updating any code of your app, you can configure it to perform operations on voice instructions.

Workflow Designer provides the following core benefits:

* It reduces time spent in developing AI logic in the web app.
* Developer does not need in-depth understanding of AI engines.
* Code size and complexity are not increased.

Visit [Workflow Designer]({{< relref "workflow-designer-user-guide" >}}) page to download the package and find out how to use the toolkit along with CIM.

## Physical Device Manager

From this release, **Physical Device Manager (PDM)** has been added. PDM is responsible for detecting, controlling, and managing physical devices. The LS2 API for PDM is [`com.webos.service.pdm`]({{< relref "com-webos-service-pdm" >}}).

Three main tasks of PDM service can be outlined as below:

* Detects and controls attached physical devices (USB devices)
* Notifies the user of the events from connected USB devices
* Provides an interface to manage externally connected physical devices

PDM currently supports a set of devices listed below.

* Storage devices
    * Storage USB
    * USB hub
    * HDD
    * Memory card reader
* Non-storage devices
    * HID: Keyboard/Mouse
    * Picture Transfer Protocol (PTP) devices
    * Media Transfer Protocol (MTP) devices

## Virtual Keyboard

This release adds the **Virtual Keyboard (VKB)** feature, which supports 64 languages including Chinese. For Chinese, both Traditional (Cangjie and Zhuyin) and Simplified (Pinyin and Stroke) Chinese keyboards are supported.

In addition, word frequency based predictions and user-defined predictions are supported for English and Korean languages.

## Enhanced Enact Browser

Several enhancements have been made to Enact browser in terms of internationalization and bookmark-related features. Also, there are more updates and bug fixes for Enact browser, so check the [release notes]({{< relref "webos-ose-1-7-0-release-notes" >}}) for more information.
