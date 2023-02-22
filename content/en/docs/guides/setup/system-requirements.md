---
title: System Requirements
date: 2023-02-20
weight: 10
toc: true
---

Before you set up an environment for webOS Open Source Edition (OSE) development, make sure that you prepare the target device and systems that meet the following requirements.

{{< note >}}
webOS OSE cannot be built directly on the target device. You must use a separate Linux machine that meets the [Build System Requirements](#build-system-requirements).
{{< /note >}}

## Target Device Requirements

A **target device** is a device that runs webOS OSE. To test apps and services on your target device, we recommend that you prepare the following set of hardware and peripheral devices.

### For webOS OSE 2.0.0 or Higher

- Raspberry Pi 4
- microSD card (8 GB or larger) and microSD card reader device
- HDMI-compatible touchscreen using USB interface, with 1920x1080 resolution
- Micro HDMI to HDMI cable
- Ethernet cable and internet connection
- (Optional) Input devices such as a keyboard and a mouse

{{< note >}}
From the version 2.0.0, webOS OSE officially supports **[Raspberry Pi 4 Model B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/)**. We recommend using **4 GB or higher** model to avoid insufficient memory issues.
{{< /note >}}

{{< caution >}}
We do not support running webOS OSE 2.0.0 or higher on Raspberry Pi 3.
{{< /caution >}}

### For webOS OSE 1.x

- Raspberry Pi 3
- microSD card (8 GB or larger) and microSD card reader device
- HDMI-compatible monitor and cable
- Input devices such as a keyboard and a mouse
- Ethernet cable and internet connection

{{< note >}}
webOS OSE 1.x officially supports **[Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)**.
{{< /note >}}

## Build System Requirements

A **build system** is a computer that builds an image from webOS OSE source code. To build a webOS OSE image, you need a **Linux** machine. Building under Windows or macOS is currently not supported.

{{< note >}}
If you cannot afford to build the image on your own, try with [pre-built images](https://github.com/webosose/build-webos/releases).
{{< /note >}}

### Operating System

webOS OSE can be built on the 64-bit version of Ubuntu Long Term Support (LTS) releases, including:

- Ubuntu 18.04 LTS (Bionic Beaver) 64-bit (with GCC 9.4 or higher)
- Ubuntu 20.04 LTS (Focal Fossa) 64-bit
- Ubuntu 22.04 LTS (Jammy Jellyfish) 64-bit

{{< caution >}}
We strongly advise you **NOT** to use a Linux virtual machine on Windows or macOS for building webOS OSE, as it might cause unexpected issues.
{{< /caution >}}

### Hardware

- CPU
    - Recommended: Intel Core i7 quad-core with 8 threads or higher
- RAM
    - Recommended: 16 GB or higher
- Storage
    - Minimum: HDD with 300 GB of free disk space
    - Recommended: SSD with 300 GB of free disk space or more

{{< note >}}
See also [our test results]({{< relref "building-webos-ose#test-results" >}}) for the actual time build webOS OSE.
{{< /note >}}

### Git

Before you start building webOS OSE, you need to [set up Git](https://help.github.com/articles/set-up-git) on your build system.

## Host Machine Requirements

On the **host machine**, you can flash the built image to the target device or use SDK tools for further development processes. You can use Linux, Windows, or macOS for the host machine.

{{< note >}}
The build system (Linux machine) can be also used as a host machine for further development processes.
{{< /note >}}

### Operating System

Recommended version for each operating system are as follows:

- Linux: Ubuntu 18.04 LTS or higher
- Windows: Windows 7 or higher
- macOS: Mac OS X 10.6 Snow Leopard or higher

### Software Tools

Prepare the following tools on the host machine.

#### Git
To use SDK tools properly, [set up Git](https://help.github.com/articles/set-up-git) on your host machine.

#### Tools for Enact-based App Development

To develop an app using Enact library, you need to install [Node.js](https://nodejs.org). For information on the suitable version, refer to [Enact Installation](http://enactjs.com/docs/developer-tools/cli/installation/) page.
