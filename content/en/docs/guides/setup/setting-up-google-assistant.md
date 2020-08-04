---
title: Google Assistant Setup
date: 2020-03-06
weight: 60
toc: true
---

For the voice AI logic to work on your app or service, you need to set up Google Assistant on your device.

{{< note >}}
The following guide refers to [Configure a Developer Project and Account Settings](https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account) guide.
{{< /note >}}

## Creating a New Project

1. Create a Google account.

2. Go to the [Actions Console](http://console.actions.google.com/) and perform the following steps:

    1. Click **New Project**.

    2. Accept the Terms of Service and click **AGREE AND CONTINUE**.

    3. Type a name of your project and click **Create project**.

You just created a new Actions Console project. For your convenience, keep this page open and go to the next step. We will register a device in [Registering the Device Model]({{< relref "#registering-the-device-model">}}).

## Enabling Google Assistant API

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

## Configuring Consent Screen

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

## Setting Up Activity Controls

To use Google Assistant API, you have to share the Activity Controls data with Google.

1. Go to [Activity controls](https://myaccount.google.com/activitycontrols) page.

2. In the **Web & App Activity** box, make sure the following checkboxes are selected:

  - Include Chrome history and activity from sites, apps, and devices that use Google services
  - Include voice and audio recordings

## Registering the Device Model

To register the device model, you have to go back to the page which you opened in [Creating a New Project](#creating-a-new-project).

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
    - Any device type is available for webOS. If you want to see a whole list of device types, visit [Device model reference page](https://developers.google.com/assistant/sdk/reference/device-registration/model-and-instance-schemas.html#device_model_json).
    - `Model id` will be used in [Register the Device ID]({{< relref "#register-the-device-id" >}}). For your convenience, please note it down.
    {{< /note >}}

4. Click **Download OAuth 2.0 credentials**. A client secret file (in JSON format) will be downloaded. This JSON file will be used in [Register the Device ID]({{< relref "#register-the-device-id" >}}). Click **Next**.

5. (Optional) Click the trait checkbox that you want and click **SAVE TRAITS**. To skip this step, click **SKIP**.

You can see the registered device information in Device registration menu.

{{< figure src="/images/docs/tools/workflow-designer/workflow-designer-device-list.jpg" alt="A device list in the device registration menu" caption="" class="align-left" >}}

## Setting Up Your Target Device

It's time to set up your target device. Before you start it, make sure the following have been completed:

- Creating Actions Console project and registering the device model
- Enabling Google Assistant API
- Setting up Google account's activity controls
- Downloading the client secret file

### Get a Credentials File

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

### Register the Device ID

Now you register an ID for device model that you created in [Registering the Device Model]({{< relref "#registering-the-device-model" >}}).

1. Open `device_id.json` file.

    ```bash
    $ cd /etc/googleAssistant
    $ vi ./device_id.json
    ```

2. Modify the fields:

    - `id` : Input the device instance string. Typically, my_webos.
    - `model_id` : Input the device model ID registered in [Registering the Device Model]({{< relref "#registering-the-device-model" >}}).

3. Register the device using the command:

     ```bash
     $ ./register_device_id.sh
     ```

### Configure AI Service

1.  Enter the command:

    ```bash
    $ vi /etc/systemd/system.conf.d/ai.conf
    ```

2.  Modify the fields:

    - `GOOGLEAI_DEVICE_MODEL` : Input the device model ID registered in [Registering the Device Model]({{< relref "#registering-the-device-model" >}}).
    - `GOOGLEAI_DEVICE_ID` : Input the device instance string registered in [Register the Device ID]({{< relref "#register-the-device-id" >}}).

3. Reboot the device or restart the service daemon:

    ```bash
    $ reboot
    ```

    OR,

    ```bash
    $ systemctl restart ai
    ```

## Testing Google Assistant API

You can check if the settings are correct by using [com.webos.service.ai.voice]({{< relref "com-webos-service-ai-voice" >}}) API.

{{< note >}}
- You need a microphone to proceed with the following test.
- For more information about the test codes, see [com.webos.service.ai.voice]({{< relref "com-webos-service-ai-voice" >}}) API.
{{< /note >}}

### Step 1. Call the start() method

``` bash
/sysroot/home/root# luna-send -n 1 -f luna://com.webos.service.ai.voice/start '{"mode": "continuous", "keywordDetect": true}'
{
  "returnValue": true
}
```

### Step 2. Call the getState() method

``` bash
root@raspberrypi4:/sysroot/home/root# luna-send -i -f luna://com.webos.service.ai.voice/getState '{"subscribe": true}'
{
    "state": "waitActivation",
    "subscribed": true,
    "returnValue": true
}
```

### Step 3. Say "Snowboy" to Your Microphone

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