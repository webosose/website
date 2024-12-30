---
title: Native Development Kit Setup
date: 2024-12-27
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
# Download source codes
$ git clone https://github.com/webosose/build-webos
$ cd build-webos

# (Optional) If a patch version exists
# See http://webosose.org/docs/guides/setup/building-webos-ose/#
$ git checkout -t origin/<branch of the latest webos ose version>

# Install and configure the build
$ sudo scripts/prerequisites.sh
$ ./mcf -p <half the num of CPUs> -b <half the num of CPUs> <image type>

# Start to build
$ source oe-init-build-env
$ bitbake -c populate_sdk webos-image
```

| Parameter | Description |
|-----------|-------------|
| `<branch of the latest webos ose version>` | This parameter varies depending on the current the webOS OSE version. Use the latest version. See also [(Optional) How to Handle Patch Versions]({{< relref "building-webos-ose#optional-how-to-handle-patch-versions" >}}). |
| `<half the num of CPUs>` | Number of CPU cores to allocate to the building process. For the specific value, refer to [Appendix A. Setting Values for mcf]({{< relref "building-webos-ose#appendix-a-setting-values-for-mcf" >}}). |
| `<image type>` | A type of the webOS OSE image to build. See [Configuring the Build]({{< relref "building-webos-ose#configuring-the-build" >}}). |

{{< note >}}
OpenEmbedded commands (e.g., `bitbake`) are used to build the NDK installer. For more details about the commands and OpenEmbedded, see [Yocto Project SDK Manual](https://www.yoctoproject.org/docs/2.6/sdk-manual/sdk-manual.html#sdk-building-an-sdk-installer).
{{< /note >}}

If the building process succeeds, a script file (`.sh`) is generated in `build-webos/BUILD/deploy/sdk/`.

``` bash
$ ls BUILD/deploy/sdk
# Example results for webOS OSE v2.27.0
webos-sdk-x86_64-cortexa72-toolchain-2.27.0.g.host.manifest
webos-sdk-x86_64-cortexa72-toolchain-2.27.0.g.sh
webos-sdk-x86_64-cortexa72-toolchain-2.27.0.g.target.manifest
webos-sdk-x86_64-cortexa72-toolchain-2.27.0.g.testdata.json
```

## Install the NDK

To install the NDK, you need to:

1. Run the generated script (`.sh`) file.
2. Set up an environment.

### Run the Script File

To run the generated script file, enter the following commands:

``` bash
$ cd BUILD/deploy/sdk
$ ./webos-sdk-x86_64-cortexa72-toolchain-2.27.0.g.sh
webOS OSE SDK installer version 2.27.0.g
========================================
Enter target directory for SDK (default: /usr/local/webos-sdk-x86_64):
The directory "/usr/local/webos-sdk-x86_64" already contains a SDK for this architecture.
If you continue, existing files will be overwritten! Proceed [y/N]? y
```

{{< note >}}
You can change the target directory using the interactive menu.
{{< /note >}}

If the process succeeds, an environment setup file (`environment-setup-cortexa72-webos-linux`) is generated in the target directory (default: `/usr/local/webos-sdk-x86_64`).

``` bash
$ ls /usr/local/webos-sdk-x86_64/
environment-setup-cortexa72-webos-linux
site-config-cortexa72-webos-linux
sysroots
version-cortexa72-webos-linux
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
