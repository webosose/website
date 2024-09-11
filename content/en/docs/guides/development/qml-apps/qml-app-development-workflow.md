---
title: QML App Development Workflow
date: 2024-09-10
weight: 20
toc: true
---

This page outlines the steps to develop QML apps for webOS Open Source Edition (OSE).

## Downloadable QML Apps

To develop a downloadable QML app, the Command-Line Interface (CLI) tool is used.

In general, the steps described in [CLI Workflow]({{< relref "cli-user-guide#cli-workflow" >}}) are applied.

For a step-by-step tutorial, see [Developing Downloadable QML Apps]({{< relref "developing-downloadable-qml-apps" >}}).

## Built-in QML Apps

Developing a built-in QML app requires the following steps:

1. Implement

    - Writing the QML app code (including `main.qml`)
    - Preparing `README.md` that describes the project

2. Configure

    - Configuring the app metadata file (`appinfo.json`)
    - Configuring the qmake project file (`<QML_app_name>.pro`)

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

For a step-by-step tutorial with detailed instructions, see [Developing Built-in QML Apps]({{< relref "developing-built-in-qml-apps" >}}).
