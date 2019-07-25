---
title: Command-Line Interface User Guide
date: 2018-10-15
weight: 10
toc: true
---

**Command-Line Interface (CLI)** of webOS Open Source Edition (OSE) provides a collection of commands used for creating, packaging, installing, and launching web apps in the command line environment. CLI allows you to develop and test apps without having to use a specific IDE.

## Key Features

CLI provides the following key features:

  - **Project creation**
    - Provides standard project templates for webOS OSE web apps
    - Provides a list of available templates
    - Generates a project for an app and sets up basic information of an app
  - **Web app packaging**
    - Packages the source code and generates a package file (`.ipk`) to run on the target device
    - Provides a feature to exclude sample and test code directories from a project
    - Generates app installation files for debugging
  - **Target device management**
    - Provides a list of target devices
    - Adds, modifies, and removes target devices
  - **Web app installation**
    - Installs apps on the target device
    - Provides a list of apps installed on the target device
    - Removes selected apps from the target device
  - **Web app launching/closing**
    - Runs selected apps
    - Closes apps that are running
    - Provides the list of apps running on the target device
  - **Web app debugging**
    - Provides Web Inspector for debugging web apps
    - Provides Node Inspector for debugging JavaScript services
    - Provides web app information
    - Provides JavaScript service information

## Installing CLI

This section describes how to install CLI on your host machine.

{{< note >}}
Starting from CLI v1.8.1, you must accept our SDK end-user license agreement (EULA) to use CLI.
The EULA will appear when you execute any of the CLI commands. Once you accept the EULA for the CLI version, you can proceed with using CLI. Otherwise, you will be prompted to accept the EULA for each command input.
{{< /note >}}

### Download the Package

First, download the CLI package for your operating system from the [SDK download]({{< relref "sdk-download" >}}) page.

### Unzip the Package

Unzip the downloaded CLI package. After unzipping the package, you can execute the CLI commands located in the following directories.

  - Windows: `ares-cli`
  - Linux & macOS: `ares-cli/bin`

{{< caution "Alerts for CLI Installation on Windows" >}}

