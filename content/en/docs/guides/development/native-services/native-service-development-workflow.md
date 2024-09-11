---
title: Native Service Development Workflow
date: 2024-09-10
weight: 20
toc: true
---

This page outlines the steps to develop native services for webOS Open Source Edition (OSE).

## Downloadable Native Services

Developing a downloadable native service requires the following steps:

1. Implement

    - Writing the native service code
    - Preparing a dummy app to package with the service

2. Configure

    - Configuring the service metadata file (`services.json`)
    - Configuring the CMake build script (`CMakeLists.txt`)

3. Build

    - Running the CMake build script and the Makefile

4. Package

    - Packaging the built binary file with the dummy app using the CLI

5. Install and Run

    - Installing the service on the target using the CLI
    - Launching the dummy app or entering commands using a terminal

For a step-by-step tutorial with detailed instructions, see [Developing Downloadable Native Services]({{< relref "developing-downloadable-native-services" >}}).

## Built-in Native Services

Developing a built-in native service requires the following steps:

1. Implement

    - Writing the native service code
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

For a step-by-step tutorial with detailed instructions, see [Developing Built-in Native Services]({{< relref "developing-built-in-native-services" >}}).
