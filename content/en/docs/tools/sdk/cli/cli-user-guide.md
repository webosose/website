---
title: User Guide
display_title: Command-Line Interface User Guide
date: 2021-06-22
weight: 10
toc: true
---

**Command-Line Interface (CLI)** of webOS Open Source Edition (OSE). It provides a collection of commands used for creating, packaging, installing, and launching apps or services in the command line environment. CLI lets you develop and test apps or services without using any IDE.

## Key Features

CLI provides the following key features:

  - **App and Service Creation**
    - Provides standard templates for webOS OSE apps and services
    - Provides a list of available templates
    - Generates an app or a service and configures basic information
  - **App and Service Packaging**
    - Packages the source code and generates a package file (`.ipk`) to run on the target device
    - Provides a feature to exclude sample and test code directories from an app or a service
  - **Target Device Management**
    - Provides a list of target devices
    - Adds, modifies, and removes target devices
  - **App and Service Installation**
    - Installs the app and service on the target device
    - Provides a list of apps installed on the target device
    - Removes selected apps from the target device
  - **App Launching and Closing**
    - Launches selected apps
    - Closes apps that are running
    - Provides the list of apps running on the target device
  - **App and Service Debugging**
    - Enables Web Inspector for debugging web apps
    - Enables Node's Inspector for debugging JavaScript services
    - Provides web app information
    - Provides JavaScript service information
    - Shows or saves logs of webOS OSE apps and services

## System Requirements

### Operating Systems

Required version for each operating system are as follows:

<div class="table-container">
  <table class="table is-bordered is-fullwidth">
    <colgroup>
      <col style="width: auto" />
      <col style="width: auto" />
    </colgroup>
    <thead>
      <tr class="header">
        <th><p>OS</p></th>
        <th><p>Requirement</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>Linux</p></td>
        <td><p>Ubuntu 18.04 LTS 64-bit</p></td>
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

* Node.js (Use v8.12.0 to v14.15.1.)
* npm

## Installing CLI

You can install CLI using the following command. It is recommended to install CLI globally.

``` shell
$ npm install -g @webosose/ares-cli

# Check the installation.
$ ares --version
Version: 2.x.x
```

