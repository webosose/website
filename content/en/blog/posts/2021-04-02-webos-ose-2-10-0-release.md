---
title: webOS OSE 2.10.0 Release
date: 2021-04-02
slug: webos-ose-2-10-0-release
posttype: release
toc: false
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.10.0.

The highlights of this release are as follows:

- [Storage access framework](#storage-access-framework)
- [Enabling cookie encryption of Blink](#enabling-cookie-encryption-of-blink)
- [Peripheral Manager service](#peripheral-manager-service)
- [ACG enhancements](#acg-enhancements)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-10-0-release-notes).

## Storage Access framework

**Storage Access** service provides a single interface to control various storages. Using this framework, user can browse and open documents, images or files from all configured storage providers with a standard, easy-to-use UI. See [its API Reference](/docs/reference/ls2-api/com-webos-service-memorymanager) for more details.

For now, Storage access framework supports the following storages:

* Internal storage
* USB Storage
* Cloud Storage (Google Drive)

## Enabling cookie encryption of Blink

Cookies store information for login and session between client and server. Unencrypted cookies might give attackers a chance to steal or use the information. In this release, users can use cookie encryption which protects user data from a platform security point of view.

## Peripheral Manager service

**Peripheral Manager** service is a newly introduced service to support various peripheral devices(GPIO, SPI, I2C, and UART). This service makes it easy to control peripheral devices without changing the platform source code. See [its API Reference](/docs/reference/ls2-api/com-webos-service-memorymanager) for more details.

## ACG enhancements

ACG (Access Control Groups) is security model that provides access control of security permissions for services running on Luna Bus. 

In this release,

* Migrate all pending services from the legacy security model.
* Change ACG syntax. For details, check the updated app/service development guides under the [Tutorials](/docs/tutorials/) section.
