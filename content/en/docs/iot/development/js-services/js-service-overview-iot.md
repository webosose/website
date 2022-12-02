---
title: Overview
date: 2022-12-02
weight: 10
toc: true
---

{{< caution >}}
webOS IoT is **ONLY** supported from webOS OSE 2.4.0 to webOS OSE 2.18.0. We plan to replace webOS IoT with [Matter](https://csa-iot.org/all-solutions/matter/) in the future release.
{{< /caution >}}

This page explains general concepts related to JavaScript services (JS services) for webOS IoT.

## Introduction

The typical characteristics of a JS service on webOS IoT are as follows:

- Written in JavaScript and created using Node.js.
- Runs in the background.
- Provides additional access to platform features such as low-level networking, file system access, and binary data processing.

