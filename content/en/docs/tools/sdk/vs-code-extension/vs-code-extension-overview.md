---
title: Overview
display_title: Visual Studio Code Extension
date: 2021-11-26
weight: 20
toc: true
---

webOS OSE provides a Microsoft Visual Studio Code Extension to help developers easily create webOS OSE apps/services (web apps, Enact apps, JS services). 

{{< note >}}
This page only describes the overview of the extension. For more details, see the [extension help](https://marketplace.visualstudio.com/items?itemName=webOSOSESDK.webosose) in the marketplace.
{{< /note >}}

## Key Features

webOS OSE VS Code extension provides the following key features:

* Creating the web app, enact app or JS services from a template.
* Assisting the use of webOS and Enact APIs through content assist.
* Debugging the implementation.
* Previewing the web app locally.
* Packaging, installing, and running the apps.

## How to Install

To install the extension, open [Microsoft Visual Studio Code](https://code.visualstudio.com/) and do the following:

1. Navigate to **View** > **Extensions**.
2. Search for **webOS OSE** in the search bar and click the **Install** button. Once the installation is complete, you will see the **webOS OSE** icon <img src="/images/docs/tools/vs-code-extension/webos_ose_icon.png" alt="webos OSE icon in the Activity bar" > in the **Activity** bar.
3. Click the icon to see the user interface of the extension:

{{< figure src="/images/docs/tools/vs-code-extension/extension_view.png" >}}

## How to Use

The extension is designed on the basis of the typical flow followed in webOS OSE app/service development.

For help on using the extension, see [Using the Extension](https://marketplace.visualstudio.com/items?itemName=webOSOSESDK.webosose#using-the-extension) in the extension help (on marketplace).

## FAQs

<dl>
  <dt>Q. What are the different types of projects that can be created in the webOS OSE extension?</dt>
  <dd>
    <p><b>A.</b> A brief description of the different projects:</p>
    <ul>
      <li>Basic Web App: Creates a sample HTML "hello world" app that has a standard webOS OSE file system.</li>
      <li>Hosted Web App: Creates a sample HTML app with an example to show some external page in-app with standard webOS OSE file system.</li>
      <li>Web App Info: A dummy web app, which contains only appinfo file to use with any already developed HTML app.</li>
      <li>Basic Enact App: Creates an enact Sample app as per selected template.</li>
      <li>JS Service: A simple JS service with a service file.</li>
      <li>JS Service Info: A dummy service info directory, which is used for reference of standard service information.</li>
    </ul>
  </dd>
  <dt>Q. What are the different operations that can be performed on the apps?</dt>
  <dd>
    <p><b>A.</b> A brief description of the operations:</p>
    <ul>
      <li>Package App: Packages the app into an IPK.</li>
      <li>Install App: Install IPK on the device.</li>
      <li>Run App: Runs the app on the device.</li>
      <li>Local Preview: Provides a local preview of a web app.</li>
      <li>Install webOS: Installs the package to allow invocation of webOS luna APIs.</li>
      <li>Debug: Runs Web Inspector to debug an app.</li>
      <li>Debug Service: Runs Node Inspector to debug a JS service.</li>
    </ul>
  </dd>
  <dt>Q. When must the webOS library be added to a project?</dt>
  <dd>
    <p><b>A.</b> The webOS library is required when it is required to invoke webOS luna APIs in the app/service.</p>
    <p></p>
  </dd>
  <dt>Q. I have not added any device, yet I can see an entry named emulator.</dt>
  <dd>
    <p><b>A.</b> Emulator is a default entry that is shown. If not already done, set up the emulator as described in <a href="/docs/tools/sdk/emulator/virtualbox-emulator/emulator-user-guide/">Emulator User Guide</a>.</p>
    <p></p>
  </dd>
  <dt>Q. Getting an error while packaging the app, when my folder path contains special characters.</dt>
  <dd>
    <p><b>A.</b> Workspace path and name should not contain any escape or special characters, it can trigger errors on add, package, install operations.</p>
    <p></p>
  </dd>
  <dt>Q. How to recover from some of the errors that are shown in the notification area messages?</dt>
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
              <p>To resolve this issue, install the packages either manually or by clicking <b>Yes</b> when prompted (if you previously closed the prompt without installing, click the refresh button in the <b>KNOWN DEVICE</b> pane to get prompted again).</p>
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
