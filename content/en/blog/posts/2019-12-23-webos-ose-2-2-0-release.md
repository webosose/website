---
title: webOS OSE 2.2.0 Release
date: 2019-12-23
slug: webos-ose-2-2-0-release
posttype: release
toc: false
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.2.0.

The highlights of this release are as follows:

  - [SW Updater service](#sw-updater-service)
  - [Enact framework upgrade](#enact-framework-upgrade)
  - [VirtualBox Emulator enhancements](#virtualbox-emulator-enhancements)

For more details on this release, see the [release notes]({{< relref "webos-ose-2-2-0-release-notes" >}}).

## SW Updater service

In this release, **SW Updater service** (`com.webos.service.swupdater`) has been added. This service supports Firmware-Over-the-Air (FOTA) update functionality by communicating with the hawkBit server.

Eclipse hawkBit is an open-source backend framework for software update. SW Updater service acts as the hawkBit client, and provides methods that let you check the software update status and control the FOTA update.

To set up the hawkBit server, see [hawkBit documentation](https://www.eclipse.org/hawkbit/). To configure and use the hawkBit client on webOS OSE, see the com.webos.service.swupdater API reference.

{{< note >}}
The com.webos.service.swupdater API had retired in webOS OSE 2.16.0.
{{< /note >}}

## Enact framework upgrade

Enact framework has been upgraded from 3.0.0 to 3.2.4. This upgrade includes change of iLib dependency to v14.4.0, as well as many other improvements and bug fixes for frontend development.

See the following pages for details of this upgrade.

  - [Release 3.2.4](https://github.com/enactjs/enact/releases/tag/3.2.4)
  - [Release 3.2.3](https://github.com/enactjs/enact/releases/tag/3.2.3)
  - [Release 3.2.1](https://github.com/enactjs/enact/releases/tag/3.2.1)
  - [Release 3.2.0](https://github.com/enactjs/enact/releases/tag/3.2.0)
  - [Release 3.1.3](https://github.com/enactjs/enact/releases/tag/3.1.3)
  - [Release 3.1.2](https://github.com/enactjs/enact/releases/tag/3.1.2)
  - [Release 3.1.1](https://github.com/enactjs/enact/releases/tag/3.1.1)
  - [Release 3.1.0](https://github.com/enactjs/enact/releases/tag/3.1.0)
  - [Release 3.0.1](https://github.com/enactjs/enact/releases/tag/3.0.1)

## VirtualBox Emulator enhancements

This release also includes several enhancements for VirtualBox Emulator, as follows:

  - Camera Service (`com.webos.service.camera2`) has become available on VirtualBox Emulator. Now you can test apps or services with camera capabilities on VirtualBox Emulator as well.
  - There was an issue where the audio on YouTube app is not working in VirtualBox Emulator when a Bluetooth headset or speaker is connected. This issue has been fixed.
