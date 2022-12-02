---
title: Flashing the Image
date: 2022-12-02
weight: 30
toc: true
---

This page provides details for flashing the webOS IoT image to a microSD card. In addition, this page describes how to verify the flashed image on the target device.

## Before You Begin

Make sure you have completed the following:

* Build the webOS IoT image on a Linux machine. For more information, see [Building webOS IoT]({{< relref "building-webos-iot" >}}).
* Insert a microSD card in the microSD card reader device connected to the host machine.

## Flashing the Image

This section describes how to flash the webOS IoT image to a microSD card.

First, change directory to where the image is located.

```shell
$ cd <path where the image is located>
```

Check the device name of the microSD card using the following command.

```shell
$ sudo fdisk -l
```

To flash the image to the microSD card, run the following commands.

```shell
$ sudo umount /dev/sd<xN>
$ sudo dd bs=4M if=./<webOS IoT image> of=/dev/sd<x>
$ sudo umount /dev/sd<xN>
```

* `sd<xN>` denotes the device name of the microSD card, where `N` is a number suffix.
* For `dd` command, you must pass `sd<x>` (without the suffix number) to the `of` operand. `sd<x>` indicates the mass storage device, not the partition.

{{< note >}}
If CoreUtils 8.24 or higher is installed on your system, you can use the `status=progress` option to the `dd` command to see the copying process.

```shell
$ sudo dd bs=4M if=./<webOS IoT image> of=/dev/sd<x> status=progress
```

Otherwise, the shell prompt will not display any message, so you need to wait until the copying process is complete. For more information on `dd` command, see the [Wikipedia page on dd](https://en.wikipedia.org/wiki/Dd_(Unix)).

{{< /note >}}

#### Flashing Command Example

```shell
$ sudo umount /dev/sdb1
$ sudo dd bs=4M if=./webos-iot-image-raspberrypi4.rootfs.wic of=/dev/sdb
$ sudo umount /dev/sdb1
```

## Next Steps

After you finish flashing the webOS IoT image to the microSD card, you must set up a network on the image. See [Network Setup]({{< relref "setting-up-network-iot" >}}).