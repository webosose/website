---
title: Command-Line Interface Release Notes
date: 2018-10-15
weight: 20
toc: true
---

This page provides the summary of each Command-Line Interface (CLI) release for webOS Open Source Edition (OSE).

## v1.9.4 (June 2019)

See below for the new and changed features, bug fixes, and known issues in this release.

### New features

* Added a feature to check the version rule of your app when you package your app
* Added a feature to check if the app ID and app version exist in the `appinfo.json` file of your app when you package your app
* Added a feature to add read permission to all files of your app when you package your app

### Changed features

* Updated templates (changed usable webOS APIs and how to use PmLog, `appinfo.json`)
* Changed the scenario to prompt you whether to overwrite an existing folder when creating a project. Now, CLI prompts you whether to overwrite the folder as soon as you executes the `ares-generate` command with the existing folder name. In older versions, CLI prompts you when you enter your app information.
* Changed the CLI folder structure due to code refactoring

### Bug fixes

* Fixed an issue where `ares-setup-device --reset` does not print the reset device list

### Known Issues

* This version of CLI does not support `ares-inspect --service` temporarily.

## v1.8.1 (July 2018)

### New and changed features

  - Changed the package filenames (from `webos-ose-cli-rpi_sdk-*.*` to `ares-webos-cli-ose_sdk-*.*`)

  - Added the end-user license agreement (EULA)

  - Added a template for hosted web apps

## v1.6.4 (March 2018)

This is the first official release of CLI for webOS OSE. For a detailed list of key features, see [key features]({{< relref "cli-user-guide#key-features">}}).

### Known issues

  - Web Inspector and Node Inspector work on Blink-based browsers (Chrome and Opera) but not on non-Blink browsers (Internet Explorer, FireFox, and Safari).

  - The emulator should be running prior to using `ares-install` or `ares-launch` commands. CLI does not run the emulator automatically.

  - `ares-server` and `ares-inspect` commands are not terminated on their own, and can only be terminated manually by pressing **Control+C** (Windows, Linux) or **Command+C** (macOS).

  - `ares-package` shows an error message if an app filename contains non-ASCII characters. (App filenames should contain Latin letters ONLY.)

  - `ares-setup-device --search|-s` (Search webOS Devices) is not working, because webOS OSE does not contain upnpd.
