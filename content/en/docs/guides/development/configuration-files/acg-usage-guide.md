---
title: ACG Usage Guide
date: 2021-08-06
weight: 40
toc: true
---

This guide provides a concept of Access Control Group (ACG) and how to use ACG in webOS OSE.

## Overview

To understand what ACG is, first you need to know about webOS OSE's communication system.

### Luna Bus

Luna Bus, also called LS2, is the bus communication system of webOS OSE. Processes running on the platform communicate with each other through Luna Bus.

The following figure shows the basic concept of Luna Bus. Processes in the following figure, such as Web App, QML App, Native Service, etc., are also called **Component**.

{{< figure src="/images/docs/guides/development/configuration-files/acg-usage-guide/lunabus-abstract-model.png" alt="Luna Bus communication model" caption="" >}}

Components can be classified into service provider and service client:

- **Service Provider**: A process that is registered to Luna Bus system and provides methods for various functions.
- **Service Client**: A process that implements functions using the methods provided by service providers.

When a component communicates with other components using Luna Bus, an interface called **LS2 API** is used. It is an interface to access system services via Luna Bus and use their functionalities. LS2 API is a JSON-based API. That means, messages exchanged between components through Luna Bus use JSON payload. For more details on how to use LS2 APIs, refer to [LS2 API]({{< relref "ls2-api-index" >}}).

Using Luna Bus, each component can access any other components registered on Luna Bus. To prevent unauthorized access of APIs by clients, webOS introduces a new security policy, which is called **Access Control Group**.

### What is Access Control Group?

**Access Control Group (ACG)** is a security and policy model of Luna Bus. Service providers and clients store pre-defined permission information in their configuration files. When a client requests an access to a service provider, Luna Bus examines the permission request of the client to grant or deny access.

## How to Set Up ACG

Using ACG in webOS OSE can be divided into three steps:

1. In a service provider, define ACG permissions in the configuration files.
2. In a service client, set up ACG permissions defined in the previous step.
3. Call methods from the service client. If the ACG and trust level of the client and the provider do not match, Luna Bus denies the client’s access request to the methods of the provider.

The following figure shows these steps:

{{< figure src="/images/docs/guides/development/configuration-files/acg-usage-guide/acg-usage-flow.png" alt="Usage flow for ACG" caption="" >}}

The following sections explain the above steps in more detail.

