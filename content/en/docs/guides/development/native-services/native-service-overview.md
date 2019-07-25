---
title: Overview
date: 2018-05-12
weight: 10
toc: true
---

This page explains general concepts related to native services for webOS Open Source Edition (OSE).

## Introduction

Before we explain the creation of a native service, it is important to understand LS2.

LS2 provides a bus-based IPC mechanism used between components in webOS. It is composed of:

- **Client library**: Provides API support to register on the bus and communicate with other components. For details on the API provided by the client library, see [luna-service2 Library API reference]({{< relref "luna-service2-library-api-reference" >}}).
- **Central hub daemon**: Provides a central clearing house for all communication. Utilities for monitoring and debugging the bus are included.

{{< note >}}
Since LS2 is based on GLib, you need to understand GLib. For more information about GLib, see [GLib Reference Manual](https://developer.gnome.org/glib/).
{{< /note >}}

## Static and Dynamic Services

Depending on its registration on the LS2 bus, services can be categorized as static or dynamic services. This configuration can be done in the service configuration file.

- **Static services**
    - Most static services are started at boot time by systemd.
    - This is only an option for native services written in C/C++.
    - If the service crashes, the LS2 library will buffer requests to the service and deliver them to the service after it has restarted (assuming it is re-spawned by systemd).
    - If the service does not need to be running all the time, it is preferable to make it a dynamic service in order to save memory and reduce system load.
- **Dynamic services**
    - A dynamic service is one that is launched on demand. This "lazy launching" behavior allows us to improve boot time by staggering the launch of services and reduce the memory footprint by only running necessary services.
    - For example, if you create a dynamic service called **com.example.service.foo**, it will be automatically launched the first time someone attempts to send a message to it.
    - Furthermore, less critical services will often time out and exit after an extended period of inactivity.
