---
title: Reference
section_main: true
date: 2019-10-11
weight: 40
---

You can build apps and services on webOS Open Source Edition (OSE) using the following APIs and libraries:

* [LS2 API](#ls2-api)
* [WebOSServiceBridge API](#webosservicebridge-api)
* [luna-service2 Library](#luna-service2-library)
* [webos-service Library](#webos-service-library)
* [pmloglib Library](#pmloglib-library)

## LS2 API

**LS2 API** is an interface to access system services via Luna Bus and use their functionalities. LS2 API forms the basis of webOS app and service development. See the [LS2 API index]({{< relref "ls2-api-index" >}}).

## WebOSServiceBridge API

**WebOSServiceBridge** is a JavaScript API for the web application to use LS2 API. See the [WebOSServiceBridge API reference]({{< relref "webosservicebridge-api-reference" >}}).

{{< note >}}
WebOSServiceBridge API is available only on webOS Open Source Edition (OSE) 2.0 or higher.
{{< /note >}}

## luna-service2 Library

**luna-service2** library provides a C/C++ API used by native apps and services in order to call LS2 API methods. See [luna-service2 Library API reference]({{< relref "luna-service2-library-api-reference" >}}).

## webos-service Library

**webos-service** library provides the API to the system bus wrapped in familiar Node.js idioms. See [webos-service Library API reference]({{< relref "webos-service-library-api-reference" >}}).

## pmloglib Library

**pmloglib** library provides the API for debugging, which allows you to trace and log the runtime status of apps or services. See [pmloglib Library API reference]({{< relref "pmloglib-library-api-reference" >}}).
