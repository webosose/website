---
title: FOTA in webOS OSE
date: 2019-12-12
slug: fota-in-webos-ose
posttype: article
toc: false
---

**Author: Jungyong Ko**

## What is FOTA?

FOTA (Firmware-Over-the-Air) lets you update the firmware of devices that have been already deployed over the air; in other words, over Wi-Fi or cellular networks. The purpose of FOTA may be as simple as one sentence, but the consequence of not having FOTA can complicate the life of developers. There have been numerous cases in multiple industries ranging from automotive to security cameras where, if FOTA had been available, the issue at stake could have been fixed quickly and favorably. In addition to providing a quick and easy fix for problems, FOTA can occasionally bring a new look and feel to your device by updating features and UX. It also enhances security by making it easier to take immediate action whenever there is a security issue.

## Ideal Mechanism for webOS OSE

There are many ways to implement FOTA but not all of them are suitable for webOS OSE. Typically, webOS OSE will be running on top of an embedded device and therefore the FOTA must be appropriate for such environment. Then what would be the ideal mechanism for webOS OSE and common embedded systems? These are what you can find in [Yocto Project](https://wiki.yoctoproject.org/wiki/System_Update) for the ideal update mechanism.

  - *never ends up in an inconsistent state (atomic update),*
  - *always keeps the device usable (fallback to previous state when there are problems, or at least supporting a recovery mode),*
  - *requires little additional resources (disk space, RAM),*
  - *minimizes downtime while updating,*
  - *works in combination with security technology (integrity protection),*
  - *is secure (does not install or execute software created by an attacker).*

As mentioned in the first two statements from Yocto, the update must never end up in an inconsistent state and the device must be usable whether the update is successful or not. It will be another nightmare for developers as well as the manufacturers if the device does not work properly after the update (e.g. trapped in an endless rebooting). Fortunately, there is a way to prevent this horror.

## A/B Update

When a Linux system starts the booting process, the bootloader loads the system’s image from the disk. In A/B update scheme, to prevent the aforementioned horror, the disk allocated for images is partitioned into two slots. Each slot will hold the running copy as well as the standby copy.

The illustration below shows such partitioning in comparison with having only one slot.

{{< figure src="/images/blog/articles/fota-single-slot.png" width="600px" alt="" caption="Non-A/B update: a single slot for images" >}}

In the above picture, there is only one slot for the image. If anything goes bad during the update, then the bootloader will have nothing to boot from and fallback will be complicated to implement. Furthermore, there is a high chance that the device becomes inoperative without a proper fallback.

{{< figure src="/images/blog/articles/fota-two-slots.png" alt="" caption="A/B update: slot A and slot B for images" >}}

Alternatively, in A/B update, the disk is partitioned into slot A and slot B.

At initial state (i.e. when the device is first deployed fresh out of the factory), only slot A holds the image and slot B is empty. For the first update, the new image is downloaded to slot B, and the bootloader loads it during booting process while keeping the standby copy in slot A. If anything does go bad, then the system can roll back to the standby copy. For the next update, the new image is downloaded to slot A and slot B becomes the standby.

Of course, there is a downside of this. One example is the larger storage required due to the presence of standby copy. However, considering the consequence such as collecting all devices that have already been deployed and re-installing the software whenever there is a problem, having a little more storage will not hurt.

## Delta Update and FOTA in webOS OSE

Now, let us examine a more efficient way to update the images in each slot.

Obviously, each update will bring new features to the device. However, the change will not be as big as changing the software upside down. It will be more efficient in terms of network resource and speed to update only the changes in the software (i.e. delta or atomic update). The customer in many industries including automotive requires the delta update and webOS OSE incorporated it since [version 2.0.0]({{< relref "2019-10-29-webos-ose-2-0-0-release#firmware-over-the-air-support" >}}). To be specific, FOTA in webOS OSE is based on [libostree](https://ostree.readthedocs.io/en/latest/), an upgrade system for Linux-based operating systems. In addition to the availability of delta update, libostree also has a big developer community like AGL and Qt which webOS OSE can tap into.

## Plan for Upcoming Versions

To take full advantage of FOTA, we need integration with a backend framework. An ideal candidate should support fine-grained control over software repository and delivery, as well as UI that will ease the time and effort needed for management.

To this end, webOS OSE will incorporate [Eclipse hawkBit](https://www.eclipse.org/hawkbit/), for its domain-independence and popularity in the world of backend framework. The current plan is to make it available in version 2.2.0.

For more on how to set up FOTA in webOS OSE, visit Firmware-Over-the-Air Setup Guide.

{{< note >}}
The FOTA feature had been retired since webOS OSE 2.16.0.
{{< /note >}}
