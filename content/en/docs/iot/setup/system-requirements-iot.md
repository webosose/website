---
title: System Requirements
date: 2022-12-02
weight: 10
toc: true
---

{{< caution >}}
webOS IoT is **ONLY** supported from webOS OSE 2.4.0 to webOS OSE 2.18.0. We plan to replace webOS IoT with [Matter](https://csa-iot.org/all-solutions/matter/) in the future release.
{{< /caution >}}

Before you set up an environment for webOS IoT development, make sure that you prepare the target device and systems that meet the following requirements.

{{< note >}}
webOS IoT cannot be built directly on the target device. You must use a separate Linux machine that meets the [Build System Requirements](#build-system-requirements).
{{< /note >}}

## Target Device Requirements

A **target device** is a device that runs webOS IoT. To test apps and services on your target device, we recommend that you prepare the following set of hardware and peripheral devices.

* Raspberry Pi 4
* microSD card (2 GB or larger) and microSD card reader device
* Ethernet cable and internet connection
* USB to TTL serial cable
* (Optional) Input devices such as a keyboard and a mouse

{{< note >}}
webOS IoT officially supports **[Raspberry Pi 4 Model B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/)**. To avoid insufficient memory issues, the recommended memory of Raspberry Pi 4 is 2 GB or higher.
{{< /note >}}

## Build System Requirements

A **build system** is a computer that builds an image from webOS IoT source code. To build a webOS IoT image, you need a **Linux** machine. Building under Windows or macOS is currently not supported.

### Operating System

webOS IoT can be built on the 64-bit version of Ubuntu Long Term Support (LTS) releases, including:

* Ubuntu 16.04 LTS (Xenial Xerus) 64-bit
* Ubuntu 18.04 LTS (Bionic Beaver) 64-bit (Recommended)

{{< caution >}}
We strongly advise you NOT to use a Linux virtual machine on Windows or macOS for building webOS IoT, as it may cause unexpected issues.
{{< /caution >}}

### Hardware

* CPU
    * Minimum: Intel Core i5 dual-core with 4 threads
    * Recommended: Intel Core i7 quad-core with 8 threads or higher
* RAM
    * Minimum: 8 GB
    * Recommended: 16 GB or higher
* Storage
    * Minimum: HDD with 100 GB of free disk space
    * Recommended: SSD with 100 GB of free disk space or more

### Software

#### Git

Before you start building webOS IoT, you need to [set up Git](https://help.github.com/articles/set-up-git) on your build system.

#### Python

Some of the build scripts require use of Python v3.6.8 or higher. Install the required version of Python from the [Python official website](https://www.python.org/).

## Host Machine Requirements

On the **host machine**, you can flash the built image to the target device or develop services for webOS IoT. As a host machine, a **Linux** machine is supported.

{{< note >}}
The build system (Linux machine) can be also used as a host machine for further development processes.
{{< /note >}}

### Operating System

Recommended version for host operating system is as follows:

* Linux: Ubuntu 14.04 LTS or higher
