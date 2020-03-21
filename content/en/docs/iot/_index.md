---
title: IoT
section_main: true
date: 2020-03-12
weight: 60
---

This section provides documentation for **webOS IoT**, the IoT profile of webOS Open Source Edition (OSE).

{{< note >}}
webOS IoT is supported by webOS OSE 2.4.0 or higher.
{{< /note >}}

* [Overview](#overview)
* [Setup](#setup)
* [Development](#development)
* [Tutorial](#tutorial)
* [Reference](#reference)
* [Tools](#tools)

## Overview

* [Introduction to webOS IoT]({{< relref "introduction-webos-iot" >}})

## Setup

This unit describes how to set up the webOS IoT development environment.

* [System Requirements]({{< relref "system-requirements-iot" >}})
* [Building webOS IoT]({{< relref "building-webos-iot" >}})
* [Flashing webOS IoT]({{< relref "flashing-webos-iot" >}})
* [Network Setup]({{< relref "setting-up-networking-iot" >}})
* [Google Assistant Setup]({{< relref "setting-up-google-assistant-iot" >}})

## Development

This unit explains how to develop services for webOS IoT. In addition, use cases of webOS IoT are provided.

* [JS Services]({{< relref "js-service-overview-iot" >}})
* [Use Cases]({{< relref "using-iotivity" >}})

## Tutorial

This unit provides a step-by-step tutorial for developing services for webOS IoT.

* [Developing JS Services]({{< relref "developing-js-services-iot" >}})

## Reference

### LS2 API

**LS2 API** is an interface to access system services via Luna Bus and use their functionalities. LS2 API forms the basis of webOS service development. See the [LS2 API index]({{< relref "ls2-api-index-iot" >}}).

### webos-service Library

**webos-service** library provides the API to the system bus wrapped in familiar Node.js idioms. See [webos-service Library API reference]({{< relref "webos-service-library-api-reference-iot" >}}).

## Tools

This unit describes how to use the tools available in webOS IoT.

* [luna-send]({{< relref "luna-send-iot" >}})
* [ls-monitor]({{< relref "ls-monitor-iot" >}})
