---
title: packageinfo.json
date: 2018-10-15
weight: 20
toc: true
---

`packageinfo.json` file defines the contents of a package. A package contains one application and zero or more services.

{{< note >}}
`packageinfo.json` is generated automatically during the packaging process when you execute [`ares-package`]({{< relref "cli-user-guide#ares-package" >}}) command of Command-Line Interface (CLI). While the webOS Open Source Edition is running, `appinstalld` service references the file to retrieve the app information and list of services included in the package.
{{< /note >}}

## Schema

``` json
{
    "app"                      : string,
    "id"                       : string,
    "loc_name"                 : string,
    "package_format_version"   : number,
    "vendor"                   : string,
    "version"                  : string,
    "services"                 : string array
}
```

## Properties

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Property</th>
<th>Required</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>app</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>Application ID.</p></td>
</tr>
<tr class="even">
<td><p>id</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>Package ID.</p></td>
</tr>
<tr class="odd">
<td><p>loc_name</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>Localizable package name.</p></td>
</tr>
<tr class="even">
<td><p>package_format_version</p></td>
<td><p>Required</p></td>
<td><p>number</p></td>
<td><p>Packaging format version, currently, &quot;2&quot;.</p></td>
</tr>
<tr class="odd">
<td><p>vendor</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>Vendor name.</p></td>
</tr>
<tr class="even">
<td><p>version</p></td>
<td><p>Required</p></td>
<td><p>string</p></td>
<td><p>Package version.</p></td>
</tr>
<tr class="odd">
<td><p>services</p></td>
<td><p>Optional</p></td>
<td><p>string array</p></td>
<td><p>Services packaged with the app.</p></td>
</tr>
</tbody>
</table>
</div>

## Example

``` json
{
  "app": "com.webos.app.testapp",
  "id": "com.webos.testapp",
  "loc_name": "webOS Open Source Edition Demo",
  "package_format_version": 2,
  "vendor": "My Company",
  "version": "1.0.0",
  "services": ["com.webos.testapp.service"]
}
```
