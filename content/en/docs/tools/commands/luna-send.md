---
title: luna-send Usage Guide
date: 2018-10-15
weight: 10
toc: true
---

`luna-send` is a command-line tool accessible through a shell on a device. `luna-send` is mainly used to test calls to services accessible on the system bus through the LS2 (Luna Bus).

## Syntax

``` bash
luna-send [OPTIONS...] URL '{JSON object}'
```

## Options

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Option</th>
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>-h</p></td>
<td><p>None</p></td>
<td><p>Displays the help.</p></td>
</tr>
<tr class="even">
<td><p><span style="color:#D3D3D3;">-P</span></p></td>
<td><p><span style="color:#D3D3D3;">None</span></p></td>
<td><p><span style="color:#D3D3D3;">Deprecated</span></p></td>
</tr>
<tr class="odd">
<td><p>-s</p></td>
<td><p>None</p></td>
<td><p>Sends a signal.</p></td>
</tr>
<tr class="even">
<td><p>-a</p></td>
<td><p>None</p></td>
<td><p>Sends a specified appId in a message. (default is none)</p></td>
</tr>
<tr class="odd">
<td><p>-m</p></td>
<td><p>None</p></td>
<td><p>Displays service name. (default is none)</p></td>
</tr>
<tr class="even">
<td><p>-d</p></td>
<td><p>None</p></td>
<td><p>Turns debug logging on.</p></td>
</tr>
<tr class="odd">
<td><p>-i</p></td>
<td><p>None</p></td>
<td><p>Turns interactive mode on.</p></td>
</tr>
<tr class="even">
<td><p>-t</p></td>
<td><p>NUMBER_OF_TIMES</p></td>
<td><p>Displays average response time after calling this command the number of times.</p></td>
</tr>
<tr class="odd">
<td><p>-n</p></td>
<td><p>NUMBER_OF_REPLIES</p></td>
<td><p>Exits interactive mode after the number of replies.</p></td>
</tr>
<tr class="even">
<td><p>-l</p></td>
<td><p>None</p></td>
<td><p>Displays the order of responses.</p></td>
</tr>
<tr class="odd">
<td><p>-f</p></td>
<td><p>None</p></td>
<td><p>Displays the response in the formatted JSON.</p></td>
</tr>
<tr class="even">
<td><p>-q</p></td>
<td><p>QUERY_NAME</p></td>
<td><p>Displays a specific query item from responses. (multiple queries can be supplied)<br />
e.g.: <code>-q 'returnValue' -q 'queues[0]'</code></p></td>
</tr>
<tr class="odd">
<td><p>-w</p></td>
<td><p>TIMEOUT</p></td>
<td><p>Sets exit timeout value.</p></td>
</tr>
</tbody>
</table>
</div>

## Parameters

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>NUMBER_OF_TIMES</p></td>
<td><p>Specifies the number of times for calling a command.</p></td>
</tr>
<tr class="even">
<td><p>NUMBER_OF_REPLIES</p></td>
<td><p>Specifies the number of replies.</p></td>
</tr>
<tr class="odd">
<td><p>QUERY_NAME</p></td>
<td><p>Specifies the name of query item.</p></td>
</tr>
<tr class="even">
<td><p>TIMEOUT</p></td>
<td><p>Specifies exit timeout value. (Unit: milliseconds)</p></td>
</tr>
</tbody>
</table>
</div>

## Examples

Get locale information by calling `getSystemSettings` method.

``` bash
$ luna-send -n 1 luna://com.webos.settingsservice/getSystemSettings '{"keys":["localeInfo"]}'

{"subscribed":false,"method":"getSystemSettings","settings":{"localeInfo":{"locales":{"UI":"ko-KR"}}},"returnValue":true}
```

Set location information by calling `setSystemSettings` method.

``` bash
$ luna-send -n 1 luna://com.webos.settingsservice/setSystemSettings '{"category":"option", "settings":{"country":"KOR"}}'

{"method":"setSystemSettings","returnValue":true}
```

List all of the registered applications by calling `listApps` method.

```bash
$ luna-send -n 1 -f luna://com.webos.service.applicationmanager/listApps '{}'

{
    "subscribed": false,
    "apps": [
        {
            "defaultWindowType": "card",
            "bgImages": [
            ],
            "CPApp": false,
            "systemApp": true,
            "version": "0.0.1",
            "vendor": "My Company",
            "portraitResize": {
            },
            "hasPromotion": false,
            "requestedWindowOrientation": "",
            "icons": [
            ],
            "class": {
                "hidden": false
            },
            "largeIcon": "icon_130.png",
            "lockable": true,
            "privilegedJail": false,
             ...
}
```

Launch an app which has ID of "com.webos.app.enactbrowser" by calling `launch` method.

```bash
$ luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '{"id":"com.webos.app.enactbrowser"}'

{
    "returnValue": true
}
```

Get network information by calling `getStatus` method.

```bash
$ luna-send -n 1 -f luna://com.webos.service.connectionmanager/getStatus '{}'

{
    "cellular": {
        "enabled": false
    },
    "returnValue": true,
    "offlineMode": "disabled",
    "wired": {
        "netmask": "255.255.254.0",
        "dns1": "156.147.135.180",
        "ipAddress": "10.177.232.163",
        "proxyinfo": {
            "method": "direct"
        },
        "onInternet": "no",
        "method": "dhcp",
        "state": "connected",
        ...
   "isInternetConnectionAvailable": false
}
```