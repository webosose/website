---
title: Native Development Kit Setup
date: 2019-12-02
weight: 80
toc: true
---

This guide describes how to set up a Native Development Kit (NDK) for 3rd party native apps and services.

NDK is a set of tools that include toolchains, libraries, and header files. To build 3rd party native apps and services for the pre-built webOS target device, you need to set up the NDK on your host machine.

## Build the NDK Installer

To use the NDK installer, you must build it first. Go to your `build-webos` directory and enter the following commands on the shell.

``` bash
build-webos$ ./mcf -p <number of physical CPU cores / 2> -b <number of physical CPU cores / 2> raspberrypi4
build-webos$ source oe-init-build-env
build-webos$ bitbake -c populate_sdk webos-image
```

{{< note >}}
  - `build-webos` directory and  `mcf` command are explained in [Building webOS OSE]({{< relref "building-webos-ose">}}).
  - OpenEmbedded commands are used to build NDK installer. For more details about using the commands and OpenEmbedded, see [Yocto Project SDK Manual](https://www.yoctoproject.org/docs/2.6/sdk-manual/sdk-manual.html#sdk-building-an-sdk-installer).
{{< /note >}}

If the build succeeds, the NDK installer (`.sh` file) is created in `build-webos/BUILD/deploy/sdk/`.

``` bash
build-webos/BUILD/deploy/sdk$ ls
webos-sdk-x86_64-cortexa7t2hf-neon-vfpv4-toolchain-1.0.g.host.manifest
webos-sdk-x86_64-cortexa7t2hf-neon-vfpv4-toolchain-1.0.g.sh
webos-sdk-x86_64-cortexa7t2hf-neon-vfpv4-toolchain-1.0.g.target.manifest
webos-sdk-x86_64-cortexa7t2hf-neon-vfpv4-toolchain-1.0.g.testdata.json
```

## Run the NDK Installer

After building the NDK installer, you must run the installer. Go to your `build-webos/BUILD/deploy/sdk` directory and enter the following commands on the shell.

``` bash
build-webos/BUILD/deploy/sdk$ ./webos-sdk-x86_64-cortexa7t2hf-neon-vfpv4-toolchain-1.0.g.sh
webOS OSE SDK installer version 1.0.g
=====================================
Enter target directory for SDK (default: /opt/webos-sdk-x86_64/1.0.g):<Press Enter key or type the custom directory>
You are about to install the SDK to `/opt/webos-sdk-x86_64/1.0.g`. Proceed[Y/n]? <Type Y and press Enter key>
```

If the installation succeeds, an environment setup script file (`environment-setup-cortexa7t2hf-neon-vfpv4-webos-linux-gnueabi`) is created in the destination directory.

``` bash
/opt/webos-sdk-x86_64/1.0.g$ ls
environment-setup-cortexa7t2hf-neon-vfpv4-webos-linux-gnueabi
site-config-cortexa7t2hf-neon-vfpv4-webos-linux-gnueabi
sysroots
version-cortexa7t2hf-neon-vfpv4-webos-linux-gnueabi
```

## Set up the Build Environment

To set up the build environment, enter the following command on the shell.

``` bash
$ source /opt/webos-sdk-x86_64/1.0.g/environment-setup-cortexa7t2hf-neon-vfpv4-webos-linux-gnueabi
```

{{< caution >}}
You need to enter `source` command every time you start a new shell session.
{{< /caution >}}