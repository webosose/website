---
title: Overview
display_title: VS Code Extension - webOS Studio
date: 2022-12-29
weight: 20
toc: true
---

webOS OSE provides an extension for [Microsoft Visual Studio Code](https://code.visualstudio.com/) (VS Code), **webOS Studio**, to help developers easily develop webOS OSE apps/services (web apps, Enact apps, JS services). 

{{< note >}}
This page only describes the overview of the extension. For more details, see the [documentation](https://marketplace.visualstudio.com/items?itemName=webOSSDK.webosstudio) in the marketplace.
{{< /note >}}

## Key Features

webOS Studio provides the following key features:

* Creating apps and services from templates
* Packaging, installing, launching, and debugging apps and services
* Running ESLint on Enact apps
* Assisting the use of webOS-related APIs through content assist and auto-completion
* Supporting previews of apps (Web and Enact)
* Managing connected webOS devices
* Managing images for [VirtualBox Emulator]({{< relref "emulator-user-guide" >}})
* Analyzing IPK files
* Project Wizard

## How to Install

To install the extension, open VS Code and do the following:

1. Navigate to **View** > **Extensions**.
2. Search for **webOS Studio** in the search bar and click the **Install** button. Once the installation is completed, you will see the ![webos Studio icon in Activity Bar](/images/docs/tools/vs-code-extension/webos-studio-icon.jpg) icon in **Activity Bar**.
3. Click the icon to see the user interface of the extension:

{{< figure src="/images/docs/tools/vs-code-extension/extension-interface.jpg" caption="Interface of the webOS Studio extension" >}}

## How to Use

The extension is designed on the basis of the typical workflow followed in webOS OSE app/service development. See the [documentation](https://marketplace.visualstudio.com/items?itemName=webOSSDK.webosstudio) in the marketplace.

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
