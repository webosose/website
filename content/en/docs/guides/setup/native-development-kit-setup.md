---
title: Native Development Kit Setup
date: 2020-02-13
weight: 80
toc: true
---

Native Development Kit (NDK) is a set of tools that include toolchains, libraries, and header files. To build 3rd party native apps and services for the pre-built webOS target device, you need to set up the NDK on your host machine.

This guide describes how to set up the NDK for 3rd party native apps and services.

## Build the NDK Installer

To set up the NDK, you must build an NDK installer first. Go to your `build-webos` directory and enter the following commands on the shell.

``` bash
build-webos$ sudo scripts/prerequisites.sh
build-webos$ ./mcf -p <number of physical CPU cores / 2> -b <number of physical CPU cores / 2> raspberrypi4
build-webos$ source oe-init-build-env
build-webos$ bitbake -c populate_sdk webos-image
```

{{< note >}}
  - `build-webos` directory, `prerequisites.sh`, and `mcf` command are explained in [Building webOS OSE]({{< relref "building-webos-ose">}}).
  - OpenEmbedded commands are used to build the NDK installer. For more details about using the commands and OpenEmbedded, see [Yocto Project SDK Manual](https://www.yoctoproject.org/docs/2.6/sdk-manual/sdk-manual.html#sdk-building-an-sdk-installer).
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

After building the NDK installer, you must run the installer. Go to your `build-webos/BUILD/deploy/sdk/` directory and enter the following commands on the shell.

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

## Run the Environment Setup Script

The final step to use the installed NDK is running the environment setup script, enter the following command on the shell.

{{< caution >}}
You need to enter the following command every time you start a new shell session.
{{< /caution >}}

``` bash
$ source /opt/webos-sdk-x86_64/1.0.g/environment-setup-cortexa7t2hf-neon-vfpv4-webos-linux-gnueabi
```

## Next Steps

If you want to develop external native apps, see [Developing External Native Apps]({{< relref "developing-external-native-apps">}}).