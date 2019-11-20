---
title: "Using PmLogLib in Node.js"
date: 2019-11-18
weight: 40
toc: true
---

You can use the APIs described below to log information in components or services written using Node.js. Use [nodejs-module-webos-pmlog](https://github.com/webosose/nodejs-module-webos-pmlog) v3.0.1-1 or higher.

## APIs for Components and Services

The following two APIs are provided for logging from a Node.js component.

### PmLogLib API

This API supports the entire PmLogLib capability, for code written specifically for webOS OSE.

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>API</th>
<th>Description and Syntax</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>context.log</strong></p></td>
<td><p>Provides the logging mechanism for various levels.</p>
<p><strong>Syntax:</strong></p>
<pre>context.log(level, msgid, kv_pairs, msg);</pre></td>
</tr>
</tbody>
</table>
</div>

### Compatibility API

This API provides a bridge between the JavaScript-standard "console" object, and PmLogLib. This cross-platform libraries will have at least minimal compatibility with the logging system, so we do not lose important log messages.

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>API</th>
<th>Description and Syntax</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>console.error</strong></p></td>
<td><p>Logs an error message.</p>
<p><strong>Syntax:</strong></p>
<pre>console.error();</pre></td>
</tr>
<tr class="even">
<td><p><strong>console.warn</strong></p></td>
<td><p>Logs a warning message, but also displays a yellow warning icon next to the logged message.</p>
<p><strong>Syntax:</strong></p>
<pre>console.warn();</pre></td>
</tr>
<tr class="odd">
<td><p><strong>console.log</strong></p></td>
<td><p>Logs a message in the console.</p>
<p><strong>Syntax:</strong></p>
<pre>console.log();</pre></td>
</tr>
<tr class="even">
<td><p><strong>console.info</strong></p></td>
<td><p>Logs a usage message, but also displays a blue icon next to the logged message.</p>
<p><strong>Syntax:</strong></p>
<pre>console.info();</pre></td>
</tr>
</tbody>
</table>
</div>

### Parameters

The table below provides the description of the message elements. The logging levels will be provided as constants on the pmloglib object.

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>level</strong></p></td>
<td><p>Number</p></td>
<td><p>The <code>level</code> should be one of the following values:</p>
<ul>
<li><p><strong>pmloglib.LOG_CRITICAL</strong>: Use this when you need to log critical errors.</p></li>
<li><p><strong>pmloglib.LOG_ERR</strong>: Use this when you need to log errors.</p></li>
<li><p><strong>pmloglib.LOG_WARNING</strong>: Use this when you need to log warnings.</p></li>
<li><p><strong>pmloglib.LOG_INFO</strong>: Use this when you need to log usage metrics. </p></li>
<li><p><strong>pmloglib.LOG_DEBUG</strong>: Use this when you need to log debug messages. These messages will not get into system log by default. Developers must enable them.</p>
</li>
</ul>
{{< note >}}
This parameter is only required if you are using the generic function of the logging API which does not already specify the level.
{{< /note >}}
</td>
</tr>
<tr class="even">
<td><p><strong>msgid</strong></p></td>
<td><p>String</p></td>
<td><p>The <code>msgid</code> is an arbitrary short string (in most cases between 5 and 16 characters long) that uniquely identifies a log message within a component. The <code>msgid</code> cannot be a NULL or an empty string. It cannot contain a blank space (" ") or curly brackets ("{}") in it. </p>
<p>Every log statement, except for the debug and trace log statement, is expected to have a unique <code>msgid</code> to clearly differentiate the messages by function and use them for metrics analysis. For example, the number of JS service activations per session, can be determined by counting the messages with <code>msgid</code>. The selection of the message IDs is left up to the developer. Typically it would be a short string in all capitals, for example, APPSTRT. It is not necessary that the meaning of the message is apparent from the <code>msgid</code> alone, but it is best to standardize on the names.</p>
<p>It may be an additional burden on the developers to add message IDs to log statements. However, considering that our logs at or above INFO should only include significant information, we expect that programs will not need a large number of message IDs and the effort required will be kept minimal. </p>
{{< note >}}
The <code>msgid</code> is not required if the <code>level</code> parameter is set to debug. Since debug level logs are used by developers for code debugging and not used for metrics analysis, it is kept simpler for developers to log as a free-text at the debug level.
{{< /note >}}</td>
</tr>
<tr class="odd">
<td><p><strong>kv_pairs</strong></p></td>
<td><p>Object</p></td>
<td><p>This is an optional parameter which consists of a set of key-value pairs followed by a free text to provide additional information in the logs which can be used for analytics purpose.</p>
{{< note >}}
This parameter is optional, as long as the message ID itself is descriptive. For example, a message with an ID of `NETWORK_DOWN` or `READ_CONF_FAIL` is self-descriptive and does not need additional information passed as a parameter.
{{< /note >}}
<ul>
<li><p>Info and the higher level of messages should use key-value pairs to provide useful information about the log.</p></li>
<li><p>Keys should <strong>NOT</strong> contain a colon (":") in it.</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p><strong>msg</strong></p></td>
<td><p>String</p></td>
<td><p>The text to be logged.</p></td>
</tr>
</tbody>
</table>
</div>

## Example

The following is the sample code for how services written in Node.js can log information.

### For PmLogLib

``` javascript
var pmloglib = require('pmloglib');
var context = new pmloglib.Context("com.webos.mycomponent");
context.log(pmloglib.LOG_ERR, "APPCRASH", {"APP_NAME": "Facebook", "APP_ID": 12}, "Facebook app crashed, restart application");
```

### For Compatibility

``` javascript
var pmloglib = require('pmloglib');
var console = new pmloglib.Console("com.webos.myComponent");
console.log("log message");
console.error("error message");
```
