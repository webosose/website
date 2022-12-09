---
title: webOS OSE 2.19.0
display_title: webOS OSE 2.19.0 Release Notes
date: 2022-12-02
weight: 36
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/tags) from build #497 to build #527.

## New and Changed Features

{{< caution >}}
IoTivity and webOS IoT is no longer supported. We plan to replace webOS IoT with [Matter](https://csa-iot.org/all-solutions/matter/) in the future release.
{{< /caution >}}

### Core Applications

#### System UI

- Home Launcher
    - Reduced an initial launching delay
    - Added many interesting features to basic UI! For more details, refer to [webOS OSE UI Guide]({{< relref "webos-ose-ui-guide" >}}).

- Enact Browser
    - Fixed an issue where 'Previous' and 'Next' pop-up didn't disappear
    - Fixed an issue where the sound of inactive tab of Enact brower was playing
    - Added pop-up window to get the user's permission
    - Supports malware detection service

#### System

- Settings
    - Updated the app icon

#### Sample Apps

- Bufferplayer
    - Fixed a seek issue of bufferplayer test application

- Camera
    - Fixed an issue where the app was crashed if the user stops to record
    
- Web Browser
    - Fixed an issue where the 'FULL SCREEN' button didn't work properly
    - Fixed an issue where double-tapping on the address bar didn't work properly
    - Fixed an issue where video were not displayed

- Video Call
    - Added a new sample app, [Video Call]({{< relref "how-to-use-video-call-app" >}})

- Blockchain wallet
    - Added a new feature to create your own blockchain wallet using command-line
    
    {{< warning >}}
    webOS OSE doesn't provide a secure environment for blockchain wallets. LG Electronics is not responsible for any accident using blockchain wallets on webOS OSE.
    {{< /warning >}}

    {{< note >}}
    More updates and related documents about the Blockchain Wallet app will be released in the future.
    {{< /note >}}

### Application Framework

#### Web

- Enact
    - Updated Enact framework to 4.5.0
    - Updated Enact CLI to 5.0.2

### Mangers & Services

#### Display

- LSM
    - Fixed an issue where screen glitches occur after reboot

#### Media

- audiod
    - Added a feature to detect internal and external audio devices
    - Changed the path of system sounds to `/usr/data` (Previous path: `/media/internal`)

- Camera Service
    - Fixed an issue where `startPreview` was failed in C270/C310 camera models

- Added a new resource management policy for dynamic resource allocation in various media resolutions

#### i18n/l10n

- VKB
    - Fixed an issue where VKB layout became smaller before closing

#### Connectivity

- Location
    - Fixed an issue that prints "no internet" message when the `com.webos.service.location` API is called

- UWB
    - Added new methods in the `com.webos.service.uwb` API
    - Deprecated `getUwbServiceState` and `getUwbSpecificInfo`

#### Misc.

- Sys Service
    - Supports audio subdevices and internal sound cards
    - Supports MIPI cameras

### Base Components

#### Display

- Qt
    - Upgraded Qt to 6.4

#### Media

- PulseAudio
    - Added a speech enhancement feature, Intelligent Echo Cancellation Noise Reduction (ECNR)

#### i18n/l10n

- iLib
    - Updated the iLib version to 14.15.1

#### Web Engine

- Chromium
    - Allows to use gamepads in webOS web contents
    - Added a test app to verify v8 snapshot features
    - Upgraded to v94

### Emulator

- Fixed an issue where pop-up windows showed up multiple times when sound devices are connected
- Added [Emulator Launcher]({{< relref "emulator-launcher" >}})

### Build System & SCM

- Upgraded the Yocto version to [4.0 Kirkstone](https://docs.yoctoproject.org/dev/migration-guides/release-notes-4.0.html)

### Others

- Fixed an audio issue where RPi4's line out jack doesn't working 
- Fixed an issue where HTML video screen disappeared after changing the screen rotation option to 'off'
- Updated to the latest Noto fonts (Support for Unicode 15.0.0)

## Known Issues

- Cannot skip through videos using the number keys with the enter key.
- If the screen resolution of the primary display is larger than the that of the secondary display, the primary display doesn't show properly.
- In the Web Browser app, if the user enter the Settings menu while the zoom drop-down menu is activated, the zoom menu doesn't turn off.
- The `com.webos.applicationService/remove` method cannot delete apps completely.
- Cannot get responses for Google Cloud properties via luna-send commands.
- Cannot get proper returns using the `com.webos.service.wifi/tethering/setMaxStationCount` method.