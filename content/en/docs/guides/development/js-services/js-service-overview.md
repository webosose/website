---
title: Overview
date: 2018-05-12
weight: 10
toc: true
---

This page explains general concepts related to JavaScript services (JS services) for webOS Open Source Edition (OSE).

## Introduction

JS services provide a way for apps to work, even when the application is not running. The typical characteristics of a JS service on webOS OSE are as follows:

- Written in JavaScript and created using Node.js.
- Runs in the background.
- Provides additional access to platform features such as low-level networking, file system access, and binary data processing. These features are normally not available to web apps.
- Performs tasks for one or more apps.

{{< note >}}
Node.js was originally created as a framework for server-side JavaScript applications. Services in webOS OSE are not quite like web application servers (in particular, because they don't stay running all the time), but the basic framework of an asynchronous I/O and network stack makes a lot of sense as an extension of the webOS app environment. You can find out more about Node.js at the [Node.js website](http://www.nodejs.org/).
{{< /note >}}

### Examples of JS Services

- Downloading attachments in the background for an email reader
- Uploading images to a picture-sharing website from an app
- Performing a long-running computation or file operation

## JS Service Types

In a webOS system, JS services are categorized by the packaging/delivery method as follows:

- **External JS Service**
    - The JS service is installed on the webOS target device.
    - This approach helps 3<sup>rd</sup> party developers to create a JS service running on webOS devices.
- **Built-in JS Service**
    - The JS service is built into the webOS image.
    - This approach is used by platform developers and contributors to add a JS service that enhances the functionality of the platform.

{{< note >}}
Currently, an external JS service must be packaged within a web app.
{{< /note >}}
