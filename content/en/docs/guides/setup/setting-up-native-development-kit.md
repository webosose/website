---
title: Native Development Kit Setup
date: 2024-11-29
weight: 90
toc: true
---

To build [downloadable native apps]({{< relref "developing-downloadable-native-apps" >}}) or [services]({{< relref "developing-downloadable-native-services" >}}) for webOS Open Source Edition (OSE), you need to install Native Development Kit (NDK) on your computer.

The NDK is a set of tools that include toolchains, libraries, and header files. This guide describes how to build and install the NDK on your computer.

{{< caution >}}
Building NDK needs a high-performance build system computer. See [Build System Requirements]({{< relref "system-requirements#build-system-requirements" >}}).
{{< /caution >}}

## Build the NDK

To build the NDK, enter the following commands:

``` bash
$ git clone https://github.com/webosose/build-webos
$ cd build-webos
$ git checkout -t origin/<BRANCH_OF_THE_LATEST_WEBOS_OSE_VERSION>
$ sudo scripts/prerequisites.sh
$ ./mcf -p <NUM_OF_CPUS> -b <NUM_OF_CPUS> raspberrypi4-64
$ source oe-init-build-env
$ bitbake -c populate_sdk webos-image
```

| Parameter | Description |
|-----------|-------------|
| `<BRANCH_OF_THE_LATEST_WEBOS_OSE_VERSION>` | This parameter varies depending on the current the webOS OSE version. Use the latest version. See also [Cloning the Repository]({{< relref "building-webos-ose#cloning-the-repository" >}}). |
| `<NUM_OF_CPUS>` | Number of CPU cores to allocate to the building process. For the specific value, refer to [Appendix A. Setting Values for mcf]({{< relref "building-webos-ose#appendix-a-setting-values-for-mcf" >}}). |

{{< note >}}
OpenEmbedded commands (e.g., `bitbake`) are used to build the NDK installer. For more details about the commands and OpenEmbedded, see [Yocto Project SDK Manual](https://www.yoctoproject.org/docs/2.6/sdk-manual/sdk-manual.html#sdk-building-an-sdk-installer).
{{< /note >}}

If the building process succeeds, a script file (`.sh`) is generated in `build-webos/BUILD/deploy/sdk/`.

``` bash
$ ls BUILD/deploy/sdk
# Example results for webOS OSE v2.20.1
webos-sdk-x86_64-cortexa72-toolchain-2.20.1.g.host.manifest
webos-sdk-x86_64-cortexa72-toolchain-2.20.1.g.sh
webos-sdk-x86_64-cortexa72-toolchain-2.20.1.g.target.manifest
webos-sdk-x86_64-cortexa72-toolchain-2.20.1.g.testdata.json
```

## Install the NDK

To install the NDK, you need to:

1. Run the generated script (`.sh`) file.
2. Set up an environment.

### Run the Script File

To run the generated script file, enter the following commands:

``` bash
$ cd BUILD/deploy/sdk
$ ./webos-sdk-x86_64-cortexa72-toolchain-2.20.1.g.sh
# Example results for webOS OSE v2.20.1
webOS OSE SDK installer version 2.20.1.g
========================================
Enter target directory for SDK (default: /usr/local/webos-sdk-x86_64):
You are about to install the SDK to "/usr/local/webos-sdk-x86_64". Proceed [Y/n]? Y
```

{{< note >}}
You can change the target directory using the interactive menu.
{{< /note >}}

If the process succeeds, an environment setup file (`environment-setup-cortexa72-webos-linux`) is generated in the target directory (default: `/usr/local/webos-sdk-x86_64`).

``` bash
$ ls /usr/local/webos-sdk-x86_64/
environment-setup-cortexa72-webos-linux  sysroots
site-config-cortexa72-webos-linux        version-cortexa72-webos-linux
```

### Set Up an Environment

To set up the environment, run the environment setup file.

``` bash
$ source /usr/local/webos-sdk-x86_64/environment-setup-cortexa72-webos-linux
```

Output messages might or might not be displayed depending on your computer's setup. If you see the message below, it's not an error so you can proceed to the next step.

> Icecc not found. Disabling distributed compiling

## Next Steps

Now you ready to build downloadable native apps or services. Check the following guides:

- [Developing Downloadable Native Apps]({{< relref "developing-downloadable-native-apps">}})
- [Developing Downloadable Native Services]({{< relref "developing-downloadable-native-services">}})
