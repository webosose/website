---
title: Architecture Overview
date: 2019-03-14
weight: 10
toc: true
---

The following figure shows the overall architecture of webOS Open Source Edition (OSE). webOS OSE consists of a set of layers: Core Applications, Application Framework, Managers & Services, Base Components, and BSP/Kernel.

{{< figure src="/images/docs/guides/core-topics/architecture/webos-ose-architecture-20191029.png" link="/images/docs/guides/core-topics/architecture/webos-ose-architecture-20191029.png" target="_blank" alt="webOS OSE architecture diagram showing its layer structure" caption="webOS OSE Architecture Overview" >}}

## Core Applications

webOS OSE has Core applications as the top layer and this layer includes System UI and System app.

  - System UI includes apps that are related to the basic user interface, such as Home Launcher and Notification. These apps are usually implemented using QML.

  - System app includes Settings app and web browser. Settings app is used to control the system properties and implemented using Enact. As a web browser, Enact browser is used.

## Application Framework

To help developers create better apps and services, webOS OSE provides enhanced options and environments compared to developing solely with HTML5, JavaScript, or CSS. The web app framework Enact and Software Development Kit (SDK) are provided.

### Enact

Enact is a web app framework optimized for developing web apps for webOS OSE. For more information and structure of Enact, refer to [Enact developer site](http://enactjs.com).

{{< note >}}
Enact is also an open source project and is provided separately from webOS OSE.
{{< /note >}}

### SDK

The SDK provides a development environment for web apps and services. The SDK for webOS OSE provides tools such as [Command-Line Interface]({{< relref "cli-user-guide" >}}), [Emulator]({{< relref "emulator-user-guide" >}}), [Beanviser]({{< relref "beanviser-user-guide" >}}), and [Workflow Designer]({{< relref "workflow-designer-user-guide" >}}).

## Managers & Services

Managers & Services layer includes the following key components.

### System and Application Manager

System and Application Manager (SAM) oversees the behavior of apps. SAM manages each app throughout its lifecycle, including the installation, launch, termination, and removal of the app.

There are two types of apps in webOS OSE: native app and web app. In case of a web app, actual launching and management are performed by Web Application Manager as described below.

### Web Application Manager

Web Application Manager (WAM) is responsible for launching and managing web apps. In addition, WAM performs CPU usage optimization, status monitoring and recovery processing, and access privileges management, all based on the running status of web apps.

### Activity Manager

Activity Manager is responsible for managing and executing activities requested from services. An activity is requested along with a specific condition, and it is triggered when the condition is met. You can configure the activity to perform tasks such as automatic execution of specific services, callback requests, and so on.

### Luna Surface Manager

Luna Surface Manager (LSM) is a component that works as a graphics and window manager. LSM displays graphical elements on the screen, manages the composition of these elements, and performs the event handling for input devices such as keyboard and pointer. LSM is also responsible for the management of System UI, such as Home Launcher and Notification. LSM is implemented using Qt, and System UI is implemented using QML.

### uMediaServer

uMediaServer (uMS) is a module that works as a server for the webOS media framework. uMS provides interfaces for media playback, manages resources, pipelines, and their policies, and manages the lifecycle of the media player.

### DB8

DB8 is an embedded JSON database that supports data storing and retrieving in the structure of a key-value store. webOS OSE uses LevelDB as the backend database. The default service associated with DB8 is `com.webos.service.db`. The `com.webos.service.tempdb` service, which allows you to configure temporary storage in memory, is also provided.

## Base Components

Base Components layer includes the following key components.

### LS2

LS2, also called Luna Bus, is a system bus used by webOS OSE as the IPC mechanism used between components in webOS. It is composed of:

  - **Client library** - Provides API support to register on the bus and communicate with other components.

  - **Central hub daemon** - Provides a central clearing house for all communication. Utilities for monitoring and debugging the bus are included.

For more information about LS2, see [Introduction to LS2 API]({{< relref "introduction-to-ls2-api" >}}).

### Web Engine

webOS OSE uses Chromium as the web engine. A web engine is the module that loads and parses a web app (or web page) consisting of HTML, CSS, and JavaScript, and performs all tasks required to represent the web app on the screen, such as layering and rendering. Currently the web runtime environment of webOS OSE is implemented according to the multi-process model of Chromium. Therefore, each web app is run as a separate independent process.

### Node.js

The service framework based on Node.js is provided so that you can implement services with JavaScript language. Node.js is a JavaScript framework that is typically run on a server. In webOS OSE, Node.js has been built in to facilitate service development. For more information on developing services based on Node.js, see [JS Services]({{< relref "js-service-overview" >}}).

## BSP/Kernel

BSP/Kernel layer consists of several components to support Raspberry Pi 4. Typically, it provides evdev for event processing, Mesa for graphics support, and 100Base-T, wpa_supplicant, and Bluetooth for connectivity.
