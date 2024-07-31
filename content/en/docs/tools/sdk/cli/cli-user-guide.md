---
title: User Guide
display_title: Command-Line Interface User Guide
date: 2024-07-18
weight: 10
toc: true
---

**Command-Line Interface (CLI)** of webOS Open Source Edition (OSE) provides a collection of commands used for creating, packaging, installing, and launching apps or services in the command line environment. CLI lets you develop and test apps or services without using any IDE.

{{< note >}}
The npm package name of the CLI has been changed (from `@webosose/ares-cli` to `@webos-tools/cli`) since v3.0.2 (March 4, 2024). See [How to Install](#how-to-install).
{{< /note >}}

## Key Features

CLI provides necessary functionality throughout the entire web app development process, from app creation to debugging and testing. The following figure shows CLI commands that can be used during each stage of the development process.

{{< figure src="/images/docs/tools/cli/cli-workflow.png" alt="" caption="Development Workflow with CLI" width="1024px" >}}

  - **Creating Apps and Services**
    - Provides standard templates for webOS OSE apps and services
    - Provides a list of available templates
    - Generates an app or a service and configures basic information
  - **Packaging Apps and Services**
    - Packages the source code and generates a package file (`.ipk`) to run on the target device
    - Provides a feature to exclude sample and test code directories from an app or a service
  - **Managing Target Devices**
    - Provides a list of target devices
    - Adds, modifies, and removes target devices
  - **Installing Apps and Services**
    - Installs the app and service on the target device
    - Provides a list of apps installed on the target device
    - Removes selected apps from the target device
  - **Launching and Closing Apps**
    - Launches selected apps
    - Closes apps that are running
    - Provides the list of apps running on the target device
  - **Debugging/Testing Apps and Services**
    - Enables Web Inspector for debugging web apps
    - Enables Node's Inspector for debugging JavaScript services
    - Provides web app information
    - Provides JavaScript service information
    - Shows or saves logs of webOS OSE apps and services
  - **Providing Target Device Information**
    - Provides system information
    - Provides screen capture
    - Supports monitoring device's resource usage

## System Requirements

### Operating Systems

Required version for each operating system are as follows:

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>OS</p></th>
        <th><p>Requirement</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>Linux</p></td>
        <td><p>Ubuntu 20.04 LTS 64-bit</p></td>
      </tr>
      <tr>
        <td><p>macOS</p></td>
        <td><p>Mac OS X 10.13 High Sierra or higher</p></td>
      </tr>
      <tr>
        <td><p>Windows</p></td>
        <td><p>Windows 10 64-bit</p></td>
      </tr>
    </tbody>
  </table>
</div>

### Software Tools

* Node.js (Use v14.15.1 to v16.20.2)
* npm

## How to Install

CLI can be installed using Node Package Manager (npm). 

### Step 01. Installing npm

Before installing the CLI, ensure that Node.js and npm are installed on your system. If they are not installed, refer to the following instructions.

#### Node.js

  1. Visit [the official Node.js website](https://nodejs.org) and download the recommended version for your operating system.
  2. Run the installer and follow the installation instructions.
  3. When finished, verify the installation by checking its version.

```bash     
node -v
```

#### npm

The npm is included with the Node.js, so if you have successfully installed Node.js, you already have npm available for use. 

Execute the following command to verify if the npm is available on your system.

```bash
npm -v
```

### Step 02. Installing CLI

{{< caution >}}
If the CLI is already installed globally, we highly recommend uninstalling the previous CLI globally.

```bash
# Uninstall the CLI globally
$ npm uninstall -g @webosose/ares-cli
```

```bash
# Verify whether uninstalled the previous CLI
$ ares --version
ares: command not found
```
{{< /caution >}}

Execute the following command in a terminal, using the `-g` option to install the CLI globally. For Linux and macOS users, the `sudo` privilege might be required.

```bash
npm install -g @webos-tools/cli
```

Verify the installation by checking its version. Check if the version matches with the latest version of [CLI npm package](https://www.npmjs.com/package/@webos-tools/cli).
 
```bash
ares --version
```

### Step 03. Setting Up the OSE Profile

CLI supports multi-webOS platforms since v3.0.2 (default profile: `tv`). To use the CLI on webOS OSE, you **MUST change** your profile to `ose`.

To set up the profile, enter the following command:

``` shell
$ ares-config --profile ose
```

## How to Use

With the CLI, you can develop various types of external apps or services. For detailed instructions, refer to the each tutorial.

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Development Type</p></th>
        <th><p>Tutorial</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>External Web Apps</p></td>
        <td>
          <p>See the <a href="{{< relref "developing-external-web-apps">}}">Developing External Web Apps</a>.</p>
        </td>
      </tr>
      <tr>
        <td><p>External JS Services</p></td>
        <td>
          <p>See the <a href="{{< relref "developing-external-js-services">}}">Developing External JS Services</a>.</p>
        </td>
      </tr>
      <tr>
        <td><p>External QML Apps</p></td>
        <td>
          <p>See the <a href="{{< relref "developing-external-qml-apps">}}">Developing External QML Apps</a>.</p>
        </td>
      </tr>
      <tr>
        <td><p>External Native Apps</p></td>
        <td>
          <p>See the <a href="{{< relref "developing-external-native-apps">}}">Developing External Native Apps</a>.</p>
        </td>
      </tr>
      <tr>
        <td><p>External Native Services</p></td>
        <td>
          <p>See the <a href="{{< relref "developing-external-native-services">}}">Developing External Native Services</a>.</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## CLI Commands

The following table shows the available CLI commands.

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Commands</p></th>
        <th><p>Descriptions</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p><a href="#ares-config">ares-config</a></p></td>
        <td><p>Configures webOS CLI.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares">ares</a></p></td>
        <td><p>Provides the help menu for using the <code>ares</code> commands.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-generate">ares-generate</a></p></td>
        <td><p>Creates a webOS OSE app or service from templates.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-package">ares-package</a></p></td>
        <td><p>Packages the app or services into a package file.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-setup-device">ares-setup-device</a></p></td>
        <td><p>Manages the target devices.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-install">ares-install</a></p></td>
        <td><p>Installs the app or service on the target device.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-launch">ares-launch</a></p></td>
        <td><p>Launches or terminates the app.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-inspect">ares-inspect</a></p></td>
        <td><p>Enables Web Inspector or Node's Inspector for debugging web app or JS service.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-server">ares-server</a></p></td>
        <td><p>Runs the Web server for testing local app file.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-shell">ares-shell</a></p></td>
        <td><p>Executes shell commands on the target device.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-push">ares-push</a></p></td>
        <td><p>Pushes file(s) from a host machine to a target device.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-pull">ares-pull</a></p></td>
        <td><p>Pulls file(s) from a target device to a host machine.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-device">ares-device</a></p></td>
        <td><p>Displays the device information.</p></td>
      </tr>
      <tr>
        <td><p><a href="#ares-log-journal">ares-log</a></p></td>
        <td><p>Shows or saves logs of webOS OSE apps or services.</p></td>
      </tr>
    </tbody>
  </table>
</div>

### ares-config

This command configures the CLI profile. You can change the profile at any time.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v3.0.2</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-config

ares-config --profile|-p DEVICE_PROFILE

ares-config --profile-details|-c

ares-config --version|-V

ares-config --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-p, --profile</p></td>
        <td><p>DEVICE_PROFILE</p></td>
        <td><p>Specifies the CLI profile.</p></td>
      </tr>
      <tr>
        <td><p>-c, --profile-details</p></td>
        <td><p>None</p></td>
        <td>
          <p>Prints current configured profile.</p> 
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>DEVICE_PROFILE</p></td>
        <td><p>A profile of the target device. Possible values are as follows:<ul><li>tv (default, for webOS TV)</li><li>ose</li></ul></p></td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Configure profile for platform (ose)

    ``` shell
    ares-config -p ose
    ```

* Currently configured profile

    ``` shell
    ares-config -c
    ```

### ares

This command provides the help menu for using the `ares` commands.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--level</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares

ares [OPTION...]

ares --version|-V

ares --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-l, --list</p></td>
        <td><p>None</p></td>
        <td><p>Lists all the <code>ares</code> commands.</p></td>
      </tr>
      <tr>
        <td><p>--[COMMAND]</p></td>
        <td><p>None</p></td>
        <td>
          <p>Prints help messages of <code>COMMAND</code>.</p> 
          <p><code>COMMAND</code> is entered using postfix of the <code>ares</code> commands. For more details, see <a href="#examples">Examples</a>.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Listing all the `ares` commands

    ``` shell
    ares -l
    ```

* Displaying the help menu for the `ares-install` command.

    ``` shell
    ares --install
    ```
### ares-generate

This command creates a webOS OSE app or service from a template. `ares-generate` displays a list of available templates for a web app, JS services, and webOS OSE configuration files.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--level</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v2.1.0</p></td>
        <td>
          <p>Updates <code>requiresPermissions</code> in the <code>appinfo.json</code> file.</p>
          {{< caution >}}
          Template files generated by CLI v2.0.3 or older are not compatible with webOS OSE 2.10.0 or higher.
          {{< /caution >}}
        </td>
      </tr>
      <tr>
        <td><p>v1.11.0</p></td>
        <td><p>Updates the properties of the <code>appinfo.json</code> file.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-generate [OPTION...] APP_DIR

ares-generate [OPTION...] -t js_service SERVICE_DIR

ares-generate --list|-l

ares-generate --version|-V

ares-generate --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:20%"><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-t, --template</p></td>
        <td><p>TEMPLATE</p></td>
        <td>
          <p>Sets the template to be created. Available templates are as follows:</p>
          <ul>
            <li>webapp (default)</li>
            <li>hosted_webapp</li>
            <li>webappinfo</li>
            <li>js_service</li>
            <li>jsserviceinfo</li>
            <li>icon</li>
            <li>qmlapp</li>
            <li>qmlappinfo</li>
          </ul>
          <p>For more information about each template, see <a href="#parameters">Parameters</a>.</p>
        </td>
      </tr>
      <tr>
        <td><p>-l, --list</p></td>
        <td><p>None</p></td>
        <td><p>Lists the available templates.</p></td>
      </tr>
      <tr>
        <td><p>-p, --property</p></td>
        <td><p>PROPERTY</p></td>
        <td><p>Sets the properties of webOS OSE configuration files.</p></td>
      </tr>
      <tr>
        <td><p>-s, --servicename</p></td>
        <td><p>SERVICE_NAME</p></td>
        <td><p>Specifies the JS service ID.</p></td>
      </tr>
      <tr>
        <td><p>-f, --overwrite</p></td>
        <td><p>None</p></td>
        <td><p>Allows overwriting the existing files.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>APP_DIR</p></td>
        <td>
          <p>A directory to store the created app</p>
          <p>If the directory doesn't exist, the directory will be created while executing the command.</p>
        </td>
      </tr>
      <tr>
        <td><p>SERVICE_DIR</p></td>
        <td>
          <p>A directory to store the created service</p>
          <p>If the directory doesn't exist, the directory will be created while executing the command.</p>
        </td>
      </tr>
      <tr>
        <td><p>PROPERTY</p></td>
        <td>
          <p>Properties in the format of <code>"key=value"</code> or a JSON-type string: <code>"{'key1':'value1', 'key2':'value2', ...}"</code></p>
          <p>For more details, see <a href="/docs/guides/development/configuration-files/appinfo-json/">appinfo.json</a> and <a href="/docs/guides/development/configuration-files/services-json/">services.json</a>.</p>
        </td>
      </tr>
      <tr>
        <td><p>TEMPLATE</p></td>
        <td>
          <p>A template to use when creating an app or a service (default value: <code>webapp</code>)</p>
          <div class="table-container">
            <table class="table is-bordered is-fullwidth">
              <thead>
                <tr class="header">
                  <th><p><strong>Template Name</strong></p></th>
                  <th><p><strong>Brief Description</strong></p></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><p>webapp (Default)</p></td>
                  <td><p>Web app template for webOS OSE</p></td>
                </tr>
                <tr>
                  <td><p>hosted_webapp</p></td>
                  <td><p>Hosted web app template for webOS OSE</p></td>
                </tr>
                <tr>
                  <td><p>webappinfo</p></td>
                  <td><p>Creates an <code>appinfo.json</code> file for a web app.</p></td>
                </tr>
                <tr>
                  <td><p>js_service</p></td>
                  <td><p>JS service template for webOS OSE</p></td>
                </tr>
                <tr>
                  <td><p>jsserviceinfo</p></td>
                  <td><p>Creates a <code>services.json</code> and <code>package.json</code> file for a JS service.</p></td>
                </tr>
                <tr>
                  <td><p>icon</p></td>
                  <td><p>Creates an app icon file. Required size is 80 x 80 (pixels).</p></td>
                </tr>
                <tr>
                  <td><p>qmlapp</p></td>
                  <td><p>QML app template for webOS OSE</p></td>
                </tr>
                <tr>
                  <td><p>qmlappinfo</p></td>
                  <td><p>Creates an <code>appinfo.json</code> file for a QML app.</p></td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td><p>SERVICE_NAME</p></td>
        <td>
          <p>The ID of a service</p> 
          <p>This ID should be a sub-domain of the app ID to which the service belongs. For more details, see <a href="#examples-1">Examples</a>.</p>
        </td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Listing the templates (web application templates)

    ```shell
    ares-generate -l
    ```

* Creating a web application using the default template in the `./sampleApp` directory

    ```shell
    ares-generate ./sampleApp
    ```

* Creating a web application with a custom app ID in the `./sampleApp` directory

    ```shell
    ares-generate -p "id=com.example.sampleapp" ./sampleApp
    ```

* Creating a JS service with a custom service ID in the `./sampleService` directory (App ID: `com.example.sampleapp`)

    ```shell
    ares-generate -t js_service -s com.example.sampleapp.sampleservice ./sampleService
    ```

    {{< note >}}
    The service ID should be a sub-domain of the app ID to which the service belongs.
    {{< /note >}}

* Creating a web app in the `./sampleApp` and setting properties with a JSON-type string

    ```shell
    ares-generate -p "{'id':'com.example.sampleapp', 'version':'1.0.0', 'icon':'icon.png', 'type':'web', 'title':'Sample App', 'main':'index.html'}" ./sampleApp
    ```

### ares-package

This command packages an app or a JS service into a package file (`.ipk`) which is stored in a specified directory. This command also analyzes the package file.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--info</code>, <code>--info-detail</code>, and <code>--level</code> options.</p></td>
      </tr>
      <tr>
        <td><p>v1.12.0</p></td>
        <td><p>Stops to support Enyo features.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-package [OPTION...] APP_DIR [SERVICE_DIR]

ares-package --version|-V

ares-package --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:20%"><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-c, --check</p></td>
        <td><p>None</p></td>
        <td>
          <p>Checks whether the <code>appinfo.json</code> file exists or not.</p>
          <p>If the <code>appinfo.json</code> file does not exist, warning messages appear. This option does not make the package file.</p>
        </td>
      </tr>
      <tr>
        <td><p>-o, --outdir</p></td>
        <td><p>OUT_DIR</p></td>
        <td><p>Specifies a directory where the package file is created.</p></td>
      </tr>
      <tr>
        <td><p>-e, --app-exclude</p></td>
        <td><p>EX_DIR</p></td>
        <td><p>Excludes directories or files when you package the source code. For more details on how to use this option, see <a href="#examples-2">Examples</a>.</p></td>
      </tr>
      <tr>
        <td><p>-r, --rom</p></td>
        <td><p>None</p></td>
        <td>
          <p>Previews a directory hierarchy of an app when the app is installed.</p>
          <p>This option creates a <code>usr</code> directory in the current directory rather than an <code>.ipk</code> file. The hierarchy of the <code>usr</code> directory is the same as the hierarchy when the <code>.ipk</code> file is actually installed on the target device.</p>
        </td>
      </tr>
      <tr>
        <td><p>--info</p></td>
        <td><p>PACKAGE_FILE</p></td>
        <td>
          <p>Analyzes the package.</p>
          <p>This option cannot be used in conjunction with other options.</p>
        </td>
      </tr>
      <tr>
        <td><p>--info-detail</p</td>
        <td><p>PACKAGE_FILE</p></td>
        <td>
          <p>Analyzes the package with more details.</p>
          <p>This option cannot be used in conjunction with other options.</p>
        </td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>APP_DIR</p></td>
        <td><p>The directory where the app's <code>appinfo.json</code> file is located</p></td>
      </tr>
      <tr>
        <td><p>SERVICE_DIR</p></td>
        <td><p>The directory where the service's <code>services.json</code></a> file is located</p></td>
      </tr>
      <tr>
        <td><p>OUT_DIR</p></td>
        <td>
          <p>The directory where the package file (<code>.ipk</code>) is to be created</p>
          <p>If this parameter is not specified, the package file is created in the current directory.</p>
        </td>
      </tr>
      <tr>
        <td><p>EX_DIR</p></td>
        <td>
          <p>A directory or file to be excluded from the package file (<code>.ipk</code>)</p>
          <p>You can use common pattern expression such as wildcard (*).</p>
        </td>
      </tr>
      <tr>
        <td><p>PACKAGE_FILE</p></td>
        <td>
          <p>A webOS package file (<code>.ipk</code>)</p>
          <p>This package file must be packaged with CLI beforehand.</p>
        </td>
      <tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Creating a package file from the `./sampleApp` directory and outputting it in the working directory

    ```shell
    ares-package sampleApp
    ```

* Creating a package file from the `./sampleApp` directory and outputting it in the `./output` directory

    ```shell
    ares-package -o output sampleApp
    ```

* Creating a package file except for the `testCode1` directory (includes its subdirectories), `README.md`, and all `.txt` files

    ```shell
    ares-package -e "testCode1" -e "README.md" -e "*.txt" samplePrj
    ```

* Creating a package file with an external JS service

    ```shell
    ares-package sampleApp sampleService
    ```

* Creating a package file with multiple external JS services

    ```shell
    ares-package sampleApp sampleServiceA sampleServiceB
    ```

* Creating a package file with an external JS service (using absolute path)

    ```shell
    # Windows
    ares-package c:\samples\sampleApp c:\samples\sampleService

    #Linux/MacOS
    ares-package ~/samples/sampleApp ~/samples/sampleService
    ```

* Analyzing the package file

    ``` shell
    ares-package -i ~/projects/packages/com.examples.app_1.0_all.ipk
    ```

* Analyzing the package file with more details

    ``` shell
    ares-package -I ~/projects/packages/com.examples.app_1.0_all.ipk
    ```

### ares-setup-device

This command displays a list of registered target devices. You can add, modify, or remove them from the list. This command is mainly used to modify target's host address which is running on a remote host. Without any option, this command runs in the interactive mode.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v3.1.0</p></td>
        <td><p>Updates rules for the <code>DEVICE_INFO</code> parameter.</p></td>
      </tr>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--level</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v2.2.0</p></td>
        <td><p>Updates a naming rule for the <code>DEVICE_NAME</code> parameter.</p></td>
      </tr>
      <tr>
        <td><p>v1.12.0</p></td>
        <td><p>Supports the <code>--default</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-setup-device

ares-setup-device [OPTION...] --add|-a [TARGET_NAME] [--info|-i [DEVICE_INFO]]

ares-setup-device [OPTION...] --modify|-m [TARGET_NAME] [--info|-i [DEVICE_INFO]]

ares-setup-device [OPTION...] --remove|-r [TARGET_NAME]

ares-setup-device [OPTION...] --default|-f [TARGET_NAME]

ares-setup-device --reset|-R

ares-setup-device --list|-l

ares-setup-device --listfull|-F

ares-setup-device --version|-V

ares-setup-device --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-a, --add</p></td>
        <td><p>TARGET_NAME</p></td>
        <td><p>Adds a target device with the specified information. For more details, see <a href="#examples-3">Examples</a>.</p></td>
      </tr>
      <tr>
        <td><p>-m, --modify</p></td>
        <td><p>TARGET_NAME</p></td>
        <td><p>Modifies target device's information except a target device's name. For more details, see <a href="#examples-3">Examples</a>.</p></td>
      </tr>
      <tr>
        <td><p>-i, --info</p></td>
        <td><p>DEVICE_INFO</p></td>
        <td><p>Sets information for the target device. For more details on <code>DEVICE_INFO</code>, see <a href="#parameter-2">Parameters</a>.</p></td>
      </tr>
      <tr>
        <td><p>-r, --remove</p></td>
        <td><p>TARGET_NAME</p></td>
        <td><p>Deletes a registered target device.</p></td>
      </tr>
      <tr>
        <td><p>-f, --default</p></td>
        <td><p>TARGET_NAME</p></td>
        <td><p>Sets a default target device. If you don't set a target device, the default target device is used as the target device.</p></td>
      </tr>
      <tr>
        <td><p>-R, --reset</p></td>
        <td><p>None</p></td>
        <td><p>Initializes the list of registered target devices.</p></td>
      </tr>
      <tr>
        <td><p>-l, --list</p></td>
        <td><p>None</p></td>
        <td><p>Lists registered target devices.</p></td>
      </tr>
      <tr>
        <td><p>-F, --listfull</p></td>
        <td><p>None</p></td>
        <td><p>Lists registered target devices' information with more details in the JSON format.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>DEVICE_INFO</p></td>
        <td>
          <p>Information of the target device in the format of <code>"key=value"</code> or a JSON-type string: <code>"{'key1':'value1', 'key2':'value2', ...}"</code>. For more details, see <a href="#examples-3">Examples</a>.</p>
          <p>The available keys are as follows:</p>
          <ul>
            <li>
              <p><strong>name</strong>: Target device's name</p>
              <ul>
               <li><p>The target device name should not start with '%' or '$'.</p></li>
              </ul>
            </li>
            <li><p><strong>description</strong>: Target device's description</p></li>
            <li><p><strong>host</strong>: Target device's host address</p></li>
              <ul>
                <li><p>You can use <code>localhost</code> as the host.</p></li>
              </ul>
            <li>
              <p><strong>port</strong>: Target device's port number</p>
              <ul>
                <li><p>The port number must be between 1 and 65535.</p></li>
              </ul>
            </li>
            <li>
              <p><strong>username</strong>: Username for accessing the target device</p>
              <ul>
                <li><p>root (default) – To be used by internal users only.</p></li>
              </ul>
            </li>
            <li>
              <p><strong>password:</strong> Password for authenticating the <strong>root</strong> user</p>
              <ul>
                <li><p>By default the password for root user is blank.</p></li>
                <li><p>If the password was previously set for a root user, then enter it here.</p></li>
              </ul>
            </li>
            <li>
            <p><strong>privatekey</strong>: Filename of SSH private key</p>
              <ul>
                <li><p>Not applicable to the root user.</p></li>
                <li><p>For the device, do not enter anything, leave it blank. The value will be auto-generated by using the passphrase provided by the user.</p></li>
              </ul>
            </li>
            <li><p><strong>passphrase</strong>: Passphrase for using the SSH private key file</p></li>
            <li>
              <p><strong>default</strong>: Setting a default device</p>
              <ul>
                <li><p>Enter <code>true</code> to set a default device. Default value is <code>false</code>.</p></li>
                <li><p>This key must be used with <code>--add</code> option.</p></li>
              </ul>
            </li>
            </ul>
          <p>When using CLI in interactive mode, take care when entering the required values or choosing to use the default values, otherwise you might not be able to use the device.</p>
        </td>
      </tr>
      <tr>
        <td><p>TARGET_NAME</p></td>
        <td><p>The name of a target device</p></td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Listing target devices

    ```shell
    ares-setup-device --list

    name               deviceinfo               connection  profile
    ------------------ ------------------------ ----------- -------
    emulator (default) developer@127.0.0.1:6622 ssh         ose
    ```

* Listing all details of target devices

    ```shell
    ares-setup-device --listfull

    [
        {
            "profile": "rpi",
            "name": "device",
            "deviceinfo": {
                "ip": "127.0.0.1",
                "port": "22",
                "user": "root"
            },
            "connection": [
                "ssh"
            ],
            "details": {
                "platform": "webos",
                "password": "",
                "description": "webOS Open Device"
            }
        }
    ]
    ```

* Adding a target device as the default device (target device name: `target`, host address: `10.123.45.67`, port number: `22`, user: `root`)

    ```shell
    ares-setup-device --add target -i "host=10.123.45.67" -i "port=22" -i "username=root" -i "default=true"
    ```

* Adding a target device with a JSON-type string (target device name: `target`, host address: `10.123.45.67`, port number: `22`, user: `root`)

    ```shell
    ares-setup-device --add target --info "{'host':'10.123.45.67', 'port':'22', 'username':'root', 'default':true}"
    ```

* Adding a target device with interactive mode (target device name: `target`, host address: `10.123.45.67`, port number: `22`, user: `root`)

    ```shell
    ares-setup-device

    name               deviceinfo               connection  profile
    ------------------ ------------------------ ----------- -------
    emulator (default) developer@127.0.0.1:6622 ssh         ose

    ** You can modify the device info in the above list, or add a new device.
    ? Select: add
    ? Enter Device Name: target
    ? Enter Device IP address: 10.123.45.67
    ? Enter Device Port: 22
    ? Enter ssh user: root
    ? Enter description: sample
    ? Select authentication: password
    ? Enter password: [hidden]
    ? Set default? Yes
    ? Save? Yes

    name               deviceinfo               connection profile
    ------------------ ------------------------ ---------- -------
    target (default)   root@10.123.45.67:22     ssh        ose
    emulator           developer@127.0.0.1:6622 ssh        ose
    ```

    {{< note >}}
    If you want to use the default values or an empty value, press the **Enter** key without any input.
    {{< /note >}}

* Modifying a target device (target device name: `target`, port number: `9922`)

    ```shell
    ares-setup-device --modify target -i "port=9922"
    ```

* Modifying a target device with interactive mode (target device name: `target`, port number: `9922`)

    ```shell
    ares-setup-device

    name               deviceinfo               connection profile
    ------------------ ------------------------ ---------- -------
    target (default)   root@10.123.45.67:22     ssh        ose
    emulator           developer@127.0.0.1:6622 ssh        ose

    ** You can modify the device info in the above list, or add a new device.
    ? Select: modify
    ? Enter Device Name: target
    ? Enter Device IP address: 10.123.45.67
    ? Enter Device Port: 9922
    ? Enter ssh user: root
    ? Enter description: sample
    ? Select authentication: password
    ? Enter password: [hidden]
    ? Save? Yes

    name             deviceinfo               connection profile
    ---------------- ------------------------ ---------- -------
    target (default) root@10.123.45.67:9922   ssh        ose
    emulator         developer@127.0.0.1:6622 ssh        ose
    ```

    {{< note >}}
    If you want to use the preset values, press the **Enter** key without any input.
    {{< /note >}}

* Setting a target device as the default device

    ``` shell
    ares-setup-device --default target
    ```

* Removing a target device

    ```shell
    ares-setup-device --remove target
    ```

### ares-install

This command installs an packaged app on the target device. You can also check the list of installed apps or remove them with this command.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--level</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-install [OPTION...] PKG_FILE

ares-install [OPTION...] --remove|-r APP_ID

ares-install [OPTION...] --list|-l

ares-install [OPTION...] --listfull|-F

ares-install --device-list|-D

ares-install --version|-V

ares-install --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:20%"><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-d, --device</p></td>
        <td><p>TARGET_DEVICE</p></td>
        <td>
          <p>Specifies a target device to connect.</p>
          <p>If this option is not specified, the default target device is connected.</p>
        </td>
      </tr>
      <tr>
        <td><p>-D, --device-list</p></td>
        <td><p>None</p></td>
        <td><p>Lists all the target devices.</p></td>
      </tr>
      <tr>
        <td><p>-l, --list</p></td>
        <td><p>None</p></td>
        <td><p>Lists installed applications on the target device.</p></td>
      </tr>
      <tr>
        <td><p>-F, --listfull</p></td>
        <td><p>None</p></td>
        <td><p>Lists the installed applications on the target device with more details.</p></td>
      </tr>
      <tr>
        <td><p>-r, --remove </p></td>
        <td><p>APP_ID</p></td>
        <td><p>Removes an application on the target device.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>


#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>PKG_FILE</p></td>
        <td><p>The path of the package file (<code>.ipk</code>)</p></td>
      </tr>
      <tr>
        <td><p>APP_ID</p></td>
        <td><p>The ID of an app (ex. <code>com.webos.exampleapp</code>)</p></td>
      </tr>
      <tr>
        <td><p>TARGET_DEVICE</p></td>
        <td><p>The name of a target device</p></td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Listing available target devices

    ```shell
    ares-install --device-list
    ```

* Installing an app on the target device

    ```shell
    ares-install --device target com.example.sampleapp_1.0.0_all.ipk
    ```

* Listing apps installed on the target device

    ```shell
    ares-install --device target --list
    ```

* Removing an app from the target device

    ```shell
    ares-install --device target --remove com.example.sampleapp
    ```

### ares-launch

This command launches or terminates the application installed on the target device. This command can also display the list of applications running on the target device.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--level</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.12.0</p></td>
        <td><p>Supports the <code>--hosted</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.11.0</p></td>
        <td><p>Supports the <code>--display</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-launch [OPTION...] APP_ID

ares-launch [OPTION...] --close APP_ID

ares-launch [OPTION...] --running|-r

ares-launch --device-list|-V

ares-launch --version|-V

ares-launch --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
        <td><p>-d, --device</p></td>
        <td><p>TARGET_DEVICE</p></td>
        <td>
          <p>Specifies a target device to connect.</p>
          <p>If this option is not specified, the default target device is connected.</p>
        </td>
      </tr>
      <tr>
        <td><p>-D, --device-list</p></td>
        <td><p>None</p></td>
        <td><p>Lists all the target devices.</p></td>
      </tr>
      <tr>
        <td><p>--close</p></td>
        <td><p>APP_ID</p></td>
        <td><p>Terminates an application on the target device.</p></td>
      </tr>
      <tr>
        <td><p>-r, --running</p></td>
        <td><p>None</p></td>
        <td><p>Lists applications that are running on the target device.</p></td>
      </tr>
      <tr>
        <td><p>-dp, --display</p></td>
        <td><p>DISPLAY_ID</p></td>
        <td><p>Launches an application on a specified display.</p></td>
      </tr>
      <tr>
        <td><p>-p, --params</p></td>
        <td><p>PARAMS</p></td>
        <td><p>Launches an application with specified parameters. For more details, see <code>PARAMS</code> in <a href="#parameters-4">Parameters</a> and <a href="#examples-5">Examples</a>.</p></td>
      </tr>
      <tr>
        <td><p>-H, --hosted</p></td>
        <td><p>APP_DIR</p></td>
        <td>
          <p>Runs an app without installing it.</p>
          <p>This option launches a dummy app (ID: <code>com.sdk.ares.hostedapp</code>) on the target device. To close this app, use the <code>--close</code> option with <code>com.sdk.ares.hostedapp</code> as an app ID.</p>
        </td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>APP_ID</p></td>
        <td><p>The ID of an app (ex. <code>com.webos.exampleapp</code>)</p></td>
      </tr>
      <tr>
        <td><p>APP_DIR</p></td>
        <td>
          <p>An app directory to preview</p>
        </td>
      </tr>
      <tr>
        <td><p>DISPLAY_ID</p></td>
        <td>
          <p>The ID of a display to launch</p>
          <p>It should be an integer type. (Use <code>0</code> for the primary display and <code>1</code> for the secondary display.)</p>
        </td>
      </tr>
      <tr>
        <td><p>TARGET_DEVICE</p></td>
        <td><p>The name of a target device</p></td>
      </tr>
      <tr>
        <td><p>PARAMS</p></td>
        <td>
          <p>Parameters which are used on application launching</p>
          <p>This parameters should be a JSON-type string: <code>"{'param1':'value1', 'param2':'value2 which contains spaces', ...}"</code>. See also <code>params</code> in the <a href="/docs/reference/ls2-api/com-webos-service-applicationmanager/#launch">launch</a> method.</p>
        </td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Launching the application installed on the target device

    ```shell
    ares-launch --device target com.example.sampleapp
    ```

* Launching the application with URL parameter

    ```shell
    ares-launch --device target com.example.sampleapp --params "{'url':'webosose.org'}"
    ```

    {{< note >}}
    When you use parameters on a web app, the web app will receive the parameters through the `webOSLaunch` event. For more detailed information on the `webOSLaunch` event, see [Web App Lifecycle]({{< relref "web-app-lifecycle" >}}).
    {{< /note >}}

* Launching the application on the primary display

    ``` shell
    ares-launch --device target com.example.sampleapp --display 0
    ```

* Listing applications running on the target device

    ```shell
    ares-launch --device target --running
    ```

* Terminating application currently running

    ```shell
    ares-launch --device target --close com.example.sampleapp
    ```

* Terminating application on the primary display

    ```shell
    ares-launch --device target --close com.example.sampleapp --display 0
    ```

* Running the app without installation

    ```shell
    ares-launch --device target --hosted sampleApp
    ```

### ares-inspect

This command enables Web Inspector or Node's Inspector. Each inspector displays the run-time information of a web application or a JS service, respectively.

{{< caution >}}
We highly recommend you to use the same version as Chrome/Chromium of webOS OSE. Using other versions might cause unexpected errors.

- To check the Chromium version of your target device, do one of the following:
    - Execute the `ares-device -i` command. In this case, make sure `username` of the target device is set as `root`. Otherwise the Chromium version won't be displayed. For more details on how to set up the `username`, see [DEVICE_INFO](#parameters-2) of `ares-setup-device`.
    - Execute the `Web Browser` app and go to http://useragentstring.com.
    - Visit the [webOS OSE GitHub](https://github.com/webosose?q=chromium&type=&language=) and find a Chromium repository of the latest version. Then see `src/chrome/VERSION` file.
- To download old builds of Chrome/Chromium, visit the [Chromium Project website](https://www.chromium.org/getting-involved/download-chromium).
{{< /caution >}}

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.4.0</p></td>
        <td><p>Updates guide messages of the <code>--service</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--level</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v2.0.2</p></td>
        <td><p>Supports the <code>--display</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-inspect [OPTION...] [--app|-a] APP_ID

ares-inspect [OPTION...] --service|-s SERVICE_ID

ares-inspect --device-list|-D

ares-inspect --version|-V

ares-inspect --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-a, --app</p></td>
        <td><p>APP_ID</p></td>
        <td><p>Specifies the application to debug with Web Inspector.</p></td>
      </tr>
      <tr>
        <td><p>-s, --service</p></td>
        <td><p>SERVICE_ID</p></td>
        <td><p>Specifies the JS service to debug with Node's Inspector.</p></td>
      </tr>
      <tr>
        <td><p>-o, --open</p></td>
        <td><p>None</p></td>
        <td>
          <p>Opens the default browser of the host machine. This option is only available for Web Inspector, thus can be used with the <code>-a, --app</code> option only.<p>
          <p>Web Inspector works in the Blink-based web browsers (e.g., Chrome or Opera) only. If your default browser is not the Blink-based browsers, such as Safari or Internet Explorer, you must re-open the inspector page in the Blink-based browsers.</p>
          {{< note >}}
          To connect to Node's Inspector, you should use one of the Node's Inspector clients, such as Chrome DevTools or Visual Studio Code. For more information, see <a href="https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients">Inspector Clients</a>.
          {{< /note >}}
        </td>
      </tr>
      <tr>
        <td><p>-d, --device</p></td>
        <td><p>TARGET_DEVICE</p></td>
        <td>
          <p>Specifies a target device to connect.</p>
          <p>If this option is not specified, the default target device is connected.</p>
        </td>
      </tr>
      <tr>
        <td><p>-D, --device-list</p></td>
        <td><p>None</p></td>
        <td><p>Lists all the target devices.</p></td>
      </tr>
      <tr>
        <td><p>-dp, --display</p></td>
        <td><p>DISPLAY_ID</p></td>
        <td><p>Launches an application and opens Web Inspector on a specified display.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>APP_ID</p></td>
        <td><p>The ID of an app (ex. <code>com.webos.exampleapp</code>)</p></td>
      </tr>
      <tr>
        <td><p>SERVICE_ID</p></td>
        <td><p>The ID of a JS service (ex. <code>com.webos.exampleapp.service</code>)</p></td>
      </tr>
      <tr>
        <td><p>TARGET_DEVICE</p></td>
        <td><p>The name of a target device</p></td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Running the Web Inspector for an application

    ```shell
    ares-inspect --device target --app com.example.sampleapp
    ```

* Running the Node's Inspector for a JS service

    ```shell
    ares-inspect --device target --service com.example.sampleapp.sampleservice
    ```

### ares-server

This command runs a web server for testing local files. The web server will run on the given path. You can terminate the web server by pressing **Control+C** on the shell prompt.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--level</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-server [OPTION...] APP_DIR

ares-server --version|-V

ares-server --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-p, --port</p></td>
        <td><p>PORT</p></td>
        <td><p>Specifies the port to be used. (Default: random)</td>
      </tr>
      <tr>
        <td><p>-o, --open</p></td>
        <td><p>None</p></td>
        <td><p>Opens the default browser of the host machine.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>APP_DIR</p></td>
        <td><p>The directory where the application's <code>appinfo.json</code> file is located</p></td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Running the web server in a source directory

    ```shell
    ares-server ./source
    ```

* Running the web server with the default browser

    ```shell
    ares-server ./source --open
    ```

### ares-shell

This command runs a shell prompt of the target device and executes shell commands in the shell prompt.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--level</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-shell -d TARGET_DEVICE

ares-shell -d TARGET_DEVICE -r CMD

ares-shell --device-list|-D

ares-shell --version

ares-shell --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-d, --device</p></td>
        <td><p>TARGET_DEVICE</p></td>
        <td>
          <p>Specifies a target device to connect.</p>
          <p>If this option is not specified, the default target device is connected.</p>
        </td>
      </tr>
      <tr>
        <td><p>-r, --run</p></td>
        <td><p>CMD</p></td>
        <td><p>Executes shell commands on the target device.</p></td>
      </tr>
      <tr>
        <td><p>-D, --device-list</p></td>
        <td><p>None</p></td>
        <td><p>Lists all the target devices.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>CMD</p></td>
        <td><p>Shell commands to be executed on the target device</p></td>
      </tr>
      <tr>
        <td><p>TARGET_DEVICE</p></td>
        <td><p>The name of a target device</p></td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Opening a shell of the target device

    ```shell
    ares-shell --device target
    ```

* Executing a command inside the shell of the target device

    ```shell
    ares-shell --device target -r "pwd"
    ```

    ```shell
    ares-shell --device target -r "echo hello webOS"
    ```

### ares-push

This command pushes files from a host machine to a target device.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p>
      </th>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--level</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-push [OPTION...] SOURCE DESTINATION

ares-push --device-list|-D

ares-push --version|-V

ares-push --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-d, --device</p></td>
        <td><p>TARGET_DEVICE</p></td>
        <td>
          <p>Specifies a target device to connect.</p>
          <p>If this option is not specified, the default target device is connected.</p>
        </td>
      </tr>
      <tr>
        <td><p>-D, --device-list</p></td>
        <td><p>None</p></td>
        <td><p>Lists all the target devices.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-i, --ignore</p></td>
        <td><p>None</p></td>
        <td><p>Prints the short version of output messages.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>SOURCE</p></td>
        <td><p>A file/directory path of the host machine</p></td>
      </tr>
      <tr>
        <td><p>DESTINATION</p></td>
        <td><p>A file/directory path of the target device</p></td>
      </tr>
      <tr>
        <td><p>TARGET_DEVICE</p></td>
        <td><p>The name of a target device</p></td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Listing available target devices

    ```shell
    ares-push --device-list
    ```

* Pushing a directory from the host machine to the target device

    ```shell
    ares-push --device target /host/directory/ /target/directory/
    ```

* Pushing a file from the host machine to the target device

    ```shell
    ares-push --device target /host/directory/file.txt /target/directory/file.txt
    ```

### ares-pull

This command pulls the files from a target device to a host machine.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--level</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v1.6.4</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-pull [OPTION...] SOURCE DESTINATION

ares-pull --device-list|-D

ares-pull --version|-V

ares-pull --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-d, --device</p></td>
        <td><p>TARGET_DEVICE</p></td>
        <td>
          <p>Specifies a target device to connect.</p>
          <p>If this option is not specified, the default target device is connected.</p>
        </td>
      </tr>
      <tr>
        <td><p>-D, --device-list</p></td>
        <td><p>None</p></td>
        <td><p>Lists all the target devices.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-i, --ignore</p></td>
        <td><p>None</p></td>
        <td><p>Prints the short version of output messages.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>SOURCE</p></td>
        <td><p>A file/directory path of the target device</p></td>
      </tr>
      <tr>
        <td><p>DESTINATION</p></td>
        <td><p>A file/directory path of the host machine</p></td>
      </tr>
      <tr>
        <td><p>TARGET_DEVICE</p></td>
        <td><p>The name of a target device</p></td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Listing available target devices

    ```shell
    ares-pull --device-list
    ```

* Pulling a directory from the target device to the host machine

    ```shell
    ares-pull --device target /target/directory/ /host/directory/
    ```

* Pulling a file from the target device to the host machine

    ```shell
    ares-pull --device target /target/directory/file.txt /host/directory/file.txt
    ```

### ares-device

This command displays the information of the target device.

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.4.0</p></td>
        <td><p>Supports the Node.js version in the <code>--system-info</code> result.</p></td>
      </tr>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports the <code>--resource-monitor</code> and the <code>--level</code> options.</p></td>
      </tr>
      <tr>
        <td><p>v2.1.0</p></td>
        <td><p>Supports the <code>--capture-screen</code> option.</p></td>
      </tr>
      <tr>
        <td><p>v2.0.0</p></td>
        <td><p><code>ares-device-info</code> is replaced by <code>ares-device</code>.</p></td>
      </tr>
      <tr>
        <td><p>v1.13.0</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

``` shell
ares-device [OPTION...] [TARGET_DEVICE]

ares-device --device-list|-D

ares-device --version|-V

ares-device --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:20%" colspan="2"><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="2"><p>-i, --system-info</p></td>
        <td><p>None</p></td>
        <td><p>Displays the device system information.</p></td>
      </tr>
      <tr>
        <td colspan="2"><p>-r, --resource-monitor</p></td>
        <td><p>None</p></td>
        <td><p>Monitors resource usage.</p></td>
      </tr>
      <tr>
        <td><p></p></td>
        <td><p>-l, --list</p></td>
        <td><p>None</p></td>
        <td>
          <p>Monitors resource usage of running apps and services.</p>
          <p>Use this option in conjunction with the <code>-r, --resource-monitor</code> option.</p>
        </td>
      </tr>
      <tr>
        <td><p></p></td>
        <td><p>-id, --id-filter</p></td>
        <td><p>ID</p></td>
        <td>
          <p>Monitors resource usage of an app or service.</p>
          <p>Use this option in conjunction with the <code>-r, --resource-monitor</code> option.</p>
        </td>
      </tr>
      <tr>
        <td><p></p></td>
        <td><p>-t, --time-interval</p></td>
        <td><p>SECONDS</p></td>
        <td>
          <p>Sets the monitoring interval (seconds).</p>
          <p>Use this option in conjunction with the <code>-r, --resource-monitor</code> option.</p>
        </td>
      </tr>
      <tr>
        <td><p></p></td>
        <td><p>-s, --save </p></td>
        <td><p>CSV_FILE</p></td>
        <td>
          <p>Saves resource usage data to <code>CSV_FILE</code>.</p>
          <p>Use this option in conjunction with the <code>-r, --resource-monitor</code> option.</p>
        </td>
      </tr>
      <tr>
        <td colspan="2"><p>-c, --capture-screen</p></td>
        <td><p>OUTPUT_PATH</p></td>
        <td><p>Captures screen and saves the captured image to the host machine.</p></td>
      </tr>
      <tr>
        <td><p></p></td>
        <td><p>-dp, --display</p></td>
        <td><p>DISPLAY_ID</p></td>
        <td>
          <p>Specifies DISPLAY_ID.</p>
          <p>Use this option in conjunction with the <code>-c, --capture-screen</code> option.</p>
        </td>
      </tr>
      <tr>
        <td colspan="2"><p>-d, --device</p></td>
        <td><p>TARGET_DEVICE</p></td>
        <td>
          <p>Specifies a target device to connect.</p>
          <p>If this option is not specified, the default target device is connected.</p>
        </td>
      </tr>
      <tr>
        <td colspan="2"><p>-D, --device-list</p></td>
        <td><p>None</p></td>
        <td><p>Lists all the target devices.</p></td>
      </tr>
      <tr>
        <td colspan="2"><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td><p>Prints help messages.</p></td>
      </tr>
      <tr>
        <td colspan="2"><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td colspan="2"><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td colspan="2"><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>TARGET_DEVICE</p></td>
        <td><p>The name of a target device</p></td>
      </tr>
      <tr>
        <td><p>ID</p></td>
        <td><p>The ID of an app or service whose resource usage be displayed</p></td>
      <tr>
      <tr>
        <td><p>SECONDS</p></td>
        <td><p>A period for monitoring the resource usage (seconds)</p></td>
      <tr>
      <tr>
        <td><p>CSV_FILE</p></td>
        <td>
          <p>A file name or path to save the resource usage data</p>
          <p>The file format can be only <code>.csv</code>.</p>
        </td>
      <tr>
        <td><p>OUTPUT_PATH</p></td>
        <td><p>A file or directory path of the host machine to save captured file</p></td>
      </tr>
      <tr>
        <td><p>DISPLAY_ID</p></td>
        <td>
          <p>The ID of a display to be captured</p>
          <p>It should be an integer type. (Use <code>0</code> for the primary display and <code>1</code> for the secondary display.)</p>
        </td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Displaying the system information of the target device

    ``` shell
    ares-device --system-info --device target
    ```

* Displaying resource usage

    ``` shell
    ares-device --resource-device --device target
    ```

* Displaying resource usage periodically and saving them to a CSV file

    ``` shell
    ares-device --resource-device --save resource.csv --time-interval 1 --device target
    ```

* Displaying resource usage of running apps and services

    ``` shell
    ares-device --resource-device --list --time-interval 3 --device target
    ```

* Displaying resource usage of specified running app

    ``` shell
    ares-device --resource-device --id-filter com.examples.app --time-interval 5 --device target
    ```

* Capturing the display `1` and saves it as `screen.png`

    ``` shell
    ares-device --capture-screen screen.png --display 1 --device target
    ```


### ares-log (journal)

This command shows, filters, and saves logs collected by journald.

{{< note >}}
To display logs and help messages properly, you must set the logging daemon of CLI to same as that of the target device. For more details on how to check and change the logging daemon, see `--current-daemon` and `--switch-daemon` in [Options](#options-12).
{{</ note >}}

For more information about analyzing journal logs, see [Viewing Logs when journald is Enabled]({{< relref "viewing-logs-journald" >}}).

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Supports <code>--current-daemon</code>, <code>--switch-daemon</code>, and <code>--level</code> options.</p></td>
      </tr>
      <tr>
        <td><p>v2.2.0</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-log [OPTION...] 

ares-log [OPTION...] --follow|-f

ares-log [OPTION...] --reverse|-r

ares-log [OPTION...] --lines|-n LINE

ares-log [OPTION...] --boot|-b

ares-log [OPTION...] --dmesg|-k

ares-log [OPTION...] --priority|-p PRIORITY

ares-log [OPTION...] --pid|-pid PID

ares-log [OPTION...] --since|-S DATE

ares-log [OPTION...] --until|-U DATE

ares-log [OPTION...] --unit-list|-ul

ares-log [OPTION...] --unit|-u UNIT

ares-log [OPTION...] --file-list|-fl

ares-log [OPTION...] --file|-file JOURNAL_FILE

ares-log --device-list|-D

ares-log --version|-V

ares-log --help|-h
```

#### Options
 		
<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:20%"><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-cd, --current-daemon</p></td>
        <td><p>None</p></td>
        <td><p>Checks the current logging daemon of CLI and the target device.</p></td>
      </tr>
      <tr>
        <td><p>-sd, --switch-daemon</p></td>
        <td><p>LOGGING_DAEMON</p></td>
        <td><p>Changes the current logging daemon of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-o, --output</p></td>
        <td><p>OUTPUT_MODE</p></td>
        <td><p>Changes the log format.</p></td>
      </tr>
      <tr>
        <td><p>-s, --save</p></td>
        <td><p>SAVED_FILE</p></td>
        <td><p>Saves logs into a file.</p></td>
      </tr>
      <tr>
        <td><p>-dp, --display</p></td>
        <td><p>DISPLAY_ID</p></td>
        <td>
          <p>Selects the display to show logs.</p> 
          <p>Use this option in conjunction with the <code>unit</code> and <code>unit-list</code> options.</p>
        </td>
      </tr>
      <tr>
        <td><p>-d, --device</p></td>
        <td><p>TARGET_DEVICE</p></td>
        <td>
          <p>Specifies a target device to connect.</p>
          <p>If this option is not specified, the default target device is connected.</p>
        </td>
      </tr>
      <tr>
        <td><p>-D, --device-list</p></td>
        <td><p>None</p></td>
        <td><p>Lists all the target devices.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td>
          <p>Prints help messages.</p>
          <p>
          {{< note >}}
          Help messages vary depending on the current logging daemon of CLI. Before using this option, make sure you set the right daemon you want.
          {{</ note >}}
          </p>
        </td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Prints verbose output.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>
 		
#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>LINE</p></td>
        <td><p>The number of lines to show</p></td>
      </tr>
      <tr>
        <td><p>PRIORITY</p></td>
        <td>
          <p>A priority level of logs</p>
          <p>For more details, see <a href="/docs/guides/development/logging/viewing-logs/viewing-logs-journald/#filter-messages-by-priority">Filter Messages by Priority</a>.</p>
        </td>
      </tr>
      <tr>
        <td><p>PID</p></td>
        <td><p>The ID of a process to check logs</p></td>
      </tr>
      <tr>
        <td><p>DATE</p></td>
        <td><p>A timestamp in the format: <code>YYYY-MM-DD hh:mm:ss</code></p></td>
      </tr>
      <tr>
        <td><p>UNIT</p></td>
        <td>
          <p>Unit name to check logs</p>
          <p>To get the list of available <code>UNIT</code> values, use the <code>--unit-list</code> option.</p>
        </td>
      </tr>
      <tr>
        <td><p>JOURNAL_FILE</p></td>
        <td>
          <p>The name of a journal files</p>
          <p>To get the list of available <code>JOURNAL_FILE</code> values, use the <code>--file-list</code> option.</p>
        </td>
      </tr>
      <tr>
        <td><p>LOGGING_DAEMON</p></td>
        <td><p>A name of the logging daemon (e.g., journald, pmlogd)</p></td>
      </tr>
      <tr>
        <td><p>OUTPUT_MODE</p></td>
        <td>
          <p>A format of log messages</p>
          <p>For more details, see <a href="/docs/guides/development/logging/viewing-logs/viewing-logs-journald/#format-logs">Format Logs</a>.</p>
        </td>
      </tr>
      <tr>
        <td><p>SAVED_FILE</p></td>
        <td><p>A file name or path to save logs</p></td>
      </tr>
      <tr>
        <td><p>DISPLAY_ID</p></td>
        <td>
          <p>The ID of a display to check logs</p>
          <p>It should be an integer type. (Use <code>0</code> for the primary display and <code>1</code> for the secondary display.)</p>
        </td>
      </tr>
      <tr>
        <td><p>TARGET_DEVICE</p></td>
        <td><p>The name of a target device</p></td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Checking the current logging daemon

    ``` shell
    ares-log -cd -d DEVICE
    ```

*  Changing the current logging daemon to pmlogd

    ``` shell
    ares-log -sd pmlogd -d DEVICE
    ```

* Following the journals

    ``` shell
    ares-log -f -d DEVICE
    ```

* Displaying the number of journal entries to show

    ``` shell
    ares-log -n 10 -d DEVICE
    ```

* Displaying logs between the two `DATE`s

    ``` shell
    ares-log -S 2021-03-18 21:38:00 --until 2021-03-18 21:39:00 -d DEVICE
    ```

* Displaying a list of the stored journal files

    ``` shell
    ares-log -fl -d DEVICE
    ```

* Displaying stored logs from `system.journal` in the JSON format

    ``` shell
    ares-log -file system.journal -o json -d DEVICE
    ```

* Displaying logs of the specified process ID and saving them to a log file

    ``` shell
    ares-log -pid 1735 -s pid_1735.log -d DEVICE
    ```

* Displaying logs of the specified unit

    ``` shell
    ares-log -u sam -d DEVICE
    ```

### ares-log (pmlog)

This command shows, filters, and saves logs collected by pmlogd.

{{< note >}}
To print logs and help messages properly, you must set the logging daemon of CLI to same as that of the target device. For more details on how to check and change the logging daemon, see `--current-daemon` and `--switch-daemon` in [Options](#options-13).
{{</ note >}}

For more information about analyzing pmlog logs, see [Viewing Logs when pmlogd is Enabled]({{< relref "viewing-logs-pmlogd" >}}).

#### History

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:15%"><p>Version</p></th>
        <th><p>Changes</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>v2.3.1</p></td>
        <td><p>Added in.</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Usages

```shell
ares-log [OPTION...] 

ares-log [OPTION...] --follow|-f

ares-log [OPTION...] --lines|-n LINE

ares-log --device-list|-D

ares-log --version|-V

ares-log --help|-h
```

#### Options

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th style="width:20%"><p>Option</p></th>
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>-cd, --current-daemon</p></td>
        <td><p>None</p></td>
        <td><p>Checks the current logging daemon of CLI and the target device.</p></td>
      </tr>
      <tr>
        <td><p>-sd, --switch-daemon</p></td>
        <td><p>LOGGING_DAEMON</p></td>
        <td><p>Changes the current logging daemon of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-id, --id-filter</p></td>
        <td><p>ID</p></td>
        <td><p>Shows logs from a app or service of ID.</p></td>
      </tr>
      <tr>
        <td><p>-s, --save</p></td>
        <td><p>SAVED_FILE</p></td>
        <td><p>Saves logs into a file.</p></td>
      </tr>
      <tr>
        <td><p>-cl, --context-list</p></td>
        <td><p>None</p></td>
        <td><p>Lists the contexts and those log level.</p></td>
      </tr>
      <tr>
        <td><p>-sl, --set-level</p></td>
        <td><p>CONTEXT CONTEXT_LEVEL</p></td>
        <td><p>Sets the log level of <code>CONTEXT</code> to <code>CONTEXT_LEVEL</code>.</p></td>
      </tr>
      <tr>
        <td><p>-d, --device</p></td>
        <td><p>TARGET_DEVICE</p></td>
        <td>
          <p>Specifies a target device to connect.</p>
          <p>If this option is not specified, the default target device is connected.</p>
        </td>
      </tr>
      <tr>
        <td><p>-D, --device-list</p></td>
        <td><p>None</p></td>
        <td><p>Lists all the available devices.</p></td>
      </tr>
      <tr>
        <td><p>-h, --help</p></td>
        <td><p>None</p></td>
        <td>
          <p>Prints help messages.</p>
          <p>
          {{< note >}}
          Help messages vary depending on the current logging daemon of CLI. Before using this option, make sure you set the right daemon you want.
          {{</ note >}}
          </p>
        </td>
      </tr>
      <tr>
        <td><p>-V, --version</p></td>
        <td><p>None</p></td>
        <td><p>Prints the version of CLI.</p></td>
      </tr>
      <tr>
        <td><p>-v</p></td>
        <td><p>None</p></td>
        <td><p>Displays the verbose logs.</p></td>
      </tr>
      <tr>
        <td><p>--level</p></td>
        <td><p>LEVEL</p></td>
        <td><p>Sets the level of logs as <code>LEVEL</code> and prints the logs.</p></td>
      </tr>
    </tbody>
  </table>
</div>
 		
#### Parameters

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr class="header">
        <th><p>Parameter</p></th>
        <th><p>Description</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>LINE</p></td>
        <td><p>The number of lines to show</p></td>
      </tr>
      <tr>
        <td><p>LOGGING_DAEMON</p></td>
        <td><p>A name of the logging daemon (e.g., journald, pmlogd)</p></td>
      </tr>
      <tr>
        <td><p>ID</p></td>
        <td><p>The ID of an app or service</p></td>
      </tr>
      <tr>
        <td><p>SAVED_FILE</p></td>
        <td><p>A file name or path to save logs</p></td>
      </tr>
      <tr>
        <td><p>CONTEXT</p></td>
        <td><p>Name of context</p></td>
      </tr>
      <tr>
        <td><p>CONTEXT_LEVEL</p></td>
        <td><p>A priority of specific context logs (e.g., info, notice, warning, err)</p></td>
      </tr>
      <tr>
        <td><p>LEVEL</p></td>
        <td><p>A priority of logs (e.g., silly, verbose, info, warn, error)</p></td>
      </tr>
    </tbody>
  </table>
</div>

#### Examples

Here are some examples of the different uses:

* Checking the current logging daemon

    ``` shell
    ares-log -cd -d DEVICE
    ```

* Changing the current logging daemon to journald

    ``` shell
    ares-log -sd journald-d DEVICE
    ```

* Following pmlog

    ``` shell
    ares-log -f -d DEVICE
    ```

* Setting the number of pmlog entries to show

    ``` shell
    ares-log -n 10 -d DEVICE
    ```

* Following logs and saving them to a log file

    ``` shell
    ares-log -f -s follow.log -d DEVICE
    ```

* Following logs of an app

    ``` shell
    ares-log -f -id com.examples.app -d DEVICE
    ```

* Following logs of a service and saving them to a log file

    ``` shell
    ares-log -f -id com.examples.app.service -s service.log -d DEVICE
    ```

* Showing context list of the target device

    ``` shell
    ares-log -cl -d DEVICE
    ```

* Setting the log level for a specific context to debug

    ``` shell
    ares-log -sl WAM debug -d DEVICE
    ```
