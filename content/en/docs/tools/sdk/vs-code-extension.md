---
title: webOS Studio - VS Code Extension
date: 2024-03-04
weight: 30
toc: true
---

**webOS Studio** is an [Microsoft Visual Studio Code](https://code.visualstudio.com/) (VS Code) extension for webOS. Using this extension, developers easily start to make webOS apps/services (web app, Enact app, JS service).

Key features are as follows:

- Managing the lifecyle of webOS apps and services
- Managing connected webOS devices and emulators
- Providing many convenience features for webOS development
- Running ESLint on Enact apps

{{< note >}}
See also the [Change Log | VS Code marketplace](https://marketplace.visualstudio.com/items/webOSSDK.webosstudio/changelog).
{{< /note >}}

## How to Install

To install the extension, launch VS Code and do the following steps:

1. Navigate to **View** > **Extensions**.
2. Search for **webOS Studio** in the search bar.
3. Click the **Install** button. 
   
{{< figure src="/images/docs/tools/vs-code-extension/install-webos-studio.jpg" alt="Installation steps for webOS Studio" caption="" class="align-left" >}}
   
Then you will see the ![webos Studio icon in Activity Bar](/images/docs/tools/vs-code-extension/webos-studio-icon.jpg) icon in **Activity Bar**.

Once the installation is completed, see the [Setup Guide | VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=webOSSDK.webosstudio#setup)

## UI Overview

Click the ![webos Studio icon in Activity Bar](/images/docs/tools/vs-code-extension/webos-studio-icon.jpg) icon to see the user interface of the extension:

{{< figure src="/images/docs/tools/vs-code-extension/webos-studio-ui.png" caption="User Interface of the webOS Studio" >}}

| Component | Description |
| --------- | ----------- |
| Apps in workspace | Lists apps in the workspace. The workspace of webOS Studio is different from that of VS Code. For more details, refer to [webOS Studio \| VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=webOSSDK.webosstudio). |
| Known device | Lists the known devices registed by webOS Studio or [CLI]({{< relref "cli-user-guide" >}}). <br /><br /> By default, a dummy emulator device is listed in the view. This device requires VirtualBox emulator on your computer. See the [Emulator Manager](#emulator-manager) section. |
| Package manager | Manages SDKs for webOS app developement.  |
| Emulator Manager | Lists installed images in [VirtualBox Emulator]({{< relref "emulator-user-guide" >}}). |
| Simulator | Only for webOS TV. |
| Quick Launcher | Lists links to webOS Studio documents and tools. |
| Command Palette | Enters and executes various commands. (Shortcut: `Ctrl` + `Shift` + `P`) |
| Notification Area | Shows notification messages for completion, errors, and more about the extension. |

## Basic Usage

This section explains a typical development flow of webOS apps and services using this extension.

### Adding Known Devices

1. Click the **+** button in the **KNOWN DEVICE** view.

    ![Add the known device](/images/docs/tools/vs-code-extension/adding-known-device.png)
    
2. Enter the name, IP, port, and username of your webOS device.

    ![Add the known device](/images/docs/tools/vs-code-extension/adding-known-device.gif)

3. (Optional) Set the device as the default device. Actions that don't specify the target device will be performed on the default device.

    ![Set the default device](/images/docs/tools/vs-code-extension/set-default-device.png)

### Creating an App/Service

First, let's create an app for webOS device. Do one of the following:

- Click the **+** button in the **APPS IN WORKSPACE** view.
- Execute `webOS: Create ProjectWizard` in the **Command Palette**.

Then the **Project Wizard** window will be displayed.

![Creating an app](/images/docs/tools/vs-code-extension/creating-an-app.gif)

#### First Screen

| Item | Description |
|------|-------------|
| webOS Product | A target platform which this app/service will be installed on. |
| API Version | An API level of webOS. Different versions of the webOS platform support different levels of APIs. See [API Levels](https://www.webosose.org/docs/reference/ls2-api/ls2-api-index/#api-levels). |

#### Second Screen

| Item | Description |
|------|-------------|
| Template | webOS Studio provides multiple template for webOS apps/services. Supported templates are as follows: <ul> <li><strong>Basic Web App</strong>: A basic web app for webOS.</li> <li><strong>Hosted Web App</strong>: A hosted web app.</li> <li><strong>Web App Info</strong>: Configuration file for a web app (<code>appinfo.json</code>). See <a href="https://www.webosose.org/docs/guides/development/configuration-files/appinfo-json/">appinfo.json</a>.</li> <li><strong>JS Service</strong>: A JavaScript service for webOS. This service <strong>MUST</strong> be packaged and installed with an app.</li> <li><strong>JS Service Info</strong>: Configuration files for a JS service (<code>services.json</code> and <code>package.json</code>). See <a href="https://www.webosose.org/docs/guides/development/configuration-files/services-json/">services.json</a>.</li> <li><strong>Sandstone, Moonstone</strong>: Enact apps with the Sandstone library or the Moonstone library. For more details about Enact apps, visit <a href="https://enactjs.com/">the Enact website</a>.</li> </ul> |

#### webos-service Library

[webos-service library](https://www.webosose.org/docs/reference/webos-service-library/webos-service-library-api-reference/) is a library for using webOS components on JS services or Enact apps. This library is for legacy webOS OSE devices (for version 1.x.x).

To use the library, do one of the following:

- Check the **Yes** button for **Add webOS library**.
 
  ![Add LS2 APIs to projects](/images/docs/tools/vs-code-extension/add-ls2-apis.jpg)

- Install it in the **APP IN WORKSPACE** view.

  ![Install webos-service library using NPM](/images/docs/tools/vs-code-extension/install-webos-npm-library.png)

### Editing the Source Code

Now it's time to implement your own features on the created apps or services.

#### Editing with Auto-Completion

webOS Studio supports a powerful content-assist feature called *Auto-Completion*. Auto-completion includes API suggestions and automatically completes method names, helping users implement webOS features more easily.

For more details about the auto-completion feature, see [Auto-Completion](#auto-completion).

![Auto Completion Example](/images/docs/tools/vs-code-extension/auto-completion-example.jpg)

#### Previewing with Auto Reload

While you editing an app, You can preview the app UI before installing it.

In the **APPS IN WORKSPACE** view, 

1. Right-click the app.
2. Click **Preview Application**.
3. The preview of the app is automatically launched on the IDE.

![Start the app preview](/images/docs/tools/vs-code-extension/starting-the-preview.png)

In the preview, you can modify the source codes and check the results instantly.

![Changing colors using auto reload](/images/docs/tools/vs-code-extension/auto-reload-changing-colors.gif)

### Packaging / Installing / Launching

Typical steps to install webOS apps are as follows:

1. Package the source code into an `.ipk` file.
2. Install the IPK file.
3. Launch the installed app.

The above three steps are triggered sequentially by clicking the **Run App** button in the **APPS IN WORKSPACE** view.

![The run app button](/images/docs/tools/vs-code-extension/run-app-button.jpg)

Then, enter the information about the app. If you use the default information, just press the Enter key.

![Package, install, and launch an app](/images/docs/tools/vs-code-extension/package-install-launch-the-app.gif)

{{< note >}}
A JavaScript service is always packaged with an app. If you want to install a JavaScript service, select the service in the **Service directory to pack with App** step.

![Select JS service](/images/docs/tools/vs-code-extension/select-js-service.jpg)
{{< /note >}}

You can uninstall the apps in the **KNOWN DEVICE** view.

![Uninstall the app](/images/docs/tools/vs-code-extension/uninstall-the-app.jpg)

Or You can uninstall the app manually using the [appInstallService]({{< relref "com-webos-appinstallservice" >}}) API or [webOS CLI]({{< relref "cli-user-guide" >}}).

### Debugging

You can debug apps or services that are installed on [the known devices](#adding-known-devices). Supported types are as follows:

- Web app
- Enact app
- JavaScript service

#### Prerequisites

- Apps or services are installed on target devices
    - The target devices or emulators should be registered as the known devices.
- (For inspector debugging) Chromium-based browser

#### Start a Debugging Session - App 

1. Right-click an installed app.
2. Click **Debug on**. 
3. Click **inspector** or **VS Code**. 
    
    1. **[inspector]**

        Enter a path for the browser executable.
        
        ![Enter a broweser executable path](/images/docs/tools/vs-code-extension/enter-browser-executable-path.png)

        Then the debugging session will be activated in the browser.

        ![Debugging an app with browser](/images/docs/tools/vs-code-extension/debugging-app-with-browser.png)

    2. **[VS Code]**
            
        The **DEBUG CONSOLE** panel will be activated automatically. In the panel, you can check the console messages from the app or service.

        ![Start a debugging session](/images/docs/tools/vs-code-extension/starting-debugging-session.gif)

        In the debugging session, you can set breakpoints, check variables, callstack, etc.

        ![Debugging example](/images/docs/tools/vs-code-extension/debugging.png)

#### Start a Debugging Session - Service 

1. Right-click an installed service.
2. Click **Debug on**. 
3. Click **inspector** or **VS Code**. 
    
    1. **[inspector]**

        1. After clicking the **inspector** button, a URL for the debugging session will be displayed in the **OUTPUT** panel. Copy the URL.
        
            ![URL for debugging service](/images/docs/tools/vs-code-extension/url-for-debugging-service.png)

        2. Open your browser and go to `chrome://inspect`. Configure the URL as follows:
      
            ![Configure the debugging URL](/images/docs/tools/vs-code-extension/configure-debugging-url.png)

            {{< note >}}
            Microsoft Edge browser automatically redirects `chrome://inspect` to `edge://inspect`.
            {{< /note >}}

        3. Click `inspect`.

            ![Click the inspect button](/images/docs/tools/vs-code-extension/click-the-inspect-button.png)

            This opens a new window for the debugging session.

            ![Debugging a service with browser](/images/docs/tools/vs-code-extension/debugging-service-with-browser.png)

    2. **[VS Code]**
        
        The **DEBUG CONSOLE** panel will be activated automatically.

        ![Debugging a service with IDE](/images/docs/tools/vs-code-extension/debugging-service-with-ide.png)

{{< note >}}
Every time you restart a debug session, the packaged app will be closed on the target device. If you want to check the behavior of the app, relaunch the app manually.

![Relaunch the app](/images/docs/tools/vs-code-extension/relaunch-the-app.png)
{{< /note >}}

#### Trouble Shooting Guide for Debugging

<dl>
  <dt>Q) The <b>Run and Debug</b> view is not opened</dt>
  <dd>
    <p>Click <b>View > Open View... > Run and Debug</b>.</p>
  </dd>
  <dt>Q) The debugging session is not launched</dt>
  <dd>
    <p>Close all running apps on the webOS device and re-try to click <b>Debug on</b>.</p>
  </dd>
  <dt>Q) (Very rare to happen) A notification says the debugging session is already activated</dt>
  <dd>
    <p>If you get this notification, even when all debug sessions are closed, restart the VS Code and try to start a debugging session again.</p>
  </dd>
</dl>

{{< note >}}
See also the following guides:

- [VS Code official debugging guide](https://code.visualstudio.com/docs/editor/debugging)
- [Debug JavaScript on the Chrome browser](https://developer.chrome.com/docs/devtools/javascript/)
{{< /note >}}

### Running ESLint on the Enact App

ESLint statically analyzes files for potential errors (or warnings) and helps enforce a common coding style. For more information, check [ESLint Configurations](https://enactjs.com/docs/developer-tools/eslint-config-enact/).

In the **APPS IN WORKSPACE** view,

1. Right-click the React app.
2. Click **Run Lint**. 

The **PROBLEMS** panel shows the result messages.

![Run lint](/images/docs/tools/vs-code-extension/running-eslint.gif)

To clean the Lint messages from the panel, click **Clear Lint**.

![Clear lint](/images/docs/tools/vs-code-extension/clear-lint.jpg)

## Other Features

### Auto-Completion

Auto-completion suggests a list of available [LS2 APIs]({{< relref "introduction-to-ls2-api" >}}) based on the project's API level. 

![Auto completion Overview](/images/docs/tools/vs-code-extension/auto-completion-overview.jpg)

#### Features

Key features are as follows:

- Auto-completing API strings using the `Tab` key
- Providing a list of available LS2 APIs (services, methods, and parameters)
- Providing descriptions for each LS2 API
- Providing links to API documentation webpages

{{< note >}}
If you have trouble using the auto-completion, check the [Trouble Shooting Guide](#trouble-shooting-guide-for-auto-completion).
{{< /note >}}

#### How to Use

To use auto-completion, type one of the following trigger strings:

- `luna://`
- `new LS2Request`

**luna://**

To start the auto-completion feature, enter one of the following strings:

- `luna://`
- `'luna://'`
- `"luna://"`

![Auto completion for LS2 APIs](/images/docs/tools/vs-code-extension/auto-completion-example-ls2api.gif)

You can print the list of available services, methods, and parameters using the following trigger strings:

| Item | Trigger String |
|------|----------------|
| Service | `luna://` | 
| Method | Enter the `/` right after `luna://<service name>` | 
| Parameter | `Ctrl` + `Space` after `luna://<service>/<method>` | 

**new LS2Request**

Type `new LS2Request` to use [Enact webos Library](https://enactjs.com/docs/modules/webos/LS2Request/). Using `Ctrl` + `Space`, you can use the auto-completion.

![Auto completion for LS2Request](/images/docs/tools/vs-code-extension/auto-completion-example-ls2request.gif)

#### Trouble Shooting Guide for Auto-Completion

<dl>
  <dt>Q) Auto-completing using the `Tab` key doesn't work</dt>
  <dd>
    <p>Check the <strong>Tab Completion</strong> setting is on.</p>
    <img src="/images/docs/tools/vs-code-extension/enable-tab-completion.jpg" alt="Enable the tab completion feature">
  </dd>
  <dt>Q) I entered the trigger strings, but it didn't show a list</dt>
  <dd>
    <p>To use auto-completion, <code>.webosstudio.config</code> file should be in the project root folder. This file contains information about the API level.</p>
    <p>This file will be automatically generated if you generate a project using the <a href="#project-wizard">Project Wizard</a>. In case you don't have this file, generate the file as follows:</p>
    <ol>
      <li>
        <p>Type <code>luna://</code>.</p>
        <p>This invokes a notification to generate the config file. Click <strong>Yes</strong>.</p>
        <img src="/images/docs/tools/vs-code-extension/notification-generating-config-file.jpg" alt="Notification to generated the config file">
      </li>
      <li>
        <p>Then a Quick Pick pop-up appears at the top of VS Code.</p>
        <p>Enter the API level you want.</p>
        <img src="/images/docs/tools/vs-code-extension/quick-pick-pop-up.jpg" alt="Quick pick pop-up for selecting the API level">
      </li>
      <li>
        <p>The config file is generated in your project folder. You can check the API level in the config file.</p>
        <img src="/images/docs/tools/vs-code-extension/generated-config-file.jpg" alt="Generated config file">
      </li>
    </ol>
  </dd>
</dl>

### Package Manager

Package Manager manages SDKs for webOS app developement. Users can install and uninstall SDKs with a simple click.

![Package manager UI](/images/docs/tools/vs-code-extension/package-manager-ui.png)

In order to launch the Package Manager on Windows, VS Code has to be opened in administrator permission. On Mac and Ubuntu, the system prompts you for the root user password during component installation.

When a user runs the Package Manager for the first time, a pop-up message for selecting directory will show up. Once the directory is set, all SDKs are installed in this directory.

![Configuring a directory for Package Manager](/images/docs/tools/vs-code-extension/configure-a-package-manager-directory.png)

Some SDKs require prerequisite software before they are installed. In this case, Package Manager checks if the software is installed. If not, it will download, extract, and install the software. A list of prerequisites for each SDK is shown in the next section.

#### Prerequisites

The following table lists software prerequisites for each SDK.

| SDK | Prerequisites |
| ------- | ------------- |
| webOS OSE Emulator | <ul> <li>Python: 3.0 or higher</li> <li>VirtualBox: 6.1.0 or higher</li> <li><a href="/docs/tools/sdk/emulator/virtualbox-emulator/emulator-launcher/">Emualtor Launcher</a>: 0.9.4 or higher</li> </ul> |
| [Workflow Designer]({{< relref "workflow-designer-user-guide" >}}) | None |
| Resource Monitor | None |

{{< note >}}
For TV-related packages, see the [webOS TV developer website](https://webostv.developer.lge.com/).
{{< /note >}}

### Emulator Manager

You can manage webOS emulator (VirtualBox) images in VS Code. By default, any webOS emulator images installed in VirtualBox are listed in the **EMULATOR MANAGER** view.

#### Prerequisites

- [VirtualBox](https://www.virtualbox.org/) must be installed on your computer. (Supported version: 6.1 or higher)
- webOS emulator image (`.vmdk`) is required. For how to make the image, refer to [Emulator User Guide](https://www.webosose.org/docs/tools/sdk/emulator/virtualbox-emulator/emulator-user-guide/).
- [Emulator Launcher](https://www.webosose.org/docs/tools/sdk/emulator/virtualbox-emulator/emulator-launcher/) is required. Execute `webOS: Install Emulator Launcher` in the Command Palette (`Ctrl` + `Shift` + `P`).

#### How to Manage Emulator Images

1. Click the **+** button in the **EMULATOR MANAGER** view.

    ![Add emulator button](/images/docs/tools/vs-code-extension/create-an-emulator-image.png)

2. Fill in the input form. For the other system requirements, refer to [Emulator User Guide](https://www.webosose.org/docs/tools/sdk/emulator/virtualbox-emulator/emulator-user-guide/#system-requirements).

    ![Emulator input form](/images/docs/tools/vs-code-extension/emulator-input-form.jpg)

3. Click **Add Instance** and the created instance is listed in the **EMULATOR MANAGER** view.

    ![Added emulator instance](/images/docs/tools/vs-code-extension/added-emulator-instance.png)

4. Click the **Run App** button (triangle) to run the emulator. This action will launch a new VirtualBox window.

    ![Start the emulator instance](/images/docs/tools/vs-code-extension/start-emulator.png)

    To stop or close an emulator instance, close the running VirtualBox window.

{{< note >}}
- Multiple emulator instances cannot use the same VMDK file.
- Only one emulator instance can be launched at the same time.
- When deleting an emulator instance, the associated VMDK file is also **DELETED**. Make sure that the VMDK file is safely backed up.
{{< /note >}}

### IPK Analyzer

You can analyze the file size of the app or services in the IPK file.

1. Open the **Command Palette** (`Ctrl` + `Shift` + `P`) and type **webOS: IPK Analyzer**.
2. Click **Import IPK**.
3. Choose the IPK file to analyze. After the file is loaded, you can see the following screen:

    ![IPK analyzer](/images/docs/tools/vs-code-extension/ipk-analyzer.png)

4. Click the **Compare IPK** button to load another IPK. (For example, the older version of the original file)

    ![Compare IPK files](/images/docs/tools/vs-code-extension/compare-ipks.jpg)

### Process Log

webOS Studio has many internal utility commands including ares-cli, enact-cli, and VirtualBox utility. In the **OUTPUT** panel, you can check the output logs of these commands. Developers might find out helpful information to debug their apps or services.

![Process log in the output panel](/images/docs/tools/vs-code-extension/output-panel.png)

### Resource Monitor

The Resource Monitor tracks and visualizes system and memory usage, CPU consumption, and so on. This enables developers to test their apps or services and identify resource consumption trends and patterns.

{{< note >}}
Resource Monitor embeds [InfluxDB](https://www.influxdata.com/) and [Grafana](https://grafana.com/) into VS Code. This guide only introduces how to use few user scenarios of them through the [com.webos.serivce.sdkagent API]({{< relref "com-webos-service-sdkagent" >}}). For more details about InfluxDB and Grafana, refer to each website.
{{< /note >}}

#### Default Dashboard

Developers can set the default dashboad for the Resource Monitor, which is called **Provisioned Dashboard**.

1. In the **PACKAGE MANAGER** view, click the icon to install the resource monitor. 
    
    ![Install resource monitor](/images/docs/tools/vs-code-extension/install-resource-monitor.png)

2. To launch the Resource Monitor, do the one of the followings:

    - In the **QUICK LAUNCHER** view, click the **Resource Monitoring**.
    - Execute `webOS OSE: Launch Resource Monitoring` in the **Command Palatte**.
    
    {{< note >}}
    You can have multiple Resource Monitor tabs running at once.
    {{< /note >}}

    Then the resource monitor tab will be launched.

    ![Launch the resource monitor](/images/docs/tools/vs-code-extension/launch-resource-monitor.png)


3. Go to your webOS device, stop the Resource Monitor running (if you've run it before.)

    ```bash
    luna-send -f -n 1 luna://com.webos.service.sdkagent/collector/stop '{}'
    ```

4. Connect the Resource Monitor using the following command. Replace **<HOST_IP>** into your computer's IP address.

    ```bash
    luna-send -f -n 1 luna://com.webos.service.sdkagent/collector/setConfig '{"agent":{"flush_interval":"5s","interval":"5s"},"outputs.influxdb":{"urls": ["http://<HOST_IP>:8086"]}}'
    ```

5. Set up the dashboard.

    ```bash
    luna-send -f -n 1 luna://com.webos.service.sdkagent/collector/setConfig '{"webOS.webProcessSize":{"enabled":true}}'
    
    luna-send -f -n 1 luna://com.webos.service.sdkagent/collector/setConfig '{"webOS.processMonitoring":{"enabled":true,"process_name":["com.webos.app.home","com.webos.app.notification","com.webos.app.volume","com.webos.service.sdkagent"]}}'
    ```

6. Start the monitoring.

    ```bash
    luna-send -f -n 1 luna://com.webos.service.sdkagent/collector/restart '{}'
    ```

    Then the Resource Monitor shows the default dashboard as follows:

    ![Running the resource monitor](/images/docs/tools/vs-code-extension/running-resource-monitor.png)

    {{< note >}}
    The default (provisioned) dashboard appears only on the first tab. From the second tab, you'll see Grafana's default UI.
    {{< /note >}}

#### Add a New Dashboard

Grafana provides many user-made dashboards. These dashboards can be searched and imported using the Grafana UI.

1. Hover on the **Dashboards** menu and click **Import**.

    ![Go to the import menu](/images/docs/tools/vs-code-extension/go-to-import-menu.png)

2. Enter the ID of dashboards and click the **Load** button. <br />Recommeded IDs are 928, 5955, 2381.

    ![search the dashboard](/images/docs/tools/vs-code-extension/search-dashboards.png)

3. Select the data source and click the **Import** button.

    ![Import the dashboard](/images/docs/tools/vs-code-extension/import-the-dashboard.png)

#### Trouble Shooting Guide for Resource Monitor

<dl>
  <dt>Q) I followed the guide above, but I don't see the dashboard.</dt>
  <dd>
    <p>Go to the Settings, check the <strong>webosose > Resource Monitoring: Provisioned Dashboard</strong> setting is on.</p>
    <img src="/images/docs/tools/vs-code-extension/provisioned-dashboard.png" alt="Enable the provisioned dashboard">
  </dd>
  <dt>Q) My service is crashed, and not worked.</dt>
  <dd>
    <p>Restart the webOS device and follow the above steps again.</p>
  </dd>
</dl>

## FAQs

<dl>
  <dt>Q. What are the different types of projects that can be created in the extension?</dt>
  <dd>
    <p><b>A.</b> Supported types are as follows:</p>
    <div class="table-container">
      <table class="table is-bordered">
        <thead>
          <tr class="header">
            <th style="width:30%"><p>Type</p></th>
            <th><p>Description</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><p>Basic Web App</p></td>
            <td><p>Creates a sample HTML "hello world" app that has a standard webOS OSE file system.</p></td>
          </tr>
          <tr>
            <td><p>Hosted Web App</p></td>
            <td><p>Creates a sample HTML app with an example to show some external page in-app with standard webOS OSE file system.</p></td>
          </tr>
          <tr>
            <td><p>Web App Info</p></td>
            <td><p>A dummy web app, which contains only appinfo file to use with any already developed HTML app.</p></td>
          </tr>
          <tr>
            <td><p>Basic Enact App</p></td>
            <td><p>Creates an enact Sample app as per selected template.</p></td>
          </tr>
          <tr>
            <td><p>JS Service</p></td>
            <td><p>A simple JS service with a service file.</p></td>
          </tr>
          <tr>
            <td><p>JS Service Info</p></td>
            <td><p>A dummy service info directory, which is used for reference of standard service information.</p></td>
          </tr>
        </tbody>
      </table>
    </div>
  </dd>
  <dt>Q. What is "Add webOS library", and when is it needed?</dt>
  <dd>
    <p><b>A.</b>This feature adds <a href="/docs/reference/webos-service-library/webos-service-library-api-reference/">webos-service library</a> to your project. The webos-service library is to call LS2 APIs in the app/service. But we <b>strongly recommend</b> using <a href="/docs/reference/webosservicebridge-api/webosservicebridge-api-reference/">WebOSServiceBridge API</a> instead of webos-service library.</p>
  </dd>
  <dt>Q. I have not added any device in the KNOWN DEVICE view, yet I can see the device named emulator.</dt>
  <dd>
    <p><b>A.</b> By default, <code>emulator</code> is added in the <b>KNOWN DEVICE</b> view. This emulator is running on the local system. If you an emulator instance is not already set up, go to the <strong>EMULATOR MANAGER</strong> view and add the emulator instance.</p>
  </dd>
  <dt>Q. Getting an error while packaging the app, when my folder path contains special characters.</dt>
  <dd>
    <p><b>A.</b> Workspace path and name should not contain any escape or special characters, it can trigger errors on add, package, install operations.</p>
  </dd>
  <dt>Q. How to resolve errors in Notification Area?</dt>
  <dd>
    <p><b>A.</b> A list of the errors:</p>
    <div class="table-container">
      <table class="table is-bordered is-fullwidth">
        <thead>
          <tr class="header">
            <th><p>Error</p></th>
            <th><p>Description</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><p><b>ERROR!</b> Failed to get the device list.</p></td>
            <td>
              <p>Some dependent packages are not available on the local system.</p>
              <p>To resolve this issue, install the packages either manually or by clicking <b>Yes</b> when prompted (if you previously closed the prompt without installing, click the refresh button in the <b>KNOWN DEVICE</b> view to get prompted again).</p>
            </td>
          </tr>
          <tr>
            <td><p><b>ERROR!</b> Failed to list the applications installed on &lt;device&gt;</p></td>
            <td><p>The device is not running.</p></td>
          </tr>
          <tr>
            <td><p><b>ERROR!</b> Failed to list the applications running on &lt;device&gt;</p></td>
            <td><p>The device is not running.</p></td>
          </tr>
          <tr>
            <td><p><b>ERROR!</b> Please check IP address or port of &lt;device&gt;</p></td>
            <td><p>The device is not reachable.</p></td>
          </tr>
          <tr>
            <td><p><b>ERROR!</b> Unable to find the Virtual Box</p></td>
            <td><p>Update the environment path variable to point to the VirtualBox installation directory.</p></td>
          </tr>
          <tr>
            <td><p><b>ERROR!</b> Packaging App Failed. Details As follows: &lt;errMsg&gt;</p></td>
            <td>
              <p>Failed to package the app due to one of the following:</p>
              <ul>
                <li>Check the ID format. Only lowercase letters(a-z), digits(0-9), minus signs, and periods are allowed.</li>
                <li>Check the version format. It should be something like 1.0.0.</li>
                <li>Only a valid app can be packaged. Make sure the directory includes 'appinfo.json'.</li>
                <li>Some dependent resources (such as images, libraries, and modules) that are required for the project are missing. Add manually or through the npm command.</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </dd>
</dl>
