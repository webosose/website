---
title: User Guide
display_title: Beanviser User Guide
date: 2020-01-08
weight: 10
toc: true
---

Beanviser is a performance monitoring and diagnostics tool that remotely communicates with a webOS device and evaluates apps running on the device. It provides the following benefits:

- Real-time analysis of an app’s performance.
- Easy-to-read graphical representations of data that help you visualize performance of apps.
- Historical data which can be saved and imported to Beanviser.
- Logs for debugging the apps.

## Overview

Beanviser is a simple and easy-to-use tool; in just few clicks you can connect to a device and start monitoring and debugging apps. Check the [video below](#beanviser-explainer-video) for a basic walkthrough.

{{< note >}}
Beanviser can also be used to monitor apps running on an emulator.
{{< /note >}}

{{< note >}}
Beanviser provides the UDC (Usage Data Collection) feature which collects information about how Beanviser is used. This data is used for further enhancing the quality of Beanviser. UDC does not collect any information that can uniquely identify you as an individual. To turn off the UDC feature, run the **`disable_udc.sh`** (Linux or macOS) or **`disable_udc.vbs`** (Windows) scripts that are available in the Beanviser root directory.
{{< /note >}}

### Key Features

Beanviser provides a comprehensive set of features:

- Monitoring:
    - System CPU and Memory
    - Process CPU and Memory
- Diagnostics:
    - Pm Logs
    - GStreamer Logs *(Available from Beanviser v2.0.0)*
    - Traffic on webOS service bus

{{< note >}}
The **Open Source Software Notice** is provided in the Beanviser root directory.
{{< /note >}}

### When to Use Beanviser

With Beanviser you can evaluate how your app performs in a live environment and check for issues before the app is deployed for commercial purposes. Therefore, we recommend that you let Beanviser evaluate the app for a few days, to give you a real-life view into the operation of the app.

### Beanviser Explainer Video

{{< note >}}
This video is based on an initial Beanviser release. You might notice minor variations in the user interface.
{{< /note >}}

{{< youtube B8o01s3bYDE >}}

## System Requirements

Check out the software and hardware requirements to use Beanviser.

### Software Requirements

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<thead>
<tr class="header">
<th>OS</th>
<th>Requirement</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Linux</td>
<td>Ubuntu 14.04, 16.04 or Ubuntu Mint (Maya)</td>
</tr>
<tr class="even">
<td>macOS</td>
<td>10.12 (Sierra) and 10.13 (High Sierra) (64-bit)</td>
</tr>
<tr class="odd">
<td>Windows</td>
<td>Windows 7 or higher</td>
</tr>
</tbody>
</table>
</div>

### Hardware Requirements

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<thead>
<tr class="header">
<th>HW Component</th>
<th>Requirement</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>CPU</td>
<td>Intel<sup>®</sup> Pentium<sup>®</sup> 4 2.0 GHz or faster</td>
</tr>
<tr class="even">
<td>Memory</td>
<td>Minimum 3 GB</td>
</tr>
<tr class="odd">
<td>VGA</td>
<td>1280 x 1024 or greater</td>
</tr>
<tr class="even">
<td>Graphic Card</td>
<td>256 MB or more of video memory</td>
</tr>
</tbody>
</table>
</div>

## Getting Started

Perform the following steps to get started with Beanviser.

### Install Beanviser

No installation is required; simply download the package from the [SDK download]({{< relref "sdk-download" >}}) page based on your operating system and unpack the archive to a desired location.

### Launch Beanviser

The following table details the steps to launch Beanviser on different operating systems:

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Operating System</th>
<th style="text-align: left;">To Launch...</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Linux</p></td>
<td style="text-align: left;"><ol>
<li><p>Open a terminal on Linux, and go to the directory that contains the extracted Beanviser package.</p></li>
<li><p>Type <strong>beanviser.sh</strong> and press <strong>Enter</strong> on the terminal to launch Beanviser.</p></li>
</ol></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>macOS</p></td>
<td style="text-align: left;"><ol>
<li><p>Open a terminal on the macOS, and go to the directory that contains the extracted Beanviser package.</p></li>
<li><p>Type <strong>beanviser.sh</strong> and press <strong>Enter</strong> on the terminal to launch Beanviser.</p></li>
</ol></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Windows</p></td>
<td style="text-align: left;"><p>On windows, you can use file explorer or command prompt.</p>
<p> </p>
<p><strong>Using file explorer:</strong></p>
<ol>
<li><p>Open a file explorer on Windows, and go to the directory that contains the extracted Beanviser package.</p></li>
<li><p>Double-click <strong>beanviser.cmd</strong> to launch Beanviser.</p></li>
</ol>
<p> </p>
<p><strong>Using command prompt:</strong></p>
<ol>
<li><p>Open a command prompt on Windows, and go to the directory that contains the extracted Beanviser package.</p></li>
<li><p>Type <strong>beanviser.cmd</strong> and press <strong>Enter</strong> on the command prompt to launch Beanviser.</p></li>
</ol></td>
</tr>
</tbody>
</table>
</div>

### Connect to Device

You must first add the target device on Beanviser and then connect to that device as follows:

1.  Click the **Configuration** button **(...)** to get a list of available devices.

    {{< figure src="/images/docs/tools/beanviser/beanviser-click-configuration-button.png" alt="Beanviser Click Configuration Button" class="align-left" >}}

    {{< note >}}
    As the emulator is a basic device for testing, Beanviser has the emulator in its device list by default. This device is configured to access the local emulator. If required to access emulator on another device, specify the IP address of that system. In case you accidentally delete the emulator from the list, follow the steps given below to add the emulator again.
    {{< /note >}}

    {{< note >}}
    If you already have the targets added by using [ares-setup-device]({{< relref "cli-user-guide#ares-setup-device" >}}), Beanviser will show you the added targets automatically.
    {{< /note >}}

2.  To add a new device, click the **+** button and provide the details of the target device:

    <div class="table-container">
    <table class="table is-bordered is-fullwidth">
    <thead>
    <tr class="header">
    <th>Item</th>
    <th>webOS Device</th>
    <th>Emulator</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Name</td>
    <td>Any name</td>
    <td>Any name</td>
    </tr>
    <tr class="even">
    <td>Host</td>
    <td>&lt;IP address of the device&gt;</td>
    <td>127.0.0.1 (local emulator) or remote IP address </td>
    </tr>
    <tr class="odd">
    <td>Port</td>
    <td>22</td>
    <td>6622</td>
    </tr>
    <tr class="even">
    <td>Username</td>
    <td>root</td>
    <td>root</td>
    </tr>
    </tbody>
    </table>
    </div>

3.  To connect to a target device, select it from the device list and click the **Connect** button.

    {{< figure src="/images/docs/tools/beanviser/beanviser-connect-to-device.png" alt="Beanviser Connect to Device" class="align-left" >}}

    {{< note >}}
    If you are prompted to re-install the Beanviser service, see [Updating Beanviser Service](#updating-beanviser-service).
    {{< /note >}}

    {{< note >}}
    Data gathered in the current Beanviser session is not available in other sessions. If required, make sure the data is saved.
    {{< /note >}}

## Basic Operations

This section shows the typical layout of the Beanviser user interface and then explains the key Beanviser features and how to use them.

### Screen Layout

{{< figure src="/images/docs/tools/beanviser/beanviser-screen-layout.png" alt="Beanviser Screen Layout" >}}

A brief overview of the different elements of the Beanviser user interface.

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<thead>
<tr class="header">
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><strong>A</strong> (Function tabs)</p></td>
<td style="text-align: left;"><p>Each tab corresponds to a key Beanviser function. For details on each function, see <a href="#beanviser-functions">Beanviser Functions</a>. </p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><strong>B</strong> (Operation tabs)</p></td>
<td style="text-align: left;"><p>The operations that you can perform for a Beanviser function.</p>
<ul>
<li><p><strong>Start</strong> - Starts gathering and displaying live data. </p></li>
<li><p><strong>Stop</strong> - Pause or suspend data collection. </p></li>
<li><p><strong>Clear</strong> - Clears existing visualization charts from the tab. This option is enabled only when data collection is stopped.</p></li>
<li><p><strong>Save</strong> - Saves the data in the local system. This option is enabled only when data collection is stopped.</p>
<ul>
<li><p>The data is saved in the <em>[Beanviser_installation_path]/logs</em> directory. The log file name specifies the timestamp and the log type.</p></li>
</ul></li>
<li><p><strong>Import</strong> - Imports a saved file from the local system. This data is then displayed as per view. This option is enabled only when Beanviser is not connected to a target (webOS device or emulator).</p></li>
</ul></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><strong>C</strong> (Data modes)</p></td>
<td style="text-align: left;"><p>The type of data to be displayed.</p>
<ul>
<li><p><strong>Live Monitoring</strong> (default): Shows live reports for the last one hour, from the time the operation was started.</p></li>
<li><p><strong>History Data</strong>: Shows metrics older than one hour from the current timestamp. In case of log files, it shows logs older than 10000 logs. </p></li>
</ul></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><strong>D</strong> (Data view)</p></td>
<td style="text-align: left;"><p>The data (graph or table) is displayed here. </p></td>
</tr>
</tbody>
</table>
</div>

### Beanviser Functions

A detailed description and usage of each Beanviser function.

#### Overview

This tab provides a summarized view of all the information collected by Beanviser. This information is updated in real-time, while measuring is active.

You can export this information as a **PDF** file onto the local system.

#### System CPU

Provides CPU utilized by the system, which is categorized based on:

- CPU modes (user mode and kernel mode)
- CPU used by other entities
- Overall CPU utilization

The above information is displayed in the following graphical views:

- CPU usage (All cores)
- CPU usage by each core

**How to...**

- **General Usage:** Start the operation > View the data > Stop the operation

#### System Memory

Provides memory consumed by the system. It is categorized based on how much memory is:

- Used
- Free
- Shared
- Available
- Consumed overall
- Stored in buffer

The above information is displayed in the following graphical views:

- System memory
- Swap memory (displays only total, used, and free memory)

**How to...**

- **General Usage:** Start the operation > View the data > Stop the operation

#### Process CPU

Provides CPU utilized by different processes, which includes:

- JS services
- Native services
- The app you installed
- System processes (processes that do not belong to the other groups).

**How to...**

- **General Usage:** Start the operation > View the data > Stop the operation

- **Plot data for specific processes:** By default, the graph shows only system-level CPU utilization. To plot for a specific process, select it from the list displayed in the top-right corner.

#### Process Memory

Provides memory consumed by different processes, which includes:

- JS services
- Native services
- The app you installed
- System processes (processes that do not belong to the other groups).

The above information is displayed using the following metrics:

- In mega bytes
- In percentage

**How to...**

- **General Usage:** Start the operation > View the data > Stop the operation

- **Plot data for specific processes:** By default, the graph shows only system level CPU utilization. To plot for a specific process, select it from the list displayed in the top-right corner.

#### Log Viewer

Use this view to see the platform logs that are available on the webOS device. You can filter the logs based on:

- Type of logs
- Processes

**How to...**

- **Usage:** Start the operation > View the data > Stop the operation

#### LS Monitor

Provides details of traffic going over the webOS service bus (Luna Bus); similar to a network sniffer that lets you observe HTTP traffic.

**How to...**

- **General Usage:** Start the operation > View the data > Stop the operation

- **Generate the sequence diagram** *(Available from Beanviser v2.0.0)*: Once the list is generated, use the **Draw Flow** option to create a diagram that shows sequence in which service calls are executed.

#### GStreamer

*(Available from Beanviser v2.0.0)*

Provides the following information:

- Media debug logs from GStreamer
- Metadata from the webOS media server (umediaserver)
- Dot graph
    - Generates a pipeline diagram for each media instance.
    - Reads information from .dot files and creates graphs that show how different modules of the pipeline communicate with each other.

**How to...**

- **Usage:​** Set the log level > Start the operation > Logs are captured internally > Stop the operation > Captured logs are displayed

{{< note >}}
Unlike other functions, GStreamer logs are not immediately displayed on start of the operation. The logs that are captured between the **Start** and **Stop** time are displayed, ONLY when the operation is stopped.
{{< /note >}}

{{< note >}}
GStreamer logs are not available on emulator devices.
{{< /note >}}

#### Compare Log Files

Allows you to compare log files taken at different times.

- Logs must be of the same type.
- For example, you can compare a system CPU log with a system CPU log, but not a system CPU log with a system memory log.
- To acquire log files, in the relevant tab, click **Stop** to stop measuring and then click **Save** to get the log file in the *`[Beanviser-installation-path]/logs`* directory. The log file name specifies the timestamp and the log type.

**How to...**

- **General Usage:** Upload the files > View the data

## Additional Operations

In addition to its key features, Beanviser allows you to enhance the usability and also perform some other miscellaneous operations.

### Zooming Into a Graphical View

Use the navigation bar to zoom-in or zoom-out on a certain area of the chart. This is explained with the help of the following example:

- Navigation bar handles moved from the default position to a certain time frame.

- Before moving the navigation bar, the graph shows data from 10:59:00 to 11:08:00.

- After moving the navigation bar, the graph shows data from 11:05:00 to 11:07:00.

- In other words, the graph from 11:05:00 to 11:07:00 has been zoomed in.

{{< figure src="/images/docs/tools/beanviser/beanviser-navigation-bar.png" alt="Beanviser Navigation Bar" >}}

### Background Logging

When you do not need to visualize the performance, you can choose to start background logging. In this feature, Beanviser collects logs for the specified duration and stores it on the target device. You can later retrieve these to your local system.

{{< note >}}
This feature is only available for the **System CPU** and **System Memory** views.
{{< /note >}}

1.  To start background logging:

    1.  After connecting to the device, click the **Configuration** button <img src="/images/docs/tools/beanviser/beanviser-configuration-button.jpg" alt="Configuration button"> on the top-left corner.

    2.  From the **Main Menu** <img src="/images/docs/tools/beanviser/beanviser-mainmenu-button.jpg" alt="Main menu button">, click **Start Logging**.

        {{< figure src="/images/docs/tools/beanviser/beanviser-start-logging.png" alt="Beanviser Start logging" class="align-left" >}}

    3.  Enter the duration (in Seconds) for logging and click **START**.

2.  To retrieve the log file from the target device and store on your local system (`[Beanviser installation path]/logs`):

    1.  Click the **Configuration** button <img src="/images/docs/tools/beanviser/beanviser-configuration-button.jpg" alt="Configuration button"> on the top-left corner.

    2.  From the **Main Menu** <img src="/images/docs/tools/beanviser/beanviser-mainmenu-button.jpg" alt="Main menu button">, click **Get Log from Target**.

        {{< figure src="/images/docs/tools/beanviser/beanviser-get-log-from-target.png" alt="Beanviser Get log from target" class="align-left" >}}

        The info dialog will appear and show you where the log file is.

### Updating Beanviser Service

When you connect to a device, a Beanviser service, which is packaged in a dummy app, gets installed on the webOS device. The Beanviser tool requires this Beanviser service, so that it can communicate with the device.

{{< note >}}
The Beanviser service is available as an IPK file in the directory where Beanviser is installed.
{{< /note >}}

If the Beanviser service is updated, the updated IPK file must be re-installed on the webOS device (as described below). Therefore:

- If connecting to a new device, the service is automatically copied to device.

- If connecting to a previously connected device (which already has the Beanviser service), you are prompted to re-install the Beanviser service.

To update the service on the Beanviser installation:

1.  Update the source code of the Beanviser service that is provided in the `[Beanviser_installation_path]/service` directory.

2.  Use the Beanviser tool to repackage the service.

    1.  Click the **Configuration** button <img src="/images/docs/tools/beanviser/beanviser-configuration-button.jpg" alt="Configuration button"> on the top-left corner.

    2.  From the **Main Menu** <img src="/images/docs/tools/beanviser/beanviser-mainmenu-button.jpg" alt="Main menu button">, click **(Re)Package.**

        {{< figure src="/images/docs/tools/beanviser/beanviser-repackage.png" alt="Beanviser Re-package" class="align-left" >}}

        If successful, Beanviser displays a success message and updates the Beanviser service IPK file.

### Uninstalling Beanviser Service

To remove the Beanviser service from a target device:

1.  Click the **Configuration** button <img src="/images/docs/tools/beanviser/beanviser-configuration-button.jpg" alt="Configuration button"> on the top-left corner.
2.  Select the device from the device list.
3.  Disconnect the target device.
4.  From the **Main Menu** <img src="/images/docs/tools/beanviser/beanviser-mainmenu-button.jpg" alt="Main menu button">, click **Uninstall**.

    {{< figure src="/images/docs/tools/beanviser/beanviser-uninstall.png" alt="Beanviser Uninstall" class="align-left" >}}

    If successful, Beanviser will display a success message.

### Re-ordering Views

You can customize the tab order within the Beanviser UI. You can also control if a tab is to be hidden or shown in the UI.

To customize the tabs:

1.  Click the **Configuration** button <img src="/images/docs/tools/beanviser/beanviser-configuration-button.jpg" alt="Configuration button"> on the top-left corner.
2.  From the **Main Menu** <img src="/images/docs/tools/beanviser/beanviser-mainmenu-button.jpg" alt="Main menu button">, click **Re-order Views**.

    {{< figure src="/images/docs/tools/beanviser/beanviser-reorder-views.png" alt="Beanviser Reorder views" class="align-left" >}}

    The customization table will be displayed as shown below.

    {{< figure src="/images/docs/tools/beanviser/beanviser-customization-table.png" alt="Beanviser customization table" class="align-left" >}}

3.  To hide or show tabs on the screen, use the check boxes.
4.  To change the order of the tabs, use the arrow buttons.

### Clearing All Views

You can clear the charts in all tabs regardless of whether Beanviser is connected to a device or not.

To clear the charts:

1.  Click the **Configuration** button <img src="/images/docs/tools/beanviser/beanviser-configuration-button.jpg" alt="Configuration button"> on the top-left corner.
2.  From the **Main Menu** <img src="/images/docs/tools/beanviser/beanviser-mainmenu-button.jpg" alt="Main menu button">, click **Clear All Views**.

    {{< figure src="/images/docs/tools/beanviser/beanviser-clear-all-views.png" alt="Beanviser Clear all views" class="align-left" >}}

    If successful, the charts on each tab will be cleared.

## FAQ

**► How to resolve the following error:**

``` bash
Error Installing the perf service ...
luna-send command failed (Unknown method "install" for category "/dev/")
```

**Diagnosis:** This error occurs when connecting to a device, if the "dev mode" feature is not enabled on the device.

**Resolution:** Enable the "dev mode" feature as follows:

1.  Connect to device using an SSH client (like Putty).

2.  Enable the "dev mode" feature by calling the [setDevMode]({{< relref "com-webos-service-devmode#setdevmode" >}}) method using the luna-send command.

3.  Restart the device.

**► When are warnings/errors displayed in System CPU view?**

Warning and error indicators are shown on the graph when CPU utilization exceeds the following threshold values:

- Above 80% - Warning
- Above 90% - Error

**► When are warnings/errors displayed in System Memory view?**

Warning and error indicators are shown on the graph when memory consumption exceeds the following threshold values:

- Above 419MB - Warning
- Above 627MB - Error

**► When are warnings/errors displayed in Process CPU view?**

Warning and error indicators are shown on the graph when CPU utilization exceeds the following threshold values:

- Above 90% - Warning
- Above 95% - Error

**► When are warnings/errors displayed in Process Memory view?**

Warning and error indicators are shown on the graph when memory consumption exceeds the following threshold values:

- Above 250MB - Warning
- Above 310MB - Error
