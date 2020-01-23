---
title: "Using PmLogLib in C/C++"
date: 2019-11-18
weight: 20
toc: true
---

You can use the APIs describe below to log information in components written using C/C++. Use [PmLogLib](https://github.com/webosose/pmloglib) v3.0.0-27 or higher.

## APIs for Components

### PmLogLib API

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Function</th>
<th>Description and Syntax</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>PmLogMsg</strong></p></td>
<td><p>Allows users to choose at which level the message is logged.</p>
<p><strong>Syntax:</strong></p>
<pre>PmLogMsg(context, level, msgid, kv_count, ...)</pre></td>
</tr>
<tr class="even">
<td><p><strong>PmLogCritical</strong></p></td>
<td><p>Logs critical errors.</p>
<p><strong>Syntax:</strong></p>
<pre>PmLogCritical(context, msgid, kv_count, ...)</pre></td>
</tr>
<tr class="odd">
<td><p><strong>PmLogError</strong></p></td>
<td><p>Logs errors.</p>
<p><strong>Syntax:</strong></p>
<pre>PmLogError(context, msgid, kv_count, ...)</pre></td>
</tr>
<tr class="even">
<td><p><strong>PmLogWarning</strong></p></td>
<td><p>Logs warning messages.</p>
<p><strong>Syntax:</strong></p>
<pre>PmLogWarning(context, msgid, kv_count, ...)</pre></td>
</tr>
<tr class="odd">
<td><p><strong>PmLogInfo</strong></p></td>
<td><p>Logs usage metrics.</p>
<p><strong>Syntax:</strong></p>
<pre>PmLogInfo(context, msgid, kv_count, ...)</pre></td>
</tr>
<tr class="even">
<td><p><strong>PmLogDebug</strong></p></td>
<td><p>Logs debug messages.</p>
<p><strong>Syntax:</strong></p>
<pre>PmLogDebug(context, msgid, kv_count, ...)</pre></td>
</tr>
</tbody>
</table>
</div>

### Parameters

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
<td><p><strong>context</strong></p></td>
<td><p>PmLogContext</p></td>
<td><p>It is a user-defined arbitrary string to group relevant log messages together to represent a logical subcomponent. It is useful for finding the relevant messages when examining a log file containing a large number of messages. Typically it contains the component or application name. Additional categorization can also be appended with a period ("."). For example, an image viewer could log all generic messages with its application name "com.AbcOrg.PictureViewer" as the <code>context</code>. Instead, it may choose to log all messages from its JPEG rendering sub-component with the <code>context</code> "com.AbcOrg.PictureViewer.Renderer.Jpeg". If you want to find all messages in the log file which were logged by your application while rendering jpeg files you can easily do so by searching for the string "com.AbcOrg.PictureViewer.Renderer.Jpeg" in the log file.</p></td>
</tr>
<tr class="even">
<td><p><strong>level</strong></p></td>
<td><p>const char *</p></td>
<td><p>The <code>level</code> should be one of the following values:</p>
<ul>
<li><p><strong>Critical</strong>: Use this when you need to log critical errors.</p></li>
<li><p><strong>Error</strong>: Use this when you need to log errors.</p></li>
<li><p><strong>Warning</strong>: Use this when you need to log warnings.</p></li>
<li><p><strong>Info</strong>: Use this when you need to log usage metrics.</p></li>
<li><p><strong>Debug</strong>: Use this when you need to log debug messages. These messages will not get into system log by default. You must enable them.</p></li>
</ul>
{{< note >}}
This parameter is only required if you are using the generic function of the logging API which does not already specify the level.
{{< /note >}}
</td>
</tr>
<tr class="odd">
<td><p><strong>msgid</strong></p></td>
<td><p>const char *</p></td>
<td><p>The <code>msgid</code> is an arbitrary short string (in most cases between 5 and 16 characters long) that uniquely identifies a log message within a component. The <code>msgid</code> cannot be a NULL or an empty string. It cannot contain a blank space (" ") or curly brackets ("{}") in it. </p>
<p>Every log statement, except for the debug and trace log statement, is expected to have a unique <code>msgid</code> to clearly differentiate the messages by function and use them for metrics analysis. For example, the number of native app launches per session, can be determined by counting the messages with <code>msgid</code>. The selection of the message IDs is left up to the developer. Typically it would be a short string in all capitals, for example, APPSTRT. It is not necessary that the meaning of the message is apparent from the <code>msgid</code> alone, but it is best to standardize on the names.</p>
<p>The msgids must be defined in a separate header file with comments to indicate their purpose. This will be used in data crunching for metrics. For example: </p>
<pre>#define MSGID_APP_START “APPSTRT” /** App started successfully */</pre>
<p>It may be an additional burden on the developers to add message IDs to log statements. However, considering that our logs at or above INFO should only include significant information, we expect that programs will not need a large number of message IDs and the effort required will be kept minimal. </p>
{{< note >}}
The <code>msgid</code> is not required if the <code>level</code> parameter is set to debug. Since debug level logs are used by developers for code debugging and not used for metrics analysis, it is kept simpler for developers to log as a free-text at the debug level.
{{< /note >}}</td>
</tr>
<tr class="even">
<td><p><strong>kv_count</strong></p></td>
<td><p>int</p></td>
<td><p>This is the number of key-value pairs that follows in the API call. It can take any value between 0 and 10.</p></td>
</tr>
<tr class="odd">
<td><p><strong>...</strong></p></td>
<td><p>const char *</p></td>
<td><p>This is an optional parameter which consists of a set of key-value pairs followed by a free text to provide additional information in the logs which can be used for analytics purpose.</p>
{{< note >}}
This parameter is optional, as long as the message ID itself is descriptive. For example, a message with an ID of `NETWORK_DOWN` or `READ_CONF_FAIL` is self-descriptive and does not need additional information passed as a parameter.
{{< /note >}}
<ul>
<li><p>Info and the higher level of messages should use key-value pairs to provide useful information about the log.</p></li>
<li><p>Keys should <strong>NOT</strong> contain a colon (":") in it.</p></li>
<li><p>A key-value pair must be built using the following helper macros:</p>
<ul>
<li><p><strong>PMLOGKFV</strong>(literal_key, literal_fmt, value) – is a macro which helps build a key-value pair, based on the literal_fmt. </p></li>
<li><p><strong>PMLOGKS</strong>(literal_key, string_value) – is a macro which helps build a key-value pair for string literals.</p></li>
<li><p><strong>PMLOGJSON</strong>(literal_key, json_object_string) – is a macro which helps build a key-value pair for stringified JSON object.</p></li>
</ul>
<p>To log a boolean message, use <code>PMLOGKFV("BOOLKEY","%s","true")</code>.</p>
<p>If double quotes are to be used in a value string, it should be stringified. For example:</p>
<pre>PMLOGKS("KEY", g_strescape("my \"quoted\" string value"));</pre></li>
<li><p>A free text – is the message part of the log. Since this is a format string, it can contain format specifiers, such as <code>%d</code> or <code>%s</code>. These format specifiers will be replaced with respective parameters in the variable parameter list. If a message does not have a free text to log, then it is specified as a blank space (" "). This text is to benefit from a human reading the logs. It will be discarded for any metrics gathering. Hence, you must not use this field alone to log critical information. Here is an example of a free text: </p>
<pre>
PmLogMsg (my_context, Info, "APPLAUNCH", 3, PMLOGKFV("ID", "%d", app_info->id), PMLOGKS("NAME", app_info->name), PMLOGKS("STATUS", "launched"), "App launched successfully in %s", _func_);
</pre>
</li>
</ul></td>
</tr>
</tbody>
</table>
</div>

## Example

The following is the sample code for how components written in C/C++ can log information.

``` cpp {linenos=table}
PmLogContext my_context; // Context declaration
PmLogGetContext(“context_name”, &my_context); // Context creation
PmLogInfo(my_context, "APPDEL", 3, PMLOGKS("APP_NAME","Solitaire"), PMLOGKFV("APP_ID","%d",app_id), PMLOGKS("APP_STATUS","deleted"), " "); // Level setting to the context
```

More examples:

``` cpp {linenos=table,linenostart=3}
PmLogInfo(my_context, "APPSWITCH", 1, PMLOGJSON("JSON", "{\"key\":{\"sub_key\":\"sub_value\"}}"), " ");
```

``` cpp {linenos=table,linenostart=3}
PmLogInfo(my_context, "APPSWITCH", 4, PMLOGKS("FROM_APP", "source_app_name"), PMLOGKS("TO_APP", "dest_app_name"), PMLOGKFV("TIME", "%d", 150), PMLOGKS("UNIT", "ms"), " ");
```

``` cpp {linenos=table,linenostart=3}
PmLogError(my_context, "BRWSRERR", 2, PMLOGKFV("LAUNCH_POINT", "%d", browser_info->source), PMLOGKFV("ERROR_CODE", "%d", errcode), "Browser did not launch properly in %s", __func__);
```

``` cpp {linenos=table,linenostart=3}
PmLogMsg(my_context, Info, "APPLAUNCH", 4, PMLOGKFV("APP_ID", "%d", app_info->id), PMLOGKS("APP_NAME", app_info->name), PMLOGKFV("APP_INSTANCE_ID","%d",app_info->instance_id), PMLOGKS("APP_STATUS", "launched"), “App launched successfully” ) ;
```

``` cpp {linenos=table,linenostart=3}
PmLogError(my_context, "APPCRASH", 2, PMLOGKS("APP_NAME", app_info->name), PMLOGKS("APP_ID", app_info->id.c_str), " " );
```

``` cpp {linenos=table,linenostart=3}
PmLogDebug(my_context, "%s function returned %d", __func__, retval);
```

{{< note >}}
If there are some special characters such as '\\b', '\\f', '\\n', '\\r', '\\t', '\\', and '"' on key or value, for example, `PMLOGKS("KEY", g_strescape("my \"quoted\" string value"))`, you must escape that string. If you do not follow this rule, the following error message, for example, is written to the log file.

``` bash
2013-08-10T23:48:23.365813Z [814] user.err WebAppMgr PmLogLib INVALID_JSON {"CONTEXT":"LunaSysMgrJS","MSGID":"JSLOG"}
```

You can use GLib's `g_strescape()` function for escaping string. However, you must pay attention to use `g_strescape()`, because this function returns a newly allocated memory for the escaped string.

For more details about `g_strescape()`, refer to [GLib Reference Manual](http://developer.gimp.org/api/2.0/glib/glib-String-Utility-Functions.html#g-strescape).
{{< /note >}}

## Logging at the Trace Level

The trace is a detailed information of a component's activity. This information may get displayed frequently. Sometimes, it may get displayed 100 times a second. e.g.

  - Entered function
  - Debug
  - Mouse moved
  - Frame rendered

{{< note >}}
These messages can only be enabled at compile time.
{{< /note >}}

To log at a trace level, a component needs to:

1.  Define `PMLOG_TRACES_ENABLED` in their makefile or .c file before including the header, `PmLogLib.h.in`. Otherwise, traces are disabled by default (i.e. not compiled)

    ``` javascript
    ...
    #ifndef PMLOG_TRACE_CONTEXT
         #ifdef PMLOG_RACE_COMPONENT
              #define PMLOG_TRACE_CONTEXT   \
                           PmLogGetContextInline(PMLOG_TRACE_COMPONENT)
              #else
                           #define PMLOG_TRACE_CONTEXT     kPmLogGlobalContext
              #endif
         #endif

         #define PMLOG_TRACE(...)     \
                      PmLogDebug(PMLOG_TRACE_CONTEXT, __VA_ARGS__)

         #define PMLOG_TRACE_DATA(p, n)     \
                      (void) PmLogDumpData(PMLOG_TRACE_CONTEXT, kPmLogLevel_Debug, p, n, \
                                kPmLogDumpFormatDefault)
    ...
    ```

2.  Define `context` (of type PmLogContext) as `PMLOG_TRACE_CONTEXT` or use `PMLOG_TRACE_COMPONENT` to define a named context. Otherwise, the context will be `<default>`.

    **API Usage:**

    ``` bash
    PMLOG_TRACE("Entering function %s\n", __func__);
    ```

    **CMakeLists.txt Usage:**

    ``` bash
    add_definitions(-DPMLOG_TRACES_ENABLED -DPMLOG_TRACE_COMPONENT="uploadd")
    ```

3.  The log messages are logged in your log file as below.

    ``` plaintext
    2013-10-16T18:40:24.696857Z [2235] user.debug uploadd [] uploadd {} Entering function main
    ```