{{< note >}}
This section only describes the overall process to define the configuration files. For more details on each file and their parameters, refer to [Appendix: Configuration Files](#appendix-configuration-files).
{{< /note >}}

### Defining ACG Permissions

Every service provider must configure the following files to define ACG permissions:

- Role File
- API Permission File
- Groups File

#### Step 1. Defining the Role File

The role file defines service aliases, outbound services, and trust level for the service. 

- The role file must follow the naming convention: `<service-name>.role.json.in`

The following code shows the role file of the “com.webos.exampleProvider” service.

{{< code "com.webos.exampleProvider.role.json.in" >}}
``` json
{ 
   "exeName":"/usr/bin/service-name",
   "trustLevel": "oem",
   "allowedNames":[ 
      "com.webos.exampleProvider",
      "com.webos.exampleProviderAlias"
   ],
   "type":"regular",
   "permissions":[ 
      { 
         "service":"com.webos.exampleProvider",
         "outbound":[ 
            "com.webos.surface",
            "com.webos.microphone",
            "com.webos.storage"
         ]
      },
      { 
         "service":"com.webos.exampleProviderAlias",
         "outbound":[ 
            "com.webos.C*"
         ]
      }
   ]
}
```
{{< /code >}}

#### Step 2. Defining the API Permission File

The API permission file defines ACGs for each methods in the service.

- The API permission file must follow the naming convention: `<service-name>.api.json`

The following code shows the role file of the “com.webos.exampleProvider” service.

{{< code "com.webos.exampleProvider.api.json" >}}
``` json
{ 
   "acg1":[ 
      "Method1"
   ],
   "acg2":[ 
      "Method2"
   ],
   "acg3":[ 
      "Method3"
   ]
}
```
{{< /code >}}

For more details on ACG names by methods, refer to [LS2 API Reference]({{< relref "ls2-api-index" >}}).

#### Step 3. Defining the Groups File

The groups file defines the trust level for each ACG. 

- The groups file must follow the naming convention: `<service-name>.groups.json`

The following code shows the groups file of the “com.webos.exampleProvider” service.

{{< code "com.webos.exampleProvider.groups.json" >}}
``` json
{
    "allowedNames" : [],
    "acg1": ["oem"],
    "acg2": ["part"],
    "acg3": ["dev"]
}
```
{{< /code >}}

`oem`, `part`, and `dev` are the trust level of webOS OSE. For more details on the trust level, refer to [Trust Level](#trust-level).

### Setting Up ACG Permissions

Before calling methods of the service provider, the service client must set up the ACG permission for the methods it wishes to access. In this case, required configuration files vary depending on the type of the client.

#### For Built-in Services

If the client is a built-in service, the client needs a **Client Permission File** to set up ACG permission.

- The client permission file must follow the naming convention: `<service-name>.perm.json`

The following code shows the client permission file of the “com.webos.exampleClient” service.

{{< code "com.webos.exampleClient.perm.json" >}}
``` json
{ 
   "com.webos.exampleProvider":[ 
      "acg1",
      "acg2",
   ],
   "com.webos.exampleProviderAlias":[ 
      "acg3"
   ]
}
```
{{< /code >}}

In the above example, the client service requests the permissions as follows:

- From the `com.webos.exampleProvider` service
  - `Method1` (`acg1`)
  - `Method2` (`acg2`)
- From the `com.webos.exampleProviderAlias` service
  - `Method3` (`acg3`)

`Method1`, `Method2`, and `Method3` are methods of the service defined in the [Defining ACG Permissions](#defining-acg-permissions) section.

#### For Apps or External Services

If the client is an app or external service, specify the required ACG names in the `requiredPermissions` property of the `appinfo.json` file. In case of external services, use the `appinfo.json` file of the app packaged together with the service. The app installer service automatically generates the configuration files when installing the component on your device.

The following code shows the `appinfo.json` file of the “com.webos.exampleapp” app.

{{< code "appinfo.json" >}}
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

In the above example, ACG permission for this app is set to `acg3`.

## Appendix: Configuration Files

For components to operate properly on Luna Bus, they need to deploy certain configuration files onto Luna Bus. These files are also referred to as **LS2 configuration files**. There are five types of configuration files as listed below:

| Configuration File        | Deployed Directory                                |
|---------------------------|---------------------------------------------------|
| Role file                 | /usr/share/luna-service2/roles.d/                 |
| Service file              | /usr/share/luna-service2/services.d/              |
| API permission file       | /usr/share/luna-service2/api-permissions.d/       |
| Client permission file    | /usr/share/luna-service2/client-permissions.d/    |
| Groups file               | /usr/share/luna-service2/groups.d/                |

### Generating Configuration Files

For apps and external service, the configuration files are automatically generated from the `appinfo.json` and `services.json` file by the app installer service. See [appinfo.json Guide]({{< relref "appinfo-json" >}}) and [service.json Guide]({{< relref "services-json" >}}) for more information about those configurations.

For built-in services, developers need to prepare the configuration files manually.

The following table summarizes how the generation rules for configuration files by types.

| Type                      | Configuration Files                                                                           |
|---------------------------|-----------------------------------------------------------------------------------------------|
| Web app (external)        | Automatically generated from `appinfo.json`.                                                  |
| Web app (built-in)        | Automatically generated from `appinfo.json`.                                                  |
| QML app (external)        | Automatically generated from `appinfo.json`.                                                  |
| QML app (built-in)        | Automatically generated from `appinfo.json`.                                                  |
| Native app (external)     | Automatically generated from `appinfo.json`.                                                  |
| Native app (built-in)     | Automatically generated from `appinfo.json`.                                                  |
| Native service (external)	| Automatically generated from `services.json`.                                                 |
| Native service (built-in)	| Manually configured. See [LS2 Configuration Files]({{< relref "developing-built-in-native-services#ls2-configuration-files" >}}) in the tutorial for built-in native service. |
| JS service (external)     | Automatically generated from `services.json`.                                                 |
| JS service (built-in)     | Manually configured. See [LS2 Configuration Files]({{< relref "developing-built-in-js-services#ls2-configuration-files" >}}) in the tutorial for built-in JS service.     |

### Role File

If a component (either a service client or a service provider) wants to register itself to Luna Bus, it must provide its logical name to the Luna Bus system. Role file contains this logical name as well as other information about permissions. Luna Bus determines to accept or deny the registration request based on the information given in the role file.

A role file has the following attributes:

| Attribute | Description |
|-----------|-------------|
| exeName | Absolute path of the binary executable for the component. Script-based components such as JS services, web apps, and QML apps, do not have a unique executable name. Such components **use `appId` instead of `exeName`**. |
| type | Service type (regular / privileged / devmode). Only privileged services are allowed to change id during execution. |
| trustLevel | Security permission level of the service. |
| allowedNames | Names that this service is allowed to register. It can be an array of any valid service name strings. |
| permissions | <p>List of inbound and outbound policies for the specified service name. Different permissions can be assigned to different service names.</p><ul><li>`service`: The name of the service this policy applies to. This service name should be one of the service names listed `allowedNames`.</li><li>`inbound`: List of services that this service is allowed to receive requests from.</li><li>`outbound`: List of services that this service is allowed to send requests to.</li></ul> |

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

{{< caution >}}
You can use `ls-control` to inform the hub to rescan directories only when the component was installed by using the opkg command.
{{< /caution >}}

### Service File

A service file, also called service configuration file, contains description of the service type and launch command. webOS OSE has two service types: static and dynamic.

{{< note >}}
Only service provider components need their service file. Clients don't need service files.
{{< /note >}}

- Static services

    - Most static services are started at boot time by systemd, the init process.
    - If the service crashes, Luna Bus will buffer requests to the service and deliver them to the service after it has restarted (assuming it is re-spawned by systemd).
    - If the service doesn’t need to be running all the time, it is preferable to make it a dynamic service in order to save memory and reduce system load.
    
- Dynamic services

    - A dynamic service is one that is launched on demand. This “lazy launching” behavior allows us to improve boot time by staggering the launch of services and reduce the memory footprint by only running necessary services.
    - For example, if you create a dynamic service called com.example.service.foo, it will be automatically launched the first time someone attempts to send a message to it.
    - Furthermore, less critical services will often time out and exit after an extended period of inactivity.

A service file has the following attributes:

| Attribute | Description |
|-----------|-------------|
| Name | Service name |
| Exec | Executable path for service |
| Type | Type of service |

The following code shows an example of service file:

{{< code "com.example.service.native.service" >}}
```
[D-BUS Service]
Name=com.example.service.native
Exec=@WEBOS_INSTALL_SBINDIR@/com.example.service.native
Type=static
```
{{< /code >}}

### API Permission File

Luna Bus can manage access control at method level. For this purpose, service provider components must define a set of security groups and associate each method with these security groups. This security group is called Access Control Group. API permission files define these ACGs. 

The following shows an example of defining ACGs for the methods of the com.example.service.native service:

{{< code "com.example.service.native.api.json" >}}
``` json
{
    "exampleservice.acgname": [
        "com.example.service.native/hello",
        "com.example.service.native/greetings",
    ],
    "exampleservice.anotheracgname": [
        "com.example.service.native/goodbye",
        "com.example.service.native/seeyou",
    ],
    ...
}
```
{{< /code >}}

In the above example, the ACG “exampleservice.acgname” is defined and the methods `hello` and `greetings` belong to this ACG. In the same way, the ACG “exampleservice.anotheracgname” is defined and `goodbye` and `seeyou` methods belong to this ACG.

{{< note >}}
One method can belong to multiple ACGs. Conversely, one ACG can contain multiple methods. 
{{< /note >}}

If a client wants to use a method of another service, the client must have access permission to the ACG that the method belongs to. In the above case, the client must have access permission to the “exampleservice.acgname” ACG if it wants to use the `com.example.service.native/hello` method. See the following [Client Permission File](#client-permission-file) section for more information.

### Client Permission File

All clients (services and applications that use other services) must have a client permission file. You need to specify what ACGs are required for the component to function properly. For example, if your app needs to use the `launch` method of `com.webos.service.applicationmanager`, then specify the ACG “applications.lauch” in the client permission file.

For services, specify the required ACGs in the client permission file. The following shows the client permission file of the `com.example.service.native` service.

{{< code "com.example.service.native.perm.json" >}}
``` json
{
    "com.webos.service.applicationmanager": [
        "applications.launch"
    ]
}
```
{{< /code >}}

For apps, specify the required ACGs in the `requiredPermissions` attribute of the `appinfo.json` file. The client permission file is automatically generated from the `appinfo.json` file.

{{< code "Example client permission file for apps" >}}
``` json
{ 
   "id":"com.example.yourapp",
   ...,
   "requiredPermissions":[ 
      "applications.launch"
   ]
}
```
{{< /code >}}

You can identify the ACG information about the methods you wish to use. Use the `ls-monitor` command with the `-i` option. The ACGs each method belongs to are listed, as shown below:

``` bash
$ ls-monitor -i com.webos.service.<required_service>

METHODS AND SIGNALS REGISTERED BY SERVICE 'com.webos.service.<required_service>' WITH UNIQUE NAME '********' AT HUB
  "/":
...
      "<method_to_call>": {"provides":["group1","group2"]}
...
```

### Groups File

A groups file specifies security trust level of each ACG group of the service. 

#### Trust Level

**Trust Level** defines an access level of each ACG. Below are the trust levels supported in webOS OSE:

- `dev`: APIs belonging to this trust level can be accessed by all trust levels.
- `part`: APIs belonging to this trust level can be accessed by `part` and `oem`.
- `oem`: APIs belonging to this trust level can only be accessed by `oem`.

The following table summarizes this access limitation.

| **Trust level of your service** | **Access to APIs in dev Groups** | **Access to APIs in part Groups** | **Access to APIs in oem Groups** |
| ------------------------------- | -------------------------------- | --------------------------------- | -------------------------------- |
| dev                             | Allowed                          | Not Allowed                       | Not Allowed                      |
| part                            | Allowed                          | Allowed                           | Not Allowed                      |
| oem                             | Allowed                          | Allowed                           | Allowed                          |
    
Suppose your service has `dev` trust level (the `trustLevel` attribute of the role file is set to `dev`). Your service cannot access APIs of other services belonging to the `part` or `oem` group. 

#### Example

The groups file `com.example.service.native.group.json` defines the trust level of each ACG. In the following example, the trust level is set to `dev` for "exampleservice.acgname" ACG and `oem` to "exampleservice.anotheracgname".

{{< code "com.example.service.native.group.json" >}}
``` json
{
    "allowedNames": [ "com.example.service.native" ],
    "exampleservice.acgname": [ "dev" ],
    "exampleservice.anotheracgname": [ "oem" ]
}
```
{{< /code >}}

In the above example, your service cannot access APIs belonging to the "exampleservice.anotheracgname" group since its trust level is set to `oem`.
