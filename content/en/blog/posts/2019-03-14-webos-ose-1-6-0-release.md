---
title: webOS OSE 1.6.0 Release
date: 2019-03-14
slug: webos-ose-1-6-0-release
posttype: release
toc: false
---

We are pleased to announce the new release of webOS Open Source Edition (OSE). This release includes the following key features:

* [Media component & API changes](#media-component-api-changes)
* [Text-to-Speech service](#text-to-speech-service)
* [Bluetooth profile support (AVRCP)](#bluetooth-profile-support-avrcp)
* [Localization enhancement](#localization-enhancement)

Please refer to the [release notes]({{< relref "webos-ose-1-6-0-release-notes" >}}) for the list of changes for this release.

## Media component & API changes

As of this release, [*`com.webos.service.avoutput`*]() (avoutputd) has been retired.

Instead, [`com.webos.service.videooutput`]() (videooutputd) has been added. This API is a replacement for video control functionalities of *`com.webos.service.avoutput`*. Audio control functionalities are provided by [`com.webos.service.audiooutput`]({{< relref "com-webos-service-audiooutput" >}}).

From this release onward, [`com.webos.media`]({{< relref "com-webos-media" >}}) (uMediaServer) will use `com.webos.service.videooutput` instead of *`com.webos.service.avoutput`* to control video-related features.

## Text-to-Speech service

This release adds **Text-to-Speech (TTS) service**, which converts plain language text into speech output. The synthesized speech can be used by applications such as voice assistants, readout help files, or a web page. TTS can enable the reading of computer display information for the visually challenged person, or may simply be used to augment the reading of a text message.

TTS service supports the following main functionalities:

* Speak API that reads out an input text in the language of your choice. It generates a series of audio and outputs sound until the complete speech signal for the input text is synthesized.
* APIs to provide the list of languages supported by TTS service, and the status of the service.

To use TTS service, see the API reference of [`com.webos.service.tts`]({{< relref "com-webos-service-tts" >}}). Before using the service, you need to enable Google Cloud Text-to-Speech API on the device by following the steps provided in the above link.

## Bluetooth profile support (AVRCP)

This release brings you support for a new Bluetooth profile, **Audio/Video Remote Control Profile (AVRCP)**. The features of AVRCP are listed below.

* Connect to open an AVRCP connection to a remote Bluetooth device
* Drop the connection to the given remote device on AVRCP profile
* Return the status of an AVRCP connection to a remote Bluetooth device
* Receive PATH THROUGH command from Controller (typically considered as a remote control device) to Target (one whose characteristics are being altered)
* Supply media metadata of the target to remote devices connected via AVRCP 1.3 profile
* Supply media play status of the target to remote devices connected via AVRCP 1.3 profile
* Await incoming media metadata requests from remote devices, which is available only for Target
* Await incoming media play status requests from remote devices, which is available only for Target
* Get the remote device's AVRCP features

{{< note >}}
* AVRCP currently supports only Target role.
* The PASS THROUGH command is used to transfer user operation information from Controller to a panel sub-unit on Target.
{{< /note >}}

To use the features, see the API reference of [`com.webos.service.bluetooth2`]({{< relref "com-webos-service-bluetooth2" >}}).

## Localization enhancement

You can now use the [localization tool](https://github.com/webosose/localization-tool) to generate string resources from your source code and translation files.

The [localization guide]({{< relref "localization-guide" >}}) has been updated accordingly, so we recommend that you check the guide if you're interested in localizing your apps and services.
