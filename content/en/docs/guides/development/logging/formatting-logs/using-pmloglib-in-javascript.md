---
title: "Using PmLogLib in JavaScript"
date: 2019-11-18
weight: 30
toc: true
---

To log information of web apps written in JavaScript, you can use the built-in API `webOSSystem.PmLogString()`.

## Method

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Method</th>
<th>Description and Syntax</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>webOSSystem.PmLogString</strong></p></td>
<td><p>Provides the logging mechanism for various levels.</p>
<p><strong>Syntax:</strong></p>
<pre>webOSSystem.PmLogString(level, msgid, kv_pairs, msg);</pre></td>
</tr>
</tbody>
</table>
</div>

## Parameters

The table below provides the description of the message elements.

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
<li><p><strong>3</strong> (critical): Use this when you need to log critical errors.</p></li>
<li><p><strong>4</strong> (error): Use this when you need to log errors.</p></li>
<li><p><strong>5</strong> (warning): Use this when you need to log warnings.</p></li>
<li><p><strong>6</strong> (info): Use this when you need to log usage metrics. </p></li>
<li><p><strong>7</strong> (debug): Use this when you need to log debug messages. These messages will not get into system log by default. Developers must enable them.</p>
</li>
</ul>
</td>
</tr>
<tr class="even">
<td><p><strong>msgid</strong></p></td>
<td><p>String</p></td>
<td><p>The <code>msgid</code> is an arbitrary short string (in most cases between 5 and 16 characters long) that uniquely identifies a log message within a component. The <code>msgid</code> cannot be a NULL or an empty string. It cannot contain a blank space (" ") or curly brackets ("{}") in it. </p>
<p>Every log statement, except for the debug and trace log statement, is expected to have a unique <code>msgid</code> to clearly differentiate the messages by function and use them for metrics analysis. For example, the number of app launches per session, can be determined by counting the messages with <code>msgid</code>. The selection of the message IDs is left up to the developer. Typically it would be a short string in all capitals, for example, APPSTRT. It is not necessary that the meaning of the message is apparent from the <code>msgid</code> alone, but it is best to standardize on the names.</p>
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

The following is the sample code for how services written in JavaScript can log information.

``` javascript
webOSSystem.PmLogString(6, "MSG_ID", '{"key":"value"}', "test msg");
```
