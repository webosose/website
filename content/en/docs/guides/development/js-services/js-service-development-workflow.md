---
title: JS Service Development Workflow
date: 2018-05-12
weight: 20
toc: true
---

This page outlines the steps to develop JS services for webOS Open Source Edition (OSE).

## External JS Services

To develop an external JS service, the Command-Line Interface (CLI) tool is used.

In general, the steps described in [CLI Workflow]({{< relref "cli-user-guide#cli-workflow" >}}) are applied.

For a step-by-step tutorial, see [Developing External JS Services]({{< relref "developing-external-js-services" >}}).

## Built-in JS Services

Developing a built-in JS service requires the following steps:

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

    - Adding the service to the webOS OSE build recipe
    - Building the webOS OSE image
    - Flashing the image to the target

For a step-by-step tutorial with detailed instructions, see [Developing Built-in JS Services]({{< relref "developing-built-in-js-services" >}}).
