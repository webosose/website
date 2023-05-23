---
title: Flashing webOS OSE
display_title: Flashing webOS Open Source Edition
date: 2023-05-19
weight: 30
toc: true
---

This page provides details for flashing the webOS Open Source Edition (OSE) image to a microSD card. In addition, this page describes how to verify the flashed image on the target device.

## Before You Begin

Make sure you have completed the following:

* Build the webOS OSE image on a Linux machine. For more information, see [Building webOS OSE]({{< relref "building-webos-ose" >}}). To flash the image from Windows or macOS, you must copy the built image from the Linux machine.

    {{< note >}}
    If you cannot afford to build the image on your own, try with [pre-built images](https://github.com/webosose/build-webos/releases).
    {{< /note >}}

* Unzip the image file. The webOS OSE image files have the `.wic` extension. Ensure that the extension is correct after unzipping the file.
* Insert a microSD card in the microSD card reader device connected to the host machine.

## Preparing a microSD Card

Make sure that your microSD card has a single partition. If the microSD has multiple partitions, the webOS image might not flash correctly onto it. To resolve this issue, this section describes how to delete all existing partitions on a microSD card for each host operating system.

{{< warning >}}
Before deleting partitions, ensure that you have correctly selected the microSD card. Be careful not to delete system partitions accidentally.
{{< /warning >}}

### Windows

Run `diskpart` in terminal. 

```bash
C:\Users\admin>diskpart

Microsoft DiskPart version 10.0.19041.964

Copyright (C) Microsoft Corporation.
On computer: WMRRD11-NC103BJ

DISKPART> # You can verify that you have entered DISKPART
```

Type `list disk` to find out the disk number of your microSD card, then type `select disk <N>`.

```bash
DISKPART> list disk

  Disk ###  Status         Size     Free     Dyn  Gpt
  --------  -------------  -------  -------  ---  ---
  Disk 0    Online          238 GB      0 B        *
  Disk 1    Online           29 GB  3072 KB

DISKPART> select disk 1

Disk 1 is now the selected disk.
```

Execute `clean`.

```bash
DISKPART> clean

DiskPart succeeded in cleaning the disk.
```

### Linux

First, check the device name of the microSD card using the following command.

```shell
$ lsblk
```

For example, the device name could be displayed as follows:

```shell
sda           8:0    1  29.7G  0 disk
├─sda1        8:1    1  72.7M  0 part
└─sda2        8:2    1   3.5G  0 part
```

Here, `sd<x>` denotes the device name, where `<x>` is an alphabet suffix such as `sda`. The `<N>` following `sd<x>` represents the partition number such as `sda1`.

Unmount the device to ensure a safe operation.

```shell
$ sudo umount /dev/sd<xN>
```

Enter `fdisk`.

```shell
$ sudo fdisk /dev/sd<x>
```

To delete a partition, type `d` and enter the partition number to be deleted. Repeat this process to delete all existing partitions.

{{< figure src="/images/docs/guides/setup/flashing-webos-ose-mircoSD-partition-delete.png" alt="How to delete partitions of microSD card" class="align-left" >}}

Type `w` to save the changes.

### macOS

First, check the disk name using the following command:

```shell
$ diskutil list
```

Delete each partition using the following command. Repeat this process to delete all existing partitions.

```shell
$ sudo diskutil eraseVolume free %noformat% /dev/disk<NxM>
```

Here, the disk name is represented as `disk<N>`, and the partition name is represented as `disk<NxM>`. 

* `N` is a numeric suffix.
* `x` is an alphabetical suffix, and `M` is a numeric suffix.

## Flashing the Image

This section describes how to flash the webOS OSE image to a microSD card, for each host operating system.

### Windows

Flash the image using [Win32DiskImager](https://sourceforge.net/projects/win32diskimager/).

### Linux

Check the device name of the microSD card using the following command. Refer to the [Preparing a microSD Card](#linux) section for an explanation of the device name denotation.

```shell
$ lsblk
```

To flash the image to the microSD card, run the following commands.

```shell
$ sudo umount /dev/sd<xN>
$ sudo dd bs=4M if=<path to the webOS OSE image file> of=/dev/sd<x>
$ sudo umount /dev/sd<xN>
```

For `dd` command, you must pass `sd<x>` (without the suffix number) to the `of` operand. `sd<x>` indicates the mass storage device, not the partition.

{{< note >}}
If CoreUtils 8.24 or higher is installed on your system, you can use the `status=progress` option to the `dd` command to see the copying process.

```shell
$ sudo dd bs=4M if=<path to the webOS OSE image file> of=/dev/sd<x> status=progress
```

Otherwise, the shell prompt will not display any message, so you need to wait until the copying process is complete. For more information on `dd` command, see the [Wikipedia page on dd](https://en.wikipedia.org/wiki/Dd_(Unix)).
{{< /note >}}

#### Flashing Command Example for Linux

```shell
$ sudo umount /dev/sdb1
$ sudo dd bs=4M if=./webos-image-raspberrypi4.rootfs.wic of=/dev/sdb
$ sudo umount /dev/sdb1
```

### macOS

Check the device name of the microSD card using the following command. Refer to the [Preparing a microSD Card](#macos) section for an explanation of the device name denotation.

```shell
$ diskutil list
```

To flash the image to the microSD card, run the following commands.

```shell
$ sudo diskutil umountDisk /dev/disk<N>
$ sudo dd bs=4m if=<path to the webOS OSE image file> of=/dev/disk<N>
$ sudo diskutil umountDisk /dev/disk<N>
```

For `dd` command, you must pass `disk<N>` to the `of` operand to speed up the copying process.

{{< note >}}
* If you receive the error "*dd: bs: illegal numeric value*" while running the `dd` command, make sure that the value of the `bs` operand is 4m (with lowercase "m").
* If CoreUtils 8.24 or higher is installed on your system, you can use the `status=progress` option to the `dd` command to see the copying process.

    ```shell
    $ sudo dd bs=4m if=<path to the webOS OSE image file> of=/dev/disk<N> status=progress
    ```

    Otherwise, the shell prompt will not display any message, so you need to wait until the copying process is complete. For more information on `dd` command, see the [Wikipedia page on dd](https://en.wikipedia.org/wiki/Dd_(Unix)).

{{< /note >}}

#### Flashing Command Example for macOS

```shell
$ sudo diskutil umountDisk /dev/disk2
$ sudo dd bs=4m if=./webos-image-raspberrypi4.rootfs.wic of=/dev/disk2
$ sudo diskutil umountDisk /dev/disk2
```

## Verifying the Image

After you finish flashing the webOS OSE image to the microSD card, you can check how it works by taking the following steps:

1. First, eject the microSD card from the reader device and insert it in the target device.
2. Connect the target device with peripheral devices.

    * **For webOS OSE 2.0.0 or Higher**

        * Connect the target device with a monitor through Micro HDMI cable.
        * (Optional) Connect the target device with a touchscreen through Micro HDMI to HDMI cable.
        * Connect Ethernet cable to the target device.
        * (Optional) Plug a keyboard and a mouse into the USB ports of the target device.
        
    * **For webOS OSE 1.x**
        
        * Connect the target device with a monitor through HDMI cable.
        * Connect Ethernet cable to the target device.
        * Plug a keyboard and a mouse into the USB ports of the target device.

3. Set the input mode of the touchscreen (or monitor) to the port connected with the target device.
4. Plug the power cable into the target device. The target device will boot up. Wait until the start-up screen with webOS OSE logo appears on the screen.
5. Start the webOS OSE App Bar or Home Launcher.
    
    * **For webOS OSE 2.19.0 or Higher**

        After starting up the target device, you will see the App Bar popping up from the bottom side of the screen. App Bar should contain a list of pre-installed apps, as shown in the figure below.

        {{< figure src="/images/docs/guides/setup/boot-screen-for-2-19-0-or-higher.jpg" alt="Bootup screen for webOS OSE 2.19.0 or higher" class="align-left" >}}

        For more details on how to use webOS OSE UI, see [webOS OSE UI Guide]({{< relref "webos-ose-ui-guide" >}}).

    * **For webOS OSE 2.0.0 ~ 2.18.0**

        After starting up the target device, you will see the Home Launcher UI popping up from the bottom side of the screen. Home Launcher should contain a list of pre-installed apps and icons for quick access menu, as shown in the figure below.

        {{< figure src="/images/docs/guides/setup/webosose-2_0-bootup-launcher.jpg" alt="webOS OSE 2.0 Bootup Screen" class="align-left" >}}

        The names of quick access menu icons are as shown below. Currently, only the icon for System Settings app is working. The others will be implemented in a future release.

        {{< figure src="/images/docs/guides/setup/webosose-2_0-quick-access-menu.jpg" alt="webOS OSE 2.0 quick access menu" class="align-left" >}}

        If you want to close the Home Launcher, tap the outside of the Home Launcher. Swiping up from the bottom of the screen will show the Home Launcher again.

        {{< note >}}
        The Edit button in the Home Launcher is not working.
        {{< /note >}}

    * **For webOS OSE 1.x**

        Press the Windows key (Linux, Windows) or the right command key (macOS) on your keyboard, and you will see the Home Launcher UI popping up from the right side of the screen. Home Launcher should contain a list of pre-installed apps and an icon for Settings app, as shown in the figure below.

        {{< figure src="/images/docs/guides/setup/webosose-bootup-launcher.jpg" alt="Bootup screen for webOS OSE 1.x versions" class="align-left" >}}
