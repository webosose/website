---
title: Firmware-Over-the-Air Setup
date: 2019-10-23
weight: 70
toc: true
---

From version 2.0.0, webOS Open Source Edition (OSE) supports Firmware-Over-the-Air (FOTA) based on libostree.

This page outlines the FOTA solution and describes how to set up the environment to use the feature.

## Overview

**libostree** is an upgrade system for Linux-based operating systems, which performs atomic upgrades of complete filesystem trees. The underlying architecture might be summarized as "git for operating system binaries". At its core is a git-like content-addressed-object store with branches (or "refs") to track meaningful filesystem trees within the store. Similarly, one can check out or commit to these branches. That is, libostree is both a shared library and suite of command line tools that combines a "git-like" model for committing and downloading bootable filesystem trees.

So, *libostree can contain several "sysroots" at the same time and can jump to another version without extra flashing*. But because it uses hardlink-based approach, the disk usage will increase only by the difference between upgrades.

To boot a specific version from filesystem trees, libostree requires additional sequence on the bootloader. (e.g. For Raspberry Pi, libostree uses u-boot and initramfs)

For more technical details, see the [libostree project documentation](https://ostree.readthedocs.io/en/latest/).

## Prerequisites

- Platform version: webOS OSE 2.0.0 or higher
- Target device: Raspberry Pi 4

{{< note >}}
FOTA using libostree is not supported for the emulator.
{{< /note >}}

## Setting up FOTA

When building webos-image, libostree creates a libostree repository and push rootfs into the repository.

This is similar to committing rootfs to git repo. If you commit rootfs to git repo when you build webos-image, the repo will have a history of image creation, and you can check out the rootfs of a specific version at any time. In other words, you can download a rootfs from libostree repo to a webOS device, and easily upgrade the platform version by commanding libostree to deploy the rootfs.

The following describes how to configure libostree repo and upgrade version.

### Prepare your own remote repository with webOS build

On the build machine, set up your own libostree repository for FOTA.

1.  Install the tool for managing a libostree repository.

    ``` shell
    $ sudo apt install libostree-1-1
    ```

2.  Install an HTTP server from which to download data to a webOS device.

    ``` shell
    $ sudo apt install apache2
    $ sudo a2enmod userdir
    $ mkdir -p ~/public_html/ostree/repo
    $ sudo systemctl restart apache2.service
    ```

3.  Set the libostree repository path.

    - Add `OSTREE_REPO = "{absolute path of target directory}"` to `webos-local.conf`.
    - Specify a directory under the web root directory, so that it can be accessed via HTTP.

    ``` shell
    $ cd build-webos
    $ echo "OSTREE_REPO = \"\${HOME}/public_html/ostree/repo\"" >> webos-local.conf
    ```

4.  Build the webos-image. As a result of webos-image build, rootfs will be pushed to `${OSTREE_REPO}` automatically.

    ``` shell
    $ source oe-init-build-env
    $ bitbake webos-image

    # to check ostree log
    $ ostree log --repo=$HOME/public_html/ostree/repo webos-image-master
    ```

### Use the repository for image upgrade

On the target device, take the following steps to upgrade the image using libostree.

1.  Add the remote repository:

    `ostree remote add --no-gpg-verify {repository name} {URL}`

    {{< code "Example" true >}}
    ``` shell
    root@raspberrypi4:/# ostree remote add --no-gpg-verify my_repo http://{HTTP server IP address}/~{username}/ostree/repo
    ```
    {{< /code >}}

2.  Pull from the remote repository:

    `ostree pull --commit-metadata-only --depth={depth} {repository name} {branch name}`

      - `--commit-metadata-only`: don't download actual files

      - `--depth`: number of commits to pull. (-1: unlimited)

    {{< code "Example" true >}}
    ``` shell
    root@raspberrypi4:/# ostree pull --commit-metadata-only --depth=-1 my_repo webos-image-master
    ```
    {{< /code >}}

3.  Check the libostree commit log:

    `ostree log {repository name}:{branch name}`

    {{< code "Example" true >}}
    ``` shell
    root@raspberrypi4:/# ostree log my_repo:webos-image-master

    commit d3fff785447e7ac45af4f35ee1af76a992b93cfde3b1b59927124a0abd2e49f8
    ContentChecksum:  dc09d67b0fa7592248cfcbc82c4666a3053b7247d4213561a140bb6be1bfa729
    Date:  2019-06-12 12:43:59 +0000

        Commit-id: webos-image-raspberrypi4-master-20190612073140

    commit 879967f3ddaf691243065bc90f57cce7103d38c6fcaa111f50dd735be8075e9d
    ContentChecksum:  379139a9b0fc641d1fde0edaf9ce0bbe9873e9b076ae5e957ec6936738aeba11
    Date:  2019-06-10 11:27:29 +0000

        Commit-id: webos-image-raspberrypi4-master-20190612139458
    ```
    {{< /code >}}

4.  Deploy a specific revision, and reboot the target.

    `ostree admin switch {repository name}:{commit hash value}`

    {{< code "Example" true >}}
    ``` shell
    root@raspberrypi4:/# ostree admin switch my_repo:879967f3ddaf691243065bc90f57cce7103d38c6fcaa111f50dd735be8075e9d
    root@raspberrypi4:/# reboot
    ```
    {{< /code >}}

    {{< note >}}
    Keep in mind that this step can take some time to complete.
    {{< /note >}}

5.  Check the booted revision:

    `ostree admin status`

    The asterisk in the displayed result indicates currently booted revision.

    {{< code "Example" true >}}
    ``` shell
    root@raspberrypi4:/# ostree admin status
    * ose 879967f3ddaf691243065bc90f57cce7103d38c6fcaa111f50dd735be8075e9d.1
        origin refspec: desktop:879967f3ddaf691243065bc90f57cce7103d38c6fcaa111f50dd735be8075e9d
      ose 57e2239e92504da7c9bf1fcf91d4084122d1c3c23e9c0d4bf1cc586b48e63abc.0 (rollback)
        origin refspec: desktop:57e2239e92504da7c9bf1fcf91d4084122d1c3c23e9c0d4bf1cc586b48e63abc
    ```
    {{< /code >}}

## Supporting a writable filesystem (Hotfix Mode)

libostree creates a read-only bind mount over `/usr`. So it provides a command in `/usr` to remove the read-only bind mount and replace it with a writable overlay file system.

It supports two modes: development mode and **hotfix** mode.

{{< note >}}
Hotfix mode is enabled by default for development convenience.
{{< /note >}}

{{< caution >}}
In hotfix mode, all changes are stored on overlayed dirs, so remember the following:

- If you upgrade the version with libostree, you should re-enable the hotfix mode manually.
- All changes that are made while using hotfix mode are not preserved across upgrades.

The [Appendix](#appendix-how-to-rollback-before-upgrade) describes how to go back to the rootfs where your modifications are left.
{{< /caution >}}

### How to enable

- Development mode : loses all changes when reboot

    ``` shell
    root@raspberrypi4:/# ostree admin unlock
    ```

- Hotfix mode : changes will remain after reboot

    ``` shell
    root@raspberrypi4:/# ostree admin unlock --hotfix
    ```

### How to disable

- Development mode : Just reboot.
- Hotfix mode : Deploy the other revision.

    1.  Check the deployments available to be booted into: `ostree admin status`

        {{< highlight shell >}}
        root@raspberrypi4:# ostree admin status
        * webos c4c72bce3d9bbf145dee7aa914224d4ae071e51b9f156466bddfe98476d2e568.0
            Unlocked: hotfix
            origin refspec: c4c72bce3d9bbf145dee7aa914224d4ae071e51b9f156466bddfe98476d2e568
        {{< /highlight >}}

    2.  Deploy the desired deployment with refspec and reboot.

        ``` shell
        root@raspberrypi4:/# ostree admin deploy c4c72bce3d9bbf145dee7aa914224d4ae071e51b9f156466bddfe98476d2e568
        root@raspberrypi4:/# reboot
        ```

## Appendix: How to rollback before upgrade

libostree does not provide rollback by single line command.

Refer to the figure below for understanding. From the perspective of libostree, disabling the hotfix mode is the same as upgrading to a new revision.

Even if you try to deploy to the revision you just used, libostree creates a new directory for the deployment root, such as `/ostree/deploy/webos/deploy/AAA.1` (AAA.0 already exists), from its repository.

{{< figure src="/images/docs/guides/setup/fota-libostree-01.png" alt="Rollback before upgrade" >}}

So this appendix explains how to manually rollback to the previous deployment.

1.  Check deployments and their order. (In the example below, there are 2 deployments.)

    {{< highlight shell >}}
    root@raspberrypi4:/# ostree admin status
    * webos 36b78bbacc3209aa0373483d57288bd4f50249af8c46917cda55fe6740a3f755.4                 # 1st deployment (asterisk means current booted deployment)
        origin refspec: 36b78bbacc3209aa0373483d57288bd4f50249af8c46917cda55fe6740a3f755
      webos 6d32e91a9d2251c74f81088db729522d53c0e9271dbf9d604f74bcd1a7f8de71.2 (rollback)      # 2nd deployment
        Unlocked: hotfix
        origin refspec: 6d32e91a9d2251c74f81088db729522d53c0e9271dbf9d604f74bcd1a7f8de71
    {{< /highlight >}}

2.  Swap the boot configuration of the current booted deployment with the desired deployment to rollback.

    The `/boot/loader/uEnv.txt` contains 3 key-values for each deployment: **kernel_imageX**, **ramdisk_imageX**, and **bootargsX**, as shown in the example below.

    And these are listed in the order of the deployments identified by `ostree admin status` above.

    Modify only the suffix values **X** for **kernel_imageX**, **ramdisk_imageX** and **bootargsX** keys.

    ``` shell
    root@raspberrypi4:/# vi /boot/loader/uEnv.txt
    ```

    {{< figure src="/images/docs/guides/setup/fota-libostree-02.png" alt="Configuration for different deployements" >}}

3.  Reboot.

    ``` shell
    root@raspberrypi4:/# reboot
    ```
