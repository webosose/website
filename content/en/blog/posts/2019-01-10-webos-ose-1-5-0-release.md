---
title: webOS OSE 1.5.0 Release
date: 2019-01-10
slug: webos-ose-1-5-0-release
posttype: release
toc: false
---

We are delighted to announce the release of the following new features:

* [Bluetooth profiles support (OPP, A2DP)](#bluetooth-profiles-support-opp-a2dp)
* [Bluetooth audio support](#bluetooth-audio-support)

Please refer to the [release notes]({{< relref "webos-ose-1-5-0-release-notes" >}}) for more details on changes for this release.

## Bluetooth Profiles Support (OPP, A2DP)

From this release, webOS OSE supports two additional Bluetooth profiles. The features of each profile are listed below.

* **Object Push Profile (OPP)**
    * Accept a Bluetooth object push request
    * Await incoming transfer requests from push clients
    * Cancel an ongoing file transfer
    * Open (or initialize) an OPP connection to a remote Bluetooth device
    * Close (or deinitialize) the connection to the given remote device on OPP profile
    * Return the status of an OPP connection to a remote Bluetooth device
    * Return the status of ongoing file transfer requests
    * Push a file to a remote Bluetooth device
    * Reject a Bluetooth object push request
* **Advanced Audio Distribution Profile (A2DP)**
    * Connect to A2DP profile on the specified remote device
    * Drop the connection to the given remote device on A2DP profile
    * Return the status of A2DP connection to a remote device

## Bluetooth Audio Support

This release adds the capability to play audio through Bluetooth connection, in line with the newly supported A2DP profile.

Bluetooth audio support in webOS OSE is implemented through the existing open source audio component, PulseAudio. PulseAudio has the facility to enable audio output through Bluetooth by using "Bluez sink module". At present, Bluetooth on Raspberry Pi board will act as the A2DP source role.

All the audio data would be routed through the Bluetooth when a Bluetooth device is connected. Similarly, audio will be routed back to speakers when the device is disconnected.

In this release, dynamic routing (switching back and forth between speakers and A2DP-enabled Bluetooth device) is not supported while audio is being rendered.

{{< note >}}
You might encounter an issue where audio rendering stops randomly in Raspberry Pi while listening through a Bluetooth device. For technical details related to this issue, refer to the [known issue](https://github.com/webosose/pulseaudio-webos/wiki) on GitHub wiki.
{{< /note >}}
