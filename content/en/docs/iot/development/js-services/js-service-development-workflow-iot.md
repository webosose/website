---
title: JS Service Development Workflow
date: 2020-03-10
weight: 20
toc: false
---

This page outlines the steps to develop JS services for webOS IoT.

Developing a JS service requires the following steps:

1. Implement

    - Writing the JS service code (`<JS_service_name>.js`)
    - Preparing `README.md` that describes the project

2. Configure

    - Configuring the service metadata file (`package.json`)
    - Preparing the LS2 configuration files, including a Service Configuration file, a Role file, and Permission files
    - Configuring the CMake build script (`CMakeLists.txt`)

3. Build

    - Writing a recipe to build the service on the Yocto build environment
    - Configuring the local source directory
    - Building the service

4. Run and verify

    - Installing and running the service on the target
    - Verifying the service functionality

5. Deploy

    - Adding the service to the webOS IoT build recipe
    - Building the webOS IoT image
    - Flashing the image to the target

For a step-by-step tutorial with detailed instructions, see [Developing JS Services]({{< relref "developing-js-services-iot" >}}).
