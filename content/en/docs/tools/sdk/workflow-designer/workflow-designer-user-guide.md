---
title: User Guide
display_title: Workflow Designer User Guide
date: 2023-11-17
weight: 10
toc: true
---

{{< caution >}}
Workflow Designer is no longer maintained since December 2019.
{{< /caution >}}

Workflow Designer is a GUI-based utility which allows you to add AI logic to your web app, without actually modifying its source code. This makes your web app context-aware and therefore provides a better experience to your customers. For example, without updating the source code of your app, you can configure it to perform operations on voice instructions.

This functionality is provided by an ecosystem that includes **Workflow Designer** and **Context Intent Manager (CIM)**. While Workflow Designer is used to define the workflow, CIM is used to execute the flow. The CIM component that is provided in the webOS image, interacts with the AI engine and the workflow to provide the required functionality. Check the video below for a basic walkthrough.

{{< youtube 9UDDmtVoacc >}}

Some of the main benefits of Workflow Designer are:

- Reduces time spent in developing AI logic in the web app.
- Developer does not need in-depth understanding of AI engines.
- Does not increase the code size and complexity.

{{< note >}}
Workflow Designer and CIM are based on IBM's Node-RED framework. In this document, we only explain the aspects that are specific to the webOS implementation. For information on general usage of the Node-RED framework, see [https://nodered.org/docs/](https://nodered.org/docs/).
{{< /note >}}

## Prerequisites

Workflow Designer provides voice AI logic (Google Assistant). To set up Google Assistant, see instructions in the [Google Assistant Setup]({{< relref "setting-up-google-assistant" >}}).

## System Requirements

Workflow Designer can be run on systems that meet the following criteria:

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<thead>
<tr class="header">
<th>Operating System</th>
<th>System Requirements</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Windows</p></td>
<td><ul>
<li><p>Windows 7 and later</p></li>
<li><p>Intel Pentium 4 processor or later that's SSE2 capable</p></li>
<li><p>512 MB of RAM</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>macOS</p></td>
<td><ul>
<li><p>macOS 10.10 Yosemite and macOS 10.12 Sierra (64-bit)</p></li>
<li><p>Intel processor (64-bit)</p></li>
<li><p>512 MB of RAM</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>Linux</p></td>
<td><ul>
<li><p>Ubuntu 16.04 LTS</p></li>
<li><p>Intel Pentium 4 processor or later that's SSE2 capable</p></li>
</ul></td>
</tr>
</tbody>
</table>
</div>

## Installing Workflow Designer

Download the package from the [SDK download]({{< relref "sdk-download" >}}) page based on your operating system and then extract the archived package.

## Using Workflow Designer

Start Workflow Designer by executing the `.cmd` or `.sh` file (depends on the operating system). The high-level steps for using Workflow Designer are explained in the following image:

{{< figure src="/images/docs/tools/workflow-designer/workflow-designer-usage-high-level-steps.gif" alt="" caption="High-level steps of Workflow Designer usage" >}}

Here are a few details about using Workflow Designer.

1.  Define the workflow.

    Workflow Designer provides an easy-to-use interface to define the workflow. All functionality is provided by nodes which have to be added based on your business logic.

    {{< note >}}
    Application developer must ensure that the required launch parameters are handled in the web app.
    {{< /note >}}

2.  Package the workflow into the web app and create an updated IPK file.

3.  Deploy the app onto the target webOS device.

    {{< note >}}
    Make sure the webOS image on the device includes the CIM component.
    {{< /note >}}

To learn more about Workflow Designer, see the **application-level help** provided in the user interface (click **Help** on the Menu bar). For help on individual nodes, click a node and see the corresponding documentation in the right pane.

## Source Code Updates to Handle Data Sharing

If the workflow is defined to get data from the app ("data-inject" node) or to publish data to the app ("data-publish" node), minor updates must be made in the app source code.

- To inject data from app to the workflow, invoke the method: `com.webos.service.contextintentmgr/injectDataToWorkflow`
- For app to receive data from the workflow, invoke the method: `com.webos.service.contextintentmgr/getDataFromWorkflow`

For more information on the API, see [com.webos.service.contextintentmgr]({{< relref "com-webos-service-contextintentmgr" >}}).

## Troubleshooting

- Workflow Designer uses PORT 1881 for operation, so the port must be kept free. It must not be used for other purposes.