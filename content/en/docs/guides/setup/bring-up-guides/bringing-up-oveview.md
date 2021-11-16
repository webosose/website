---
title: Bring-Up Overview
date: 2021-11-05
weight: 10
toc: true
---

A bring-up process is a series of tasks to migrate a specific platform to a new System on a Chip (SoC) board. A common bring-up process consists of the following tasks:

* Preparing required Board Support Package (BSP) files
* Modifying the source codes
* Verifying the basic operations and debugging errors

This page describes how to bring up webOS OSE from scratch.

{{< note >}}
We recommend to use the target board which supports meta layer files for the Yocto build, but this is not required.
{{< /note >}}

## Bring-up Process

The following picture shows a brief summary of bring-up process.

<img src="/images/docs/guides/setup/summary-of-bring-up-process.png" width="65%" alt="A process to bring up a webOS OSE">

1. **Preparing Yocto SoC BSPs**: 

    First, you need to prepare BSP for your SoC board. The BSP files contain the information to support a specific hardware. These files are usually provided by SoC makers and depend on the type of your SoC board. 

2. **Replacing meta layers**: 

    A meta layer is a set of files which determine how to build a target. You need to add, change, and remove meta layers specific for your hardware target.
    
3. **Changing the machine configuration files**: 
    
    A machine configuration determines your target SoC board. Examine the machine configuration files and make necessary changes, such as the boot loader, kernel, and image size, to support your hardware target.
    
4. **(Optional) Changing the distribution configuration file**:

    A distribution configuration determines policy configurations for your distribution. If you want to distribute webOS OSE, you can use webOS OSE's distribution configuration file.
    
5. **Handling build errors**
    
    Modify the recipe files to fix build errors.

6. **Installing an image**
 
    Modify or add tasks to create an image format which is installable on your SoC board.

7. **Handling runtime errors**

    Correct errors during running webOS OSE. Before starting this step, make sure that you understand the execution sequences of Luna Surface Manager (LSM) and Web Application Manager (WAM).

For more details on the bring-up process, see [Yocto Mega Manual](https://www.yoctoproject.org/docs/current/mega-manual/mega-manual.html).

## Verifying Bring-Up Process

Once you've done the bring-up process, you can go through the following checklist to see if the bring-up was successful.

1. Swipe up the display and check whether Home Launcher is displayed.
2. Click the apps in Home Launch and check whether the apps are launched properly.
3. Check whether the sample native app is working properly. For details on how to install and run the sample app, see [Developing External Native Apps](/docs/tutorials/native-apps/developing-external-native-apps/).

{{< note >}}
You can verify the basic operation of LSM, WAM, System and Application Manager (SAM) using the following command:

``` shell
# ls-monitor example to verify the operation
ls-monitor -l | grep -E "surfacemanager|webappmanager|applicationManager|sam"

250 com.webos.surfacemanager                /usr/bin/surface-manager    static                  T8seiy25
250 com.webos.surfacemanager.audio          /usr/bin/surface-manager    unknown/client only     0uJxIsNQ
407 com.webos.service.applicationManager    /usr/sbin/sam               static                  4XkmWlpU
408 com.palm.webappmanager                  /usr/bin/WebAppMgr          static                  WQocBume
407 com.webos.service.applicationmanager    /usr/sbin/sam               static                  SjjHfvh6
407 com.webos.applicationManager            /usr/sbin/sam               static                  Pj6R8n6A
```
{{< /note >}}

If all the steps work fine, then you succeed to bring up webOS OSE.