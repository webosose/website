---
title: Release Notes
display_title: Command-Line Interface Release Notes
date: 2024-10-30
weight: 20
toc: true
two_depth_toc: true
---

This page provides the summary of each Command-Line Interface (CLI) release for webOS Open Source Edition (OSE).

{{< note >}}
To install the CLI packages, see [CLI User Guide]({{< relref "cli-user-guide#installing-cli" >}}).
{{< /note >}}

## Compatibility

The following table shows the compatibility between webOS OSE and CLI.

<style>
  .table {
    border-left: 1px solid #DBDBDB;
    border-right: 1px solid #DBDBDB;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
  }
  .middle-border-left {
    border-right: 1px solid #DBDBDB !important;
  }
  .middle-border-right {
    border-left: 1px solid #DBDBDB !important;
  }
</style>

<div class="table-container" style="width:50%">
  <table class="table">
    <thead>
      <tr class="header">
        <th class="middle-border-left" style="width:30%"><p>CLI Version</p></th>
        <th><p>webOS OSE Version</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="middle-border-left" rowspan="3"><p>3.0.2 or later</p></td>
        <td><p>2.27.0</p></td>
      </tr>
      <tr>
        <td><p>2.26.0</p></td>
      </tr>
      <tr>
        <td style="border-bottom: none;"><p>2.25.0</p></td>
      </tr>
      <tr>
        <td class="middle-border-left" rowspan="8"><p>2.4.0</p></td>
        <td><p style="visibility: hidden;">dummy text</p></td>
      </tr>
      <tr>
        <td><p>2.24.0</p></td>
      </tr>
      <tr>
        <td><p>2.23.0</p></td>
      </tr>
      <tr>
        <td><p>2.22.0</p></td>
      </tr>
      <tr>
        <td><p>2.21.0</p></td>
      </tr>
      <tr>
        <td><p>2.20.1</p></td>
      </tr>
      <tr>
        <td><p>2.20.0</p></td>
      </tr>
      <tr>
        <td style="border-bottom: none;"><p>2.19.1</p></td>
      </tr>
      <tr>
        <td class="middle-border-left" rowspan="6"><p>2.3.1</p></td>
        <td><p style="visibility: hidden;">dummy text</p></td>
      </tr>
      <tr><td><p>2.19.0</p></td></tr>
      <tr><td><p>2.18.0</p></td></tr>
      <tr><td><p>2.17.0</p></td></tr>
      <tr><td><p>2.16.0</p></td></tr>
      <tr><td><p>2.15.0</p></td></tr>
      <tr>
        <td class="middle-border-left" rowspan="7"><p>2.2.0</p></td>
        <td><p>2.14.1</p></td>
      </tr>
      <tr><td><p>2.14.0</p></td></tr>
      <tr><td><p>2.13.2</p></td></tr>
      <tr><td><p>2.13.1</p></td></tr>
      <tr><td><p>2.13.0</p></td></tr>
      <tr><td><p>2.12.0</p></td></tr>
      <tr><td><p>2.11.0</p></td></tr>
      <tr>
        <td class="middle-border-left"><p>2.1.0</p></td>
        <td><p>2.10.0</p></td>
      </tr>
      <tr>
        <td class="middle-border-left"><p>2.0.3</p></td>
        <td><p>2.9.0</p></td>
      </tr>
      <tr>
        <td><p>2.0.2</p></td>
        <td class="middle-border-right" rowspan="2"><p>2.8.0</p></td>
      </tr>
      <tr><td><p>1.13.1</p></td></tr>
      <tr>
        <td class="middle-border-left"><p>1.13.0</p></td>
        <td><p>2.7.0</p></td>
      </tr>
      <tr>
        <td class="middle-border-left"><p>1.12.0</p></td>
        <td><p>2.6.0</p></td>
      </tr>
      <tr>
        <td class="middle-border-left"><p>1.11.1</p></td>
        <td><p>2.5.0</p></td>
      </tr>
      <tr>
        <td class="middle-border-left"><p>1.11.0</p></td>
        <td><p>2.4.0</p></td>
      </tr>
      <tr>
        <td class="middle-border-left"><p>1.10.2</p></td>
        <td><p>2.1.0</p></td>
      </tr>
      <tr>
        <td class="middle-border-left"><p>1.10.1</p></td>
        <td><p>2.0.0</p></td>
      </tr>
      <tr>
        <td><p>1.9.4</p></td>
        <td class="middle-border-right" rowspan="3"><p>1.0.0</p></td>
      </tr>
      <tr><td><p>1.8.1</p></td></tr>
      <tr><td><p>1.6.4</p></td></tr>
    </tbody>
  </table>