Due to recursively nested directory structure of Node.js modules used by CLI, the resulting path length may exceed the [maximum path length of Windows](https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file#maximum-path-length-limitation). To prevent issues while installing and using CLI, we strongly recommend that you do the following:

  - To unzip the package, use a program that supports file pathnames longer than 260 characters, such as 7-Zip.
  - Unzip the package under the root directory (for example, `C:\` or `D:\`).
{{< /caution >}}

### Set the Path

To make it easy to execute CLI commands, you need to add the CLI directory to the PATH environment variable.

#### Windows

If you unzipped the package under `C:\`, the CLI commands would be located in `C:\ares-cli`. You need to add the directory to the environment variable.

You can create a system variable pointing to the directory and add the system variable to the PATH.

``` bash
C:\> setx /m WEBOS_CLI_HOME "C:\ares-cli"
C:\> setx /m PATH "%WEBOS_CLI_HOME%;%PATH%"
```

Otherwise, you can add the directory to the PATH directly.

``` bash
C:\> setx /m PATH "C:\ares-cli; %PATH%"
```

{{< note >}}
To set the PATH for current user only, remove "/m" from the commands above.
{{< /note >}}

To make the changes take effect, you must restart the command prompt.

#### Linux & macOS

There are many ways to set the environment variable in Linux and macOS. Here, we describe the method to add the information to the `.profile` so that the PATH is automatically configured each time the shell is executed. We will assume that CLI has been unzipped under the home directory.

First, open the `.profile` which is located in the home directory. If the file does not exist, the command will create one.

``` bash
$ vi ~/.profile
```

Add the lines below at the end of the file.

``` bash
...
# add CLI path
if [ -d "$HOME/ares-cli/bin" ]; then
  export PATH="$PATH:$HOME/ares-cli/bin"
fi
```

To make the changes take effect, you must execute the following command or restart the shell.

``` bash
$ source ~/.profile
```

## CLI Workflow

webOS OSE CLI provides features for developing web apps throughout the whole development process. The figure below shows some of CLI commands that can be used during each stage of the development process.

{{< figure src="/images/docs/tools/cli/cli-workflow.png" caption="Development Workflow with CLI" width="700px" >}}

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
<tr class="odd">
<td><p>ares</p></td>
<td><p>Provides the help menu for using the ares commands.</p></td>
</tr>
<tr class="even">
<td><p><a href="#ares-generate">ares-generate</a></p></td>
<td><p>Creates a web app from a template.</p></td>
</tr>
<tr class="odd">
<td><p><a href="#ares-package">ares-package</a></p></td>
<td><p>Creates an app package file.</p></td>
</tr>
<tr class="even">
<td><p><a href="#ares-setup-device">ares-setup-device</a></p></td>
<td><p>Manages the target devices.</p></td>
</tr>
<tr class="odd">
<td><p><a href="#ares-install">ares-install</a></p></td>
<td><p>Installs an app on the target device.</p></td>
</tr>
<tr class="even">
<td><p><a href="#ares-launch">ares-launch</a></p></td>
<td><p>Runs or terminates the web app.</p></td>
</tr>
<tr class="odd">
<td><p><a href="#ares-inspect">ares-inspect</a></p></td>
<td><p>Runs the Web Inspector or Node Inspector for debugging web app or JS service.</p></td>
</tr>
<tr class="even">
<td><p><a href="#ares-server">ares-server</a></p></td>
<td><p>Runs the Web server for testing local app file.</p></td>
</tr>
<tr class="odd">
<td><p><a href="#ares-shell">ares-shell</a></p></td>
<td><p>Executes shell commands in the target device.</p></td>
</tr>
<tr class="even">
<td><p><a href="#ares-push">ares-push</a></p></td>
<td><p>Pushes file(s) from a host machine to a target device.</p></td>
</tr>
<tr class="odd">
<td><p><a href="#ares-pull">ares-pull</a></p></td>
<td><p>Pulls file(s) from a target device to a host machine.</p></td>
</tr>
</tbody>
</table></div>

### ares-generate

This command creates an app from a template. **`ares-generate`** displays a list of available templates for a web app, JS services, and webOS config file (`appinfo.json`) creation.

{{< note >}}
The `ares-generate` command requires Git and internet connection. So, before you use the command,

- Check if Git is installed on your system, and [set up Git](https://help.github.com/articles/set-up-git) if it is not already installed.
- Make sure the system is connected to the internet.
{{< /note >}}

#### Usages

``` bash
ares-generate [OPTION...] APP_DIR

ares-generate [OPTION...] -t js_service SERVICE_DIR

ares-generate --list|-l

ares-generate --version

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
<tr class="odd">
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
<tr class="odd">
<td><p>basic</p></td>
<td><p>(default) Basic web app template.</p></td>
</tr>
<tr class="even">
<td><p>hosted_webapp</p></td>
<td><p>Hosted web app template.</p></td>
</tr>
<tr class="odd">
<td><p>webappinfo</p></td>
<td><p>Creates a 'appinfo.json' file for web apps.</p></td>
</tr>
<tr class="even">
<td><p>js_service</p></td>
<td><p>JS service template.</p></td>
</tr>
<tr class="odd">
<td><p>jsserviceinfo</p></td>
<td><p>Creates a 'services.json' and 'package.json' file for JS services.</p></td>
</tr>
<tr class="even">
<td><p>webicon</p></td>
<td><p>Icon files for web apps [80x80, 130x130].</p></td>
</tr>
</tbody>
</table></div></td>
</tr>
<tr class="even">
<td><p>-p, --property</p></td>
<td><p>PROPERTY</p></td>
<td><p>Saves the application information that is entered.</p></td>
</tr>
<tr class="odd">
<td><p>-s, --servicename</p></td>
<td><p>SERVICE_NAME</p></td>
<td><p>Specifies the JS Service ID.</p></td>
</tr>
<tr class="even">
<td><p>-f, --overwrite</p></td>
<td><p>None</p></td>
<td><p>Allows overwriting of existing files.</p></td>
</tr>
<tr class="odd">
<td><p>-l, --list</p></td>
<td><p>None</p></td>
<td><p>Lists the available templates. See description of the -t option above.</p></td>
</tr>
<tr class="even">
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
<tr class="odd">
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the <strong>ares-generate</strong> command.</p></td>
</tr>
<tr class="even">
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <strong>ares-generate</strong> command</p></td>
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
<tr class="odd">
<td><p>APP_DIR</p></td>
<td><p>Specifies the app project directory. If the directory does not exist, the directory will be created while executing the command.</p></td>
</tr>
<tr class="even">
<td><p>SERVICE_DIR</p></td>
<td><p>Specifies the service directory. If the specified directory does not exist, the directory will be created while executing the command.</p></td>
</tr>
<tr class="odd">
<td><p>PROPERTY</p></td>
<td><p>Specifies the app information. It is entered using JSON-type strings in the format of &quot;Key=Value&quot; or &quot;{'key1':'value1', 'key2':'value2', ...}&quot;.</p></td>
</tr>
<tr class="even">
<td><p>TEMPLATE</p></td>
<td><p>Specifies the template to use when creating a project. The default value is <strong>basic</strong>.</p></td>
</tr>
<tr class="odd">
<td><p>SERVICE_NAME</p></td>
<td><p>ID of the service you are creating. The service ID should be a sub-domain of the ID of the app which the service belongs to.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the CLI usage:

**Listing the templates (web application templates)**

``` bash
ares-generate -l
```

**Creating a web application with the default template in ./sampleApp directory**

``` bash
ares-generate sampleApp
```

**Creating a web application with custom App ID in ./sampleApp directory**

``` bash
ares-generate -p "id=com.example.sampleapp" sampleApp
```

**Creating a JS Service with custom Service ID in ./sampleService directory**

``` bash
ares-generate -t js_service -s com.example.sampleapp.sampleservice sampleService
```

{{< note >}}
The service ID should be a sub-domain of the ID of the app which the service belongs to.
{{< /note >}}

**Creating a web app in the ./sampleApp and setting properties with JSON string**

``` bash
ares-generate -p "{'id':'com.example.sampleapp', 'version':'1.0.0', 'icon':'icon.png', 'type':'web', 'title':'Sample App', 'main':'index.html'}" sampleApp
```

### ares-package

This command packages an app and a JS service into a package file (`.ipk`) which is stored in a specified directory.

#### Usages

``` bash
ares-package [OPTION...] APP_DIR [SERVICE_DIR]

ares-package --version

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
<tr class="odd">
<td><p>-o, --outdir</p></td>
<td><p>OUT_DIR</p></td>
<td><p>Specifies a directory where the package file is created.</p></td>
</tr>
<tr class="even">
<td><p>-c, --check</p></td>
<td><p>None</p></td>
<td><p>Checks whether the application's <code>appinfo.json</code> file exists or not. This option does not make package file. If <code>appinfo.json</code> file does not exist, warning messages appear.</p></td>
</tr>
<tr class="odd">
<td><p>-e, --app-exclude</p></td>
<td><p>EX_DIR</p></td>
<td><p>Lists the directories to exclude in the package file.</p></td>
</tr>
<tr class="even">
<td><p>-r, --rom</p></td>
<td><p>None</p></td>
<td><p>Proceeds up to the stage just before creating package file phase.</p></td>
</tr>
<tr class="odd">
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
<tr class="even">
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of <strong><span class="code">ares-package</span></strong> command.</p></td>
</tr>
<tr class="odd">
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of <strong><span class="code">ares-package</span></strong> command.</p></td>
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
<tr class="odd">
<td><p>APP_DIR</p></td>
<td><p>Specifies the directory of the application to be packaged.</p></td>
</tr>
<tr class="even">
<td><p>SERVICE_DIR</p></td>
<td><p>Specifies the directory where JS service's <a href="https://docs.npmjs.com/getting-started/using-a-package.json"><code>package.json</code></a> file is located.</p></td>
</tr>
<tr class="odd">
<td><p>OUT_DIR</p></td>
<td><p>Specifies the directory where the package file is to be created. If the directory is not entered, the package file is created in the same directory as the command.</p></td>
</tr>
<tr class="even">
<td><p>EX_DIR</p></td>
<td><p>Specifies the name of directories and files to exclude from the application when packaging the package file. You should enter directories used for samples and tests. All subdirectories and files in the specified directory are excluded. And specified files also are excluded.</p>
<p>To exclude multiple directories, enter as &quot;-e subdir -e filename”. You can use common pattern expression such as wildcard (*).</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

**Creating a package file from ./sampleApp directory and outputting it in the working directory**

``` bash
ares-package sampleApp
```

**Creating a package file from the ./sampleApp directory and outputting it in ./output directory**

``` bash
ares-package -o output sampleApp
```

**Creating a package file except for testCode1 sub-directory, README.md file and all text file (.txt)**

``` bash
ares-package -e "testCode1" -e "README.md" -e "*.txt" samplePrj
```

**Creating a package file with external JS service directory**

``` bash
ares-package sampleApp sampleService
```

### ares-setup-device

This command displays a list of registered target devices. You can also add, modify, or remove them from the list. This command is mainly used to modify target host address which is running on a remote host. If you execute the command without any options, the command runs in interactive mode.

#### Usages

``` bash
ares-setup-device

ares-setup-device [OPTION...] --add|-a [TARGET_NAME] [--info|-i [DEVICE_INFO]]

ares-setup-device [OPTION...] --modify|-m [TARGET_NAME] [--info|-i [DEVICE_INFO]]

ares-setup-device [OPTION...] --remove|-r [TARGET_NAME]

ares-setup-device --search|-s

ares-setup-device [--search|-s] --timeout|-t [TIMEOUT]

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
<tr class="odd">
<td><p>-a, --add</p></td>
<td><p>TARGET_NAME</p></td>
<td><p>Adds a target device with the specified information.</p></td>
</tr>
<tr class="even">
<td><p>-m, --modify</p></td>
<td><p>TARGET_NAME</p></td>
<td><p>Modifies a target device's information. You can change the information of the target device except for its name.</p></td>
</tr>
<tr class="odd">
<td><p>-i, --info</p></td>
<td><p>DEVICE_INFO</p></td>
<td><p>Sets information for the target device.</p></td>
</tr>
<tr class="even">
<td><p>-r, --remove</p></td>
<td><p>TARGET_NAME</p></td>
<td><p>Deletes a target device that matches the device name you enter.</p></td>
</tr>
<tr class="odd">
<td><p>-s, --search</p></td>
<td><p>None</p></td>
<td><p>Searches webOS devices in the same network with <a href="https://en.wikipedia.org/wiki/Simple_Service_Discovery_Protocol">SSDP</a> and displays the found device list. When you select a device from the device list, IP address of the selected device will be set for device information automatically.</p></td>
</tr>
<tr class="even">
<td><p>-t, --timeout</p></td>
<td><p>TIMEOUT</p></td>
<td><p>Sets timeout value for the <code>--search</code> option. This option does not have to be preceded by the <code>--search</code> option. The default value is 5 (seconds).</p></td>
</tr>
<tr class="odd">
<td><p>-R, --reset</p></td>
<td><p>None</p></td>
<td><p>Initializes the list of registered target devices.</p></td>
</tr>
<tr class="even">
<td><p>-l, --list</p></td>
<td><p>None</p></td>
<td><p>Lists registered target devices.</p></td>
</tr>
<tr class="odd">
<td><p>-F, --listfull</p></td>
<td><p>None</p></td>
<td><p>Lists registered target devices' information with more detail (JSON string).</p></td>
</tr>
<tr class="even">
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
<tr class="odd">
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the <strong><span class="code">ares-setup-device</span></strong> command.</p></td>
</tr>
<tr class="even">
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <strong><span class="code">ares-setup-device</span></strong> command.</p></td>
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
<tr class="odd">
<td><p>DEVICE_INFO</p></td>
<td><p>Specifies the information of the target device. It can be entered using strings in the format of &quot;Key=Value&quot; or JSON-type such as '{&quot;key1&quot;:&quot;value1&quot;, &quot;key2&quot;:&quot;value2&quot;, ...}'. You can use the following items as key for the target device:</p>
<ul>
<li><p><strong>name</strong>: Target device name</p></li>
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
</ul>
<p> </p>
<p>When using CLI in interactive mode, take care when entering the required values or choosing to use the default values, otherwise you might not be able to use the device.</p></td>
</tr>
<tr class="even">
<td><p>TARGET_NAME</p></td>
<td><p>Specifies the name of the target device.</p></td>
</tr>
<tr class="odd">
<td><p>TIMEOUT</p></td>
<td><p>Timeout value for device searching (unit: second).</p></td>
</tr>
</tbody>
</table></div>

The following example shows a `DEVICE_INFO` written in JSON format:

``` bash
{"host":"127.0.0.1", "port":"22"}
```

#### Examples

Here are some examples of the CLI usage:

**Listing target devices**

``` bash
ares-setup-device --list

name        deviceinfo               connection
---------   --------------------     ------------
device      root@127.0.0.1:22        ssh
```

**Listing all details of target devices**

``` bash
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

**Adding the target device (Target device name: target, Host address: 10.123.45.67, Port number: 22 User: root)**

``` bash
ares-setup-device --add target -i "host=10.123.45.67" -i "port=22" -i "username=root"
```

**Adding the target device with JSON format (Target device name: target, Host address: 10.123.45.67, Port number: 22 User: root)**

``` bash
ares-setup-device --add target --info "{'host':'10.123.45.67', 'port':'22', 'username':'root'}"
```

**Adding the target device with interactive mode (Target device name: target, Host address: 10.123.45.67, Port number: 22, User: root)**

``` bash
ares-setup-device

name     deviceinfo               connection
-------- ------------------------ ----------
device   root@127.0.0.1:22        ssh

** You can modify the device info in the above list, or add a new device.
? Select: add
? Enter Device Name: target
? Enter Device IP address: 10.123.45.67
? Enter Device Port: 22
? Enter ssh user: root
? Enter description: sample
? Select authentication: password
? Enter password: [hidden]
? Save? Yes

name     deviceinfo                  connection
-------- --------------------------- ----------
device   root@127.0.0.1:22           ssh
target   root@10.123.45.67:22        ssh
```

{{< note >}}
If you want to input default value or set empty, press the enter key without any value.
{{< /note >}}

**Modifying the target device (Target device name: target, Port Number: 9922)**

``` bash
ares-setup-device --modify target -i "port=9922"
```

**Modifying the target device with interactive mode (Target device name: target, Port number: 9922)**

``` bash
ares-setup-device

name     deviceinfo                  connection
-------- --------------------------- ----------
device   root@127.0.0.1:22           ssh
target   root@10.123.45.67:22        ssh

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

name     deviceinfo                  connection
-------- --------------------------- ----------
device   root@127.0.0.1:22           ssh
target   root@10.123.45.67:9922      ssh
Success to modify a device!!
```

{{< note >}}
If you want to keep the previous value, press Enter without any value.
{{< /note >}}

**Removing the target device (Target device name: target)**

``` bash
ares-setup-device --remove target
```

{{< note >}}
To remove a target device, you only need to enter the name of the target device following the command.
{{< /note >}}

**Searching webOS devices**

``` bash
ares-setup-device --search
```

### ares-install

This command installs the app for a specified app package file (`.ipk`) on the target device. You can also see the list of apps installed on the target device or remove them with this command.

#### Usages

``` bash
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
<tr class="odd">
<td><p>-d, --device</p></td>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device on which the application should be installed.</p></td>
</tr>
<tr class="even">
<td><p>-l, --list</p></td>
<td><p>None</p></td>
<td><p>Lists the installed apps on the specified target device. Use this option in conjunction with <code>-d</code>, <code>--device</code> option.</p></td>
</tr>
<tr class="odd">
<td><p>-F, --listfull</p></td>
<td><p>None</p></td>
<td><p>Lists installed applications with more detail. Use this option in conjunction with <code>-d</code>, <code>--device</code> option.</p></td>
</tr>
<tr class="even">
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists all the available devices.</p></td>
</tr>
<tr class="odd">
<td><p>-r, --remove </p></td>
<td><p>APP_ID</p></td>
<td><p>Removes the specified app from the device.</p></td>
</tr>
<tr class="even">
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
<tr class="odd">
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of <strong><span class="code">ares-install</span></strong> command.</p></td>
</tr>
<tr class="even">
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of <strong><span class="code">ares-install</span></strong> command.</p></td>
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
<tr class="odd">
<td><p>PKG_FILE</p></td>
<td><p>Specifies the path of the app package file.</p></td>
</tr>
<tr class="even">
<td><p>APP_ID</p></td>
<td><p>ID of the app to remove from the device.</p></td>
</tr>
<tr class="odd">
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device for installing or removing the app or viewing the list of installed apps.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the CLI usage:

**Listing available target devices**

``` bash
ares-install --device-list
```

**Installing the app on the target device**

``` bash
ares-install --device target com.example.sampleapp_1.0.0_all.ipk
```

**Listing apps which are installed on the target device**

``` bash
ares-install --device target --list
```

**Removing the app from the target device**

``` bash
ares-install --device target --remove com.example.sampleapp
```

### ares-launch

This command runs or terminates the application installed on the target device. This command can also display the list of applications running on the target device.

#### Usages

``` bash
ares-launch [OPTION...] APP_ID

ares-launch [OPTION...] --close APP_ID

ares-launch [OPTION...] --running|-r

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
<tr class="odd">
<td><p>-d, --device</p></td>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device where the web application is installed.</p></td>
</tr>
<tr class="even">
<td><p>--close</p></td>
<td><p>APP_ID</p></td>
<td><p>Terminates application on the target device.</p></td>
</tr>
<tr class="odd">
<td><p>-r, --running</p></td>
<td><p>None</p></td>
<td><p>Lists applications which are running on the target device.</p></td>
</tr>
<tr class="even">
<td><p>-p, --params</p></td>
<td><p>PARAMS</p></td>
<td><p>Launches a web application with specified parameters.</p></td>
</tr>
<tr class="odd">
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
<tr class="even">
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the <strong><span class="code">ares-launch</span></strong> command.</p></td>
</tr>
<tr class="odd">
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <strong><span class="code">ares-launch</span></strong> command.</p></td>
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
<tr class="odd">
<td><p>APP_ID</p></td>
<td><p>ID of the application to run or terminate.</p></td>
</tr>
<tr class="even">
<td><p>APP_DIR</p></td>
<td><p>Specifies the directory of the application on the host machine to launch without installation.</p></td>
</tr>
<tr class="odd">
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device on which the application is installed.</p></td>
</tr>
<tr class="even">
<td><p>PARAMS</p></td>
<td><p>Specifies the parameters which are used on web application launching. It is entered using JSON-type strings in the format '<code>{&quot;param1&quot;:&quot;value1&quot;, &quot;param2&quot;:&quot;value2 which contains spaces&quot;, ...}</code>'.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

**Running the application installed on the target device**

``` bash
ares-launch --device target com.example.sampleapp
```

**Running the application with url parameter**

``` bash
ares-launch --device target com.example.sampleapp --params "{'url':'webosose.org'}"
```

{{< note >}}
When you use a parameter, web app will receive the parameter with the `webOSLaunch` event. For more detailed information on the `webOSLaunch` event, see [Web App Lifecycle]({{< relref "web-app-lifecycle" >}}).
{{< /note >}}

**Listing applications running on the target device**

``` bash
ares-launch --device target --running
```

**Terminating application currently running**

``` bash
ares-launch --device target --close com.example.sampleapp
```

### ares-inspect

This command provides Web Inspector and Node Inspector. Web Inspector and Node Inspector run in a web browser on the host machine. Each inspector displays the run-time information of the web application and JS services, respectively.

#### Usages

``` bash
ares-inspect [OPTION...] [--app|-a] APP_ID

ares-inspect [OPTION...] --service|-s SERVICE_ID

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
<tr class="odd">
<td><p>-d, --device</p></td>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device where the application is installed.</p></td>
</tr>
<tr class="even">
<td><p>-a, --app</p></td>
<td><p>APP_ID</p></td>
<td><p>Specifies the application to run with Web Inspector.</p></td>
</tr>
<tr class="odd">
<td><p>-s, --service</p></td>
<td><p>SERVICE_ID</p></td>
<td><p>Specifies the JS service to run with Node Inspector.</p></td>
</tr>
<tr class="even">
<td><p>-o, --open</p></td>
<td><p>None</p></td>
<td><p>Opens the default browser of the host machine.</p>
<p>Web Inspector and Node Inspector work in the Blink-based web browsers (e.g. Chrome or Opera) only. You have to re-open the inspector page in one of those browsers if another browser is your default web browser (e.g. Safari or Internet Explorer).</p></td>
</tr>
<tr class="odd">
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
<tr class="even">
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the <strong><span class="code">ares-inspect</span></strong> command.</p></td>
</tr>
<tr class="odd">
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <strong><span class="code">ares-inspect</span></strong> command.</p></td>
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
<tr class="odd">
<td><p>APP_ID</p></td>
<td><p>ID of the application whose information is to be viewed using the Web Inspector.</p></td>
</tr>
<tr class="even">
<td><p>SERVICE_ID</p></td>
<td><p>ID of the JS Service whose information is to be viewed using the Node Inspector.</p></td>
</tr>
<tr class="odd">
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device on which the application is installed.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

**Running the Web Inspector for an application**

``` bash
ares-inspect --device target --app com.example.sampleapp
```

**Running the Node Inspector for a JS service**

``` bash
ares-inspect --device target --service com.example.sampleapp.sampleservice
```

### ares-server

This command runs a web server for testing local file. The web server will run on the given path. You can terminate the web server with **Control+C** (in Windows and Linux) or **Command+C** (in macOS).

#### Usages

``` bash
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
<tr class="odd">
<td><p>-o, --open</p></td>
<td><p>None</p></td>
<td><p>Opens the default browser of the host machine.</p></td>
</tr>
<tr class="even">
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
<tr class="odd">
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the <strong><span class="code">ares-server</span></strong> command.</p></td>
</tr>
<tr class="even">
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <strong><span class="code">ares-server</span></strong> command.</p></td>
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
<tr class="odd">
<td><p>APP_DIR</p></td>
<td><p>Specifies the directory of the application to be published on the web server.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

**Running the Web Server in a source directory**

``` bash
ares-server ./source
```

**Running the Web Server with browser**

``` bash
ares-server ./source --open
```

### ares-shell

This command opens a shell of a target device and executes shell commands in the target device.

#### Usages

``` bash
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
<tr class="odd">
<td><p>-d, --device</p></td>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device.</p></td>
</tr>
<tr class="even">
<td><p>-r, --run</p></td>
<td><p>CMD</p></td>
<td><p>Specifies a command executed in the target device.</p></td>
</tr>
<tr class="odd">
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists available target devices.</p></td>
</tr>
<tr class="even">
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the <strong>ares-shell</strong> command.</p></td>
</tr>
<tr class="odd">
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <strong>ares-shell</strong> command.</p></td>
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
<tr class="odd">
<td><p>CMD</p></td>
<td><p>Specifies a command executed in the target device.</p></td>
</tr>
<tr class="even">
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

**Opening the remote shell of the target device**

``` bash
ares-shell --device target
```

**Executing a command inside the shell of the target device**

``` bash
ares-shell --device target -r "pwd"
```

``` bash
ares-shell --device target -r "echo hello webOS"
```

### ares-push

This command pushes file(s) from a host machine to a target device.

#### Usages

``` bash
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
<tr class="odd">
<td><p>-d, --device</p></td>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device that you want to copy the file(s) to.</p></td>
</tr>
<tr class="even">
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists available target devices.</p></td>
</tr>
<tr class="odd">
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
<tr class="even">
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of the <strong><strong>ares</strong>-push</strong> command.</p></td>
</tr>
<tr class="odd">
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of the <strong>ares-push</strong> command.</p></td>
</tr>
<tr class="even">
<td><p>-i, --ignore</p></td>
<td><p>None</p></td>
<td><p>Does not display detailed messages of the <strong>ares-push</strong> result.</p></td>
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
<tr class="odd">
<td><p>SOURCE</p></td>
<td><p>Specifies the file/directory path of the host machine.</p></td>
</tr>
<tr class="even">
<td><p>DESTINATION</p></td>
<td><p>Specifies the file/directory path of the target device.</p></td>
</tr>
<tr class="odd">
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device that you want to copy the file(s) to.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

**Listing available targets**

``` bash
ares-push --device-list
```

**Pushing contents of a specific directory from the host machine to the target device**

``` bash
ares-push --device target /home/username/foo /home/username/foo
```

**Pushing a file from the host machine to the target device**

``` bash
ares-push --device target /home/username/foo.txt  /home/username/foo.txt
```

### ares-pull

This command pulls file(s) from a target device to a host machine.

#### Usages

``` bash
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
<tr class="odd">
<td><p>-d, --device</p></td>
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device that you want to copy the file(s) from.</p></td>
</tr>
<tr class="even">
<td><p>-D, --device-list</p></td>
<td><p>None</p></td>
<td><p>Lists available target devices.</p></td>
</tr>
<tr class="odd">
<td><p>-v</p></td>
<td><p>None</p></td>
<td><p>Displays the execution log.</p></td>
</tr>
<tr class="even">
<td><p>-V, --version</p></td>
<td><p>None</p></td>
<td><p>Displays the version of <strong>ares-pull</strong> command.</p></td>
</tr>
<tr class="odd">
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help of <strong>ares-pull</strong> command.</p></td>
</tr>
<tr class="even">
<td><p>-i, --ignore</p></td>
<td><p>None</p></td>
<td><p>Does not display detailed messages of <strong>ares-pull</strong> result.</p></td>
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
<tr class="odd">
<td><p>SOURCE</p></td>
<td><p>Specifies the file/directory path of the target device.</p></td>
</tr>
<tr class="even">
<td><p>DESTINATION</p></td>
<td><p>Specifies the file/directory path of the host machine.</p></td>
</tr>
<tr class="odd">
<td><p>TARGET_DEVICE</p></td>
<td><p>Specifies the target device that you want to copy the file(s) from.</p></td>
</tr>
</tbody>
</table></div>

#### Examples

Here are some examples of the different uses:

**Listing available target devices**

``` bash
ares-pull --device-list
```

**Pulling contents of a specific directory from the target device to the host machine**

``` bash
ares-pull --device target /home/username/foo /home/username/foo
```

**Pulling a file from the target device to the host machine**

``` bash
ares-pull --device target /home/username/foo.txt  /home/username/foo.txt
```
