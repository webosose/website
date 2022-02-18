---
title: webOS OSE 2.9.0 Release
date: 2021-01-22
slug: webos-ose-2-9-0-release
posttype: release
toc: false
thumbnail: th-release-2-9-0-chromium-84.png
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.9.0.

The highlights of this release are as follows:

-   [Chromium 84 upgrade](#chromium-84-upgrade)
-   [Introducing `sysInfo` for monitoring memory usage](#introducing-sysinfo-for-monitoring-memory-usage)
-   [Unified search service](#unified-search-service)
-   [Implementing a Nyx module to integrate the GPS HW](#implementing-a-nyx-module-to-integrate-the-gps-hw)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-9-0-release-notes).

## Chromium 84 Upgrade

The web engine of webOS OSE has been upgraded from Chromium 79 to Chromium 84. This upgrade to a more up-to-date version includes major security and performance enhancements. Details of released features of each Chromium version are available on the [Chrome Platform Status](https://www.chromestatus.com/features) site.

## Introducing sysInfo for monitoring memory usage

webOS OSE hasn't provided a consistent way to monitor overall memory status. By utilizing the control groups feature of the Linux kernel, webOS OSE has implemented a memory accounting feature to define performance metrics and catch abnormal behaviors. The newly added method `sysInfo` of the memorymanager API shows the overall system memory status. See [its API Reference](/docs/reference/ls2-api/com-webos-service-memorymanager) for more details.

## Unified search service

Unified search service is a newly introduced search service to find various items. This service provides a search engine with all contents in the system and searches any items that reside inside "targets". Targets are applications, app contents, and plugins. It works tightly with intent to search items, and search results are provided in the form of intents. This helps users directly interact with their search results.

## Implementing a Nyx module to integrate the GPS HW

To provide better location service, webOS OSE implemented a Nyx module to integrate the GPS hardware. This implementation of a new Nyx device module is to retrieve GPS data from actual GPS devices.

  
