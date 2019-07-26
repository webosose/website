---
title: Overview
date: 2018-05-12
weight: 10
toc: true
---

This page explains general concepts related to web apps for webOS Open Source Edition (OSE).

Web apps built for a webOS device are similar to standard web apps that use web-based technologies like HTML, CSS, and JavaScript. Developers with experience in building web apps can easily start developing web apps for webOS OSE.

Let us understand some webOS-specific concepts regarding web apps.

## Web App Management

In a webOS system, the following components are related to web app management:

- **System and Application Manager (SAM)** oversees the behavior of apps and manages each app throughout its lifecycle, including the installation, launch, termination, and removal of the app.
- **Web Application Manager (WAM)** is responsible for launching and managing web apps.

For details, see [Architecture Overview]({{< relref "architecture-overview" >}}) and [Web App Lifecycle]({{< relref "web-app-lifecycle" >}}).

## Web App Types

In a webOS system, web apps are categorized by the packaging/delivery method as follows:

- **External Web App**
    - The web app is installed on the webOS target device.
    - This approach helps 3<sup>rd</sup> party developers to create a web app running on webOS devices.
- **Built-in Web App**
    - The web app is built into the webOS image.
    - This approach is used by platform developers and contributors to add a web app that enhances the functionality of the platform.

## Web App Framework

webOS OSE provides Enact, a React-based application framework optimized for webOS OSE. For developer guides and API reference of Enact, check the [project website](http://enactjs.com).
