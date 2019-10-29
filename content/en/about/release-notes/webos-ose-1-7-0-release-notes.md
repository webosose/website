---
title: webOS OSE 1.7.0 Release Notes
date: 2019-04-16
weight: 9
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #56 to build #69.

## New Features

### Application Framework

* SDK
    * Workflow Designer has been added.

### Managers & Services

* Media
    * Camera Service has been added.
* Internationalization/Localization (i18n/l10n)
    * Virtual Keyboard (VKB) has been added.
* Intelligence
    * Context Intent Manager (CIM) has been added.
* External Device
    * Physical Device Manager (PDM) has been added.

### Base Components

* Media
    * g-camera-pipeline has been added.

## Changed Features

### Core Applications

* Enact Browser
    * Added translation of tab titles for ‘New Tab’, ‘Bookmarks’, ‘History’, and ‘Setting’.
    * Implemented support for window.open() function.
    * Implemented a feature to fetch favicons based on link tags provided by sites.
    * Implemented a feature to show error pages for unresponsive sites.

### Base Components

* Web Engine
    * Web engine has been upgraded from Chromium 53 to Chromium 68.

## Fixed Issues

* Enact Browser
    * Fixed an issue where default bookmarks are reset when the browser restarts after clearing all bookmarks.
    * Fixed an issue where bookmarks are deleted incorrectly.
    * Fixed an issue where thumbnails are displayed abnormally for sites visited via Google search.
    * Fixed an issue where the last open tab is closed when the browser receives close event from a web page. (in order to keep at least one tab opened)
