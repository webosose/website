---
title: ls-monitor Usage Guide
date: 2020-03-06
weight: 20
toc: true
---

`ls-monitor` is a command-line tool accessible through a shell on a device. `ls-monitor` lets you see traffic going over the webOS service bus, similar to a network sniffer that lets you observe HTTP traffic.

{{< note >}}
To access the device shell, you must connect to the device using the Secure Shell (SSH) protocol. For more details, see [Network Setup]({{< relref "setting-up-networking-iot" >}}).
{{< /note >}}

## Syntax

``` bash
ls-monitor [OPTIONS...]
```

{{< note >}}
Pressing the **CTRL + C** key breaks out of the monitoring.
{{< /note >}}

## Options

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 25%" />
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
<td><p>-h, --help</p></td>
<td><p>None</p></td>
<td><p>Displays the help.</p></td>
</tr>
<tr class="even">
<td><p>-f, --filter</p></td>
<td><p>SERVICE_NAME</p></td>
<td><p>Filters by service name (or unique name).</p>
<p>e.g. <code>-f com.webos.foo</code> or <code>--filter=com.webos.foo</code></p></td>
</tr>
<tr class="odd">
<td><p>-l, --list</p></td>
<td><p>None</p></td>
<td><p>Lists all luna services connected to a hub.</p></td>
</tr>
<tr class="even">
<td><p>-s, --subscriptions</p></td>
<td><p>None</p></td>
<td><p>Lists all subscriptions in the system.</p></td>
</tr>
<tr class="odd">
<td><p>-i, --introspection</p></td>
<td><p>SERVICE_NAME</p></td>
<td><p>Lists service methods and signals.</p>
<p>e.g. <code>-i com.webos.foo</code> or <code>--introspection=com.webos.foo</code></p></td>
</tr>
<tr class="even">
<td><p>-v, --api-version</p></td>
<td><p>SERVICE_NAME</p></td>
<td><p>Displays the version of the service.</p>
<p>e.g. <code>-v com.webos.foo</code> or <code>--api-version=com.webos.foo</code></p></td>
</tr>
<tr class="odd">
<td><p>-m, --malloc</p></td>
<td><p>None</p></td>
<td><p>Lists memory allocation data from all services in the system.</p></td>
</tr>
<tr class="even">
<td><p>-d, --debug</p></td>
<td><p>None</p></td>
<td><p>Prints extra output for debugging monitor.</p>
{{< caution >}}
Be careful of unbounded memory growth when using the debug option.
{{< /caution >}}</td>
</tr>
<tr class="odd">
<td><p>-c, --compact</p></td>
<td><p>None</p></td>
<td><p>Prints compact output to fit terminal. The followings indicate the symbols in the message printed in the Console.</p>
<ul>
<li><p><strong>&gt;*</strong> : Signal</p></li>
<li><p><strong>&gt;|</strong> : Cancel method call</p></li>
<li><p><strong>&gt;</strong> : Method call</p></li>
<li><p><strong>&lt;</strong> : Reply</p></li>
</ul>
<p>e.g. <code>TX c.w.s.activemanage &gt;| TX c.w.s.activemanage/private/cancel</code></p>
{{< note >}}
This option takes precedence over the debug option.
{{< /note >}}</td>
</tr>
<tr class="even">
<td><p>-j, --json</p></td>
<td><p>None</p></td>
<td><p>Prints JSON-formatted output for easy parsing.</p>
{{< note >}}
This option takes precedence over the debug option.
{{< /note >}}</td>
</tr>
<tr class="odd">
<td><p>-t, --sort-by-timestamps</p></td>
<td><p>None</p></td>
<td><p>Sorts output by timestamp instead of serial.</p></td>
</tr>
<tr class="even">
<td><p>--dump-hub-data-csv</p></td>
<td><p>None</p></td>
<td><p>Dumps hub data in CSV format.</p></td>
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
<td><p>SERVICE_NAME</p></td>
<td><p>Specifies the name of the service.</p></td>
</tr>
</tbody>
</table>
</div>

## Examples

List all the luna services.

