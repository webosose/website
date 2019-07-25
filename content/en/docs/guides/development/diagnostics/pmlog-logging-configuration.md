---
title: "Logging Configuration"
date: 2019-03-15
weight: 70
toc: true
---

PmLog provides logging configuration methods to set the log level and log file by each context.

A configuration file is used to create context(s) for your component and configure the context settings as needed. It must be added to the component’s `files/conf/pmlog/<filename>.conf` and installed in `(WEBOS_INSTALL_SYSCONFDIR)/pmlog.d`.

The format and content of the configuration file must be as follows:

``` javascript
{
     "contexts" : [
          {
               "name" : "mycontext",
               "level" : "info".
               "logProcessIds" : false,
               "logThreadIds" : false,
               "logToConsole" : false,
               "rules" : [
                    { "filter" : "*.*", "output" : "mycontext_log" }
               ]
          }
     ],
     "outputs" : [
          {
               "name" : "mycontext_log",
               "file" : "<at:var at:name="WEBOS_INSTALL_LOGDIR" />/mycontext.log",
               "maxSize": 2000,
               "rotations" : 5
          }
     ]
}
```

{{< note >}}
Please note that it is not mandated to configure your context. You can just call `PmLogGetContext()` to create a new context, whose settings will take the default values.
{{< /note >}}

## The Contexts Section

Here you can specify logging context names and what the default level should be for them. Changes to the Contexts section will only be read at boot time. If you change this section, device has to be rebooted or use PmLogCtl app to see real time changes without rebooting.

The `<default>` context is specially defined, otherwise client context names should follow the regular rules, i.e. use alphanumeric characters only and use a period (".") to separate component hierarchies.

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
<td><p>level</p></td>
<td><p>One of the standard pmlog levels or none to disable logging.</p></td>
</tr>
<tr class="even">
<td><p>logProcessIds</p></td>
<td><p>Enables to turn on process ID tagging.</p></td>
</tr>
<tr class="odd">
<td><p>logThreadIds</p></td>
<td><p>Enables to turn on thread ID tagging.</p></td>
</tr>
<tr class="even">
<td><p>logToConsole</p></td>
<td><p>Enables to turn on stdout output.</p></td>
</tr>
<tr class="odd">
<td><p>bufferSize</p></td>
<td><p>[OPTIONAL - integer] The ring buffer size for a context</p></td>
</tr>
<tr class="even">
<td><p>flushLevel</p></td>
<td><p>[OPTIONAL - integer] The flush level for a ring buffer. This is one of the pmlog levels.</p></td>
</tr>
<tr class="odd">
<td><p>rules</p></td>
<td><p>Specifies routing rules for each context. A rule specifies filter and output.</p></td>
</tr>
<tr class="even">
<td><p>rules.filter</p></td>
<td><p>A filter format is as follows:</p>
<code>&lt;facility&gt;[.&lt;level&gt;[.&lt;program&gt;]]</code>
<ul>
<li>facility: One of the standard syslog facilities or use an asterisk ("*") to indicate all - <a href="http://en.wikipedia.org/wiki/Syslog#Facility_Levels">http://en.wikipedia.org/wiki/Syslog#Facility_Levels</a></li>
<li>level: One of the standard syslog levels or use an asterisk ("*") to indicate all. When specifying a level, it implicitly matches that level or higher. The level may be prefixed with '!' to match only lower levels.</li>
<li>program: Specify an exact program name or use an asterisk ("*") to indicate all.</li>
</ul></td>
</tr>
<tr class="odd">
<td><p>rules.output</p></td>
<td><p>Indicates one of the named output targets previously defined. If a single quote (' ') is specified before the output, it indicates that the specified filter should omit matched messages.</p></td>
</tr>
</tbody>
</table>
</div>

## The Outputs Section

Each output defines settings for a particular log file.

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
<td><div>
file
</div></td>
<td><div>
Path to file.
</div></td>
</tr>
<tr class="even">
<td><div>
maxSize
</div></td>
<td><div>
Maximum size the file can reach before rotation.
</div></td>
</tr>
<tr class="odd">
<td><div>
rotations
</div></td>
<td><div>
The maximum number of rotations before rotating files out the oldest files.
</div></td>
</tr>
</tbody>
</table>
</div>

All context logs are routed to `/var/log/messages` by default. However, if you want to route context logs to a particular file, you should create a configuration file as above format in `/etc/pmlog.d/` directory and set the `contextLogging` parameter to <span class="TED_New_Term">true</span> as shown in line 23 below in `/etc/pmlog.d/default.conf`. Then, each component logs are written in an individual file separately.

The `/etc/pmlog.d/default.conf` has the following default format:

{{< highlight html "linenos=table, hl_lines=23">}}
{
     "contexts" : [
          {
               "name" : "<default>",
               "level" : "info".
               "logProcessIds" : false,
               "logThreadIds" : false,
               "logToConsole" : false,
               "rules" : [
                    { "filter" : "*.*", "output" : "stdlog" },
                    { "filter" : "kern.!info", "output" : "-stdlog" }
               ]
          }
     ],
     "outputs" : [
          {
               "name" : "stdlog",
               "file" : "/var/log/messages",
               "maxSize" : 2000,
               "rotations" : 5
          }
     ],
     "contextLogging" : false
}
{{< /highlight >}}

After changing the value of `contextLogging` parameter, device needs to be rebooted.
