---
title: webOS 1.10.1 Release and the Intermediate Branch
date: 2019-09-23
slug: webos-ose-1-10-1-release-and-intermediate-branch
posttype: release
toc: true
---

We are delighted to announce the release of webOS OSE 1.10.1 and creation of the intermediate branch.

## webOS OSE 1.10.1 Release

This release is a preparation to use webOS OSE with [ros/meta-ros](https://github.com/ros/meta-ros/) using the official ROS build instructions.

For details, refer to the [release notes]({{< relref "webos-ose-1-10-1-release-notes" >}}).

## Intermediate Branch

On [`build-webos`](https://github.com/webosose/build-webos), `@91.release` branch has been created to be used as a development branch for partners. The following describes the change details and build instructions for the branch.

### New and Changed Features

#### Base Components

  - Web Engine
      - Web Engine is now upgraded from Chromium 68 to Chromium 72, which is used as the default in this branch.
      - All features supported through WAM (Web App Manager) are now ported onto Chromium 72.
  - ROS2
      - meta-webos-ros and meta-ros are dropped from build-webos.

To use meta-ros on webOS OSE, it is recommended to use the official instructions on [ros/meta-ros wiki](https://github.com/ros/meta-ros/wiki/OpenEmbedded-Build-Instructions).

### How to Build from the Intermediate Branch

1.  Clone the branch from `build-webos` repository and cd into the directory.

    ``` shell
    $ git clone https://github.com/webosose/build-webos -b @91.release
    $ cd build-webos
    ```

2.  Install the required tools and libraries.

    ``` shell
    $ sudo scripts/prerequisites.sh
    ```

3.  Configure the build. For more information on setting the parallelism values, see the [documentation]({{< relref "building-webos-ose#configuring-the-build" >}}).

    ``` shell
    $ ./mcf -p <number of physical CPU cores / 2> -b <number of physical CPU cores / 2> raspberrypi3
    ```

4.  Build the image.

    ``` shell
    $ make webos-image
    ```

## Coming Up Next

In the next official release of webOS OSE, we're planning to support Raspberry Pi 4 as a target device. Stay tuned for update.
