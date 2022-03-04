---
title: appinfo.json
date: 2022-03-02
weight: 10
toc: true
---

Apps are required to have metadata before they can be packaged. This metadata is stored in a file called `appinfo.json`.

webOS device uses `appinfo.json` to identify the app, its icon, and other information that is needed to launch the app. `appinfo.json` is located in the app's root directory and contains a single JSON object.

{{< note >}}
Here are little tips that might help you with JSON syntax:

- Do not include any comments (/* or //) in JSON files.
- Use double quotes around the properties---no single quotes.
{{< /note >}}

## Schema

``` json
{
    "id"                  : string,
    "title"               : string,
    "main"                : string,
    "icon"                : string,
    "type"                : string,
    "largeIcon"           : string,
    "vendor"              : string,
    "version"             : string,
    "appDescription"      : string,
    "resolution"          : string,
    "iconColor"           : string,
    "splashBackground"    : string,
    "transparent"         : boolean,
    "requiredMemory"      : number,
    "requiredPermissions" : string array
}
```

## Properties

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<thead>
<tr class="header">
<th><p>Property</p></th>
<th><p>Required</p></th>
<th><p>Type</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>id</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>App ID, e.g. &quot;com.newco.app.myapp&quot;. Every app has a unique ID, formed from reverse DNS naming conventions. Home Launcher uses the ID to uniquely identify your application and displays it with the title. The application ID is unique, set once, and cannot be changed after publishing the application.</p>
<ul>
<li><p>Start the ID with the reverse domain of company/institution. (Recommended)</p></li>
<li><p>For app developers, the ID cannot start with the following reverse domain names: <i>com.palm</i>, <i>com.webos</i>, <i>com.lge</i>, <i>com.palmdts</i>. We recommend that platform developers who implement built-in apps and services can only use those names.</p></li>
<li><p>Finish the ID with subdomain app.app-name. (Recommended)</p></li>
<li><p>The ID <strong>must</strong> consist only of lowercase letters (a-z), digits (0-9), minus signs, and periods. It must be at least two characters long and must start with an alphanumeric character.</p></li>
</ul>
</td>
</tr>
<tr>
<td><p>title</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>The title of the app as shown in Home Launcher and the app window. The app title is unique; once set, it cannot be changed after publishing the app.</p></td>
</tr>
<tr>
<td><p>main</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>The launch point for the app. The file path must be relative to the project root directory and needs to point to the following, depending on the app type:</p>
<ul>
<li><p>Web app: "index.html"</p></li>
<li><p>QML app: "main.qml"</p></li>
<li><p>Native app: "&lt;executable file name&gt;"</p></li>
</ul>
</td>
</tr>
<tr>
<td><p>icon</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>Icon image displayed for your app. The icon should be in PNG format. The file path must be relative to the project root directory.</p>
<ul>
<li><p><strong>Default Value</strong>: &quot;icon.png&quot;</p></li>
</ul></td>
</tr>
<tr>
<td><p>type</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>App type. The value must be specified as follows depending on the app type:</p>
<ul>
<li><p>Web app: "web"</p></li>
<li><p>QML app: "qml"</p></li>
<li><p>Native app: "native"</p></li>
</ul>
</td>
</tr>
<tr>
<td><p>largeIcon</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>Large app icon. The icon should be in PNG format. </p></td>
</tr>
<tr>
<td><p>vendor</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>Provides the information of the app owner. This is used in Home Launcher and deviceinfo dialogs.</p></td>
</tr>
<tr>
<td><p>version</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>The app version number. This consists of three non-negative integers: major, minor, and revision numbers.</p>
<p>The major, minor, and revision numbers are all mandatory, e.g. "2.1.0" (not "2.1"). Otherwise, the app may not be installed. The major, minor, and revision numbers are discrete. For example, 1.5.3 is lower version than 1.15.3.</p>
{{< note >}}
Each version number (major, minor, and revision) cannot exceed 9 digits and cannot contain leading zeroes.
{{< /note >}}
<ul>
<li><strong>Default value</strong>: &quot;1.0.0&quot;</li>
</ul></td>
</tr>
<tr>
<td><p>appDescription</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>Provides brief information of the app, like a short tagline for the app. It cannot exceed 60 characters.</p></td>
</tr>
<tr>
<td><p>resolution</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>The screen resolution of the app. webOS Open Source Edition (OSE) supports the following resolutions:</p>
<ul>
<li><p>&quot;1920x1080&quot;: FHD resolution (Default value)</p></li>
<li><p>&quot;1280x720&quot;: HD resolution</p></li>
</ul>
{{< note >}}
webOS OSE does not support UHD resolution for web apps.
{{< /note >}}
</td>
</tr>
<tr>
<td><p>iconColor</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>Indicates the background color for the app tile. </p>
<ul>
<li><p><strong>Default value</strong>: &quot;white&quot;</p></li>
</ul></td>
</tr>
<tr>
<td><p>splashBackground</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>Path for a background image to be shown while the app is loading. The file path must be relative to the project root directory. The file should be in PNG format and the image size should be 1920 x 1080.</p></td>
</tr>
<tr>
<td><p>transparent</p></td>
<td><p>Optional</p></td>
<td><p>boolean</p></td>
<td><p>App background overlays system background. If you did not set the background color or background image, system background (black color) will be displayed.</p>
<p>This property configures the transparency of the app background. If set to true, the system background will be displayed clearly. If set to false, the transparency rate of app background will be decreased and the system background will be shown as little grey color.</p>
<ul>
<li><p><strong>Default value</strong>: false</p></li>
</ul></td>
</tr>
<tr>
<td><p>requiredMemory</p></td>
<td><p>Optional</p></td>
<td><p>number</p></td>
<td><p>Indicates the minimum amount of memory in megabytes required to run the app.</p></td>
</tr>
</tr>
<tr>
<td><p>requiredPermissions</p></td>
<td><p>Optional</p></td>
<td><p>string array</p></td>
<td><p>Specifies the required <a href="/docs/guides/development/configuration-files/acg-usage-guide/">Access Control Group (ACG)</a> names associated with the LS2 API methods used in the app. The ACG names associated with each method can be found in their respective <a href="/docs/reference/ls2-api/ls2-api-index/">LS2 API Reference</a>.</p></td>
</tr>
</tbody>
</table>
</div>

## Example

{{< code "appinfo.json (web app)" true >}}
``` json
{
    "id": "com.myco.app.web",
    "title": "Web App",
    "main": "index.html",
    "icon": "icon.png",
    "type": "web"
}
```
{{< /code >}}

{{< code "appinfo.json (QML app)" true >}}
``` json
{
    "id": "com.myco.app.qml",
    "title": "QML App",
    "main": "main.qml",
    "icon": "icon.png",
    "type": "qml"
}
```
{{< /code >}}

{{< code "appinfo.json (native app)" true >}}
``` json
{
    "id": "com.myco.app.native",
    "title": "Native App",
    "main": "native",
    "icon": "icon.png",
    "type": "native"
}
```
{{< /code >}}

{{< code "appinfo.json (web app, with optional properties)" true >}}
``` json
{
    "id": "com.myco.app.appname",
    "title": "AppName",
    "main": "index.html",
    "icon": "AppName_80x80.png",
    "type": "web",
    "largeIcon": "AppName_130x130.png",
    "vendor": "My Company",
    "version": "1.0.0",
    "appDescription": "This is an app tagline",
    "resolution": "1920x1080",
    "iconColor": "red",
    "splashBackground": "AppName_Splash.png",
    "transparent": false,
    "requiredMemory": 20,
    "requiredPermissions": ["time.query", "media.operation"]
}
```
{{< /code >}}

## Localizing App Metadata

If the app is localized into more than one language, each language can have its own `appinfo.json` file. However, the app ID and version number in each localized `appinfo.json` must be the same as those in the top-level `appinfo.json`. The app ID and version in the top-level `appinfo.json` are validated for correct value and structure. Any app that fails the validation cannot be packaged or uploaded.

According to the locale setting value, the app metadata localization shows the matching app information at the Home Launcher.

To provide app information in a specific locale, you need to create locale folders under the `resources` folder, then `appinfo.json` files for each locale under correct locations as shown below:

{{< figure src="/images/docs/guides/development/configuration-files/folder-structure-appinfo-json-localization.png" alt="" caption="Folder structure of appinfo.json localization" width="700px" >}}

{{< note >}}
The locale consists of Language, Script, and Country/Region information. (e.g. ko-KR, mn-Cy-MN)
{{< /note >}}

With additional `appinfo.json` files, `title` and `appDescription` can be provided in various languages. All other properties will be kept the same as the default `appinfo.json` file in the root of the project.

``` json
{
    "title": "<Translated app title>",
    "appDescription": "<Translated app description>",
}
```

{{< note >}}
  - In the `appinfo.json` file for localization, only `appDescription` and `title` properties can be filled.
  - If you need to use non-Latin letters (non-ASCII) in the `appinfo.json` file, the file needs to be saved in UTF-8 without BOM format.
{{< /note >}}

When the locale value is changed after adding an `appinfo.json` file corresponding to the locale information, the `appinfo.json` file in the app root directory is loaded into the system memory of the webOS device. Then the other `appinfo.json` files are overridden depending on the locale setting.
