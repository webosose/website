---
title: Building webOS Open Source Edition
date: 2019-03-05
weight: 20
toc: true
---

This page describes how to build a webOS Open Source Edition (OSE) image from source code.

## Before You Begin

Ensure that your system meets the [Build System Requirements]({{< relref "system-requirements#build-system-requirements" >}}).

## Cloning the Repository

To build a webOS OSE image, `build-webos` repository is used. This repository contains the top level code that aggregates the various [OpenEmbedded](http://openembedded.org/) layers into a whole from which webOS OSE images can be built.

Set up `build-webos` by cloning its Git repository, and cd into the cloned directory:

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

At this step, you can configure the build for Raspberry Pi 3 or the emulator.

### Configuring the Build for Raspberry Pi 3

To configure the build for Raspberry Pi 3 and to fetch the sources, type:

```bash
$ ./mcf raspberrypi3
```

### Configuring the Build for the Emulator

To configure the build for the emulator and to fetch the sources, type:

```bash
$ ./mcf qemux86
```

### Setting the Parallelism Values

You can use `-p` and `-b` options to set the make and BitBake parallelism values. The `-p` and `-b` options correspond to `PARALLEL_MAKE` and `BB_NUMBER_THREADS` variables described in [Yocto Project Development Tasks Manual](https://www.yoctoproject.org/docs/latest/dev-manual/dev-manual.html#speeding-up-a-build).

The default value for these options is 0, so the commands above are equivalent to the following:

```bash
For Raspberry Pi 3
$ ./mcf -p 0 -b 0 raspberrypi3

For the Emulator
$ ./mcf -p 0 -b 0 qemux86
```

Using 0 for these options sets the make and BitBake parallelism values to the number of CPU cores found on your computer, which means the build process will use all CPU cores. If you do not want to use all CPU cores on your computer, use different values for `-p` and `-b` options.

## Building the Image

The following images can be built:

- `webos-image`: The production webOS OSE image without development tools.
- `webos-image-devel`: The image with various development tools added to `webos-image`, including GDB and strace (system call tracer).

### Building webos-image

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

* For Raspberry Pi 3, the resulting image will be created at `BUILD/deploy/images/raspberrypi3/webos-image-raspberrypi3.rootfs.rpi-sdimg`.
* For the emulator, the resulting image will be created at `BUILD/deploy/images/qemux86/webos-image-qemux86-master-*-wic.vmdk`.

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

To clean a component's build artifacts under BUILD, enter:

```bash
$ source oe-init-build-env
$ bitbake -c clean <component-name>
```

To remove the shared state for a component as well as its build artifacts to ensure it gets rebuilt afresh from its source, enter:

```bash
$ source oe-init-build-env
$ bitbake -c cleansstate <component-name>
```