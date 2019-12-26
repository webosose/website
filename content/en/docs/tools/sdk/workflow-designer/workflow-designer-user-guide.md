---
title: Workflow Designer User Guide
date: 2019-12-26
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

## Workflow Designer Explainer Video

{{< youtube 9UDDmtVoacc >}}

## Troubleshooting

- Workflow Designer uses PORT 1881 for operation, so the port must be kept free. It must not be used for other purposes.

## Appendix: Google Assistant Setup

For the voice AI logic to work on your app, you need to set up Google Assistant on your device.

{{< note >}}
The following guide refers to [Configure a Developer Project and Account Settings](https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account) guide.
{{< /note >}}

### Create a New Project

1. Create a Google account.

2. Go to the [Actions Console](http://console.actions.google.com/) and perform the following steps:

    1. Click **New Project**.

    2. Accept the Terms of Service and click **AGREE AND CONTINUE**.

    3. Type a name of your project and click **Create project**.

You just created a new Actions Console project. For your convenience, keep this page open and go to the next step. We will register a device in [Register the Device Model]({{< relref "#register-the-device-model">}}).

### Enable Google Assistant API

1. Go to the [Google APIs](https://console.developers.google.com/apis/).

2. Accept the terms of service and click **Agree and Continue**.

    {{< note >}}
    This page might not show up if you have already accepted the terms of service.
    {{< /note >}}

3. Select the project that you made in the previous step and click **OPEN**.

    {{< figure src="/images/docs/tools/workflow-designer/workflow-designer-select-a-project.jpg" alt="A dropdown menu for selecting a project" caption="" class="align-left" >}}

4. Click **ENABLE APIS AND SERVICES**.

5. Type 'Google Assistant API' in the search box and click the result.

6. Click **ENABLE**.

If the API is set correctly, a dashboard of Google Assistant API will show up.

{{< figure src="/images/docs/tools/workflow-designer/workflow-designer-api-dashboard.jpg" alt="" caption="A dashboard of Google Assistant API" class="align-left" >}}

### Configure Consent Screen

Now it's time to configure consent screen. In the Google Assistant API dashboard, do the following:

1. Click **Credentials** menu on the left.

2. Click **CONFIGURE CONSENT SCREEN** to go to OAuth consent screen menu.

    {{< figure src="/images/docs/tools/workflow-designer/workflow-designer-configure-consent-screen.jpg" alt="Configuring consent screen menu" caption="" class="align-left" >}}

3. Set **External** for the User Type and click **CREATE**.

4. Set the Support email and click **Save**. You can choose the email using the dropdown menu.

    {{< figure src="/images/docs/tools/workflow-designer/workflow-designer-setting-up-support-email.jpg" alt="Setting up support email" caption="" class="align-left" >}}

    {{< note >}}
    Most values in the OAuth consent screen menus are optional. You can change those anytime.
    {{< /note >}}

### Set Up Activity Controls

To use Google Assistant API, you have to share the Activity Controls data with Google.

1. Go to [Activity controls](https://myaccount.google.com/activitycontrols) page.

2. In the **Web & App Activity** box, make sure the following checkboxes are selected:

  - Include Chrome history and activity from sites, apps, and devices that use Google services
  - Include voice and audio recordings

### Register the Device Model

To register the device model, you have to go back to the page which you opened in [Create a New Project](#create-a-new-project).

{{< note >}}
If you closed the page, you can go the device registration page as follows:

1. Visit [Action Console page](https://console.actions.google.com/).
2. Click your project.
3. Click **Develop** menu on the top.
4. Click **Device registration** on the left.

In this case, you can skip the following step 1.
{{< /note >}}

1. Click **Device registration** menu at the bottom.

    {{< figure src="/images/docs/tools/workflow-designer/workflow-designer-device-registration-menu.jpg" alt="Device registration menu" caption="" class="align-left" >}}

2. Click **REGISTER MODEL**.

3. Fill out the blanks and click **REGISTER MODEL**.

    {{< note >}}
    - Any device type is available for webOS OSE. See [Device model reference page](https://developers.google.com/assistant/sdk/reference/device-registration/model-and-instance-schemas.html#device_model_json) for more information.
    - `Model id` will be used in [Register the Device ID]({{< relref "#register-the-device-id" >}}). For your convenience, please note it down.
    {{< /note >}}

4. Click **Download OAuth 2.0 credentials**. A client secret file (in JSON format) will be downloaded. This JSON file will be used in [Register the Device ID]({{< relref "#register-the-device-id" >}}). Click **Next**.

5. (Optional) Click the trait checkbox that you want and click **SAVE TRAITS**. To skip this step, click **SKIP**.

You can see the registered device information in Device registration menu.

{{< figure src="/images/docs/tools/workflow-designer/workflow-designer-device-list.jpg" alt="A device list in the device registration menu" caption="" class="align-left" >}}

### Set Up Your Target Device

It's time to set up your target device. Before you start it, make sure the following have been completed:

- Creating Actions Console project and registering the device model
- Enabling Google Assistant API
- Setting up Google account's activity controls
- Downloading the client secret file

#### Get a Credentials File

Get a credentials file using the downloaded client secret file (in JSON format).

1. Move the client secret file from local PC to your target device:

    ``` bash
    $ scp <downloaded client secret file> root@<your target device IP>:/etc/googleAssistant/client_secret.json
    ```

    {{< caution >}}
    You must change the name of the client secret file into `client_secret.json`.
    {{< /caution >}}

2. From the target device, run the following script:

    ```bash
    $ cd /etc/googleAssistant
    $ ./get_credentials.sh
    ```

3. Copy the URL in the terminal and paste it to your browser.

4. Allow the permissions.

5. Copy the sign-in code and paste it to your terminal. It will create the `credentials.json` file.

#### Register the Device ID

Now you register an ID for device model that you created in [Register the Device Model]({{< relref "#register-the-device-model" >}}).

1. Open `device_id.json` file.

    ```bash
    $ cd /etc/googleAssistant
    $ vi ./device_id.json
    ```

2. Modify the fields:

    - `id` : Input the device instance string. Typically, my_webos.
    - `model_id` : Input the device model ID registered in [Register the Device Model]({{< relref "#register-the-device-model" >}}).

3. Register the device using the command:

     ```bash
     $ ./register_device_id.sh
     ```

#### Configure AI Service

1.  Enter the command:

    ```bash
    $ vi /etc/systemd/system.conf.d/ai.conf
    ```

2.  Modify the fields:

    - `GOOGLEAI_DEVICE_MODEL` : Input the device model ID registered in [Register the Device Model]({{< relref "#register-the-device-model" >}}).
    - `GOOGLEAI_DEVICE_ID` : Input the device instance string registered in [Register the Device ID]({{< relref "#register-the-device-id" >}}).

3. Reboot the device or restart the service daemon:

    ```bash
    $ reboot
    ```

    OR,

    ```bash
    $ systemctl restart ai
    ```

### Test Google Assistant API

You can check if the settings are correct by using [com.webos.service.ai.voice]({{< relref "com-webos-service-ai-voice" >}}) API.

{{< note >}}
- You need a microphone to proceed with the following test.
- For more information about the test codes, see [com.webos.service.ai.voice]({{< relref "com-webos-service-ai-voice" >}}) API.
{{< /note >}}

#### Step 1. Call the start() method

``` bash
/sysroot/home/root# luna-send -n 1 -f luna://com.webos.service.ai.voice/start '{"mode": "continuous", "keywordDetect": true}'
{
  "returnValue": true
}
```

#### Step 2. Call the getState() method

``` bash
root@raspberrypi4:/sysroot/home/root# luna-send -i -f luna://com.webos.service.ai.voice/getState '{"subscribe": true}'
{
    "state": "waitActivation",
    "subscribed": true,
    "returnValue": true
}
```

#### Step 3. Say "Snowboy" to Your Microphone

This action changes the state of com.webos.service.ai.voice API. If the state comes back to "waitActivation", your Google Assistant API is set successfully.

``` bash
{
    "state": "recording"
}
{
    "state": "answering"
}
{
    "state": "thinking"
}
{
    "state": "answering"
}
{
    "state": "waitActivation"   <-- Success!
}
```

{{< note >}}
Google assistant also supports [custom device actions](http://developers.google.com/assistant/sdk/guides/service/python/extend/custom-actions).

- For more information on the custom actions file, refer to `/etc/googleAssistant/action.en.json`.
- To use custom device actions, the [gactions CLI](http://developers.google.com/actions/tools/gactions-cli) tool is required.
{{< /note >}}