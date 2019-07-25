---
title: "KeyValue Enumerators"
date: 2019-03-15
weight: 90
toc: false
---

These are some of the standard keys to be used for the **key** part of the `kv_pairs` parameter. You can choose to log with a new key if your keys do not match one of the standard keys.

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th><p>Key</p></th>
<th><p>Meaning</p></th>
<th><p>Sample Values</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>APP_CATEGORY </p></td>
<td><p>Category of application in app store </p></td>
<td><ul>
<li><p>Games</p></li>
<li><p>Entertainment</p></li>
<li><p>Finance</p></li>
<li><p>Education</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>APP_ID</p></td>
<td><p>This should be a unique id for every instance of an application </p></td>
<td><ul>
<li><p>id</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>APP_NAME</p></td>
<td><p>Name of the application</p></td>
<td><ul>
<li><p>free text</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>APP_RANK / PAGE_RANK</p></td>
<td><p>App rank of the surfaced app on search</p></td>
<td><ul>
<li><p>number</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>APP_STATUS</p></td>
<td><p>Lifecycle of application </p></td>
<td><ul>
<li><p>download_initiated</p></li>
<li><p>download_cancelled</p></li>
<li><p>installed</p></li>
<li><p>invoked (from UI)</p></li>
<li><p>launched (from SAM)</p></li>
<li><p>opened (from LSM/app)</p></li>
<li><p>running</p></li>
<li><p>carded</p></li>
<li><p>closed</p></li>
<li><p>deletion_initiated</p></li>
<li><p>deletion_cancelled</p></li>
<li><p>deleted</p></li>
<li><p>crashed</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>APP_SUB_CATEGORY </p></td>
<td><p>Sub category of application in app store</p></td>
<td><ul>
<li><p>Puzzles</p></li>
<li><p>Card &amp; Casino</p></li>
<li><p>Casual</p></li>
<li><p>Sports games</p></li>
<li><p>Racing</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>APP_TYPE</p></td>
<td><p>Type of app in app store</p></td>
<td><ul>
<li><p>free</p></li>
<li><p>paid</p></li>
<li><p>top free</p></li>
<li><p>top paid</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>BROWSER_URL</p></td>
<td><p>URL</p></td>
<td><ul>
<li><p>http://www.google.com/test</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>CCF_STATUS </p></td>
<td><p>Credit card flow status </p></td>
<td><ul>
<li><p>started</p></li>
<li><p>aborted</p></li>
<li><p>completed</p></li>
<li><p>failed</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>DEVICE_SETTINGS_STATE</p></td>
<td><p>Stages of device settings</p></td>
<td><ul>
<li><p>invoked</p></li>
<li><p>selected</p></li>
<li><p>changed</p></li>
<li><p>save</p></li>
<li><p>cancel</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>DEVICE_STATE</p></td>
<td><p>Lifecycle of the device on/off state</p></td>
<td><ul>
<li><p>powered-on</p></li>
<li><p>starting-up</p></li>
<li><p>ready</p></li>
<li><p>changed</p></li>
<li><p>shutdown_initiated</p></li>
<li><p>shutdown_cleanup</p></li>
<li><p>shutdown_complete</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>ERROR</p></td>
<td><p>Error message</p></td>
<td><ul>
<li><p>text</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>ERROR_CODE</p></td>
<td><p>Error code</p></td>
<td><ul>
<li><p>number</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>LG_ID</p></td>
<td><p>Login ID if LG or non-LG</p></td>
<td><ul>
<li><p>True</p></li>
<li><p>False</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>NETWORK_CONN</p></td>
<td><p>Type of network connection</p></td>
<td><ul>
<li><p>Wired</p></li>
<li><p>Wireless</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>NOTIFICATION_STATE</p></td>
<td><p>Stages of notification</p></td>
<td><ul>
<li><p>invoked</p></li>
<li><p>displayed</p></li>
<li><p>cancelled</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>SEARCH_SELECTED</p></td>
<td><p>Selected app on search</p></td>
<td><ul>
<li><p>app-name/URL</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>SEARCH_TERM</p></td>
<td><p>App / Content search term</p></td>
<td><ul>
<li><p>free text</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>SIGNON_ABORT_REASON</p></td>
<td><p>Obstacles to completing sign-in flow </p></td>
<td><ul>
<li><p>free text</p></li>
<li><p>Sample : battery, user, application, network</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>SIGNON_SOURCE</p></td>
<td><p>Entry points for sign-in</p></td>
<td><ul>
<li><p>first_use_screen</p></li>
<li><p>browser</p></li>
<li><p>webOS App Store</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>SIGNON_STATE</p></td>
<td><p>States of sign-in flow</p></td>
<td><ul>
<li><p>Initiated</p></li>
<li><p>Complete</p></li>
<li><p>Cancel</p></li>
<li><p>Failure</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>SWITCH_FROM</p></td>
<td><p>Source app users switch from</p></td>
<td><ul>
<li><p>app-name</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>SWITCH_TO</p></td>
<td><p>Destination app users switch to</p></td>
<td><ul>
<li><p>app-name</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>TAB_STATUS </p></td>
<td><p>Browser tab state</p></td>
<td><ul>
<li><p>opened</p></li>
<li><p>closed</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>USER_ACTION</p></td>
<td><p>User action on a notification </p></td>
<td><ul>
<li><p>true</p></li>
<li><p>false</p></li>
</ul></td>
</tr>
</tbody>
</table>
</div>
