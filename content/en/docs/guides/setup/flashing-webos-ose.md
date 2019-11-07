---
title: Flashing webOS Open Source Edition
date: 2019-11-07
weight: 30
toc: true
---

This page provides details for flashing the webOS Open Source Edition (OSE) image to a microSD card. In addition, this page describes how to verify the flashed image on the target device.

## Before You Begin

Make sure you have completed the following:

* Build the webOS OSE image on a Linux machine. For more information, see [Building webOS OSE]({{< relref "building-webos-ose" >}}).
    * To flash the image from Windows or macOS, you must copy the built image from the Linux machine.
* Insert a microSD card in the microSD card reader device connected to the host machine.

## Flashing the Image

This section describes how to flash the webOS OSE image to a microSD card, for each host operating system.

### Windows

Flash the image using [Win32DiskImager](https://sourceforge.net/projects/win32diskimager/).

### Linux

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
$ sudo umount /dev/<sdXn>
$ sudo dd bs=4M if=./<webOS OSE image> of=/dev/<sdX>
$ sudo umount /dev/<sdXn>
```

* `<sdXn>` denotes the device name of the microSD card, where `n` is a number suffix.
* For `dd` command, you must pass `<sdX>` (without the suffix number) to the `of` operand. `<sdX>` indicates the mass storage device, not the partition.

{{< note >}}
After you run the `dd` command, the shell prompt will not display any message until the job is finished. Even if there is no message, you need to wait until the copying process is complete. For more information on `dd` command, see the [Wikipedia page on dd](https://en.wikipedia.org/wiki/Dd_(Unix)).
{{< /note >}}

#### Flashing Command Example for Linux

```shell
$ sudo umount /dev/sdb1
$ sudo dd bs=4M if=./webos-image-raspberrypi4.rootfs.wic of=/dev/sdb
$ sudo umount /dev/sdb1
```

### macOS

First, change directory to where the image is located.

```shell
$ cd <path where the image is located>
```

Check the device name of the microSD card using the following command.

```shell
$ diskutil list
```

To flash the image to the microSD card, run the following commands.

```shell
$ sudo diskutil umountDisk /dev/<diskn>
$ sudo dd bs=4m if=./<webOS OSE image> of=/dev/<rdiskn>
$ sudo diskutil umountDisk /dev/<diskn>
```

* `<diskn>` denotes the device name of the microSD card, where `n` is a number suffix.
* For `dd` command, you must pass `<rdiskn>` to the `of` operand to speed up the copying process.

{{< note >}}
* If you receive the error "*dd: bs: illegal numeric value*" while running the `dd` command, make sure that the value of the `bs` operand is 4m (with lowercase "m").
* After you run the `dd` command, the shell prompt will not display any message until the job is finished. Even if there is no message, you need to wait until the copying process is complete. For more information on `dd` command, see the [Wikipedia page on dd](https://en.wikipedia.org/wiki/Dd_(Unix)).
{{< /note >}}

#### Flashing Command Example for macOS

```shell
$ sudo diskutil umountDisk /dev/disk2
$ sudo dd bs=4m if=./webos-image-raspberrypi4.rootfs.wic of=/dev/rdisk2
$ sudo diskutil umountDisk /dev/disk2
```

## Verifying the Image

After you finish flashing the webOS OSE image to the microSD card, you can check how it works by taking the following steps:

1. First, eject the microSD card from the reader device and insert it in the target device.
2. Connect the target device with peripheral devices.
    * **For webOS OSE 2.0**
        * Connect the target device with a touchscreen through Micro HDMI to HDMI cable.
        * Connect Ethernet cable to the target device.
        * (Optional) Plug a keyboard and a mouse into the USB ports of the target device.
    * **For webOS OSE 1.x**
        * Connect the target device with a monitor through HDMI cable.
        * Connect Ethernet cable to the target device.
        * Plug a keyboard and a mouse into the USB ports of the target device.
3. Set the input mode of the touchscreen (or monitor) to the port connected with the target device.
4. Plug the power cable into the target device. The target device will boot up. Wait until the start-up screen with webOS OSE logo appears on the screen.
5. Start the webOS OSE Home Launcher.
    * **For webOS OSE 2.0**

        After starting up the target device, you will see the Home Launcher UI popping up from the bottom side of the screen. Home Launcher should contain a list of pre-installed apps and icons for quick access menu, as shown in the figure below.

        {{< figure src="/images/docs/guides/setup/webosose-2_0-bootup-launcher.png" alt="webOS OSE 2.0 Bootup Screen" class="align-left" >}}

        The names of quick access menu icons are as shown below. Currently, only the icon for System Settings app is working. The others will be implemented in a future release.

        {{< figure src="/images/docs/guides/setup/webosose-2_0-quick-access-menu.png" alt="webOS OSE 2.0 quick access menu" class="align-left" >}}

        If you want to close the Home Launcher, tap the outside of the Home Launcher. Swiping up from the bottom of the screen will show the Home Launcher again.

        {{< note >}}
        Currently, the Edit button in the Home Launcher is not working.
        {{< /note >}}

    * **For webOS OSE 1.x**

        Press the Windows key (Linux, Windows) or the right command key (macOS) on your keyboard, and you will see the Home Launcher UI popping up from the right side of the screen. Home Launcher should contain a list of pre-installed apps and an icon for Settings app, as shown in the figure below.

        {{< figure src="/images/docs/guides/setup/webosose-bootup-launcher.png" alt="webOS OSE Bootup Screen" class="align-left" >}}
