---
title: Native App Development Workflow
date: 2020-01-17
weight: 20
toc: true
---

This page outlines the steps to develop native apps for webOS Open Source Edition (OSE).

## External Native Apps

Developing an external native app requires the following steps:

1. Implement

    - Writing the native app code

2. Configure

    - Configuring the app metadata file (`appinfo.json`)
    - Configuring the CMake build script (`CMakeLists.txt`)

3. Build

    - Running the CMake build script and the Makefile

4. Package

    - Packaging the built binary file using the CLI

5. Install and launch

    - Installing the app on the target using the CLI
    - Launching the app

For a step-by-step tutorial with detailed instructions, see [Developing External Native Apps]({{< relref "developing-external-native-apps" >}}).

## Built-in Native Apps

Developing a built-in native app requires the following steps:

1. Implement

    - Writing the native app code
    - Preparing `README.md` that describes the project

2. Configure

    - Configuring the app metadata file (`appinfo.json`)
    - Configuring the qmake project file (`<native_app_name>.pro`)

3. Build

    - Writing a recipe to build the app on the Yocto build environment
    - Configuring the local source directory
    - Building the app

4. Run and verify

    - Installing and running the app on the target
    - Verifying the app functionality

5. Deploy

    - Adding the app to the webOS OSE build recipe
    - Building the webOS OSE image
    - Flashing the image to the target

For a step-by-step tutorial with detailed instructions, see [Developing Built-in Native Apps]({{< relref "developing-built-in-native-apps" >}}).
