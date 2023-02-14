---
title: Building webOS OSE
display_title: Building webOS Open Source Edition
date: 2023-02-14
weight: 20
toc: true
---

This page describes how to build a webOS Open Source Edition (OSE) image from source code.

## Before You Begin

Make sure that your system meets the [Build System Requirements]({{< relref "system-requirements#build-system-requirements" >}}).

## Quick Summary

Here is a quick summary for users already familiar with building webOS OSE. If you are new to webOS OSE, we recommend reading the whole document thoroughly.

```bash
# Download source codes
$ git clone https://github.com/webosose/build-webos.git
$ cd build-webos
$ git checkout -t origin/<branch of the latest webOS OSE version>

# Install and configure the build
$ sudo scripts/prerequisites.sh
$ ./mcf -p <num of CPUs> -b <num of CPUs> <device type>

# Start to build
$ source oe-init-build-env
$ bitbake webos-image
```

## Cloning the Repository

You can start the webOS OSE build by cloning the [build-webos repository](https://github.com/webosose/build-webos). 

```bash
$ git clone https://github.com/webosose/build-webos.git
$ cd build-webos
```

Since webOS OSE 2.19.1, we introduced a new branch policy. This new policy allows the platform to implement important changes quickly.

What you need to do is to **check out a branch of the latest webOS OSE version**. For example, if the latest version of webOS OSE is 2.19.1, enter the following commands:

```bash
$ git checkout -t origin/2.19
```

{{< note >}}
- If a branch of the latest version doesn't exist, use the `master` branch.
- For more details on the new branch policy, refer to [webOS OSE 2.19.1 Release]({{< relref "2022-12-29-webos-ose-2-19-1-release" >}}).
{{< /note >}}

## Installing the Required Tools and Libraries

During the building process, [BitBake](https://docs.yoctoproject.org/bitbake.html) might fail a sanity check. Although BitBake tells you what is missing, it doesn't install the missing tools and libraries. 

You can force to install all of the missing software by entering the following:

```bash
$ sudo scripts/prerequisites.sh
```

## Configuring the Build

Using the `mcf` command, you can set up the followings:

- A type of the webOS OSE image
- How many resources to allocate to the build process

```bash
$ ./mcf -p <num of CPUs> -b <num of CPUs> <device type>
```

| Property | Description |
|----------|-------------|
| `<num of CPUs>` | This number determines how CPU cores to allocate for the building process. See [Appendix. How to Find the Optimum Parallelism Values](#appendix-a-how-to-find-the-optimum-parallelism-values).|
| `<device type>` | A type of the webOS OSE image. Available values are as follows: <ul><li><code>raspberrypi4</code>: 32-bit image for webOS OSE 2.0 or higher</li><li><code>raspberrypi4-64</code>: 64-bit image for webOS OSE 2.0 or higher</li><li><code>raspberrypi3</code>: 32-bit image for webOS OSE 1.x version</li><li><code>raspberrypi3-64</code>: 64-bit image for webOS OSE 1.x version</li><li><code>qemux86</code>: 32-bit image for webOS OSE emulator</li><li><code>qemux86-64</code>: 64-bit image for webOS OSE emulator (For webOS OSE 2.14.0 or higher)</li></ul> {{< caution >}}
Previous versions of webOS OSE might occur errors during build time. We only guarantee the build of the latest version.
{{< /caution >}} |

## Building the Image

webOS OSE provides two types of images:

- `webos-image`: A standard webOS OSE image
- `webos-image-devel`: A webOS OSE image with various development tools such as [GDB](https://www.sourceware.org/gdb/) and [strace](https://strace.io/) (system call tracer)

### Building webos-image

{{< note "IMPORTANT NOTICE" >}}
This process takes a very long time, especially on laptop computers. Make sure you have enough time and system resources to build. Regarding the build time, refer to [our test results](#appendix-b-build-time-test).
{{< /note >}}

To kick off a full build of webOS OSE, enter the following:

```bash
$ source oe-init-build-env
$ bitbake webos-image
```

Alternatively, you can enter:

```bash
$ make webos-image
```

{{< caution >}}
If you try to build two (or more) different webOS OSE images on the same shell, this might cause a build error. To avoid such an error, do one of the following:

* Open a new shell and proceed from the [Building webos-image]({{< relref "building-webos-ose/#building-webos-image" >}}).
* Enter the following commands and proceed from the [Building webos-image]({{< relref "building-webos-ose/#building-webos-image" >}}).

    ``` bash
    $ unset DISTRO
    $ unset MACHINE
    $ unset MACHINES
    ```
{{< /note >}}

### Building webos-image-devel

```bash
$ source oe-init-build-env
$ bitbake webos-image-devel
```

{{< note >}}
* For details on setting up the environment to debug webOS OSE with GDB, see [GDB Debugging Setup]({{< relref "setting-up-debugging" >}}).
* For more information on how to use strace, refer to [the article on strace](https://www.thegeekstuff.com/2011/11/strace-examples/).
{{< /note >}}

### Checking the Built Image

To check if the image has been built successfully, check the following directories:

* For Raspberry Pi 4, the resulting image will be created at
  * 32-bit: `BUILD/deploy/images/raspberrypi4/webos-image-raspberrypi4.rootfs.wic.bz2`.
  * 64-bit: `BUILD/deploy/images/raspberrypi4-64/webos-image-raspberrypi4-64.rootfs.wic.bz2`.
* For Raspberry Pi 3, the resulting image will be created at
  * 32-bit: `BUILD/deploy/images/raspberrypi3/webos-image-raspberrypi3.rootfs.rpi-sdimg`.
  * 64-bit: `BUILD/deploy/images/raspberrypi3-64/webos-image-raspberrypi3-64.rootfs.rpi-sdimg`.
* For the emulator, the resulting image will be created at
  * 32-bit: `BUILD/deploy/images/qemux86/webos-image-qemux86-master-*-wic.vmdk`.
  * 64-bit: `BUILD/deploy/images/qemux86-64/webos-image-qemux86-64-master-*-wic.vmdk`.

If the built image exists, move on to the [Next Steps]({{< relref "#next-steps" >}}).

## Cleaning

To blow away the build artifacts and prepare to do the clean build, you can remove the build directory and recreate it by typing:

```bash
$ rm -rf BUILD
$ ./mcf.status
```

This retains the caches of the downloaded source (under `build-webos/downloads`) and shared state (under `build-webos/sstate-cache`). These caches will save you a tremendous amount of time during development as they facilitate incremental builds, but these also can cause seemingly inexplicable behavior when corrupted. 

For more details, see [Yocto Project Overview and Concepts Manual](https://docs.yoctoproject.org/overview-manual/concepts.html#shared-state-cache).

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

## Appendix A. How to Find the Optimum Parallelism Values

To set the make and BitBake parallelism values, use `-p` and `-b` options to the `mcf` script. The `-p` and `-b` options correspond to `PARALLEL_MAKE` and `BB_NUMBER_THREADS` variables described in [Yocto Project Development Tasks Manual](https://docs.yoctoproject.org/dev-manual/common-tasks.html#speeding-up-a-build).

The recommended value for `-p` and `-b` options is **a half of the number of physical CPU cores**. To get the number of physical CPU cores on your build system, use the following commands.

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

With the above example, the recommended value for `-p` and `-b` options becomes 4 / 2 = 2.

{{< note >}}
We recommend you use the value under two-thirds of the number of CPU cores.
{{< /note >}}

{{< caution >}}
Omitting `-p` and `-b` options are equivalent to using `-p 0 -b 0`, which forces the build to use all CPU cores. This might cause unexpected behaviors or a build failure.
{{< /caution >}}

## Appendix B. Build Time Test

This section describes the actual build time of webOS OSE using our build machine.

### Build Machine Specification

- CPU: Intel Xeon 6226R 2.9 GHz 2933 MHz 16C 150W
- RAM: 32 GB (16 GB x 2) DDR4 2933 DIMM ECC Registered 1CPI
- GPU: NVIDIA RTX A4000 16 GB FH Blower Fan 4DP PCle x16
- Storage: HP Z Turbo Drive M.2 2 TB TLC
- `<num of CPUs>` for `mcf` : 4

### Test Results

| Device Type | Image Type | Time |
|-------------|------------|------|
| `raspberrypi4-64` | `webos-image` | 8 hours 48 minutes |
| `raspberrypi4-64` | `webos-image-devel` | 8 hours 51 minutes |