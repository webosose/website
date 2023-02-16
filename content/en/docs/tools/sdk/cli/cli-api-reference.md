---
title: API Reference
display_title: Command-Line Interface API Reference
date: 2023-02-16
weight: 30
toc: true
---

This API supports [Command-Line Interface]({{< relref "cli-user-guide">}}) features in JavaScript.

## Generator

### generate(options, callback)

- `options` &lt;object&gt;
  - `tmplName` &lt;string&gt; Template types
  - `out` &lt;string&gt; An output directory to generate the template
  - `appinfo` &lt;object&gt; || `svcinfo` &lt;object&gt; (Optional)
  - `props` &lt;string array&gt; (Optional)
  - `overwrite` &lt;boolean&gt; (Optional) **Default:** `false`.
  - `svcName` &lt;string&gt; (Optional)
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Generates template codes for apps or services.

The possible values of `tmplName` are as follows: `webapp`, `webappinfo`, `qmlapp`, `qmlappinfo`, `js_service`, `jsserviceinfo`, `icon`. (You can also check those values using [`showTemplates()`](#showtemplates-listtype-callback).)

Using `appinfo` and `svcinfo`, you can overwrite metadata ([appinfo.json]({{< relref "appinfo-json" >}}) and [services.json]({{< relref "services-json" >}})) of template codes:

- Use `appinfo`: `webapp`, `webappinfo`, `qmlapp`, `qmlappinfo`
- Use `svcinfo`: `js_service`, `jsserviceinfo`
- Not use: `icon`

If neither `appinfo` nor `svcinfo` is specified, each template uses the default metadata.

 Using `props`, you can replace `appinfo` and `svcinfo`. See the examples below.

If the directory specified in `out` already exists, the callback gets error messages. You can overwrite the directory using `overwrite`.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the status, type, and directory of the generated template.

#### Examples

``` js
const ares = require('ares-cli'),
  Generator = ares.Generator;

const options = {
  tmplName: "webapp",
  appinfo: {id:"com.sample.app", title:"web app sample", version:"1.0.0"},
  out: "webAppDir"
};

// Generating webapp in {$cwd}/webAppDir
// Success
Generator.generate(options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

``` js
const ares = require('ares-cli'),
  Generator = ares.Generator;

const options = {
  tmplName: "qmlapp",
  props:["id=com.sample.qmlapp"],
  out: "qmlAppDir"
};

// Generating qmlapp in ${CURRENT_DIR}/qmlAppDir
// Success
Generator.generate(options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### showTemplates(listType, callback)

- `listType` &lt;boolean&gt; || &lt;string&gt;
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Shows a list of template codes.

If `listType` is set to `false`, the result shows an entire list of supported templates. If a specific template type is set, the result only shows a sub-list of that type. Possible values are as follows: `webapp`, `weabppinfo`, `jsservice`, `jsserviceinfo`, `icon`, `qmlapp`, `qmlappinfo`.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the list of templates.

#### Examples

``` js
const ares = require('ares-cli'),
  Generator = ares.Generator;

// ID             Project Type     Description
// -------------  ---------------  ------------------------------------------
// webapp         Web App          (default) web app for webOS
// hosted_webapp  Web App          hosted web app for webOS
// webappinfo     Web App Info     appinfo.json for web app
// js_service     JS Service       js service for webOS
// jsserviceinfo  JS Service Info  services.json, package.json for JS service
// icon           Icon             app icon files [80x80]
// qmlapp         QML App          QML app for webOS
// qmlappinfo     QML App Info     appinfo.json for QML app
Generator.showTemplates(false, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

``` js
const ares = require('ares-cli'),
  Generator = ares.Generator;

// ID             Project Type     Description
// -------------  ---------------  ------------------------------------------
// webapp         Web App          (default) web app for webOS
// hosted_webapp  Web App          hosted web app for webOS
Generator.showTemplates("webapp", function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

## Inspector

### inspect(options, callback)

- `options` &lt;object&gt;
  - `device` &lt;string&gt; A target device which contains the inspecting target
  - `appId` &lt;string&gt; || `serviceId` &lt;string&gt;
  - `hostPort` &lt;number&gt; (Optional) A port number of the inspecting window (`localhost`)
  - `open` &lt;boolean&gt; (Optional) **Default**: `false`
  - `display` &lt;number&gt; (Optional) **Default**: `0`
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `session` &lt;object&gt;
    - `msg` &lt;string&gt;

Inspects an app or service. (Those are called inspecting targets.) Use either `appId` or `serviceId` to specify the inspecting target.

If `open` is set to `true`, it automatically opens the inspecting window on your default browser.

`display` specifies the display of the target device to run the inspecting target.

If `inspect()` succeeds, an inspecting URL is returned to `value.msg`. If it fails, debugging messages are returned to `err`. See the examples below.

`session` contains the information of the current inspecting target. See [`stop()`](#stop-session-callback).

#### Examples

``` js
const ares = require('ares-cli'),
  inspector = ares.Inspector;

const options = {
  device: "rpi",
  appId: "com.domain.app",
  hostPort: 1234,
  open: true
};

// Application Debugging - http://localhost:1234/devtools/inspector.html?ws=localhost:1111/devtools/page/....
inspector.inspect(options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

``` js
const ares = require('ares-cli'),
  inspector = ares.Inspector;

const options = {
  device: "rpi",
  serviceId: "com.domain.app.service",
  hostPort: 1234,
  open: true
};

// Cannot support "--open option" on platform node version 8 and later
// To debug your service, set "127.0.0.1:1234" on Node's Inspector Client(Chrome DevTools, Visual Studio Code, etc.).
inspector.inspect(options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### stop(session, callback)

- `session` &lt;object&gt;
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

{{< caution >}}
Before executing `stop()`, you must execute [`inspect()`](#inspect-options-callback) first.
{{< /caution >}}

Stops a running inspecting target.

`session` is the `value.session` from [`inspect()`](#inspect-options-callback).

The callback gets two arguments (`err`, `value`) where `value.msg` contains status of the inspecting target.

#### Examples

``` js
const ares = require('ares-cli'),
  inspector = ares.Inspector;

const options = {
  device: "rpi",
  appId: "com.domain.app",
  hostPort: 1234,
  open: true
};

// Application Debugging - http://localhost:1234/devtools/inspector.html?ws=localhost:1111/devtools/page/....
//
// (After 5 sec)
//
// This inspection has stopped
async.waterfall([
  inspector.inspect.bind(inspector, options),
  function(inspectInfo, next) {
    console.log(inspectInfo.msg)
    setTimeout(() => {
      ares.Inspector.stop(inspectInfo.session, next);
    }, 5000);
  }
], function(err, results) {
  console.log(results.msg);
});
```

## Installer

### install(options, pkgPath, callback, middleCb)

- `options` &lt;object&gt;
  - `device` &lt;string&gt; A name of the target device to install the webOS package
- `pkgPath` &lt;object&gt; A path of the webOS package
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;
- `middleCb` &lt;Function&gt;
  - `data` &lt;string&gt;

Installs a webOS package to a tartget device.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the result of the installation process.

`middleCb.data` contains the status of the installation process.

#### Examples

``` js
const ares = require('ares-cli'),
    installer = ares.Installer;

const options = {
    device: "rpi",
};

// Installing package com.domain.app_1.0.0_all.ipk
// Success
installer.install(options, "com.domain.app", function(err, value) {
    if(err) throw err;
    console.log(value.msg);
}, functions(data){
    console.log(data);
)};
```

### list(options, callback)

- `options` &lt;object&gt;
  - `device` &lt;string&gt; A name of the target device to get a list
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object array&gt;

Gets a list of installed apps.

The callback gets two arguments (`err`, `value`) where `value.msg` contains app information.

#### Examples

``` js
const ares = require('ares-cli'),
  installer = ares.Installer;

const options = {
  device: "rpi",
};

// [{
//   ...
//   id: 'com.domain.app',
//   version: '1.0.0',
//   title: 'new app',
//   folderPath: '/media/developer/apps/usr/palm/applications/com.domain.app',
//   ...
// }]
installer.list(options, function(err, value) {
  if(err) throw err;
  console.log(value);
});
```

### remove(options, appId, callback)

- `options` &lt;object&gt;
  - `device` &lt;string&gt; A name of the target device
- `appId` &lt;string&gt; An app ID to remove
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;
    - `status` &lt;string&gt;

Removes an app.

The callback gets two arguments (`err`, `value`) where `error` or `value.msg` contains the result of `remove()`.

If `remove()` succeeds, a string (`removed`) is return in `value.status`.

#### Examples

``` js
const ares = require('ares-cli'),
  installer = ares.Installer;

const options = {
  device: "rpi",
};

// Removed package com.domain.app
installer.remove(options, "com.domain.app", function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

## Launcher

### close(options, appId, params, callback)

- `options` &lt;object&gt;
  - `device` &lt;string&gt;
  - `display` &lt;number&gt; (Optional) **Default**: `0`
- `appId` &lt;string&gt; An app ID to close
- `params` &lt;object&gt;
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Closes an app. If `display` is specified, `close()` closes an app running on that display.

To use `params`, the app developer should define the parameters for the app. If `params` is specified, `close()` closes an app with those parameters. If your app doesn't support parameters, use an empty object (`{}`).

{{< note >}}
For more information about parameters, see the following documents:

- `params` in [com.webos.service.applicationmanager/launch]({{< relref "com-webos-service-applicationmanager#launch" >}})
- [Examples: Launching the application with URL parameter]({{< relref "cli-user-guide#examples-5" >}})
{{< /note >}}

The callback gets two arguments (`err`, `value`) where `value.msg` contains the success message for `close()`.

#### Examples

``` js
const ares = require('ares-cli'),
  launcher = ares.Launcher;

const options = {
  device: "rpi"
};

// Closed application com.domain.app on display 0
launcher.close(options, "com.domain.app", {}, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### launch(options, appId, params, callback[, middleCb])

- `options` &lt;object&gt;
  - `device` &lt;string&gt;
  - `display` &lt;number&gt; (Optional) **Default**: `0`
  - `installMode` &lt;string&gt; (Optional) Use `Hosted` to launch hosted apps
  - `hostedurl` &lt;string&gt; (Optional) A path of the hosted app
- `appId` &lt;string&gt; An app ID to launch
- `params` &lt;object&gt;
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;
- `middleCb` &lt;Function&gt; (Optional)
  - `data` &lt;string&gt;

Launches an app. If `display` is specified, an app will be launched on that display.

To use `params`, the app developer should define the parameters for the app. If `params` is specified, `close()` closes an app with those parameters. If your app doesn't support parameters, use an empty object (`{}`).

{{< note >}}
For more information about parameters, see the following documents:

- `params` in [com.webos.service.applicationmanager/launch]({{< relref "com-webos-service-applicationmanager#launch" >}})
- [Examples: Launching the application with URL parameter]({{< relref "cli-user-guide#examples-5" >}})
{{< /note >}}

To launch a hosted app, use `options.installMode` and `options.hostedurl`. `middleCb.data` contains the status of the launching process (only for hosted apps).

The callback gets two arguments (`err`, `value`) where `value.msg` contains the success message for `launch()`.

#### Examples

``` js
const ares = require('ares-cli'),
  launcher = ares.Launcher;

const options = {
  device: "rpi"
};

// Launched application com.domain.app on display 0
launcher.launch(options, "com.domain.app", {url:'webosose.org'}, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

``` js
const ares = require('ares-cli'),
  launcher = ares.Launcher;

const options = {
  device: "rpi",
  installMode: "Hosted",
  hostedurl: "/home/test/webapp"
};

// Ares Hosted App is now running...
launcher.launch(options, "com.sdk.ares.hostedapp", {}, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
}, functions(data){
  console.log(data);
});
```

### listRunningApp(options, callback)

- `options` &lt;object&gt;
  - `device` &lt;string&gt;
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object array&gt;

Gets information about running apps.

The callback gets two arguments (`err`, `value`) where `value.msg` contains information about running apps.

#### Examples

``` js
const ares = require('ares-cli'),
  launcher = ares.Launcher;

const options = {
  device: "rpi"
};

// [
//   {
//     appType: 'web',
//     displayId: 1,
//     instanceId: '8402d31b-8d6c-458a-b35a-a24349d55b651',
//     launchPointId: 'com.domain.app_default',
//     webprocessid: '2395',
//     id: 'com.domain.app',
//     processid: '-1',
//     defaultWindowType: 'card'
//   }
// ]
launcher.listRunningApp(options, function(err, value) {
    if(err) throw err;
    console.log(value);
});
```

## Packager

### analyzeIPK(options, callback)

- `options` &lt;object&gt;
  - `device` &lt;string&gt;
  - `info` &lt;string&gt; || `infodetail` &lt;string&gt;
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Analyzes a webOS package file (`.ipk`).

`info` or `infodetail` is a package file to analyze. `infodetail` gets more details about the file.

The callback gets two arguments (`err`, `value`) where `value.msg` contains information about the package file.

#### Examples

``` js
const ares = require('ares-cli'),
  packager = ares.Packager;

const options = {
  device: "rpi",
  info: "com.domain.app_1.0.0_all.ipk"
};

// < Package Information >
// Package: com.domain.app
// Version: 1.0.0
// Architecture: all
// Installed-Size: 52990
// app: com.domain.app
// services: ["com.domain.app.service"]

// < Application Information >
// id: com.domain.app
// version: 1.0.0
// type: web
// main: index.html

// < Service Information >
// id: com.domain.app.service
// services: ["com.domain.app.service"]
// version: 1.0.0
// main: helloworld_webos_service.js
packager.analyzeIPK(options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### generatePackage(srcPaths, dstPath, options, middleCb, callback)

- `srcPaths` &lt;string array&gt;
- `dstPath` &lt;string&gt; A path to generate the package file
- `options` &lt;string&gt;
  - `rom` &lt;boolean&gt; (Optional)
  - `excludefiles` &lt;string array&gt; (Optional)
- `middleCb` &lt;Function&gt;
  - `data` &lt;string&gt;
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Packages an app and service into a webOS package file (`.ipk`).

The first element of `srcPaths` is a path to an app, and it is required. Starting from the second element, the rest are paths to services, and those are optional. You can generate a package without a service.

If `rom` is set to `true`, `generatePackage()` doesn't generate a package file. Instead, it creates the same directory hierarchy that the package file would have if the package file were installed on the target device.

`excludefiles` contains files that are not packaged with.

`middleCb.data` contains the status of the packaging process.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the result of the packaging process.

#### Examples

``` js
const ares = require('ares-cli'),
  packager = ares.Packager;  
 
const destination= process.cwd(),
  source = [ 'webapp', 'svc' ];
 
// Create com.domain.app_1.0.0_all.ipk to ${CURRENT_DIR}
// Success
packager.generatePackage(source, destination, {}, functions(data){
  console.log(data);
} function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

``` js
const ares = require('ares-cli'),
  packager = ares.Packager;  
 
const destination= process.cwd(),
  source = [ 'webapp', 'svc' ],
  options = {
    rom: true,
    excludefiles: ["*.txt", "aaa"]
  };
 
// Create output directory to ${CURRENT_DIR}
// Success
packager.generatePackage(source, destination, options, functions(data){
  console.log(data);
} function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

## Puller
### pull(srcPath, dstPath, options, callback, middleCb)

- `srcPaths` &lt;string array&gt;
- `dstPath` &lt;string&gt;
- `options` &lt;object&gt;
  - `device` &lt;string&gt; A name of the target device
  - `ignore` &lt;boolean&gt; (Optional) **Default**: `false`
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;
- `middleCb` &lt;Function&gt;
  - `data` &lt;string&gt;

Pulles (downloads) files or directories from a target device.

`srcPaths` contains files or directories to download (from the target device), and `dstPath` is a destination path to store downloaded files or directories.

If `ignore` is set to `true`, the result doesn't show a list of pushed files/directories.

The callback gets two arguments (`err`, `value`). `err` or `value` contains the result of `pull()`, while `middleCb.data` contains information about the file transmission.

#### Examples

``` js
const ares = require('ares-cli'),
    puller = ares.Puller;

const options = {
    device: "rpi",
};

// Pull: /tmp/aaa -> ${CURRENT_DIR}/aaa
// 1 file(s) pulled
// 28 KB/s (4096 bytes in 0.144s)
// Success
puller.pull("/tmp/aaa", ".", options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
}, functions(data){
  console.log(data);
});
```

## Pusher

### push(srcPaths, dstPath, options, callback, middleCb)

- `srcPaths` &lt;string array&gt;
- `dstPath` &lt;string&gt;
- `options` &lt;object&gt;
  - `device` &lt;string&gt; A name of the target device
  - `ignore` &lt;boolean&gt; (Optional) **Default**: `false`
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;
- `middleCb` &lt;Function&gt;
  - `data` &lt;string&gt;

Pushes (sends) files or directories to a target device.

`srcPaths` is files or directories to send, and `dstPath` is a destination path of the target device.

If `ignore` is set to `true`, the result doesn't show a list of pushed files/directories.

The callback gets two arguments (`err`, `value`). `err` or `value` contains the result of `push()`, while `middleCb.data` contains information about the file transmission.

#### Examples

``` js
const ares = require('ares-cli'),
    pusher = ares.Pusher;

const options = {
    device: "rpi",
};

// Push:aaa -> /tmp/aaa
// Push:bbb -> /tmp/bbb
// 2 file(s) pushed
// 134 KB/s (60844 bytes in 0.444s)
// Success
pusher.push(["aaa", "bbb"], "/tmp", options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
}, functions(data) {
  console.log(data);
});
```

``` js
const ares = require('ares-cli'),
  pusher = ares.Pusher;

const options = {
  device: "rpi",
};

// Push:copyFiles/helloFile -> /tmp/copyFiles/helloFile
// Push:copyFiles/testFile -> /tmp/copyFiles/testFile
// 2 file(s) pushed
// 134 KB/s (60844 bytes in 0.444s)
// Success
pusher.push(["copyFiles"], "/tmp", options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
}, functions(data){
  console.log(data);
});
```

## Server

### openBrowser(url, reqHandler, callback)

- `url` &lt;string&gt;
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

{{< caution >}}
Before executing `openBrowser()`, you must execute [`runServer()`](#runserver-apppath-port-reqhandler-callback) first.
{{< /caution >}}

Opens a local server (`url`) on your browser. This local server was created by `runServer()`. `url` is the `value.openBrowserUrl` of `runServer()`.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the status of the local server.

#### Examples

``` js
const ares = require('ares-cli'),
  server = ares.Server;

// Browser opened
server.openBrowser('http://localhost:1111/ares_cli/ares.html', function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### runServer(appPath, port, reqHandler, callback)

- `appPath` &lt;string&gt; A path to a web app
- `port` &lt;number&gt;
- `reqHandler` &lt;Function&gt;
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `url` &lt;string&gt; A URL of running local server
    - `port` &lt;number&gt; A port number of the local server
    - `openBrowserUrl` &lt;string&gt;
    - `msg` &lt;string&gt; The status of the local server

Runs a web app (in `appPath`) on a local HTTP server.

`port` is the port number of the local server. If you want the port to be assigned automatically, set `port` to `0`.

`reqHandler` contains event actions to be registered when the server is created. See the examples below.

The callback gets two arguments (`err`, `value`) where `value.openBrowserUrl` contains the URL for [`openBrowser()`](#openbrowser-url-reqhandler-callback).

#### Examples

``` js
const ares = require('ares-cli'),
  server = ares.Server;

let killTimer, serverUrl;
function _reqHandler(code, res) {
  if (code === "@@ARES_CLOSE@@") {
    res.status(200).send();
    killTimer = setTimeout(function() {
    }, 2 * 1000);
  } else if (code === "@@GET_URL@@") {
    clearTimeout(killTimer);
    res.status(200).send(serverUrl);
  }
}

// Local server running on http://localhost:${PORT}
server.runServer("./webapp", 0, _reqHandler, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### stop(callback)

- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

{{< caution >}}
Before executing `stop()`, you must execute [`runServer()`](#runserver-apppath-port-reqhandler-callback) first.
{{< /caution >}}

Stops all running local servers.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the result of `stop()`.

#### Examples

``` js
const ares = require('ares-cli'),
  server = ares.Server;

...
server.runServer("./webapp", 0, _reqHandler, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});

// Local server is stopped
server.stop(function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

## SetupDevice

### modifyDevice(options, callback)

- `options` &lt;object&gt;
  - `add` &lt;string&gt; || `modify` &lt;string&gt;
  - `info` &lt;string array&gt; **Default**: `root@127.0.0.1:22`.
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Adds or modifies information of registered devices.

`add` or `modify` is the name of the target device to take action. Use one of those keys.

`info` can include IP address, port, and user name.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the device list after `modifyDevice()` is complete.

#### Examples

``` js
const ares = require('ares-cli'),
  setupDevice = ares.SetupDevice;

const options = {
  add: "rpi",
  info: [ 'username=root', 'host=127.0.0.1', 'port=6622' ]
};

//name                deviceinfo                connection  profile
//------------------  ------------------------  ----------  -------
//rpi                 root@127.0.0.1:6622       ssh         ose
//emulator (default)  developer@127.0.0.1:6622  ssh         ose
setupDevice.modifyDevice(options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

``` js
const ares = require('ares-cli'),
  setupDevice = ares.SetupDevice;

const options = {
  modify: "rpi",
  info: [ "{'host':'10.111.222.123','port':'22'}" ]
};

//name                deviceinfo                connection  profile
//------------------  ------------------------  ----------  -------
//rpi                 root@10.111.222.123:22    ssh         ose
//emulator (default)  developer@127.0.0.1:6622  ssh         ose
setupDevice.modifyDevice(options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### removeDevice(options, callback)

- `options` &lt;object&gt;
  - `remove` &lt;string&gt; A device name to remove
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Removes a registered device.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the device list after `removeDevice()` is complete.

#### Examples

``` js
const ares = require('ares-cli'),
  setupDevice = ares.SetupDevice;

const options = {
  remove: "rpi"
};

// name               deviceinfo                connection  profile
//------------------  ------------------------  ----------  -------
//emulator (default)  developer@127.0.0.1:6622  ssh         ose
setupDevice.removeDevice(options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### resetDeviceList(callback)

- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Resets information about registered devices (except the default emulator).

The callback gets two arguments (`err`, `value`) where `value.msg` contains the list of registered devices after `resetDeviceList()` is complete.

#### Examples

``` js
const ares = require('ares-cli'),
  setupDevice = ares.SetupDevice;

//name                deviceinfo                connection  profile
//------------------  ------------------------  ----------  -------
//emulator (default)  developer@127.0.0.1:6622  ssh         ose
setupDevice.resetDeviceList(function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### setDefaultDevice(name, callback)

- `name` &lt;string&gt; A name of the device you want to set as the default device
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Sets the given device (`name`) as the default device.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the list of registered devices after `setDefaultDevice()` is complete.

#### Examples

``` js
const ares = require('ares-cli'),
    setupDevice = ares.SetupDevice;

// name             deviceinfo               connection profile
// ---------------- ------------------------ ---------- -------
// target (default) root@127.0.0.1:22        ssh        ose
// emulator         developer@127.0.0.1:6622 ssh        ose
setupDevice.setDefaultDevice("target", function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### showDeviceList(callback)

- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Shows a list of registered devices.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the device list.

#### Examples

``` js
const ares = require('ares-cli'),
    setupDevice = ares.SetupDevice;

// name                deviceinfo               connection  profile
// ------------------ ------------------------- ----------- -------
// rpi                 root@127.0.0.1:22        ssh         ose
// emulator (default)  developer@127.0.0.1:6622 ssh         ose
setupDevice.showDeviceList(function(err, value) {
    if(err) throw err;
    console.log(value.msg);
});
```

### showDeviceListFull(callback)

- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Shows a list of registered devices in detail.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the device list.

#### Examples

``` js
const ares = require('ares-cli'),
    setupDevice = ares.SetupDevice;

[
  {
    "profile": "ose",
    "name": "rpi",
    "default": false,
    "deviceinfo": {
      "ip": "127.0.0.1",
      "port": "22",
      "user": "root"
    },
    "connection": [
      "ssh"
    ],
    "details": {
      "password": "",
      "description": "new device description"
    }
  },
  {
    "profile": "ose",
    "name": "emulator",
    "default": true,
    "deviceinfo": {
      "ip": "127.0.0.1",
      "port": "6622",
      "user": "developer"
    },
    "connection": [
      "ssh"
    ],
    "details": {
      "privatekey": "webos_emul",
      "description": "LG webOS Emulator"
    }
  }
]
setupDevice.showDeviceListFull(function(err, value) {
    if(err) throw err;
    console.log(value.msg);
});
```

## Shell

### remoteRun(options, cmd, callback)

- `options` &lt;object&gt;
  - `device` &lt;string&gt; A name of the target device to run commands
- `cmd` &lt;string&gt; Commands to run
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Runs shell commands on a target device.

The callback gets two arguments (`err`, `value`) where `value.msg` contains the result of `cmd`.

#### Examples

``` js
const ares = require('ares-cli'),
  shell = ares.Shell;

const options = {
  device: "rpi"
};

// /var/rootdirs/home/root
shell.remoteRun(options, "pwd", function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```

### shell(options, callback)

- `options` &lt;object&gt;
  - `device` &lt;string&gt; A name of the target device to connect
- `callback` &lt;Function&gt;
  - `err` &lt;Error&gt;
  - `value` &lt;object&gt;
    - `msg` &lt;string&gt;

Connects to a target device.

The callback gets two arguments (`err`, `value`). When the connection is closed, `value.msg` contains the status of the connection. See the examples below.

#### Examples

``` js
const ares = require('ares-cli'),
  shell = ares.Shell;

const options = {
  device: "rpi"
};

// Connection to ${IP} closed.
shell.shell(options, function(err, value) {
  if(err) throw err;
  console.log(value.msg);
});
```