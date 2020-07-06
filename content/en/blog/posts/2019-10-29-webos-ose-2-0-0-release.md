---
title: webOS OSE 2.0.0 Release
date: 2019-10-29
slug: webos-ose-2-0-0-release
posttype: release
toc: false
---

We're so excited to announce the release of webOS Open Source Edition (OSE) 2.0.0! Not only is this a major release with brand-new features, it's also a huge leap towards a new vertical --- automotive.

To name a few among many upgrades and improvements, the gist of this release is as follows:

* [New reference hardware](#new-reference-hardware)
* [New reference UI/UX](#new-reference-ui-ux)
* [Dual-display support](#dual-display-support)
* [Firmware-Over-the-Air support](#firmware-over-the-air-support)
* [SoftAP support](#softap-support)
* [Smack integration](#smack-integration)
* [Upgrade to Qt 5.12 and Chromium 72](#upgrade-to-qt-5-12-and-chromium-72)

You can find a brief summary of the release at [webOS OSE 2.0 overview]({{< relref "webos-ose-2-0-overview" >}}). For more details on this release, refer to the [release notes]({{< relref "webos-ose-2-0-0-release-notes" >}}).

## New reference hardware

For the reference hardware, we're moving forward to the latest line of Raspberry Pi --- **Raspberry Pi 4**. With this change, you can build webOS OSE apps on a device with vast improvements, including:

* More powerful display and graphics
    - Dual displays through two micro HDMI ports
    - Enhanced graphics processing due to GPU upgrade
* Boost in connectivity
    - Fast networking with Gigabit Ethernet
    - Dual-band wireless LAN, and Bluetooth 5.0/BLE
* Better peripherals support
    - Two USB 3.0 ports in tandem with two USB 2.0 ports

For setting up a new environment for Raspberry Pi 4, check the updated [setup guides]({{< relref "system-requirements" >}}).

## New reference UI/UX

New reference UI/UX is optimized for touch input, and comes with restyled, card-view type Home Launcher. In addition, a quick access menu has been added, which provides shortcuts to the often used features such as notification and settings.

{{< note >}}
The quick access menu has been partially implemented, and missing features will be provided in the future release.
{{< /note >}}

## Dual Display Support

Dual display support is a preliminary step for multi-display support, which is essential for a rear seat entertainment (RSE) system. To see how to connect dual displays to Raspberry Pi 4, see [Dual-Display Setup Guide]({{< relref "setting-up-dual-displays" >}}).

Using dual display with Raspberry Pi 4, you can launch web apps on the secondary display as well as on the primary display. For details of how to launch web apps on the secondary display, see [Launching Web Apps for Dual Display]({{< relref "launching-web-apps-for-dual-display" >}}).

## Firmware-Over-the-Air support

**Firmware-Over-the-Air (FOTA)** is a technology that facilitates wireless firmware upgrade on a device. In an era of connected cars, FOTA is becoming a requirement in the automotive context.

This release provides a FOTA solution based on [libostree](https://ostree.readthedocs.io/en/latest/), an upgrade system for Linux-based operating systems that performs atomic upgrades of complete filesystem trees. For overview of the solution and how to set up FOTA, see [Firmware-Over-the-Air Setup Guide]({{< relref "setting-up-fota" >}}).

## SoftAP support

Tethering is the sharing of a device's Internet connection with other connected devices. Connection of a device with other devices can be done over wireless LAN (Wi-Fi) by using **SoftAP** technology, which is an abbreviated term for "software enabled access point".

This release adds tethering and SoftAP support to the connectivity features. In webOS OSE, [`com.webos.service.wifi`]({{< relref "com-webos-service-wifi" >}}) service provides the tethering and SoftAP technologies with APIs in the "tethering" category. If a device does not have any Internet connection, the tethering API only works as software access point for local area connections without internet access.

## Smack integration

For enhanced security, [Smack](https://en.wikipedia.org/wiki/Smack_(software)) has been integrated, which is a kernel-based implementation of mandatory access control. This will enable implementation of features that require higher level of security from the platform level.

## Upgrade to Qt 5.12 and Chromium 72

Last but certainly not least, the major open source components of webOS OSE --- Qt and Chromium --- have been upgraded to more up-to-date version.

* Qt has been upgraded from 5.6 to 5.12 to improve graphics performance and stability.
* The default web engine has been upgraded to Chromium 72. With this upgrade, webOS OSE offers performance enhancement for web functionality along with improvement in web compatibility.

{{< note >}}
For more information on Qt 5.12 upgrade, check the [follow-up article]({{< relref "2019-11-07-qt-5-12-upgrade" >}}).
{{< /note >}}
