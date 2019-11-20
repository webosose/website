---
title: "Using PmLogLib in QML"
date: 2019-11-18
weight: 50
toc: true
---

You can use the APIs described below to log information, including performance, in components or applications written using QML.

## PmLogLib API

The PmLogLib API is provided as a QML plugin on **PmLog** of the [qml-webos-components](https://github.com/webosose/qml-webos-components). After importing PmLog, you can use the methods defined below. The PmLogLib API supports singleton version as well as instance version.

### Methods

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
<td><p><strong>critical</strong></p></td>
<td><p>Logs critical errors.</p>
<p><strong>Syntax:</strong></p>
<pre>critical(msgid, kv_pairs, msg);</pre></td>
</tr>
<tr class="even">
<td><p><strong>error</strong></p></td>
<td><p>Logs errors.</p>
<p><strong>Syntax:</strong></p>
<pre>error(msgid, kv_pairs, msg);</pre></td>
</tr>
<tr class="odd">
<td><p><strong>warning</strong></p></td>
<td><p>Logs warning messages.</p>
<p><strong>Syntax:</strong></p>
<pre>warning(msgid, kv_pairs, msg);</pre></td>
</tr>
<tr class="even">
<td><p><strong>info</strong></p></td>
<td><p>Logs usage metrics.</p>
<p><strong>Syntax:</strong></p>
<pre>info(msgid, kv_pairs, msg);</pre></td>
</tr>
<tr class="odd">
<td><p><strong>debug</strong></p></td>
<td><p>Logs debug messages.</p>
<p><strong>Syntax:</strong></p>
<pre>debug(msg);</pre></td>
</tr>
</tbody>
</table>
</div>

### Parameters

The table below provides the description of the message elements. The `msgid` is mandatory, and `kv_pairs` and `msg` are optional.

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
<td><p><strong>msgid</strong></p></td>
<td><p>string</p></td>
<td><p>The <code>msgid</code> is an arbitrary short string (in most cases between 5 and 16 characters long) that uniquely identifies a log message within a component. The <code>msgid</code> cannot be a NULL or an empty string. It cannot contain a blank space (" ") or curly brackets ("{}") in it. </p>
<p>Every log statement, except for the debug and trace log statement, is expected to have a unique <code>msgid</code> to clearly differentiate the messages by function and use them for metrics analysis. For example, the number of QML app launches per session, can be determined by counting the messages with <code>msgid</code>. The selection of the message IDs is left up to the developer. Typically it would be a short string in all capitals, for example, APPSTRT. It is not necessary that the meaning of the message is apparent from the <code>msgid</code> alone, but it is best to standardize on the names.</p>
<p>It may be an additional burden on the developers to add message IDs to log statements. However, considering that our logs at or above INFO should only include significant information, we expect that programs will not need a large number of message IDs and the effort required will be kept minimal.</p>
{{< note >}}
The <code>msgid</code> is not required if the <code>level</code> parameter is set to debug. Since debug level logs are used by developers for code debugging and not used for metrics analysis, it is kept simpler for developers to log as a free-text at the debug level.
{{< /note >}}</td>
</tr>
<tr class="even">
<td><p><strong>kv_pairs</strong></p></td>
<td><p>var (JSON object)</p></td>
<td><p>This is an optional parameter which consists of a set of key-value pairs followed by a free text to provide additional information in the logs which can be used for analytics purpose.</p>
{{< note >}}
This parameter is optional, as long as the message ID itself is descriptive. For example, a message with an ID of `NETWORK_DOWN` or `READ_CONF_FAIL` is self-descriptive and does not need additional information passed as a parameter.
{{< /note >}}
</div>
<ul>
<li><p>Info and the higher level of messages should use key-value pairs to provide useful information about the log.</p></li>
<li><p>Keys should <strong>NOT</strong> contain a colon (":") in it.</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p><strong>msg</strong></p></td>
<td><p>string</p></td>
<td><p>The text to be logged.</p></td>
</tr>
</tbody>
</table>
</div>

### Examples

The following is the sample code for how components written in QML can log information.

#### Instance Version

``` javascript
import PmLog 1.0
PmLog {
     id: pmLog
     context: "com.webos.mycomponent"
}
pmLog.error("APPCRASH", {"APP_NAME":  "Facebook", "APP_ID": appId}, "Facebook app crashed, restart application");
pmLog.info("URLLOAD", {"URL": "http://webosose.org", "TIME": 200, "UNIT": "ms"});
pmLog.debug("BRWSRCLOSE");
```

Output:

``` plaintext
1970-01-01T00:01:05.714335Z [65] user.error DBGFRWK[1550]: com.webos.mycomponent APPCRASH {"APP_ID": "com.webos.app.facebook", "APP_NAME": "Facebook"} Facebook app crashed, restart application
1970-01-01T00:01:05.714572Z [65] user.info DBGFRWK[1550]: com.webos.mycomponent URLLOAD {"TIME": 200, "UNIT": "ms", "URL": "http://webosose.org"}
1970-01-01T00:01:05.714667Z [65] user.debug DBGFRWK[1550]: com.webos.mycomponent BRWSRCLOSE
```

#### Singleton Version

``` javascript
import PmLog 1.0
PmLogger.context = "qml";

PmLogger.error("APPCRASH", {"APP_NAME": "Facebook", "APP_ID": appId}, "Facebook app crashed, restart application");
PmLogger.info("URLLOAD", {"URL": "http://webosose.org", "TIME": 200, "UNIT": "ms"});
PmLogger.debug("BRWSRCLOSE");
```

Output:

``` plaintext
1970-01-01T00:01:05.713362Z [65] user.error DBGFRWK[1550]: qml APPCRASH {"APP_ID": "com.webos.app.facebook", "APP_NAME": "Facebook"} Facebook app crashed, restart application
1970-01-01T00:01:05.713800Z [65] user.info DBGFRWK[1550]: qml URLLOAD {"TIME": 200, "UNIT": "ms", "URL": "http://webosose.org"}
1970-01-01T00:01:05.713971Z [65] user.debug DBGFRWK[1550]: qml BRWSRCLOSE
```

## PmLogLib Performance API

The PmLogLib performance API is provided as a QML plugin on **PerformanceLog** of the [qml-webos-components](https://github.com/webosose/qml-webos-components). After importing PerformanceLog, you can use the methods defined below.  The PmLogLib performance API supports singleton version as well as instance version.

### Methods

These methods can be used to measure performance time. They can measure time across processes. Both `time` and `timeEnd` log the time (in milliseconds) that was spent between the calls. Both take `msgid` and `kv_pairs` parameters that identify the measurement point. The `kv_pairs` and `msg` parameters are optional.

For parameter description, see [Parameters](#parameters).

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
<td><p><strong>time</strong></p></td>
<td><p>Starts a new timer.</p>
<p><strong>Syntax:</strong></p>
<pre>time(msgid, kv_pairs);</pre></td>
</tr>
<tr class="even">
<td><p><strong>timeEnd</strong></p></td>
<td><p>Stops a timer and prints the elapsed time.</p>
<p><strong>Syntax:</strong></p>
<pre>timeEnd(msgid, kv_pairs, msg);</pre></td>
</tr>
</tbody>
</table>
</div>

### Examples

The following is the sample code for how components written in QML can log performance information.

#### Instance Version

``` javascript
import PerformanceLog 1.0
PerformanceLog {
     id: perfLog
     context: "com.webos.mycomponent"
}
perfLog.time("APP_LAUNCH", {"APP_ID": appId});
perfLog.timeEnd("APP_LAUNCH", {"APP_ID": appId}, "Web application is launched from Showcase");
perfLog.time("APP_SWITCH", {"APP_FROM": "Angry Birds", "APP_TO": "Chess"});
perfLog.timeEnd("APP_SWITCH", {"APP_FROM": "Angry Birds", "APP_TO": "Chess"});
perfLog.time("BROWSER_LOAD");
perfLog.timeEnd("BROWSER_LOAD");
```

Output:

``` plaintext
1970-01-01T00:01:09.303503Z [69] 192 local0.info DBGFRWK[1552]: com.webos.mycomponent APP_LAUNCH {"APP_ID": "com.webos.app.facebook", "UNIT": "ms", "TIME": 2} Web application is launched from Showcase
1970-01-01T00:01:09.304773Z [69] 192 local0.info DBGFRWK[1552]: com.webos.mycomponent APP_SWITCH {"APP_FROM": "Angry Birds", "APP_TO": "Chess", "UNIT": "ms", "TIME": 1}
1970-01-01T00:01:09.305467Z [69] 192 local0.info DBGFRWK[1552]: com.webos.mycomponent BROWSER_LOAD {"UNIT": "ms", "TIME": 1}
```

#### Singleton Version

``` javascript
import PerformanceLog1.0
PerformanceLogger.context = "qmlPerformance";

PerformanceLogger.time("APP_LAUNCH", {"APP_ID": appId});
PerformanceLogger.timeEnd("APP_LAUNCH", {"APP_ID": appId}, "Web application launched from Showcase");
PerformanceLogger.time("APP_SWITCH", {"APP_FROM": "Angry Birds", "APP_TO": "Chess"});
PerformanceLogger.timeEnd("APP_SWITCH", {"APP_FROM": "Angry Birds", "APP_TO": "Chess"});
PerformanceLogger.time("BROWSER_LOAD");
PerformanceLogger.timeEnd("BROWSER_LOAD");
```

Output:

``` plaintext
1970-01-01T00:01:09.303503Z [69] 192 local0.info DBGFRWK[1552]: qmlPerformance APP_LAUNCH {"APP_ID": "com.webos.app.facebook", "UNIT": "ms", "TIME": 2} Web application is launched from Showcase
1970-01-01T00:01:09.304773Z [69] 192 local0.info DBGFRWK[1552]: qmlPerformance APP_SWITCH {"APP_FROM": "Angry Birds", "APP_TO": "Chess", "UNIT": "ms", "TIME": 1}
1970-01-01T00:01:09.305467Z [69] 192 local0.info DBGFRWK[1552]: qmlPerformance BROWSER_LOAD {"UNIT": "ms", "TIME": 1}
```
