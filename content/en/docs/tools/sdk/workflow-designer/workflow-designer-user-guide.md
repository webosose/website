---
title: Workflow Designer User Guide
date: 2019-03-15
weight: 10
toc: true
---

Workflow Designer is a GUI-based utility which allows you to add AI logic to your web app, without actually modifying its source code. This makes your web app context-aware and therefore provides a better experience to your customers.

For example, without updating the source code of your app, you can configure it to perform operations on voice instructions.

{{< note >}}
In this initial release, only voice AI logic (Google Assistant) is provided. To set up Google Assistant, see instructions in the [appendix](#appendix-google-assistant-setup).
{{< /note >}}

This functionality is provided by an ecosystem that includes **Workflow Designer** and **Context Intent Manager (CIM)**. While Workflow Designer is used to define the workflow, CIM is used to execute the flow. The CIM component that is provided in the webOS image, interacts with the AI engine and the workflow to provide the required functionality. Check the [video below](#workflow-designer-explainer-video) for a basic walkthrough.

Some of the main benefits of Workflow Designer are:

- Reduces time spent in developing AI logic in the web app.
- Developer does not need in-depth understanding of AI engines.
- Does not increase the code size and complexity.

{{< note >}}
Workflow Designer and CIM are based on IBM's Node-RED framework. In this document, we only explain the aspects that are specific to the webOS implementation. For information on general usage of the Node-RED framework, see [https://nodered.org/docs/](https://nodered.org/docs/).
{{< /note >}}

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

Start Workflow Designer by executing the **.cmd** or **.sh** file (depends on the operating system). The high-level steps for using Workflow Designer are explained in the following image:

{{< figure src="/images/docs/tools/workflow-designer/ose-workflow-designer-usage-high-level-steps.gif" alt="High-level Steps of Workflow Designer Usage" >}}

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

## Workflow Designer Explainer Video

{{< youtube 9UDDmtVoacc >}}

## Troubleshooting

* Workflow Designer uses PORT 1881 for operation, so the port must be kept free. It must not be used for other purposes.

## Appendix: Google Assistant Setup

For the voice AI logic to work on app, you need to set up Google Assistant on your device.

**Step A: Create credentials.json file.**

1.  Create a Google account.

2.  Go to the [Actions Console](http://console.actions.google.com/) and perform the following steps:

    1.  Create a new project.

    2.  Register your device model and download the OAuth-2.0 credentials file. (See [instructions](https://developers.google.com/assistant/sdk/guides/service/python/embed/register-device).)

        **Note:** It is recommended that you select the device type as **Auto** to avoid errors during the setup.

3.  After downloading the file,

    1.  Move it from your local PC to `/etc/googleAssistant/client_secret.json` on your device using the command:

        ``` bash
        $ scp <downloaded json file> root@<your device ip>:/etc/googleAssistant/client_secret.json
        ```

    2.  From the device, run the following script:

        ``` bash
        $ cd /etc/googleAssistant
        $ ./get_credentials.sh
        ```

4.  Go to the URL generated by the above script. It provides some code.

5.  Copy the code and paste it on the device terminal and run the code. It creates the `credentials.json` file.

6.  Enable Google Assistant API, and configure the consent screen and activity controls for your project/account. (See [instructions](https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account#config-dev-project).)

**Step B: Register the device ID.**

1.  Open `device_id.json` file.

    ```bash
    $ cd /etc/googleAssistant
    $ vi ./device_id.json
    ```

2.  Modify the fields:

    - `id` - Input the device instance string. Typically, `my_webos`.
    - `model_id` -  Input the device model ID registered in Step A.

3.  Register the device using the command:

    ```bash
    $ ./register_device_id.sh
    ```

**Step C: Input the device model and device ID for AI service.**

1.  Enter the command:

    ```bash
    $ vi /var/systemd/system/env/ai.env
    ```

2.  Modify the fields:

    - `GOOGLEAI_DEVICE_MODEL` - Input the device model ID registered in Step A.
    - `GOOGLEAI_DEVICE_ID` - Input the device instance string registered in Step B.

**Step D: Reboot device or restart service daemon.**

  - Enter the command:

    ```bash
    $ reboot
    ```

    OR,

    ```bash
    $ systemctl restart ai
    ```

**Step E: Launch the service using the start() method.**

{{< note >}}
Google assistant also supports [custom device actions](http://developers.google.com/assistant/sdk/guides/service/python/extend/custom-actions).

- For more information on the custom actions file, refer to `/etc/googleAssistant/action.en.json`.
- Requires the [gactions CLI](http://developers.google.com/actions/tools/gactions-cli) tool.
{{< /note >}}