{{< note >}}
- For Linux and macOS, `sudo` command might be required depending on the environment.
- After the installation, check if the installed version matches with the latest version of [CLI npm package](https://www.npmjs.com/package/@webosose/ares-cli).
{{< /note >}}

## CLI Workflow

webOS OSE CLI provides features for developing web apps throughout the whole development process. The figure below shows some of CLI commands that can be used during each stage of the development process.

{{< figure src="/images/docs/tools/cli/cli-workflow.png" alt="" caption="Development Workflow with CLI" width="700px" >}}

{{< note >}}
For step-by-step instructions to create web apps and JS service using CLI commands, see [Creating Web Apps]({{< relref "developing-external-web-apps#creating-web-apps" >}}) and [Creating JS Services]({{< relref "developing-external-js-services#creating-js-services" >}}).
{{< /note >}}

## CLI Commands

The following table shows the available CLI commands.

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Commands</p></th>
<th><p>Descriptions</p></th>
</tr>
</thead>
<tbody>
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
<td><p><a href="#ares-log">ares-log</a></p></td>
<td><p>Shows or saves logs of webOS OSE apps or services.</p></td>
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
<td><p>Executes shell commands in the target device.</p></td>
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
</tbody>
</table></div>

### ares

This command provides the help menu for using the `ares` commands.

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>v1.6.4</p></td>
<td><p>Added in.</p></td>
</tr>
</tbody>
</table></div>

#### Usages

```shell
ares

ares [OPTION...]
```

#### Options

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Option</p></th>
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
<td><p>Displays the help menu of <code>COMMAND</code>.</p> 
<p><code>COMMAND</code> is entered using postfix of the <code>ares</code> commands. For more details, see <a href="#examples">Examples</a>.</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays this help menu.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

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

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
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
</table></div>

#### Usages

```shell
ares-generate [OPTION...] APP_DIR

ares-generate [OPTION...] -t js_service SERVICE_DIR

ares-generate --list|-l

ares-generate --version|-V

ares-generate --help|-h
```

#### Options

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 20%" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Option</p></th>
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>-t, --template</p></td>
<td><p>TEMPLATE</p></td>
<td><p>Uses the specified template. Available templates are:</p>
<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>Template Name</strong></p></th>
<th><p><strong>Brief Description</strong></p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>webapp</p></td>
<td><p>(Default) web app template for webOS</p></td>
</tr>
<tr>
<td><p>hosted_webapp</p></td>
<td><p>Hosted web app template for webOS</p></td>
</tr>
<tr>
<td><p>webappinfo</p></td>
<td><p>Creates an <code>appinfo.json</code> file for web apps.</p></td>
</tr>
<tr>
<td><p>js_service</p></td>
<td><p>JS service template for webOS</p></td>
</tr>
<tr>
<td><p>jsserviceinfo</p></td>
<td><p>Creates a <code>services.json</code> and <code>package.json</code> file for JS services.</p></td>
</tr>
<tr>
<td><p>icon</p></td>
<td><p>Creates an app icon file. [80x80]</p></td>
</tr>
<tr>
<td><p>qmlapp</p></td>
<td><p>	QML app template for webOS</p></td>
</tr>
<tr>
<td><p>qmlappinfo</p></td>
<td><p>Creates an <code>appinfo.json</code> for QML app.</p></td>
</tr>
</tbody>
</table></div></td>
</tr>
<tr>
<td><p>-p, --property</p></td>
<td><p>PROPERTY</p></td>
<td><p>Sets the properties of webOS OSE configuration files.</p></td>
</tr>
<tr>
<td><p>-s, --servicename</p></td>
<td><p>SERVICE_NAME</p></td>
<td><p>Specifies the JS Service ID.</p></td>
</tr>
<tr>
<td><p>-f, --overwrite</p></td>
<td><p>None</p></td>
<td><p>Allows overwriting of existing files.</p></td>
</tr>
<tr>
<td><p>-l, --list</p></td>
<td><p>None</p></td>
<td><p>Lists the available templates. See description of the <code>-t</code> option above.</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-generate</code> command</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>APP_DIR</p></td>
<td><p>Specifies the app directory. If the directory does not exist, the directory will be created while executing the command.</p></td>
</tr>
<tr>
<td><p>SERVICE_DIR</p></td>
<td><p>Specifies the service directory. If the specified directory does not exist, the directory will be created while executing the command.</p></td>
</tr>
<tr>
<td><p>PROPERTY</p></td>
<td><p>Specifies the app information. It is entered using JSON-type strings in the format of <code>"key=value"</code> or <code>"{'key1':'value1', 'key2':'value2', ...}"</code>.</p></td>
</tr>
<tr>
<td><p>TEMPLATE</p></td>
<td><p>Specifies the template to use when creating an app or a service. The default value is <code>webapp</code>.</p></td>
</tr>
<tr>
<td><p>SERVICE_NAME</p></td>
<td><p>ID of the service you are creating. The service ID should be a sub-domain of the ID of the app which the service belongs to.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

* Listing the templates (web application templates)

    ```shell
    ares-generate -l
    ```

* Creating a web application with the default template in `./sampleApp` directory

    ```shell
    ares-generate sampleApp
    ```

* Creating a web application with a custom app ID in `./sampleApp` directory

    ```shell
    ares-generate -p "id=com.example.sampleapp" sampleApp
    ```

* Creating a JS Service with a custom service ID in `./sampleService` directory

    ```shell
    ares-generate -t js_service -s com.example.sampleapp.sampleservice sampleService
    ```

    {{< note >}}
    The service ID should be a sub-domain of the ID of the app which the service belongs to.
    {{< /note >}}

* Creating a web app in the `./sampleApp` and setting properties with JSON string

    ```shell
    ares-generate -p "{'id':'com.example.sampleapp', 'version':'1.0.0', 'icon':'icon.png', 'type':'web', 'title':'Sample App', 'main':'index.html'}" sampleApp
    ```

### ares-package

This command packages an app and a JS service into a package file (`.ipk`) which is stored in a specified directory.

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>v1.12.0</p></td>
<td><p>Stops to support Enyo features.</p></td>
</tr>
<tr>
<td><p>v1.6.4</p></td>
<td><p>Added in.</p></td>
</tr>
</tbody>
</table></div>

#### Usages

```shell
ares-package [OPTION...] APP_DIR [SERVICE_DIR]

ares-package --version|-V

ares-package --help|-h
```

#### Options

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 20%" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Option</p></th>
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>-o, --outdir</p></td>
<td><p>OUT_DIR</p></td>
<td><p>Specifies a directory where the package file is created.</p></td>
</tr>
<tr>
<td><p>-c, --check</p></td>
<td><p>None</p></td>
<td><p>Checks whether the application's <code>appinfo.json</code> file exists or not. This option does not make package file. If <code>appinfo.json</code> file does not exist, warning messages appear.</p></td>
</tr>
<tr>
<td><p>-e, --app-exclude</p></td>
<td><p>EX_DIR</p></td>
<td><p>Lists the directories to exclude in the package file.</p></td>
</tr>
<tr>
<td><p>-r, --rom</p></td>
<td><p>None</p></td>
<td><p>Proceeds up to the stage just before creating package file phase.</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-package</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>APP_DIR</p></td>
<td><p>Specifies the directory where the application's <code>appinfo.json</code> file is located.</p></td>
</tr>
<tr>
<td><p>SERVICE_DIR</p></td>
<td><p>Specifies the directory where the service's <code>services.json</code></a> file is located.</p></td>
</tr>
<tr>
<td><p>OUT_DIR</p></td>
<td><p>Specifies the directory where the package file is to be created. If the directory is not entered, the package file is created in the same directory as the command.</p></td>
</tr>
<tr>
<td><p>EX_DIR</p></td>
<td><p>Specifies the name of directories and files to exclude from the application when packaging the package file. You should enter directories used for samples and tests. All subdirectories and files in the specified directory are excluded. And specified files also are excluded.</p>
<p>To exclude multiple directories, enter as <code>-e subdir -e filename</code>. You can use common pattern expression such as wildcard (*).</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

* Creating a package file from `./sampleApp` directory and outputting it in the working directory

    ```shell
    ares-package sampleApp
    ```

* Creating a package file from the `./sampleApp` directory and outputting it in `./output` directory

    ```shell
    ares-package -o output sampleApp
    ```

* Creating a package file except for `testCode1` sub-directory, `README.md` file and all text file (`.txt`)

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

### ares-setup-device

This command displays a list of registered target devices. You can add, modify, or remove them from the list. This command is mainly used to modify target's host address which is running on a remote host. If you execute the command without any options, the command runs in interactive mode.

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
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
</table></div>

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

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
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
<td><p>Adds a target device with the specified information.</p></td>
</tr>
<tr>
<td><p>-m, --modify</p></td>
<td><p>TARGET_NAME</p></td>
<td><p>Modifies a target device's information. You can change the information of the target device except for its name.</p></td>
</tr>
<tr>
<td><p>-i, --info</p></td>
<td><p>DEVICE_INFO</p></td>
<td><p>Sets information for the target device.</p></td>
</tr>
<tr>
<td><p>-r, --remove</p></td>
<td><p>TARGET_NAME</p></td>
<td><p>Deletes a target device that matches the device name you enter.</p></td>
</tr>
<tr>
<td><p>-f, --default</p></td>
<td><p>TARGET_NAME</p></td>
<td><p>Sets a default target device.</p><p>If you don't set a target device, the default target device is used as the target device.</p></td>
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
<td><p>Lists registered target devices' information with more detail (JSON string).</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-setup-device</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>DEVICE_INFO</p></td>
<td><p>Specifies the information of the target device. It can be entered using strings in the format of <code>"key=value"</code> or JSON-type such as <code>"{'key1':'value1', 'key2':'value2', ...}"</code>. You can use the following items as key for the target device:</p>
<ul>
<li><p><strong>name</strong>: Target device name</p>
<ul>
<li><p>The target device name should consist of letters, numbers, hyphen (<code>-</code>), underscore (<code>_</code>), and number sign (<code>#</code>) and start with letters or underscore (<code>_</code>).</p></li>
</ul>
</li>
<li><p><strong>description</strong>: Target device description</p></li>
<li><p><strong>host</strong>: Target device host address</p></li>
<li><p><strong>port</strong>: Target device port number</p></li>
<li><p><strong>username</strong>: Username for accessing the target device. Possible values:</p>
<ul>
<li><p>root (default) – To be used by internal users only.</p></li>
</ul></li>
<li><p><strong>password:</strong> Password for authenticating the <strong>root</strong> user.</p>
<ul>
<li><p>By default the password for root user is blank.</p></li>
<li><p>If the password was previously set for a root user, then enter it here.</p></li>
</ul></li>
<li><p><strong>privatekey</strong>: Filename of SSH private key.</p>
<ul>
<li><p>Not applicable to the root user.</p></li>
<li><p>For the device, do not enter anything, leave it blank. The value will be auto-generated by using the passphrase provided by the user.</p></li>
</ul></li>
<li><p><strong>passphrase</strong>: Passphrase for using the SSH private key file.</p></li>
<li><p><strong>default</strong>: Setting a default device.</p>
<ul><li><p>Enter <code>true</code> to set a default device. Default value is <code>false</code>.</p></li>
<li><p>This key must be used with <code>--add</code> option.</p></li></ul>
</li>
</ul>
<p> </p>
<p>When using CLI in interactive mode, take care when entering the required values or choosing to use the default values, otherwise you might not be able to use the device.</p></td>
</tr>
<tr>
<td><p>TARGET_NAME</p></td>
<td><p>Specifies the name of the target device.</p></td>
</tr>
</tbody>
</table></div>

The following example shows a `DEVICE_INFO` written in JSON format:

```shell
"{'host':'127.0.0.1', 'port':'22'}"
```

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

* Adding the target device as a default device (target device name: `target`, host address: `10.123.45.67`, port number: `22`, user: `root`)

    ```shell
    ares-setup-device --add target -i "host=10.123.45.67" -i "port=22" -i "username=root" -i "default=true"
    ```

* Adding the target device with JSON format (target device name: `target`, host address: `10.123.45.67`, port number: `22`, user: `root`)

    ```shell
    ares-setup-device --add target --info "{'host':'10.123.45.67', 'port':'22', 'username':'root', 'default':true}"
    ```

* Adding the target device with interactive mode (target device name: `target`, host address: `10.123.45.67`, port number: `22`, user: `root`)

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
    If you want to input default value or set empty, press the enter key without any value.
    {{< /note >}}

* Modifying the target device (target device name: `target`, port number: `9922`)

    ```shell
    ares-setup-device --modify target -i "port=9922"
    ```

* Modifying the target device with interactive mode (target device name: `target`, port number: `9922`)

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
    If you want to keep the previous value, press the enter key without any value.
    {{< /note >}}

* Setting the default device (target device name: `target`)

    ``` shell
    ares-setup-device --default target
    ```

* Removing the target device (target device name: `target`)

    ```shell
    ares-setup-device --remove target
    ```

    {{< note >}}
    To remove or set a target device, you only need to enter the name of the target device following the command.
    {{< /note >}}

### ares-install

This command installs the app for a specified app package file (`.ipk`) on the target device. You can also see the list of apps installed on the target device or remove them with this command.

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>v1.6.4</p></td>
<td><p>Added in.</p></td>
</tr>
</tbody>
</table></div>

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

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 20%" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
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
<td><p>Specifies the target device. Unless specified, it will be set to the default target device.</p>
</td>
</tr>
<tr>
<td><p>-l, --list</p></td>
<td><p>None</p></td>
<td><p>Lists the installed apps on the specified target device. Use this option in conjunction with <code>-d</code>, <code>--device</code> option.</p></td>
</tr>
<tr>
<td><p>-F, --listfull</p></td>
<td><p>None</p></td>
<td><p>Lists installed applications with more detail. Use this option in conjunction with <code>-d</code>, <code>--device</code> option.</p></td>
</tr>
<tr>
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists all the available devices.</p></td>
</tr>
<tr>
<td><p>-r, --remove </p></td>
<td><p>APP_ID</p></td>
<td><p>Removes the specified app from the device.</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-install</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>PKG_FILE</p></td>
<td><p>Specifies the path of the app package file.</p></td>
</tr>
<tr>
<td><p>APP_ID</p></td>
<td><p>ID of the app to remove from the device.</p></td>
</tr>
<tr>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device for installing or removing the app or viewing the list of installed apps.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

* Listing available target devices

    ```shell
    ares-install --device-list
    ```

* Installing the app on the target device

    ```shell
    ares-install --device target com.example.sampleapp_1.0.0_all.ipk
    ```

* Listing apps which are installed on the target device

    ```shell
    ares-install --device target --list
    ```

* Removing the app from the target device

    ```shell
    ares-install --device target --remove com.example.sampleapp
    ```

### ares-launch

This command launches or terminates the application installed on the target device. This command can also display the list of applications running on the target device.

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
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
</table></div>

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

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
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
<td><p>Specifies the target device. Unless specified, it will be set to the default target device.</p>
</td>
</tr>
<tr>
<td><p>--close</p></td>
<td><p>APP_ID</p></td>
<td><p>Terminates application on the target device.</p></td>
</tr>
<tr>
<td><p>-r, --running</p></td>
<td><p>None</p></td>
<td><p>Lists applications that are running on the target device.</p></td>
</tr>
<tr>
<td><p>-p, --params</p></td>
<td><p>PARAMS</p></td>
<td><p>Launches an application with specified parameters.</p></td>
</tr>
<tr>
<td><p>-dp, --display</p></td>
<td><p>DISPLAY_ID</p></td>
<td><p>Launches an application on a specified display.</p></td>
</tr>
<tr>
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists all the available devices.</p></td>
</tr>
<tr>
<td><p>-H, --hosted</p></td>
<td><p>APP_DIR</p></td>
<td><p>Runs an app without installation</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-launch</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>APP_ID</p></td>
<td><p>ID of the application to launch or terminate.</p></td>
</tr>
<tr>
<td><p>APP_DIR</p></td>
<td><p>Working directory of an app.</p>
<p>If <code>--hosted</code> option is used with a directory path, an app (ID: <code>com.sdk.ares.hostedapp</code>) is launched on the target device. The launched opens the files in the <code>APP_DIR</code> directory.</p>
<p>To close this app, use <code>--close</code> option with <code>com.sdk.ares.hostedapp</code> as an <code>APP_ID</code>.</p></td>
</tr>
<tr>
<td><p>DISPLAY_ID</p></td>
<td><p>ID of the display to launch an app. It should be an integer type. (Use <code>0</code> for primary display and <code>1</code> for secondary display.)</p></td>
</tr>
<tr>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device on which the application is installed.</p></td>
</tr>
<tr>
<td><p>PARAMS</p></td>
<td><p>Specifies the parameters which are used on application launching. It is entered using JSON-type strings in the format <code>"{'param1':'value1', 'param2':'value2 which contains spaces', ...}"</code>.</p></td>
</tr>
</tbody>
</table></div>

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
    When you use a parameter, the web app will receive the parameter with the `webOSLaunch` event. For more detailed information on the `webOSLaunch` event, see [Web App Lifecycle]({{< relref "web-app-lifecycle" >}}).
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

### ares-log

This command shows and saves logs of webOS OSE apps and services using journald. For more details on journald, see [Viewing Logs when journald is Enabled]({{< relref "viewing-logs-journald" >}}).

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>v2.2.0</p></td>
<td><p>Added in.</p></td>
</tr>
</tbody>
</table></div>

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

ares-log [OPTION...] --file|-f JOURNAL_FILE

ares-log --device-list|-D

ares-log --version|-V

ares-log --help|-h
```

#### Options

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 20%" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Option</p></th>
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>-o, --output</p></td>
<td><p>OUTPUT_MODE</p></td>
<td><p>Changes logs to the specified format. Must use with the options outputting logs.</p>
</td>
</tr>
<tr>
<td><p>-s, --save</p></td>
<td><p>SAVED_FILE</p></td>
<td><p>Saves logs to the file. Must use with the options outputting logs.</p></td>
</tr>
<tr>
<td><p>-dp, --display</p></td>
<td><p>DISPLAY_ID</p></td>
<td><p>Selects the display to check logs. Must use with the <code>unit</code> and <code>unit-list</code> options.</p></td>
</tr>
<tr>
<td><p>-d, --device</p></td>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device. Unless specified, it will be set to the default target device.</p></td>
</tr>
<tr>
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists all the available devices.</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-log</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>LINE</p></td>
<td><p>Number of lines.</p></td>
</tr>
<tr>
<td><p>PRIORITY</p></td>
<td><p>Priority level of logs. For more details on available <code>PRIORITY</code> values, see <a href="/docs/guides/development/logging/viewing-logs/viewing-logs-journald/#filter-messages-by-priority">Filter Messages by Priority</a>.</p></td>
</tr>
<tr>
<td><p>PID</p></td>
<td><p>Process ID to check logs.</p></td>
</tr>
<tr>
<td><p>DATE</p></td>
<td><p>Timestamp in the format: <code>YYYY-MM-DD hh:mm:ss</code>.</p></td>
</tr>
<tr>
<td><p>UNIT</p></td>
<td><p>Unit name to check logs. To get the list of available <code>UNIT</code> values, use the <code>--unit-list</code> option.</p></td>
</tr>
<tr>
<td><p>JOURNAL_FILE</p></td>
<td><p>Journal file name.  To get the list of available <code>JOURNAL_FILE</code> values, use the <code>--file-list</code> option.</p></td>
</tr>
<tr>
<td><p>OUTPUT_MODE</p></td>
<td><p>Format of log messages. For more details, see <a href="/docs/guides/development/logging/viewing-logs/viewing-logs-journald/#format-logs">Format Logs</a>.</p></td>
</tr>
<tr>
<td><p>SAVED_FILE</p></td>
<td><p>File name or path to save logs.</p></td>
</tr>
<tr>
<td><p>DISPLAY_ID</p></td>
<td><p>ID of the display to check logs. It should be an integer type. (Use 0 for primary display and 1 for secondary display.)</p></td>
</tr>
<tr>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device for saving or showing logs.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

* Following the journals.

    ``` shell
    ares-log -f -d DEVICE
    ```

* Displaying the number of journal entries to show.

    ``` shell
    ares-log -n 10 -d DEVICE
    ```

* Displaying logs between the two `DATE`s.

    ``` shell
    ares-log -S 2021-03-18 21:38:00 --until 2021-03-18 21:39:00 -d DEVICE
    ```

* Displaying a list of the stored journal files.

    ``` shell
    ares-log -fl -d DEVICE
    ```

* Displaying stored logs from `system.journal` in the JSON format.

    ``` shell
    ares-log -file system.journal -o json -d DEVICE
    ```

* Displaying logs of the specified process ID and saving them to a log file.

    ``` shell
    ares-log -pid 1735 -s pid_1735.log -d DEVICE
    ```

* Displaying logs of the specified unit.

    ``` shell
    ares-log -u sam -d DEVICE
    ```

### ares-inspect

This command enables Web Inspector or Node's Inspector. Each inspector displays the run-time information of a web application or a JS service, respectively.

{{< caution >}}
We highly recommend you to use the same version as Chrome/Chromium of webOS OSE. Using other versions might cause unexpected errors.

- To check the Chromium version of your target device, do one of the following:
    - Execute the `ares-device -i` command. In this case, make sure `username` of the target device is set as `root`. Otherwise the Chromium version won't be displayed. For more details, see [DEVICE_INFO](#parameters-2) of `ares-setup-device`.
    - Execute the `Web Browser` app and go to http://useragentstring.com.
    - Visit the [webOS OSE GitHub](https://github.com/webosose?q=chromium&type=&language=) and find a Chromium repository of the latest version. Then see `src/chrome/VERSION` file.
- To download old builds of Chrome/Chromium, visit the [Chromium Project website](https://www.chromium.org/getting-involved/download-chromium).
{{< /caution >}}

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>v2.0.2</p></td>
<td><p>Supports the <code>--display</code> option.</p></td>
</tr>
<tr>
<td><p>v1.6.4</p></td>
<td><p>Added in.</p></td>
</tr>
</tbody>
</table></div>

#### Usages

```shell
ares-inspect [OPTION...] [--app|-a] APP_ID

ares-inspect [OPTION...] --service|-s SERVICE_ID

ares-inspect --device-list|-D

ares-inspect --version|-V

ares-inspect --help|-h
```

#### Options

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
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
<td><p>Specifies the target device. Unless specified, it will be set to the default target device.</p>
</td>
</tr>
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
<td><p>Opens the default browser of the host machine.</p>
{{< note >}}
<p>This option is only available for Web Inspector, thus can be used with <code>--app|-a</code> option only.<p>
<p>Web Inspector works in the Blink-based web browsers (e.g. Chrome or Opera) only. You have to re-open the inspector page in one of those browsers if another browser is your default web browser (e.g. Safari or Internet Explorer).</p>
<p>To connect to Node's Inspector, you need to use one of the Node's Inspector clients, such as Chrome DevTools and Visual Studio Code. For more information, see <a href="https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients">Inspector Clients</a>.</p>
{{< /note >}}
</td>
</tr>
<tr>
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists all the available devices.</p></td>
</tr>
<tr>
<td><p>-dp, --display</p></td>
<td><p>DISPLAY_ID</p></td>
<td><p>Launches an application and opens Web Inspector on a specified display.</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-inspect</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>APP_ID</p></td>
<td><p>ID of the application whose information is to be viewed using the Web Inspector.</p></td>
</tr>
<tr>
<td><p>SERVICE_ID</p></td>
<td><p>ID of the JS Service whose information is to be viewed using the Node's Inspector.</p></td>
</tr>
<tr>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device on which the application is installed.</p></td>
</tr>
</tbody>
</table></div>

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

This command runs a web server for testing a local file. The web server will run on the given path. You can terminate the web server by pressing **Control+C** on the shell prompt.

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>v1.6.4</p></td>
<td><p>Added in.</p></td>
</tr>
</tbody>
</table></div>

#### Usages

```shell
ares-server [OPTION...] APP_DIR

ares-server --version|-V

ares-server --help|-h
```

#### Options

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
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
<td><p>Displays the help of the <code>ares-server</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>APP_DIR</p></td>
<td><p>Specifies the directory where the application's <code>appinfo.json</code> file is located.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

* Running the web server in a source directory

    ```shell
    ares-server ./source
    ```

* Running the web server with a browser

    ```shell
    ares-server ./source --open
    ```

### ares-shell

This command opens a shell of a target device and executes shell commands in the target device.

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>v1.6.4</p></td>
<td><p>Added in.</p></td>
</tr>
</tbody>
</table></div>

#### Usages

```shell
ares-shell -d TARGET_DEVICE

ares-shell -d TARGET_DEVICE -r CMD

ares-shell --device-list|-D

ares-shell --version

ares-shell --help|-h
```

#### Options

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
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
<td><p>Specifies the target device. Unless specified, it will be set to the default target device.</p>
</td>
</tr>
<tr>
<td><p>-r, --run</p></td>
<td><p>CMD</p></td>
<td><p>Specifies a command executed in the target device.</p></td>
</tr>
<tr>
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists available target devices.</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-shell</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>CMD</p></td>
<td><p>Specifies a command executed in the target device.</p></td>
</tr>
<tr>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device on which the shell is executed.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

* Opening the remote shell of the target device

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

This command pushes file(s) from a host machine to a target device.

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>v1.6.4</p></td>
<td><p>Added in.</p></td>
</tr>
</tbody>
</table></div>

#### Usages

```shell
ares-push [OPTION...] SOURCE DESTINATION

ares-push --device-list|-D

ares-push --version|-V

ares-push --help|-h
```

#### Options

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
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
<td><p>Specifies the target device that you want to copy the file(s) to.</p>
<p>Unless specified, it will be set to the default target device.</p>
</td>
</tr>
<tr>
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists available target devices.</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-push</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-i, --ignore</p></td>
<td><p>None</p></td>
<td><p>Does not display detailed messages of the <code>ares-push</code> result.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>SOURCE</p></td>
<td><p>Specifies the file/directory path of the host machine.</p></td>
</tr>
<tr>
<td><p>DESTINATION</p></td>
<td><p>Specifies the file/directory path of the target device.</p></td>
</tr>
<tr>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device that you want to copy the file(s) to.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

* Listing available targets

    ```shell
    ares-push --device-list
    ```

* Pushing contents of a specific directory from the host machine to the target device

    ```shell
    ares-push --device target <hostPath>/tmpDir <targetPath>/tmpDir
    ```

* Pushing a file from the host machine to the target device

    ```shell
    ares-push --device target <hostPath>/foo.txt <targetPath>/foo.txt
    ```

### ares-pull

This command pulls file(s) from a target device to a host machine.

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>v1.6.4</p></td>
<td><p>Added in.</p></td>
</tr>
</tbody>
</table></div>

#### Usages

```shell
ares-pull [OPTION...] SOURCE DESTINATION

ares-pull --device-list|-D

ares-pull --version|-V

ares-pull --help|-h
```

#### Options

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
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
<td><p>Specifies the target device that you want to copy the file(s) from.</p>
<p>Unless specified, it will be set to the default target device.</p>
</td>
</tr>
<tr>
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists available target devices.</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-pull</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-i, --ignore</p></td>
<td><p>None</p></td>
<td><p>Does not display detailed messages of the <code>ares-pull</code> result.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>SOURCE</p></td>
<td><p>Specifies the file/directory path of the target device.</p></td>
</tr>
<tr>
<td><p>DESTINATION</p></td>
<td><p>Specifies the file/directory path of the host machine.</p></td>
</tr>
<tr>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device that you want to copy the file(s) from.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

* Listing available target devices

    ```shell
    ares-pull --device-list
    ```

* Pulling contents of a specific directory from the target device to the host machine

    ```shell
    ares-pull --device target <targetPath>/tmpDir <hostPath>/tmpDir
    ```

* Pulling a file from the target device to the host machine

    ```shell
    ares-pull --device target <targetPath>/foo.txt <hostPath>/foo.txt
    ```

### ares-device

This command displays the information of the target device.

#### History

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Changes</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>v2.1.0</p></td>
<td><p>Supports screen capture using the <code>--capture-screen</code> option.</p></td>
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
</table></div>

#### Usages

``` shell
ares-device [OPTION...] [TARGET_DEVICE]

ares-device --device-list|-D

ares-device --version|-V

ares-device --help|-h
```

#### Options

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 20%" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Option</p></th>
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>-i, --system-info</p></td>
<td><p>None</p></td>
<td><p>Displays the device system information.</p></td>
</tr>
<tr>
<td><p>-s, --session-info</p></td>
<td><p>None</p></td>
<td><p>Displays the device session information.</p>
{{< note >}}
This option is not supported in webOS OSE.
{{< /note >}}
</td>
</tr>
<tr>
<td><p>-c, --capture-screen</p></td>
<td><p>OUTPUT_PATH</p></td>
<td><p>Capture screen and save the file to the host machine.</p></td>
</tr>
<tr>
<td><p>-dp, --display</p></td>
<td><p>DISPLAY_ID</p></td>
<td><p>Specify DISPLAY_ID. Use it with capture screen option.</p></td>
</tr>
<tr>
<td><p>-d, --device</p></td>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device. Unless specified, it will be set to the default target device.</p></td>
</tr>
<tr>
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists all the available devices.</p></td>
</tr>
<tr>
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <code>ares-device</code> command.</p></td>
</tr>
<tr>
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the CLI.</p></td>
</tr>
<tr>
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
</tbody>
</table></div>

#### Parameters

<div class="table-container"><table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device. Unless specified, it will be set to the default target device.</p></td>
</tr>
<tr>
<td><p>OUTPUT_PATH</p></td>
<td><p>Specifies the file/directory path of the host machine to save captured file.</p></td>
</tr>
<tr>
<td><p>DISPLAY_ID</p></td>
<td><p>ID of the display to be captured. It should be an integer type. (Use <code>0</code> for primary display and <code>1</code> for secondary display.)</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

* Displaying the system information of the target device (target device name: `target`)

    ``` shell
    ares-device --system-info --device target
    ```

* Capture the display `1` as `screen.png` (target device name: `target`)

    ``` shell
    ares-device --capture-screen screen.png --display 1 --device target
    ```