</div>

## v3.1.0 (July 2024)

This version is compatible with **webOS OSE 2.25.0** ~ **webOS OSE 2.26.0**. See below for the new and changed features in this release.

* Upgrade node modules: `shelljs` (v0.8.5), `async` (v3.2.5), `ssh2` (v1.15.0), `tar` (v6.2.0).

### Changed Features

* `ares-setup-device`
  * Allowed localhost as a target IP address.
  * Added port number validation(range: 1-65535).
  * Enhanced usability of the `--add` and `--remove` options.

### Fixed Issues

* Fixed an issue where `ares-config --profile` did not work after installing CLI with the root user on Mac/Linux.
* Fixed an issue where `ares-log --output --follow` did not print the JSON output in a single line.
* Fixed an issue where `ares-generate` did not use the webapp template as the default template (Execute `ares-generate` without the `--template` option).

## v3.0.2 (March 2024)

This version is compatible with **webOS OSE 2.25.0** ~ **webOS OSE 2.26.0**. See below for the new and changed features in this release.

* Moved repository from @webosose/ares-cli to [@webos-tools/cli](https://github.com/webos-tools/cli).
* Integrated with the webOS TV CLI. In the future, we plan to support multiple webOS platforms with a single CLI.
* Added profiles for changing support platforms, default profile is `tv`. Each profile has different supported commands, options, help, and templates.

### New Features

* Supports Node.js v16.20.2.
* Added a new command, `ares-config`. For more details, see [CLI User Guide]({{< relref "cli-user-guide" >}}).
* Supports to live reloading using `ares-launch --hosted` option.

### Fixed Issues

* Fixed to minify by default for JavaScript files in service directory when using `ares-package`.

## v2.4.0 (February 2023)

This version is compatible with **webOS OSE 2.19.1** ~ **webOS OSE 2.25.0**. See below for the new and changed features in this release.

### New Features

* We have released a new JavaScript API, see [CLI API Reference]({{< relref "cli-api-reference" >}}). You can use features of existing CLI commands through this API. Supported commands are as follows: 

  `ares-generate`, `ares-inspect`, `ares-install`, `ares-launch`, `ares-package`, `ares-pull`, `ares-push`, `ares-server`, `ares-setup-device`, `ares-shell`

* Now `ares-device --system-info` shows the Node.js version of the target device.

### Changed Features

* Guide messages for `ares-inspect --service` are updated.

### Fixed Issues

* Now `ares-device --resource-monitor --list` shows the list of JS services properly.

## v2.3.1 (February 2022)

This version is compatible with **webOS OSE 2.15.0** ~ **webOS OSE 2.19.1**. See below for the new and changed features in this release.

### New Features

* Supports to look up pmlog messages of the target device in `ares-log`.
* Supports to monitor resource usage of the target device in `ares-device`.
* Supports to analyze the package file (`.ipk`) in `ares-package`.
* Added a feature to print the progress when the command takes a long time to execute.
* Added a feature to print information of the connected target device.
* Supports to show level-applied logs using the `--level` option of each command.

### Changed Features

* Updated the minimum supported Node.js version from v8.12.0 to v10.24.1.

### Fixed Issues

* Fixed a bug that prevented opening the browser specified in the environment variables when using `ares-inspect --open`.
* Fixed a bug related to the callback function error when using `ares-package`.
* Fixed a bug related to the directory permission when using `ares-device --capture-screen`.

## v2.2.0 (June 2021)

This version is compatible with **webOS OSE 2.11.0** ~ **webOS OSE 2.14.1**. See below for the new and changed features in this release.

### New Features

* Added a new command, `ares-log`. For more details, see [CLI User Guide]({{< relref "cli-user-guide#ares-log">}}).

### Changed Features

* Categorized error messages and added user tips for each error message.
* Updated the naming rule for the `DEVICE_NAME` parameter in the `ares-setup-device` command.
* Enhanced the readability of the `-–listfull` option in the `ares-install` command.
* Enhanced the consistency for the `-v` option of all `ares` commands.

## v2.1.0 (April 2021)

This version is compatible with **webOS OSE 2.10.0**. See below for the new and changed features in this release.

### New Features

* Supports screen capture in the `ares-device` command. (`--capture-screen` option)

### Changed Features

* Updated the template of `appinfo.json` to apply new ACG groups. 

    {{< caution >}}
    Template files generated by CLI v2.0.3 or older are not compatible with webOS OSE 2.10.0 or higher.
    {{< /caution >}}

### Fixed Issues

* Fixed an issue that environment variables using the `ares-shell -r` command were different from environment variables of the target device.

## v2.0.3 (January 2021)

This version is compatible with **webOS OSE 2.9.0**. See below for the new and changed features in this release.

### Changed Features

* Updated help message of the `ares` command.
* Updated the README file.

## v2.0.2 (December 2020)

This version is compatible with **webOS OSE 2.8.0**. See below for the new and changed features in this release.

### New Features

* Released the source code to [GitHub](https://github.com/webosose/ares-cli). 
* Published the CLI package to [npm](https://www.npmjs.com/package/@webosose/ares-cli).
* Added `ares-device` command. This command replaces `ares-device-info`.

### Changed Features

* Supports Node.js v14.15.1.
* Updated the README file.

### Fixed Issues

* Added a logic for checking `ares-setup-device`'s parameter and fixed typos.

## v1.13.1 (November 2020)

This version is compatible with **webOS OSE 2.8.0**. See below for the new and changed features in this release.

### Changed Features

* Updated the source code through static analysis (ESLint and JSHint).
* Updated JS service template.

## v1.13.0 (October 2020)

This version is compatible with **webOS OSE 2.7.0**. See below for the new and changed features in this release.

### New Features

* Added a new command, `ares-device-info`. For more details, see [CLI User Guide]({{< relref "cli-user-guide#ares-device-info">}}).

### Changed Features

* Organized and unified error messages.
* Updated the README file.

### Removed Features

* Removed `pmloglib.Context` in the JS service template.

## v1.12.0 (July 2020)

This version is compatible with **webOS OSE 2.6.0**. See below for the new and changed features in this release.

### New Features

* Supports to launch Web Inspector on dual display (`–-display` option) in `ares-inspect`.
* Supports to set a default device (`-–default` option) in `ares-setup-device`.
* Supports to run a web app without installation ( `--hosted` option) in `ares-launch`.

### Changed Features

* Updated Node.js version to v8.12.0.
* Updated descriptions in `--help` option.

### Removed Features

* Removed a Git dependency in `ares-generate`.
* Removed Enyo features in `ares-package` and `ares-generate`.

### Fixed Issues

* Fixed typos.

### Known Issues

* Screencast feature of Web Inspector is not working on OSE emulator.

## v1.11.1 (May 2020)

This version is compatible with **webOS OSE 2.5.0**. See below for the new and changed features in this release.

### Changed Features

* Updated QML template
    * Added `applications` group to the permission of QML app.
    * Set `displayAffinity` in QML template.

### Fixed Issues

* Corrected typos in QML template.

## v1.11.0 (March 2020)

This version is compatible with **webOS OSE 2.4.0**. See below for the new and changed features in this release.

### New Features

* Supports web app launch on dual displays.

### Changed Features

* Changed web app and JS service templates.
* Changed `version` property in `appinfo.json` to optional.
* Changed a default value of `title` property to `new app` in `appinfo.json` template.
* Updated dependent npm.

### Removed Features

* Deleted a file and properties related to `largeIcon` in the template.

### Fixed Issues

* Fixed a bug related to `-v` option.
* Fixed correct machine architecture in packaging file.

### Known Issues

* webOS OSE cannot launch the same web app on different displays at the same time.
    * For example, if you launch a web app on display 0 and then launch the same app on display 1, it just re-launch the app on display 0. (Nothing happened on display 1.)

      {{< note >}}
      In this example, the message ('_Launched application com.sample.app on display 1_') might be returned on terminal, but this message can be ignored.
      {{< /note >}}

## v1.10.2 (November 2019)

This version is compatible with **webOS OSE 2.1.0**. See below for the new and changed features in this release.

### New Features

* Added a QML app template.

### Changed Features

* Changed template names, `basic` and `webappicon` to `webapp` and `icon`.

### Known Issues

* When you install an app using `ares-install`, the icon of the app is not displayed on Home Launcher.

## v1.10.1 (October 2019)

This version is compatible with **webOS OSE 2.0.0**. See below for the new, changed, and removed features along with fixed issues and known issues in this release.

### New Features

* Added a web app template that uses the WebOSSerivceBridge API.
* Added a feature to check the validity of `version` in `appinfo.json` when packaging an app, which checks whether each version number is 9 digits or less.
* Added a guide text regarding the default target device to the CLI help.

### Changed Features

* Changed to show appInstallService's error text when app installation fails.
* Changed the icon images generated by executing `ares-generate --template` to new images.

### Removed Features

* Removed the `webOS.js` library.
* `ares-inspect --service` option cannot be used with the `--open` option.
* Removed EULA that appeared on CLI when executing a command for the first time, which was replaced by EULA that appears on the developer site when downloading the CLI package.

### Fixed Issues

* Enabled the `ares-inspect --service` option.
* Fixed an issue where `ares-inspect --open` option cannot open a browser on Windows.
* Fixed to create a `.ssh` directory after executing `ares-setup-device`.

### Known Issues

* When you install or uninstall an app using `ares-install`, a running Home Launcher disappears from the screen. To make the app listed on Home Launcher, you must reboot the target device.
    * After rebooting the target device, the downloadable app is listed on Home Launcher, but the icon of the app is not displayed.

## v1.9.4 (June 2019)

See below for the new and changed features, bug fixes, and known issues in this release.

### New Features

* Added a feature to check the version rule of your app when you package your app.
* Added a feature to check if `id` and `version` exist in the `appinfo.json` file of your app when you package your app.
* Added a feature to add read permission to all files of your app when you package your app.

### Changed Features

* Updated templates (changed usable webOS APIs and how to use PmLog, `appinfo.json`).
* Changed the scenario to prompt you whether to overwrite an existing folder when creating a project. Now, CLI prompts you whether to overwrite the folder as soon as you executes the `ares-generate` command with the existing folder name. In older versions, CLI prompts you when you enter your app information.
* Changed the CLI folder structure due to code refactoring.

### Bug Fixes

* Fixed an issue where `ares-setup-device --reset` does not print the reset device list.

### Known Issues

* This version of CLI does not support `ares-inspect --service` temporarily.

## v1.8.1 (July 2018)

### New and Changed Features

* Changed the package filenames (from `webos-ose-cli-rpi_sdk-*.*` to `ares-webos-cli-ose_sdk-*.*`).

* Added the end-user license agreement (EULA).

* Added a template for hosted web apps.

## v1.6.4 (March 2018)

This is the first official release of CLI for webOS OSE. For a detailed list of key features, see [key features]({{< relref "cli-user-guide#key-features">}}).

### Known Issues

* Web Inspector and Node Inspector work on Blink-based browsers (Chrome and Opera) but not on non-Blink browsers (Internet Explorer, FireFox, and Safari).

* The emulator should be running prior to using `ares-install` or `ares-launch` commands. CLI does not run the emulator automatically.

* `ares-server` and `ares-inspect` commands are not terminated on their own, and can only be terminated manually by pressing **Control+C**.

* `ares-package` shows an error message if an app filename contains non-ASCII characters. (App filenames should contain Latin letters ONLY.)

* `ares-setup-device --search|-s` (Search webOS Devices) is not working, because webOS OSE does not contain upnpd.
