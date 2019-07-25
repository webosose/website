---
title: luna-service2 Library API Reference
date: 2019-05-24
toc: true
---

## API Summary

**luna-service2** library provides a C/C++ API that can be used to call LS2 API methods. Native apps and services can use the luna-service2 library API in order to make use of platform features.

## Type Definitions

The table below shows description of the typedefs.

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<colgroup>
<col style="width: auto" />
<col style="width: auto" />
</colgroup>
<thead>
<tr class="header">
<th>Definition</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>LSHandle</strong></p></td>
<td><p>Handle to the service.</p></td>
</tr>
<tr class="even">
<td><p><strong>LSMessageToken</strong></p></td>
<td><p>Message token.</p></td>
</tr>
<tr class="odd">
<td><p><strong>LSMessage</strong></p></td>
<td><p>Message object.</p>
<ul>
<li>Contains information about methods, connection tokens, client payload (request arguments), and whether a subscription is requested.</li>
<li>It is necessary to pass the response to the client.</li>
<li>Functions that can obtain the information are LSMessageGetMethod (), LSMessageGetPayload (), and so on.</li>
</ul></td>
</tr>
<tr class="even">
<td><p><strong>LSMethodFunction</strong></p>
<p>typedef bool(*)(LSHandle sh, LSMessage msg, void *category_context) LSMethodFunction</p></td>
<td><p>Table registration of callbacks.</p>
<p><strong>Parameters:</strong></p>
<ul>
<li>sh - handle to the service</li>
<li>msg - message object</li>
<li>category_context - category context</li>
</ul>
<p><strong>Returns:</strong></p>
<ul>
<li>bool - true on success, otherwise false</li>
</ul></td>
</tr>
<tr class="odd">
<td><p><strong>LSFilterFunc</strong></p>
<p>typedef bool(*)(LSHandle *sh, LSMessage *reply, void *ctx) LSFilterFunc</p></td>
<td><p>Callback function called on incoming message.</p>
<p><strong>Parameters:</strong></p>
<ul>
<li>sh - handle to the service</li>
<li>reply - incoming message</li>
<li>ctx - context</li>
</ul>
<p><strong>Returns:</strong></p>
<ul>
<li>bool - true on success, otherwise false</li>
</ul></td>
</tr>
<tr class="even">
<td><p><strong>LSError</strong></p></td>
<td><p>Error object which contains information about first error since it was initialized via LSErrorInit.</p></td>
</tr>
</tbody>
</table>
</div>

## Functions

### LSCall

#### Description

Sends payload to service at the specified URI.

#### Syntax

```c
bool LSCall (LSHandle *sh, const char *uri, const char *payload, LSFilterFunc callback, void *ctx, LSMessageToken *ret_token, LSError *lserror)
```

#### Parameters

* sh - [IN] handle to the service
* uri - [IN] fully qualified path to service's method
* payload - [IN] some string, usually following json object semantics
* callback - [IN] function callback to be called when responses arrive
* ctx - [IN] user data to be passed to callback
* ret_token - [OUT] token which identifies responses to this call
* lserror - [OUT] set on error

#### Returns

* bool - true on success, otherwise false

### LSErrorInit

#### Description

Initializes an LSError.

#### Syntax

```c
bool LSErrorInit (LSError* lserror)
```

#### Parameters

* lserror - [IN] LSError structure to initialize

#### Returns

* bool - true on success, otherwise false

### LSErrorPrint

#### Description

Prints an LSError.

#### Syntax

```c
void LSErrorPrint (LSError *lserror, FILE *out)
```

#### Parameters

* lserror - [IN] LSError structure to print
* out - [IN] handle to file

#### Returns

None

### LSMessageReply

#### Description

Sends a reply to a message using the bus identified by LSHandle.

#### Syntax

```c
bool LSMessageReply (LSHandle *sh, LSMessage *msg, const char *json, LSError * lserror)
```

#### Parameters

* sh - [IN] handle to the service
* msg - [IN] message
* json - [IN] json as payload
* lserror - [OUT] set on error

#### Returns

* bool - true on success, otherwise false

### LSRegister

#### Description

Registers a service on the LS2 bus.

#### Syntax

```c
bool LSRegister (const char *name, LSHandle **sh, LSError *lserror)
```

#### Parameters

* name - [IN] service name
* sh - [IN] handle to the service
* lserror - [OUT] set on error

#### Returns

* bool - true on success, otherwise false

### LSUnregister

#### Description

Unregisters a service.

#### Syntax

```c
bool LSUnregister (LSHandle *sh, LSError *lserror)
```

#### Parameters

* sh - [IN] handle to the service
* lserror - [OUT] set on error

#### Returns

* bool - true on success, otherwise false

### LSRegisterCategory

#### Description

Registers tables of callbacks associated with the message category.

#### Syntax

```c
bool LSRegisterCategory (LSHandle *sh, const char *category, LSMethod  *methods, LSSignal *signals, LSProperty *properties, LSError *lserror)
```

#### Parameters

* sh - [IN] handle to the service
* category - [IN] may be NULL for default '/' category.
* methods - [IN] table of methods
* signals - [IN] table of signals
* properties - [IN] table of properties
* lserror - [OUT] set on error

#### Returns

* bool - true on success, otherwise false

### LSGmainAttach

#### Description

Attaches a service to a glib mainloop.

#### Syntax

```c
bool LSGmainAttach (LSHandle *sh, GMainLoop *mainLoop, LSError *lserror)
```

#### Parameters

* sh - [IN] handle to the service
* mainLoop - [IN] loop to attach
* lserror - [OUT] set on error

#### Returns

* bool - true on success, otherwise false

### LSMessageGetMethod

#### Description

Gets the method name of the message.

This only applies to request messages on the service side like method call, method cancel, signal call. Doesn't apply to response messages.

#### Syntax

```c
const char * LSMessageGetMethod (LSMessage *message)
```

#### Parameters

* message - [IN] message

#### Returns

* const char * - method name

### LSMessageGetPayload

#### Description

Gets the payload of the message.

#### Syntax

```c
const char * LSMessageGetPayload (LSMessage *message)
```

#### Parameters

* message - [IN] message

#### Returns

* const char * - payload
