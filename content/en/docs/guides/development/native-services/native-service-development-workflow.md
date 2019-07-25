---
title: Native Service Development Workflow
date: 2018-05-12
weight: 20
toc: false
---

This page outlines the steps to develop native services for webOS Open Source Edition (OSE).

Developing a native service requires the following steps:

1. Implement

    - Writing the native service code (including `main.c` or `main.cpp`)
    - Preparing `README.md` that describes the project

2. Configure

    - Preparing the LS2 configuration files, including a Service Configuration file, a Role file, and Permission files
    - Preparing the systemd configuration file
    - Configuring the CMake build script (`CMakeLists.txt`)

3. Build

    - Writing a recipe to build the service on the Yocto build environment
    - Configuring the local source directory
    - Building the service

4. Run and verify

    - Installing and running the service on the target
    - Verifying the service functionality
    - Specifying the order of execution on the target

5. Deploy

    - Adding the service to the webOS OSE build recipe
    - Modifying the systemd execution list on `webos-initscripts` component
    - Building the webOS OSE image
    - Flashing the image to the target

For a step-by-step tutorial with detailed instructions, see [Developing Native Services]({{< relref "developing-native-services" >}}).
