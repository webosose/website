---
title: webOS OSE 1.4.1 Release Notes
date: 2018-11-28
weight: 6
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #36 to build #41.

## Changed Features

### Core Applications

* Enact Browser
    * Added a notification message which is displayed after a job is done.
    * Refactored message sending code to send different messages to the guest page.
    * Enabled a newtab option for launch param.
    * Wrapped all strings with $L to make iLib work.
    * Fixed the issue where the browser did not return to full-screen mode.
    * Implemented wrapper for `<webview>` 'dialog' event.
    * Added Dialog UI for alert, confirm, and prompt.
    * Added json files for enact browser Access Control Groups (ACG) prior to applying Chromium patch.

### Managers & Services

* Web App Manager (WAM)
    * Fixed wam and app-shell ACG for umediaclient.
* mojoservicelauncher
    * Applied a fix for starting services with a "run" method.

### Base Components

* Maliit framework
    * Removed qtdeclarative-plugins.
* pmtrace
    * Inactivated journald.
