---
title: Building webOS OSE
display_title: Building webOS Open Source Edition
date: 2022-12-14
weight: 20
toc: true
---

This page describes how to build a webOS Open Source Edition (OSE) image from source code.

## Before You Begin

Ensure that your system meets the [Build System Requirements]({{< relref "system-requirements#build-system-requirements" >}}).

## Cloning the Repository

To build a webOS OSE image, [`build-webos`](https://github.com/webosose/build-webos) repository is used. This repository contains the top level code that aggregates the various [OpenEmbedded](http://openembedded.org/) layers into a whole from which webOS OSE images can be built.

Set up `build-webos` by cloning its Git repository, and `cd` into the cloned directory:

```bash
$ git clone https://github.com/webosose/build-webos.git
$ cd build-webos
```

## Installing the Required Tools and Libraries

Before you can build, some tools and libraries need to be installed. If you try to build without them, BitBake will fail a sanity check and tell you what's missing, but not really how to get the missing pieces. On Ubuntu, you can force all of the missing pieces to be installed by entering:

```bash
$ sudo scripts/prerequisites.sh
```

{{< note >}}
For more details about BitBake, refer to the [BitBake Manual](https://www.yoctoproject.org/docs/latest/bitbake-user-manual/bitbake-user-manual.html).
{{< /note >}}

## Configuring the Build

At this step, you can configure the build for your target device using the `mcf` script.

### Setting the Parallelism Values

To set the make and BitBake parallelism values, use `-p` and `-b` options to the `mcf` script. The `-p` and `-b` options correspond to `PARALLEL_MAKE` and `BB_NUMBER_THREADS` variables described in [Yocto Project Development Tasks Manual](https://www.yoctoproject.org/docs/latest/dev-manual/dev-manual.html#speeding-up-a-build).

The recommended value for `-p` and `-b` option is (number of physical CPU cores / 2). To get the number of physical CPU cores on your build system, use the following commands.

1. Get the number of physical CPUs.

    ```bash
    $ cat /proc/cpuinfo | grep "physical id" | sort | uniq | wc -l
    1
    ```

2. Get the number of cores per physical CPU.

    ```bash
    $ cat /proc/cpuinfo | grep "cpu cores" | uniq
    cpu cores    : 4
    ```

3. Multiply the above two values.

	1 * 4 = 4 (The number of physical CPU cores)

With the above example, the recommended value for `-p` and `-b` option becomes 4 / 2 = 2.

{{< note >}}
You can increase the value slightly, but make sure that the value does not exceed two-thirds of the number of CPU cores.
{{< /note >}}

{{< caution >}}
Omitting `-p` and `-b` options are equivalent to using `-p 0 -b 0`, which forces the build to use all CPU cores. This can cause an unexpected behavior or a build failure, so it is strongly discouraged.
{{< /caution >}}

### Configuring the Build for the Target Device

To configure the build for the target device and to fetch the sources, type:

```bash
$ ./mcf -p <number of physical CPU cores / 2> -b <number of physical CPU cores / 2> <target-device-name>
```

Currently, the available `<target-device-name>` are as follows:

* `raspberrypi4` (for 32-bit webOS OSE 2.0 or higher)
* `raspberrypi4-64` (for 64-bit webOS OSE 2.0 or higher)
* `raspberrypi3` (for 32-bit webOS OSE 1.x version)
* `raspberrypi3-64` (for 64-bit webOS OSE 1.x version)
* `qemux86` (for 32-bit emulator)
* `qemux86-64` (for 64-bit emulator)

{{< note >}}
64-bit emulator is supported by webOS OSE 2.14.0 or higher.
{{< /note >}}

## Building the Image

The following images can be built:

- `webos-image`: The production webOS OSE image without development tools.
- `webos-image-devel`: The image with various development tools added to `webos-image`, including GDB and strace (system call tracer).

### Building webos-image

{{< caution "2022-12-14 Workaround" >}}
Currently, a build error occurs due to fetching issues. Modify the following file to resolve the error.

- File location: `build-webos/meta-webosose/meta-webos/recipes-upstreamable/tensorflow-lite/tensorflow-lite_2.6.2.bb`
- Change the branch name of "Vulkan-Headers" and "cpuinfo" to `main`.
  
  {{< code "Before" >}}
  ``` bash {linenos=table, linenostart=61, hl_lines=[1 4 5]}
  git://github.com/KhronosGroup/Vulkan-Headers;branch=master;protocol=https;destsuffix=git/vulkan_headers;name=vulkan-headers \
  git://github.com/KhronosGroup/EGL-Registry;branch=main;protocol=https;destsuffix=git/egl_headers;name=egl-headers \
  git://github.com/KhronosGroup/OpenGL-Registry;branch=main;protocol=https;destsuffix=git/opengl_headers;name=opengl-headers \
  git://github.com/pytorch/cpuinfo;branch=master;protocol=https;destsuffix=git/cpuinfo-source;name=cpuinfo \
  git://github.com/pytorch/cpuinfo;branch=master;protocol=https;destsuffix=git/clog-source;name=clog \
  ```
  {{< /code >}}
  
  {{< code "After" >}}
  ``` bash {linenos=table, linenostart=61, hl_lines=[1 4 5]}
  git://github.com/KhronosGroup/Vulkan-Headers;branch=main;protocol=https;destsuffix=git/vulkan_headers;name=vulkan-headers \
  git://github.com/KhronosGroup/EGL-Registry;branch=main;protocol=https;destsuffix=git/egl_headers;name=egl-headers \
  git://github.com/KhronosGroup/OpenGL-Registry;branch=main;protocol=https;destsuffix=git/opengl_headers;name=opengl-headers \
  git://github.com/pytorch/cpuinfo;branch=main;protocol=https;destsuffix=git/cpuinfo-source;name=cpuinfo \
  git://github.com/pytorch/cpuinfo;branch=main;protocol=https;destsuffix=git/clog-source;name=clog \
  ```
  {{< /code >}}

This error will be resolved in the next release.
{{< /caution >}}

To kick off a full build of webOS OSE, enter the following:

```bash
$ source oe-init-build-env
$ bitbake webos-image
```

Alternatively, you can enter:

```bash
$ make webos-image
```

This may take in the neighborhood of two hours on a multi-core workstation with a fast disk subsystem and lots of memory, or many more hours on a laptop with less memory and slower disks.

{{< note >}}
If you've built for some target device and attempt to build for another target device in the same shell, a build error might occur. To avoid such an error, do one of the following:

* Open a new shell and proceed from the [Building webos-image]({{< relref "building-webos-ose/#building-webos-image" >}}).
* Enter the following commands and proceed from the [Building webos-image]({{< relref "building-webos-ose/#building-webos-image" >}}).

``` bash
$ unset DISTRO
$ unset MACHINE
$ unset MACHINES
```
{{< /note >}}

### Building webos-image-devel

To build a webOS OSE image that includes GDB and strace for debugging, enter the following:

```bash
$ source oe-init-build-env
$ bitbake webos-image-devel
```

{{< note >}}
* For details on setting up the environment to debug webOS OSE with GDB, see [GDB Debugging Setup]({{< relref "setting-up-debugging" >}}).
* For more information on how to use strace, refer to [the article on strace](https://www.thegeekstuff.com/2011/11/strace-examples/).
{{< /note >}}

### Checking the Created Image

To see if the image has been created successfully, check the following files:

* For Raspberry Pi 4, the resulting image will be created at
  * 32-bit: `BUILD/deploy/images/raspberrypi4/webos-image-raspberrypi4.rootfs.wic`.
  * 64-bit: `BUILD/deploy/images/raspberrypi4-64/webos-image-raspberrypi4-64.rootfs.wic`.
* For Raspberry Pi 3, the resulting image will be created at
  * 32-bit: `BUILD/deploy/images/raspberrypi3/webos-image-raspberrypi3.rootfs.rpi-sdimg`.
  * 64-bit: `BUILD/deploy/images/raspberrypi3-64/webos-image-raspberrypi3-64.rootfs.rpi-sdimg`.
* For the emulator, the resulting image will be created at
  * 32-bit: `BUILD/deploy/images/qemux86/webos-image-qemux86-master-*-wic.vmdk`.
  * 64-bit: `BUILD/deploy/images/qemux86-64/webos-image-qemux86-64-master-*-wic.vmdk`.

Once you checked the image file, move on to the [Next Steps]({{< relref "#next-steps" >}}).

## Cleaning

To blow away the build artifacts and prepare to do the clean build, you can remove the build directory and recreate it by typing:

```bash
$ rm -rf BUILD
$ ./mcf.status
```

What this retains are the caches of the downloaded source (under `./downloads`) and shared state (under `./sstate-cache`). These caches will save you a tremendous amount of time during development as they facilitate incremental builds, but can cause seemingly inexplicable behavior when corrupted. If you experience strangeness, use the command presented below to remove the shared state of suspicious components. In extreme cases, you may need to remove the entire shared state cache. See [Yocto Project Overview and Concepts Manual](https://www.yoctoproject.org/docs/latest/overview-manual/overview-manual.html#shared-state-cache) for more information on it.

## Building and Cleaning Individual Components

To build an individual component, enter:

```bash
$ source oe-init-build-env
$ bitbake <component-name>
```

Alternatively, you can enter:

```bash
$ make <component-name>
```

To clean a component's build artifacts under `BUILD`, enter:

```bash
$ source oe-init-build-env
$ bitbake -c clean <component-name>
```

To remove the shared state for a component as well as its build artifacts to ensure it gets rebuilt afresh from its source, enter:

```bash
$ source oe-init-build-env
$ bitbake -c cleansstate <component-name>
```

## Next Steps

- If you built the image for Raspberry Pi 4 or Raspberry Pi 3, it's time to flash the image to the target device. See [Flashing webOS OSE]({{< relref "flashing-webos-ose" >}}).
- If you built the image for the emulator, refer to the [Emulator User Guide]({{< relref "emulator-user-guide" >}}) to set up and use the emulator.