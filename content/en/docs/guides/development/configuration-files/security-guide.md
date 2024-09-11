---
title: Security Guide
date: 2024-09-10
weight: 40
toc: true
---

This guide describes the security policy of webOS OSE and how to set it up correctly.

## Overview

First you need to know about webOS OSE’s communication system, Luna Bus.

### Luna Bus

Luna Bus, also called LS2, is the bus communication system of webOS OSE platform. Processes running on the platform communicate with each other through Luna Bus.

{{< note >}}
If you already familiar with the following concepts, you can skip this section and go to [Security Policy of webOS OSE](#security-policy-of-webos-ose).

- Luna Bus
- Service provider and client
{{< /note >}}

The following figure shows the basic concept of Luna Bus. Processes (such as web apps, QML apps, and JavaScript services) send messages to Luna Bus, then Luna Bus forwards these messages to the target recipient.

{{< figure src="/images/docs/guides/development/configuration-files/security-guide/luna-bus-abstract-model.png" alt="Luna Bus communication model" caption="" >}}

Components can be classified into service provider and service client:

- **Service provider**: A process that is registered to Luna Bus system. This process provides methods for other processes.
- **Service client**: A process that implements functions using service provider's methods.

Communication between processes is established using [LS2 API]({{< relref "introduction-to-ls2-api" >}}). LS2 API is an interface to access webOS system services via Luna Bus. Using LS2 API, each process can access any other processes registered on Luna Bus. To prevent unauthorized access, LS2 API introduces **Access Control Group (ACG)** and **Trust Level**. 

### Security Policy of webOS OSE

A security policy of webOS OSE consists of two values: ACG and Trust Level.

Service providers and clients have their own ACG and Trust Level values. When a client sends a request to a provider, Luna Bus examines the values of both the provider and the client. If the client's ACG or Trust Level values don't match with the provider's values, Luna Bus rejects the request.

The following figure shows this process.

{{< figure src="/images/docs/guides/development/configuration-files/security-guide/security-flow.png" alt="Usage flow for ACG" caption="" >}}

In the above figure, the client has `acg_a` for ACG and `trust_level_a` for its Trust Level.

Let's suppose that the client sends a request for calling `Method A`. `Method A` belongs to `acg_a`, and `acg_a` belongs to `trust_level_a`. So `Method A`'s values are as follows: 

- ACG: `acg_a`
- Trust Level: `trust_level_a`

Which match with those of the client. So the client can call `Method A`.

But in the case of `Method B`, the Trust Level is `trust_level_a`, but the ACG value is `acg_b`. So the client **cannot to call** `Method B`.

### Trust Levels

**Trust Level** defines an access level of each ACG. Below are the trust levels supported in webOS OSE:

- `dev`: APIs belonging to this trust level can be accessed by all trust levels.
- `part`: APIs belonging to this trust level can be accessed by `part` and `oem`.
- `oem`: APIs belonging to this trust level can only be accessed by `oem`.

The following table summarizes this access limitation.

| Trust level of your service | Access to `dev` APIs | Access to `part` APIs | Access to `oem` APIs |
|-----------------------------|----------------------|-----------------------|----------------------|
| dev                         | Allowed              | Not Allowed           | Not Allowed          |
| part                        | Allowed              | Allowed               | Not Allowed          |
| oem                         | Allowed              | Allowed               | Allowed              |
    
Suppose your service has `dev` trust level (the `trustLevel` attribute of the role file is set to `dev`). Your service cannot access APIs of other services belonging to the `part` or `oem` group. 

## How to Set Up

The following table shows the files related to ACG and trust level.

<div class="table-container">
  <table class="table is-bordered">
    <thead>
      <tr class="header">
        <th><p>Type</p></th>
        <th><p>For ACG</p></th>
        <th><p>For Trust Level</p></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p>App</p></td>
        <td><p>Set up the <code>requiredPermissions</code> property in <a href="/docs/guides/development/configuration-files/appinfo-json/">appinfo.json</a>.</p></td>
        <td rowspan="2"><p>No need to set up. Trust level is set to <code>OEM</code> automatically.</p></td>
      </tr>
      <tr>
        <td><p>Downloadable Service</p></td>
        <td><p>Set up the <code>requiredPermissions</code> property in <a href="/docs/guides/development/configuration-files/appinfo-json/">appinfo.json</a> of the app packaged with the downloadable service.</p></td>
      </tr>
      <tr>
        <td><p>Built-in Service</p></td>
        <td colspan="2"><p>Set up <a href="#appendix-configuration-files">Configuration files</a>.</p></td>
      </tr>
    </tbody>
  </table>
</div>

### For Apps and Downloadable Services

If you develop apps or downloadable services, all you need to do is set up the `appinfo.json` file.

1. Make a list of services --- which can be LS2 APIs or custom services.
2. Find ACG values for each service. See [Appendix. How to Find ACG Values of APIs](#appendix-how-to-find-acg-values-of-apis).
3. Add the ACG values to the `requiredPermissions` property in `appinfo.json`. In case of downloadable services, use the `appinfo.json` file of the app packaged together with the service.
4. Then app installer service automatically generates the configuration files during installation of your app or service.

The following example shows how to set up an ACG value at the `appinfo.json` file. This app can access to services whose ACG value is `acg3`.

{{< code "Sample appinfo.json" >}}
``` json
{ 
   "id":"com.webos.exampleapp",

   ...
   
   "requiredPermissions":[ 
      "acg3"
   ]
}
```
{{< /code >}}

### For Built-In Services

If you develop built-in services, you need to set up your own configuration files. A list of required files can vary depending on the service you want to develop.

- For service provider
    - Role file
    - API permission file
    - Groups file
    - Service file
- For service client
    - Client permission file

For more details on how to set up each file, see to [Configuration Files](#configuration-files).

{{< note >}}
See also, [LS2 Configuration Files for native services]({{< relref "developing-built-in-native-services#ls2-configuration-files" >}}) and [LS2 Configuration Files for JS services]({{< relref "developing-built-in-js-services#ls2-configuration-files" >}})
{{< /note >}}

## Configuration Files

Components of webOS OSE need a certain types of files to operate properly on the Luna Bus. These files are called **LS2 configuration files**. 

The following table shows the types of configuration files and :

| Configuration File        | Stored Directory                            |
|---------------------------|---------------------------------------------|
| Role file                 | /var/luna-service2/roles.d/                 |
| Service file              | /var/luna-service2/services.d/              |
| API permission file       | /var/luna-service2/api-permissions.d/       |
| Client permission file    | /var/luna-service2/client-permissions.d/    |
| Groups file               | /var/luna-service2/groups.d/                |

{{< note >}}
If you install components in the [developer mode]({{< relref "com-webos-service-devmode" >}}), stored directories will be changed like `/var/luna-service2-dev/~`.
{{< /note >}}

### Role File

**Naming convention**: `<service-name>.role.json.in`

If a component (either a service client or a service provider) wants to register itself to Luna Bus, the component must provide its logical name to the Luna Bus system. The role file contains this logical name and information about permissions. Luna Bus determines whether to accept or deny the registration request based on the information given in the role file.

A role file has the following attributes:

| Attribute | Description |
|-----------|-------------|
| exeName | Absolute path of the binary executable for the component. Script-based components such as JS services, web apps, and QML apps, do not have a unique executable name. Such components **use `appId` instead of `exeName`**. |
| type | Service type (regular / privileged / devmode). Only privileged services are allowed to change ID during execution. |
| trustLevel | Trust level of the service. |
| allowedNames | Names to register to Luna Bus. It can be an array of any valid service name strings. |
| permissions | <p>List of inbound and outbound policies for the specified service name. Different permissions can be assigned to different service names.</p><ul><li>`service`: The name of the service this policy applies to. This service name should be one of the service names listed `allowedNames`.</li><li>`inbound`: List of services that `service` is allowed to receive requests from.</li><li>`outbound`: List of services that `service` is allowed to send requests to.</li></ul> |

Note that `inbound` and `outbound` list can include strings of any valid service names. Use `*` for all, empty array `[]` for none. It is possible to use a wildcard (`*`) at the end of a string.

The following code shows an example of role file:

{{< code "com.example.service.native.role.json.in" >}}
``` json
{
    "exeName": "/usr/bin/com.example.service.native",
    "type": "regular",
    "trustLevel": "dev",
    "allowedNames": [
        "com.example.service.native"
    ],
    "permissions": [
        {
            "service": "com.example.service.native",
            "inbound": ["*"],
            "outbound": ["*"]
        }
    ]
}
```
{{< /code >}}

The following code shows an example of role file for script-based components:

{{< code "An example role file for script-based components" >}}
``` json
{
    "appId": "com.webos.app.enactbrowser",
    "type": "privileged",
    "trustLevel" : "oem",
    "allowedNames": [
        "com.webos.app.enactbrowser-*"
    ],
    "permissions": [
        {
            "service": "com.webos.app.enactbrowser-*",
            "outbound": [
                "*"
            ]
        }
    ]
}
```
{{< /code >}}

If you need to register a component during runtime, use the `ls-control` command to send the request to the Luna Bus system to update its policy.

``` bash
$ ls-control scan-services
```

You can use `ls-control` to inform the hub to rescan directories only when the component was installed by using the `opkg` command.

### API Permission File

naming convention: `<service-name>.api.json`

This file defines ACG values for each methods in the service. Every LS2 API mehods has an ACG value. Typically, the same ACG value is given to the methods with similar functionality.

The following example shows how to define ACG values for multiple methods of the `com.example.service.native` service:

{{< code "com.example.service.native.api.json" >}}
``` json
{
    "exampleservice.acgvalue1": [
        "com.example.service.native/hello",
        "com.example.service.native/greetings",
    ],
    "exampleservice.acgvalue2": [
        "com.example.service.native/goodbye",
        "com.example.service.native/seeyou",
    ],
    ...
}
```
{{< /code >}}

{{< note >}}
One method can belong to multiple ACGs. Conversely, one ACG can contain multiple methods. 
{{< /note >}}

If a client wants to call the `com.example.service.native/hello` method, the client must contain `exampleservice.acgvalue1` in its ACG values.

### Groups File

**Naming convention**: `<service-name>.groups.json`

This file defines the trust levels of each ACG value. The following example shows an example group file. 

{{< code "com.example.service.native.group.json" >}}
``` json
{
    "allowedNames": [ "com.example.service.native" ],
    "exampleservice.acgvalue1": [ "dev" ],
    "exampleservice.acgvalue2": [ "oem" ]
}
```
{{< /code >}}

In the above example, a trust level, `dev`, is assigned to the ACG value, `exampleservice.acgvalue1`. So the APIs in `exampleservice.acgvalue1` have the `dev` trust level.

### Service File

**Naming convention**: `<service-name>.service`

A service file, also called a service configuration file, contains descriptions of the service type and launch command. 

{{< note >}}
Only service provider needs this file. Clients don't need the service file.
{{< /note >}}

webOS OSE has two service types: static and dynamic.

- Static service

    - Most static services are launched at boot time by systemd --- the init process.
    - If the service crashes, Luna Bus will store current requests to the service and deliver them to the service after it has restarted (assuming it is re-spawned by systemd).
    - The static service always runs in the background. So if your service doesn’t need to be run all time, the dynamic service might be a solution to save system resources.
    
- Dynamic service

    - Dynamic services are launched on demand. For example, if you create a dynamic service, it will be launched when someone attempts to send a request to the service. This "lazy launching" makes only necessary services are launched at boot time, and this leads to shorter booting time.
    - If a dynamic service doesn't work for a certain period of time, webOS OSE system shuts down the service automatically.

A service file has the following attributes:

| Attribute | Description |
|-----------|-------------|
| Name | Service name |
| Exec | Executable path for service |
| Type | Type of service |

The following code shows an example service file:

{{< code "com.example.service.native.service" >}}
```
[D-BUS Service]
Name=com.example.service.native
Exec=@WEBOS_INSTALL_SBINDIR@/com.example.service.native
Type=static
```
{{< /code >}}

### Client Permission File

**Naming convention**: `<service-name>.perm.json`

All clients (services and applications that use other services) must have a client permission file. You have to check what ACG values are needed and add them to the client permission file. This process is very similar to setting up `requiredPermissions` in `appinfo.json`.

Suppose that you want to use the `launch` method of `com.webos.service.applicationmanager`.

1. Check the ACG value of the method --- `applications.launch`.
2. Add it to the client permission file.

    {{< code "com.example.service.perm.json" >}}
    ``` json
    {
        "com.webos.service.applicationmanager": [
            "applications.launch"
        ]
    }
    ```
    {{< /code >}}

## Appendix. How to Find ACG Values of APIs

The easiest way to find the ACG value is to check [LS2 API Reference]({{< relref "ls2-api-index" >}}) documents.

Every method in the API reference shows its own ACG value. For example, an ACG value for the [createToast]({{< relref "com-webos-notification#createtoast" >}}) method is `notification.opration` as shown in the below figure.

{{< figure src="/images/docs/guides/development/configuration-files/security-guide/acg-values-in-api-references.jpg" caption="An ACG value for the createToast method" alt="" >}}

The other way is to use the `ls-monitor -i` command.

``` bash
root@raspberrypi4-64:/# ls-monitor -i com.webos.notification | grep "createToast"
       "createToast": {"provides":["all","notification.operation"]}
```