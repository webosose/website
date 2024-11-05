---
title: services.json
date: 2024-09-12
weight: 30
toc: true
---

`services.json` file resides in a service's root directory and describes how the service is constructed and operates.

## Schema

``` json
{
    "id"                    : string,
    "description"           : string,
    "engine"                : string,
    "executable"            : string,
    "services": [           : object array,
        {
            "name"          : string,
            "description"   : string
        }
    ]
}
```

## Properties

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: 15%" />
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Property</p></th>
<th><p>Required</p></th>
<th><p>Type</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>id</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>ID of the service array.</p>
{{< note >}}
Typically, the value will be the name of the first service in <code>services</code> object array.
{{< /note >}}
</div></td>
</tr>
<tr class="even">
<td><p>description</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>Description of the service array.</p></td>
</tr>
<tr class="odd">
<td><p>engine</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>Service type. This property is required when you develop a downloadable native service.</p></td>
</tr>
<tr class="even">
<td><p>executable</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>Name of an executable file. This property is required when you develop a downloadable native service.</p></td>
</tr>
<tr class="odd">
<td><p>services</p></td>
<td><p>Required</p></td>
<td><p>object array</p></td>
<td><p>Services the app provides.</p>
<p>Typically, an app provides only one service. However, there may be reasons to provide multiple services within the same app.</p></td>
</tr>
<tr class="even">
<td><p>-name</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>Name of service on the webOS Luna Bus.</p>
{{< note >}}
<p>The service name must begin with the app name. For example, </p>
<ul>
<li><p><strong>App name</strong>: <em>com.example.myapplication</em> </p></li>
<li><p><strong>Service name</strong>: <em>com.example.myapplication.myservice</em></p></li>
</ul>
{{< /note >}}</td>
</tr>
<tr class="odd">
<td><p>-description</p></td>
<td><p>Optional</p></td>
<td><p>string</p></td>
<td><p>Description of the service.</p></td>
</tr>
</tbody>
</table>
</div>

## Example

``` json
{
    "id": "com.test.testacct.test.service",
    "description": "Test Service",
    "engine": "native",
    "executable": "test_service",
    "services": [
        {
            "name": "com.test.testacct.test.service",
            "description": "Test Contact"
        }
    ]
}
```
