---
title: Tutorial - Jetson Nano
date: 2021-11-16
weight: 20
toc: true
---

This guide describes how to bring up an [NVIDIA Jetson Nano board](https://developer.NVIDIA.com/embedded/jetson-nano-developer-kit) to run webOS OSE.

## Prerequisites

- [NVIDIA Jetson Nano Developer Kit](https://developer.NVIDIA.com/embedded/jetson-nano-developer-kit) and a power supply for the kit
- A MicroSD card (8 GB or larger) and MicroSD card reader
- A computer using Linux distribution
- An Ethernet cable and internet connection
- A USB to TTL serial cable

    {{< note >}}
    In this guide, we use a [4-pin TTL serial cable](https://www.adafruit.com/product/954). The commands and steps in the guide might be changed depending on the type of your cable.
    {{< /note >}}

- (Optional) Input devices such as a keyboard and a mouse
- (Optional) HDMI-compatible monitor and cable
 
See also [Build System Requirements]({{< relref "system-requirements#build-system-requirements" >}}) and [Host Machine Requirements]({{< relref "system-requirements#host-machine-requirements" >}}).

## Terminologies

<dl>
<dt>Build System</dt>
<dd>A computer that build an image from webOS OSE source code. In this guide, we will use a Linux machine for the build system.</dd>
<dt>Host Machine</dt>
<dd>A computer to flash the built image. The build system can be used as a host machine.</dd>
<dt>Target Device</dt>
<dd>A device that runs webOS OSE. In this guide, the target device is NVIDIA Jetson Nano.</dd>
</dl>

## Updating the Firmware

Before you start to bring up a Jetson Nano board, you need to update the firmware of the board to the latest version.

1. Download the official Jetson Nano Developer Kit SD Card Image.
2. Flash the image to a MicroSD card.
3. Insert the MicroSD card to your Jetson Nano board and connect the power supply. Then the board powers on and the firmware is automatically updated (Internet connection required).

For more information about getting started with Jetson Nano Developer Kit, check [the official guide](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#write) on the NVIDIA developer website.

## Building the Image

Building a webOS OSE image for Jetson Nano is done in much the same way as building an image for Raspberry Pi. By modifying few steps to the existing guide, you can build the image for the Jetson Nano board.

{{< note >}}
webOS OSE's build system is based on Yocto Project. For more details on the Yocto Project, visit the [official website](https://www.yoctoproject.org/).
{{< /note >}}

### Cloning the Source Code

You can clone the webOS OSE's source code with the following command:

```bash
$ git clone https://github.com/webosose/build-webos.git
```

Then move into the `build-webos` directory.

```bash
$ cd build-webos
```

### Installing the Required Tools and Libraries

Before you build webOS OSE, you need to install the required tools and libraries first. If you try to build without them, BitBake will fail a sanity check and tell you what's missing, but not really how to get the missing pieces. On Ubuntu, you can force all of the missing pieces to be installed with the following command:

```bash
$ sudo scripts/prerequisites.sh
```

{{< note >}}
For more details about BitBake, refer to the [BitBake Manual](https://www.yoctoproject.org/docs/latest/bitbake-user-manual/bitbake-user-manual.html).
{{< /note >}}

### Adding the Target Device

To build an image for Jetson Nano, add `jetson-nano-devkit` to `build-webos/weboslayer.py`. This will be used in the [Configuring the Build](#configuring-the-build) section.

{{< code "build-webos/weboslayer.py" >}}
``` python
Distribution = "webos"

# Supported MACHINE-s
# Add 'jetson-nano-devkit' to the list
Machines = ['qemux86', 'raspberrypi3', 'raspberrypi4', 'jetson-nano-devkit']

# github.com/openembedded repositories are read-only mirrors of the authoritative
# repositories on git.openembedded.org
```
{{< /code >}}

{{< note >}}
`jetson-nano-devkit` is one of the example target devices. For more information about supported NVIDIA boards, see [Appendix](#appendix).
{{< /note >}}

### Adding the meta-tegra Repository

`meta-tegra` is a BSP (Board Support Packages) layer for the NVIDIA Jetson platforms. The BSP layer provides board specific information such as machine configuration files and recipes. If you want to learn more about BSP layer and Yocto project, see the [official document](https://docs.yoctoproject.org/bsp-guide/bsp.html).

To add the repository, add the following codes to `build-webos/weboslayer.py`:

``` python
('meta-tegra',                30, 'https://github.com/OE4T/meta-tegra.git', 'branch=dunfell-l4t-r32.5.0,commit=65b548a', ''),
```

Make sure that you add the above code in **ascending** order. In the following example code, note the order of the number:

{{< code "Example of build-webos/weboslayer.py" >}}
``` python
...
webos_layers = [
...

('meta-qt5-compat',           19, 'git://github.com/webosose/meta-webosose',                '', ''),
('meta-qt5',                  20, 'git://github.com/meta-qt5/meta-qt5.git',                 'branch=warrior,commit=6310c5c', ''),
                              
('meta-tegra',                30, 'https://github.com/OE4T/meta-tegra.git', 'branch=dunfell-l4t-r32.5.0,commit=65b548a', ''),
 
('meta-webos-backports-3.2',  33, 'git://github.com/webosose/meta-webosose',                '', ''),
('meta-webos-backports-3.4',  35, 'git://github.com/webosose/meta-webosose',                '', ''),

...
]
```
{{< /code >}}

### Configuring the Build

To configure the build for the target device and to fetch the sources, run the following command:

``` bash
$ ./mcf -p A_HALF_NUMBER_OF_PHYSICAL_CPU_CORES -b A_HALF_NUMBER_OF_PHYSICAL_CPU_CORES jetson-nano-devkit

```

We highly recommend to use the value less than half of the number of physical CPU cores. If you specify a number higher than that, it might cause unexpected errors during the build. For more information about how to set the option values, see [Setting the Parallelism Values]({{< relref "building-webos-ose#setting-the-parallelism-values" >}}).

The `mcf` command creates a file to initialize the build environment.

{{< note >}}
If you want to use another NVIDIA Jetson board, you need to replace the target device name (`jetson-nano-devkit`) with that of other NVIDIA machines. See [Appendix](#appendix) for supported NVIDIA machines and their target device name.
{{< /note >}}

### Setting Up Configurations

Before you build the source code, you need to modify Yocto configuration files.

First initialize the build environment:

``` bash
$ source oe-init-build-env
```

#### layer.conf

Copy and paste the following codes at the end of the `build-webos/meta-webosose/meta-webos/conf/layer.conf` file:

{{< code "build-webos/meta-webosose/meta-webos/conf/layer.conf" >}}
```bash
# Add meta-tegra layer information.
# IMAGE_CLASSES and IMAGE_FSTYPES is used to flash the target device.
IMAGE_CLASSES += "image_types_tegra"
IMAGE_FSTYPES = "tegraflash tar.gz.bz2"
IMAGE_TYPES += "tegraflash"

# The default value for IMAGE_NAME_SUFFIX occurs an error when you build webOS OSE with u-boot. 
# To avoid this error, set IMAGE_NAME_SUFFIX as blank.
IMAGE_NAME_SUFFIX = ""

# Disable SOTA (Software-Over-the-Air) features.
# SOTA features are not supported in NVIDIA devices.
INHERIT_remove = "sota"
DISTRO_FEATURES_remove = "sota usrmerge"
DISTRO_FEATURES_NATIVE_remove = "sota"

# Set rootfs for Jetson Nano.
# mmcblk0p1 is root in Jetson Nano development module for MicroSD card.
KERNEL_ROOTSPEC = "root=/dev/mmcblk0p1 rw rootwait"
 
# Fix bash runtime dependency with respect to WEBOS_PREFERRED_PROVIDER_FOR_BASH
VIRTUAL-RUNTIME_bash ?= "bash"
RDEPENDS_tegra-nvs-base_append_class-target = " ${VIRTUAL-RUNTIME_bash}"
RDEPENDS_tegra-nvs-base_remove_class-target = "${@oe.utils.conditional('WEBOS_PREFERRED_PROVIDER_FOR_BASH', 'busybox', 'bash', '', d)}"
RDEPENDS_tegra-nvphs-base_append_class-target = " ${VIRTUAL-RUNTIME_bash}"
RDEPENDS_tegra-nvphs-base_remove_class-target = "${@oe.utils.conditional('WEBOS_PREFERRED_PROVIDER_FOR_BASH', 'busybox', 'bash', '', d)}"
RDEPENDS_tegra-configs-nvstartup_append_class-target = " ${VIRTUAL-RUNTIME_bash}"
RDEPENDS_tegra-configs-nvstartup_remove_class-target = "${@oe.utils.conditional('WEBOS_PREFERRED_PROVIDER_FOR_BASH', 'busybox', 'bash', '', d)}"
 
# Disable com.webos.app.volume, com.webos.app.notification, and g-media-pipeline
# These applications are not guaranteed to work properly on NVIDIA devices.
VIRTUAL-RUNTIME_com.webos.app.notification = ""
VIRTUAL-RUNTIME_com.webos.app.volume = ""
VIRTUAL-RUNTIME_g-media-pipeline = ""
```
{{< /code >}}

#### libhanguel.bb

In the `libhangul.bb` file, specify the branch name of the libhanguel library as follows:

{{< code "build-webos/meta-webosose/meta-webos/recipes-upstreamable/libhangul/libhangul.bb">}}
``` bash
...

 EXTRA_OECONF += "--libdir=${libdir}/maliit/plugins"
  
-SRC_URI = "git://github.com/choehwanjin/libhangul.git \
+SRC_URI = "git://github.com/choehwanjin/libhangul.git;branch=main \
     file://0001-Change-the-project-to-address-code.google.com-p-libh.patch \
     file://0002-Add-rule-to-auto-update-when-you-make-dist-ChangeLog.patch \
     file://0003-Change-wrong-name-hangul-jongseong-dicompose-decomp.patch \

...
```
{{< /code >}}

{{< note >}}
In the above code, `-` means deleting the line and `+` means adding the line.
{{< /note >}}

### Building the webOS OSE Image

 To start the build process, run the following command:

```bash
$ bitbake webos-image
```

Alternatively, you can also run the following command:

```bash
$ make webos-image
```

## Flashing the Image

If the build succeeds, you can find the built webOS OSE image at the `BUILD/deploy/images/<TARGET DEVICE NAME>` directory. Move to the directory.

```bash
$ cd build-webos/BUILD/deploy/images/<TARGET DEVICE NAME>
```

1. Create an image for MicroSD card.

    ``` bash
    $ tar xvf webos-image-ros-world-foxy-jetson-nano-devkit.tegraflash.tar.gz
    $ ./dosdcard.sh
    ```
2. Flash the image.

    ```bash
    $ sudo umount /dev/sd<xN>
    $ sudo dd if=./webos-image.sdcard of=/dev/sd<x> bs=10M
    $ sync
    $ sudo umount /dev/sd<xN>
    ```

    - `sd<xN>` denotes the device name of the MicroSD card, where `x` is a character and `N` is a number suffix.
    - For `dd` command, you must pass `sd<x>` (`x` is the same as the `x` in the above) to the `of` operand. `sd<X>` indicates the mass storage device, not the partition.

If the flashing succeeds, plug the MicroSD card into the target device.

## Configuring Extra Setup

At this monent, if you turn on the target device,  none of the peripheral devices (touch display, keyboard, and mouse) are functional. To use the peripheral devices and other useful features, you need to set up extra configurations.

### Establishing a Serial Connection

Since you cannot use keyboard on the target board yet, you have to establish a serial connection between the host machine and the target device.

Using the USB to TTL serial cable, connect the host machine and the target device.

<div class="columns">
  <div class="column">
    {{< figure src="/images/docs/guides/setup/jetson-nano-wiring.png" alt="" caption="Serial cable wiring in Jetson Nano board" width="80%" >}}
  </div>
  <div class="column">
    <div class="table-container">
      <table class="table is-bordered is-fullwidth">
        <thead>
          <tr class="header">
            <th><p>Jetson Nano</p></th>
            <th><p>Serial cable color</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><p>GND</p></td>
            <td><p>Black</p></td>
          </tr>
          <tr>
            <td><p>UART TXD</p></td>
            <td><p>White</p></td>
          </tr>
          <tr>
            <td><p>UART RXD</p></td>
            <td><p>Green</p></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

Then set up the serial connection by following the [Set Up a Serial Terminal]({{< relref "setting-up-networking-iot#set-up-a-serial-terminal" >}}) guide.

Once you set up a serial connection successfully, connect to the target device and modify the files specified in the subsequent sections.

### Enabling Graphic Interfaces

Modify `/etc/surface-manager.d/product.env` as follows:

{{< code "/etc/surface-manager.d/product.env" >}}
``` bash
# Platform plugin to be used
export WEBOS_COMPOSITOR_PLATFORM="eglfs_webos"
- export QT_QPA_EGLFS_INTEGRATION="eglfs_kms_webos"
+ export QT_QPA_EGLFS_INTEGRATION="eglfs_kms_egldevice"
 
# Disable to set the WEBOS_COMPOSITOR_DISPLAY_CONFIG value. Get the value from configd.                   
- WEBOS_COMPOSITOR_DISPLAY_CONFIG=$(luna-send -n 1 -a com.webos.surfacemanager luna://com.webos.service.config/getConfigs '{"configNames":["com.webos.surfacemanager.displayConfig"]}' | grep -oE "\[\{.*\}\]
+ #WEBOS_COMPOSITOR_DISPLAY_CONFIG=$(luna-send -n 1 -a com.webos.surfacemanager luna://com.webos.service.config/getConfigs '{"configNames":["com.webos.surfacemanager.displayConfig"]}' | grep -oE "\[\{.*\}\]
```
{{< /code >}}

- Replace the value of `QT_QPA_EGLFS_INTEGRATION` into `eglfs_kms_egldevice`.
- Delete the line for `WEBOS_COMPOSITOR_DISPLAY_CONFIG`. This change makes `WEBOS_COMPOSITOR_DISPLAY_CONFIG` get its value from `configd`.

{{< note >}}
In the above code, `-` means deleting the line and `+` means adding the line.
{{< /note >}}

After modifying the `/etc/surface-manager.d/product.env` file, you have to reboot Home Launcher and the target device.

``` bash
$ root@jetson-nano-devkit:~# restart surface-manager
restart surface-manager
$ root@jetson-nano-devkit:~# restart bootd
restart bootd
```

### Enabling Touch Display and Keyboard

You need to install necessary plugins for the touch display and the keyboard devices. Modify `/usr/bin/surface-manager.sh` as follows:

{{< code "/usr/bin/surface-manager.sh" >}}
``` bash
pmlog info "Starting /usr/bin/surface-manager with flags -platform ${WEBOS_COMPOSITOR_PLATFORM} ..."
- exec /usr/bin/surface-manager -platform ${WEBOS_COMPOSITOR_PLATFORM}
+ exec /usr/bin/surface-manager -platform ${WEBOS_COMPOSITOR_PLATFORM} -plugin evdevtouch:/dev/input/event3 -plugin evdevkeyboard
```
{{< /code >}}

After modifying the `/usr/bin/surface-manager.sh` file, you have to reboot Home Launcher and the target device.

``` bash
$ root@jetson-nano-devkit:~# restart surface-manager
restart surface-manager
$ root@jetson-nano-devkit:~# restart bootd
restart bootd
```

### Enabling Multimedia Playback

Modify `/etc/systemd/system/scripts/webapp-mgr.sh` as follows:

{{< code "/etc/systemd/system/scripts/webapp-mgr.sh" >}}
``` bash
export WAM_COMMON_SWITCHES=" \                                             
    ....
    --touch-events=enabled \                   
    --ui-disable-opaque-shader-program \                         
    --user-data-dir=$WAM_DATA_PATH \
+   --disable-web-media-player-neva \
    --webos-wam \ "
```
{{< /code >}}

After modifying the `/etc/systemd/system/scripts/webapp-mgr.sh` file, you have to reboot WAM, Home Launcher and the target device.

``` bash
restart WAM
$ root@jetson-nano-devkit:~# restart webapp-mgr
restart webapp-mgr
$ root@jetson-nano-devkit:~# restart surface-manager
restart surface-manager
$ root@jetson-nano-devkit:~# restart bootd
restart bootd
```

## Verifying the Image

If you see the following screen on your monitor, you have successfully brought up your board on webOS OSE.

{{< figure src="/images/docs/guides/setup/webosose-2_0-bootup-launcher.jpg" alt="Initial screen of webOS OSE" caption="" >}}

## Appendix

You can use webOS OSE on other NVIDIA machines. The following table shows the target device name for each NVIDIA machine.

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>NVIDIA Machine</p></th>
        <th colspan="3"><p>Target Device Name</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>Jetson TX1</p></td>
        <td colspan="3"><p>jetson-tx1-devkit*</p></td>
      </tr>
      <tr>
        <td><p>Jetson TX2</p></td>
        <td><p>jetson-tx2-devkit</p></td>
        <td colspan="2"><p>jetson-tx2-devkit-4gb*</p></td>
      </tr>
      <tr>
        <td><p>Jetson Nano</p></td>
        <td><p>jetson-nano-devkit</p></td>
        <td><p>jetson-nano-devkit-emmc*</p></td>
        <td><p>jetson-nano-2gb-devkit*</p></td>
      </tr>
      <tr>
        <td><p>Jetson AGX Xavier</p></td>
        <td><p>jetson-agx-xavier-devkit</p></td>
        <td colspan="2"><p>jetson-agx-xavier-devkit-8gb*</p></td>
      </tr>
    </tbody>
  </table>
</div>

\* : This machine is not tested on webOS OSE.
