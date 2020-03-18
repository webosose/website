---
title: Introduction
date: 2020-02-19
weight: 10
toc: true
---

**webOS IoT** is an IoT profile of webOS Open Source Edition (OSE), which can be used for devices without a display. webOS IoT image is built by aggregating the subset of webOS OSE components in order to support connectivity-related features while excluding display and multimedia capabilities.

Since webOS IoT does not include display components, webOS IoT does not have web-based or Qt-based application frameworks. Therefore, webOS IoT only supports development of Node.js-based services without UI requirements.

webOS IoT can be used as a base image if you consider a lightweight image for a device with sensors or if you need to run computation-heavy tasks such as AI in a device without a display. For example, if you consider using a small device with a temperature sensor or a particulate matter sensor attached, webOS IoT can be a good alternative for testing purpose. Other possible use cases include a simple AI speaker that integrates with Google Assistant or a device control and monitoring system based on IoTivity for device-to-device communication.

The environment for IoT device is transitioning from sensing and monitoring to more diverse features including edge AI processing. To meet those requirements, webOS IoT has been developed as a base image that provides the minimum basic features with a smaller image size. Depending on the community feedback, more features can be added to or removed from the future releases.

## webOS IoT Characteristics

* Small footprint
    * webOS IoT provides a small, light-weight image optimized for IoT-focused embedded systems without display requirements.
* Reuse of webOS OSE components
    * webOS IoT supports reuse of the existing webOS components by connection via Luna Bus.

## webOS IoT Features

Major features of webOS IoT are as follows:

* Connectivity service (except Bluetooth)
    * Supports connectivity services such as IP networking and Wi-Fi.
* Node.js
    * Supports execution of services in Node.js runtime environment.
* IoTivity
    * Supports IoTivity for device-to-device communication.
* Google Assistant
    * Supports voice AI functionality by integrating with Google Assistant.