``` bash
$ ls-monitor -l

HUB CLIENTS:
PID             SERVICE NAME                    EXE                                     TYPE                    UNIQUE NAME
988             com.webos.service.ime           /usr/sbin/MaliitServer                  static                  4bVcR4sI
1025            com.palm.webappmanager          /usr/bin/WebAppMgr                      static                  8uWCx2pk
988             com.webos.service.ime.globalplugin      /usr/sbin/MaliitServer                  static                  CLWsVoGP
378             com.webos.service.pdm           /usr/sbin/physical-device-manager       static                  EiUUeTcR
738             com.webos.media                 /usr/sbin/umediaserver                  static                  FTZBmz2f
998             com.webos.applicationManager    /usr/sbin/sam                           static                  QhqbAMrB
780             com.webos.service.downloadmanager       /usr/bin/LunaDownloadMgr                static                  0vamvcPe
376             com.webos.memorymanager         /usr/sbin/memorymanager                 static                  vq0S1Rpo
1038            com.webos.service.contextintentmgr      /usr/bin/node                           static                  UMMQl4Zt
...
```

List the luna services and searches for the services including 'settings' in the results.

``` bash
$ ls-monitor -l | grep 'settings'
1025            com.webos.settingsservice.client        /usr/bin/WebAppMgr                      unknown/client only     rRW5wOi9
799             com.lge.settingsservice         /usr/sbin/SettingsService               static                  8CvddVIm
799             com.webos.settingsservice       /usr/sbin/SettingsService               static                  Hw11GM5M
988             com.webos.service.ime.settings  /usr/sbin/MaliitServer                  static                  j4sFEXuc
799             com.webos.service.settings      /usr/sbin/SettingsService               static                  NQwI0Mu5
```

List the luna services and searches for the services including 'com.webos.service' in the results.

``` bash
$ ls-monitor -l | grep 'com.webos.service*'
988             com.webos.service.ime           /usr/sbin/MaliitServer                  static                  4bVcR4sI
988             com.webos.service.ime.globalplugin      /usr/sbin/MaliitServer                  static                  CLWsVoGP
378             com.webos.service.pdm           /usr/sbin/physical-device-manager       static                  EiUUeTcR
780             com.webos.service.downloadmanager       /usr/bin/LunaDownloadMgr                static                  0vamvcPe
1038            com.webos.service.contextintentmgr      /usr/bin/node                           static                  UMMQl4Zt
...
```

Request the version of the service name 'com.webos.service.settings'.

``` bash
$ ls-monitor -v com.webos.service.settings

com.webos.service.settings 1.0
```

List all service methods and signals registered by 'com.webos.service.settings'.

``` bash
$ ls-monitor -i com.webos.service.settings

METHODS AND SIGNALS REGISTERED BY SERVICE 'com.webos.service.settings' WITH UNIQUE NAME 'ypFkyFme' AT HUB

  "/":
      "getCurrentSettings": {"provides":["all","settings.read","settings"]}
      "resetSystemSettingDesc": {"provides":["all","settings"]}
      "getSystemSettings": {"provides":["all","settings.read","settings"]}
      "setSystemSettingDesc": {"provides":["all","settings"]}
      "setSystemSettingFactoryValue": {"provides":["all","settings"]}
      "setSystemSettingFactoryDesc": {"provides":["all","settings"]}
      "deleteSystemSettings": {"provides":["all","settings"]}
      "batch": {"provides":["all","settings"]}
      "getSystemSettingValues": {"provides":["all","settings.read","settings"]}
      "setSystemSettingValues": {"provides":["all","settings"]}
      "getSystemSettingFactoryValue": {"provides":["all","settings.read","settings"]}
      "setSystemSettings": {"provides":["all","settings"]}
      "getSystemSettingDesc": {"provides":["all","settings.read","settings"]}
      "resetSystemSettings": {"provides":["all","settings"]}
  "/internal":
      "getCurrentSubscriptions": {"provides":["all","settings"]}
      "instrument": {"provides":["all","settings"]}
```

Filter by service name 'com.webos.service' and searches for the logs including 'com.webos.service.setting' in the results without case-sensitivity restrictions.

``` bash
$ ls-monitor --filter=com.webos.service | grep -i 'com.webos.service.setting*'
```
